import React from 'react';
import './App.css';
import Todos from './components/Todos';
import { Provider, todoStore } from './store';

function App() {
  return (
    <Provider value={todoStore}>
      <div className="App">
        <Todos />
      </div>
    </Provider>
  );
}

export default App;
