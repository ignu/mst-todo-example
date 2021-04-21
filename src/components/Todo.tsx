import React from 'react';
import { TodoType } from '../store';
import { IoIosCheckbox, IoMdSquareOutline } from 'react-icons/io';

type PropTypes = {
  todo: TodoType;
};

const Todo = ({ todo }: PropTypes) => {
  console.log('🦄 - todo', todo);
  return (
    <div className={`todo ${todo.state}`}>
      <span className="checkbox-wrapper">
        {!todo.isComplete && <IoMdSquareOutline />}
        {todo.isComplete && <IoIosCheckbox />}
      </span>
      <span className="description">{todo.description}</span>
      {!!todo.dueDate && (
        <span className="due-date">{todo.dueDate.toLocaleDateString('en-US')}</span>
      )}
    </div>
  );
};

export default Todo;
