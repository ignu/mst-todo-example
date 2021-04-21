import { isPast } from 'date-fns';
import { compareDesc } from 'date-fns/fp';
import { flow, Instance, types } from 'mobx-state-tree';
import { createContext, useContext } from 'react';
import { DateTime } from './DateType';

const URI_BASE = 'https://944ba3c5-94c3-4369-a9e6-a509d65912e2.mock.pstmn.io/';
const apiFetch = (path: string, opts?: Partial<RequestInit>) => {
  const options = {
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': 'PMAK-5ef63db179d23c004de50751-10300736bc550d2a891dc4355aab8d7a5c',
      ...(opts?.headers || {}),
    },
    ...opts,
  };
  console.log('🦄 - options', options);
  return fetch(`${URI_BASE}${path}`, options).then((x) => x.json());
};

type TodoState = 'complete' | 'overdue' | 'pending';

export const Todo = types
  .model({
    id: types.identifier,
    description: types.string,
    dueDate: types.maybeNull(DateTime),
    isComplete: types.boolean,
  })
  .views((self) => {
    return {
      get state(): TodoState {
        if (self.isComplete) {
          return 'complete';
        }
        if (self.dueDate && isPast(self.dueDate)) {
          return 'overdue';
        }
        return 'pending';
      },
    };
  })
  .actions((self) => {
    const toggle = () => {
      self.isComplete = !self.isComplete;
    };
    return {
      toggle,
    };
  });

const TodoStore = types
  .model({
    _todos: types.optional(types.array(Todo), []),
    state: types.optional(
      types.enumeration(['preloading', 'loading', 'complete', 'error']),
      'preloading'
    ),
  })
  .actions((self) => {
    const toggle = function toggle(todo: TodoType) {
      console.log('🦄 - todo', todo);
      todo.toggle();
    };

    const fetchTodos = flow(function* fetchTodos() {
      try {
        self.state = 'loading';
        self._todos = yield apiFetch('get');
        self.state = 'complete';
      } catch {
        self.state = 'error';
      }
    });

    return {
      fetchTodos,
      toggle,
    };
  })
  .views((self) => {
    const futureDate = new Date(2099, 1, 1);
    const sortDate = (a: TodoType, b: TodoType) => {
      return compareDesc(a.dueDate || futureDate, b.dueDate || futureDate);
    };
    const complete = () => self._todos.filter((t) => t.isComplete).sort(sortDate);
    const incomplete = () => self._todos.filter((t) => !t.isComplete).sort(sortDate);
    const todos = () => {
      if (self.state === 'preloading') {
        self.fetchTodos();
      }

      return [...incomplete(), ...complete()];
    };
    return {
      todos,
    };
  });

export default TodoStore;
export type TodoType = Instance<typeof Todo>;

export const todoStore = TodoStore.create({});
export type TodoStoreInstance = Instance<typeof TodoStore>;
const RootStoreContext = createContext<null | TodoStoreInstance>(null);

export const Provider = RootStoreContext.Provider;
export function useMst() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider');
  }
  return store;
}
