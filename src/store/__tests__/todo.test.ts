import { addHours } from 'date-fns';
import getTodo from './getTodo';

describe('Todo', () => {
  describe('state', () => {
    describe('when isComplete is false', () => {
      it('is pending when due date is in the future', () => {
        const todo = getTodo({ dueDate: addHours(new Date(), 1) });
        expect(todo.state).toEqual('pending');
      });

      it('is pending when due date is null', () => {
        const todo = getTodo({ dueDate: null });
        expect(todo.dueDate).toBeNull();
        expect(todo.state).toEqual('pending');
      });

      it('is overdue when due date is in the past', () => {
        const todo = getTodo({ dueDate: addHours(new Date(), -1) });
        expect(todo.state).toEqual('overdue');
      });
    });

    describe('when isComplete is true', () => {
      it('is complete', () => {
        const todo = getTodo({ isComplete: true });
        expect(todo.state).toEqual('complete');
      });
    });
  });
});
