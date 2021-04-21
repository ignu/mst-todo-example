import { isPast } from 'date-fns';
import { Instance, types } from 'mobx-state-tree';
import { DateTime } from './DateType';

export type TodoState = 'complete' | 'overdue' | 'pending' | 'loading';

const Todo = types
  .model({
    id: types.identifier,
    description: types.string,
    dueDate: types.maybeNull(DateTime),
    isComplete: types.boolean,
    loading: types.optional(types.boolean, false),
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
      self.loading = false;
      self.isComplete = !self.isComplete;
    };
    const startToggle = () => {
      self.loading = true;
    };
    return {
      toggle,
      startToggle,
    };
  });

export default Todo;
export type TodoType = Instance<typeof Todo>;
