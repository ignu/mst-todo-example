import React from 'react';
import { TodoType, useMst } from '../store';
import Todo from './Todo';

const Todos = () => {
  const store = useMst();
  const todos = store.todos();

  if (store.state === 'loading') {
    return <h1>Loading</h1>;
  }

  return (
    <div className="todos">
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default Todos;
