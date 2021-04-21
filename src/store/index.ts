import { compareDesc } from 'date-fns/fp';
import { flow, Instance, types } from 'mobx-state-tree';
import { createContext, useContext } from 'react';
import Todo, { TodoType } from './todo';

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
  return fetch(`${URI_BASE}${path}`, options).then((x) => x.json());
};

const TodoStore = types
  .model({
    _todos: types.optional(types.array(Todo), []),
    state: types.optional(
      types.enumeration(['preloading', 'loading', 'complete', 'error']),
      'preloading'
    ),
  })
  .actions((self) => {
    const toggle = flow(function* toggle(todo: TodoType) {
      todo.startToggle();
      const data = yield apiFetch(`patch/${todo.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ isComplete: !todo.isComplete }),
      });
      if (data.status === 'success') {
        todo.toggle();
      }
    });

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
