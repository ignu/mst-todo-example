import Todo, { TodoType } from '../todo';

const getTodo = (opts?: Partial<TodoType>) => {
  return Todo.create({
    id: '1',
    description: 'Walk the dog',
    dueDate: '2021-03-21T13:30:00.000Z',
    isComplete: false,
    ...opts,
  });
};

export default getTodo;
