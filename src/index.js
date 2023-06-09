import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import TodoList from './TodoList';
import "./index.css";

const store = createStore(rootReducer);

render(
  <Provider store={store}>
    <TodoList />
  </Provider>,
  document.getElementById('root')
);

