import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Todo from './pages/Todo';
import './assets/style.css';

function App() {
  return (
    <>
      <Todo />
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App;