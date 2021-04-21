import { types, Instance, flow, getSnapshot } from 'mobx-state-tree';

const URI_BASE = 'https://944ba3c5-94c3-4369-a9e6-a509d65912e2.mock.pstmn.io/';
const apiFetch = (path: string, opts?: Partial<RequestInit>) => {
  return fetch(`URI_BASE${path}`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': 'PMAK-5ef63db179d23c004de50751-10300736bc550d2a891dc4355aab8d7a5c',
      ...(opts?.headers || {}),
    },
    ...opts,
  }).then((x) => x.json());
};

export const Todo = types.model({
  id: types.identifierNumber,
  description: types.string,
  dueDate: types.maybe(types.string),
  isComplete: types.boolean,
});

const TodoStore = types
  .model({
    _todos: types.optional(types.array(Todo), []),
    state: types.optional(
      types.enumeration(['preloading', 'loading', 'complete', 'error']),
      'preloading'
    ),
  })
  .views((self) => {
    const fetchTodos = flow(function* fetchTodos() {
      self._todos = yield apiFetch('get');
    });

    const todos = () => {
      if (self.state === 'preloading') {
        fetchTodos();
      }

      return self._todos;
    };
    return {
      todos,
    };
  });

export default TodoStore;
export type TodoType = Instance<typeof Todo>;
