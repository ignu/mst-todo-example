import { isPast } from 'date-fns';
import { types, Instance, flow, getSnapshot } from 'mobx-state-tree';
import { createContext, useContext } from 'react';
import { DateTime } from './DateType';

const URI_BASE = 'https://944ba3c5-94c3-4369-a9e6-a509d65912e2.mock.pstmn.io/';
const apiFetch = (path: string, opts?: Partial<RequestInit>) => {
  return fetch(`${URI_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': 'PMAK-5ef63db179d23c004de50751-10300736bc550d2a891dc4355aab8d7a5c',
      ...(opts?.headers || {}),
    },
    ...opts,
  }).then((x) => x.json());
};

export const Todo = types
  .model({
    id: types.identifier,
    description: types.string,
    dueDate: types.maybeNull(DateTime),
    isComplete: types.boolean,
  })
  .views((self) => {
    return {
      get state() {
        if (self.dueDate && isPast(self.dueDate)) {
          return 'overdue';
        }
        return 'pending';
      },
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
    const fetchTodos = flow(function* fetchTodos() {
      self._todos = yield apiFetch('get');
    });

    return {
      fetchTodos,
    };
  })
  .views((self) => {
    const todos = () => {
      if (self.state === 'preloading') {
        self.fetchTodos();
      }

      return self._todos;
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
