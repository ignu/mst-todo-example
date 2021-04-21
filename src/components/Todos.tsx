import React from 'react';
import { observer } from 'mobx-react-lite'; //
import { useMst } from '../store';
import Todo from './Todo';

const Todos = () => {
  const store = useMst();
  const todos = store.todos();

  if (store.state === 'loading') {
    return (
      <div className="spinner">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
    );
  }

  return (
    <div className="todos">
      <h1>
        Todos {store.state} {todos.length}
      </h1>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default observer(Todos);
