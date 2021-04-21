import React from 'react';
import { TodoType } from '../store';

type PropTypes = {
  todo: TodoType;
};

const Todo = ({ todo }: PropTypes) => {
  console.log('🦄 - todo', todo);
  return (
    <div className={`todo ${todo.state}`}>
      <span className="checkbox-wrapper">
        <input type="checkbox" checked={todo.isComplete}></input>
      </span>
      <span className="description">{todo.description}</span>
      {!!todo.dueDate && (
        <span className="due-date">{todo.dueDate.toLocaleDateString('en-US')}</span>
      )}
    </div>
  );
};

export default Todo;
