import { addHours } from 'date-fns';
import getTodo from './getTodo';
import Store from '../index';

describe('Todo Store', () => {
  it('can return an array of todos', () => {
    const store = Store.create({ state: 'complete', _todos: [getTodo({ description: 'cool' })] });
    expect(store._todos[0].description).toEqual('cool');
  });

  it('sorts todos', () => {
    const overdue = getTodo({ id: '2', dueDate: addHours(new Date(), -1) });
    const overdueComplete = getTodo({
      id: '3',
      isComplete: true,
      dueDate: addHours(new Date(), -1),
    });
    const futureComplete = getTodo({
      id: '4',
      isComplete: true,
      dueDate: addHours(new Date(), 1),
    });
    const pending = getTodo({
      id: '4',
      dueDate: addHours(new Date(), 3),
    });
    const pendingNextWeek = getTodo({
      id: '5',
      dueDate: addHours(new Date(), 200),
    });
    const pendingUndated = getTodo({
      id: '6',
      dueDate: null,
    });

    const store = Store.create({
      state: 'complete',
      _todos: [pending, overdueComplete, futureComplete, pendingNextWeek, overdue, pendingUndated],
    });

    expect(store.todos()).toEqual([
      overdue,
      pending,
      pendingNextWeek,
      pendingUndated,
      overdueComplete,
      futureComplete,
    ]);
  });
});
