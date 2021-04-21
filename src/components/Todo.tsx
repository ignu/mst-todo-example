import React from 'react';
import { TodoType } from '../store';
import { IoIosCheckbox, IoMdSquareOutline } from 'react-icons/io';

type TodoPropTypes = {
  todo: TodoType;
  onToggle: () => void;
};

const Todo = ({ todo, onToggle }: TodoPropTypes) => {
  return (
    <div className={`todo ${todo.state}`}>
      <span className="checkbox-wrapper">
        <a onClick={onToggle} aria-label="toggle">
          {!todo.isComplete && <IoMdSquareOutline size={24} />}
          {todo.isComplete && <IoIosCheckbox size={24} />}
        </a>
      </span>
      <span className="description">{todo.description}</span>
      {!!todo.dueDate && (
        <span className="due-date">{todo.dueDate.toLocaleDateString('en-US')}</span>
      )}
    </div>
  );
};

export default Todo;
