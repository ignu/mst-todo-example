import Store, { Todo, TodoType } from './index';

const getTodo = (opts?: Partial<TodoType>) => {
  return Todo.create({
    id: 1,
    description: 'Walk the dog',
    dueDate: '2021-03-21T13:30:00.000Z',
    isComplete: false,
    ...opts,
  });
};

describe('Todo Store', () => {
  test('can return an array of todos', () => {
    const store = Store.create({ state: 'complete', _todos: [getTodo({ description: 'cool' })] });
    expect(store._todos[0].description).toEqual('cool');
  });
});
