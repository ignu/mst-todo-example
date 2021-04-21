import React from 'react';
import { TodoType } from '../store';

type PropTypes = {
  todo: TodoType;
};

const Todo = ({ todo }: PropTypes) => {
  console.log('🦄 - todo', todo);
  return (
    <div className={`todo ${todo.state}`}>
      <h1>{todo.description}</h1>
    </div>
  );
};

export default Todo;
