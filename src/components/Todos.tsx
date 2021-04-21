import React from 'react';
import { observer } from 'mobx-react-lite'; //
import { useMst } from '../store';
import Todo from './Todo';
import Error from './Error';
import Spinner from './Spinner';

const Todos = () => {
  const store = useMst();
  const todos = store.todos();

  if (store.state === 'loading') return <Spinner />;
  if (store.state === 'error') return <Error />;

  return (
    <div className="todos">
      <h1>
        Todos {store.state} {todos.length}
      </h1>
      {todos.map((todo) => (
        <Todo onToggle={() => store.toggle(todo)} key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default observer(Todos);
