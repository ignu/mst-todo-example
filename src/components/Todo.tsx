import React from 'react';
import { TodoType } from '../store';

type PropTypes = {
  todo: TodoType;
};

const Todo = ({ todo }: PropTypes) => {
  console.log('🦄 - todo', todo);
  return <div className={`todo ${todo.state}`}>{todo.description}</div>;
};

export default Todo;
