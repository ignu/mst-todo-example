import { addHours } from 'date-fns';
import Store, { Todo, TodoType } from './index';

const getTodo = (opts?: Partial<TodoType>) => {
  return Todo.create({
    id: '1',
    description: 'Walk the dog',
    dueDate: '2021-03-21T13:30:00.000Z',
    isComplete: false,
    ...opts,
  });
};

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

describe('Todo Store', () => {
  test('can return an array of todos', () => {
    const store = Store.create({ state: 'complete', _todos: [getTodo({ description: 'cool' })] });
    expect(store._todos[0].description).toEqual('cool');
  });
});
