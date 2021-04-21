import { observer } from 'mobx-react-lite';
import React from 'react';
import { IoIosCheckbox, IoMdSquareOutline } from 'react-icons/io';
import { TodoType } from '../store';

type TodoPropTypes = {
  todo: TodoType;
  onToggle: () => void;
};

const Todo = ({ todo, onToggle }: TodoPropTypes) => {
  return (
    <div className={`todo ${todo.state} ${todo.loading ? 'loading' : ''}`}>
      <span className="checkbox-wrapper">
        <a onClick={onToggle} aria-label="toggle">
          {!todo.loading && !todo.isComplete && <IoMdSquareOutline size={24} />}
          {!todo.loading && todo.isComplete && <IoIosCheckbox size={24} />}
        </a>
      </span>
      <span className="description">{todo.description}</span>
      {!!todo.dueDate && (
        <span className="due-date">{todo.dueDate.toLocaleDateString('en-US')}</span>
      )}
    </div>
  );
};

export default observer(Todo);
