import React from 'react';

const TodoCard = ({ todo, onEdit, onDelete, actionLoading }) => {
  return (
    <div className="todo-card">
      <div className="todo-left">
        <div className="todo-title">{todo.title}</div>
        {todo.description && (
          <div className="todo-description">{todo.description}</div>
        )}
        <span className={`badge ${todo.status}`}>
          {todo.status === 'in-progress' ? 'In Progress' : todo.status.charAt(0).toUpperCase() + todo.status.slice(1)}
        </span>
      </div>
      <div className="action-btns">
        <button className="btn-edit" onClick={() => onEdit(todo)}  disabled={actionLoading} >
          Edit
        </button>
        <button className="btn-delete" onClick={() => onDelete(todo._id)}  disabled={actionLoading} >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoCard;