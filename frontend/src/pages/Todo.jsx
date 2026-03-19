import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import TodoCard from '../components/TodoCard';
import TodoForm from '../components/TodoForm';
import Pagination from '../components/Pagination';

const API = 'http://localhost:5000/api/todos';

const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);
    const [pagination, setPagination] = useState({
        page: 1, limit: 5, total: 0, totalPages: 1,
    });

    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const [selectedTodo, setSelectedTodo] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    //List the itesm
    const fetchTodos = async (page = 1) => {
        setLoading(true);
        try {
            const res = await axios.get(`${API}?page=${page}&limit=${pagination.limit}`);
            setTodos(res.data.data);
            setPagination((prev) => ({ ...prev, ...res.data.pagination, page }));
        } catch (err) {
            toast.error('Failed to fetch todos');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTodos(1);
    }, []);

    // Add item
    const handleCreate = async (data) => {
        setActionLoading(true);
        try {
            await axios.post(`${API}/create`, data);
            toast.success('Todo created!');
            setShowModal(false);
            fetchTodos(1);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to create todo');
        } finally {
            setActionLoading(false);
        }
    };

    // Update item
    const handleUpdate = async (data) => {
        setActionLoading(true);
        try {
            await axios.put(`${API}/edit/${selectedTodo._id}`, data);
            toast.success('Todo updated!');
            setShowModal(false);
            setSelectedTodo(null);
            fetchTodos(pagination.page);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to update todo');
        } finally {
            setActionLoading(false);
        }
    };

    // Delete item
    const handleDeleteConfirm = async () => {
        setActionLoading(true);
        try {
            await axios.delete(`${API}/delete/${deleteId}`);
            toast.success('Todo deleted!');
            setShowDeleteModal(false);
            setDeleteId(null);
            const newPage = todos.length === 1 && pagination.page > 1 ? pagination.page - 1 : pagination.page;
            fetchTodos(newPage);
        } catch (err) {
            toast.error('Failed to delete todo');
        } finally {
            setActionLoading(false);
        }
    };

    const openCreateModal = () => {
        setSelectedTodo(null);
        setModalMode('create');
        setShowModal(true);
    };

    const handleEdit = (todo) => {
        setSelectedTodo(todo);
        setModalMode('edit');
        setShowModal(true);
    };

    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setShowDeleteModal(true);
    };

    return (
        <div className="app">
            <div className="header">
                <h1>Todo App</h1>
                <button className="btn-primary" onClick={openCreateModal}>+ Add Todo</button>
            </div>

            <div className="main-content">
                <div className="todo-list">
                    {loading ? (
                        <div className="loader-wrapper">
                            <div className="spinner" />
                            <p>Loading todos...</p>
                        </div>
                    ) : todos.length === 0 ? (
                        <div className="empty-state">
                            <p>No todos yet. Click "+ Add Todo" to get started!</p>
                        </div>
                    ) : (
                        <>
                            {todos.map((todo) => (
                                <TodoCard key={todo._id} todo={todo} onEdit={handleEdit} onDelete={handleDeleteClick} actionLoading={actionLoading} />
                            ))}
                            <Pagination pagination={pagination} onPageChange={fetchTodos} />
                        </>
                    )}
                </div>
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{modalMode === 'create' ? 'Add Todo' : 'Edit Todo'}</h2>
                            <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
                        </div>
                        <TodoForm mode={modalMode} initial={selectedTodo} onSubmit={modalMode === 'create' ? handleCreate : handleUpdate} onCancel={() => setShowModal(false)} loading={actionLoading} />
                    </div>
                </div>
            )}

            {showDeleteModal && (
                <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Delete Todo</h2>
                            <button className="modal-close" onClick={() => setShowDeleteModal(false)}>✕</button>
                        </div>
                        <p style={{ fontSize: 14, color: '#666', marginBottom: 24 }}>
                            Are you sure you want to delete this todo?
                        </p>
                        <div className="form-actions">
                            <button className="btn-cancel" onClick={() => setShowDeleteModal(false)}>
                                Cancel
                            </button>
                            <button className="btn-delete" onClick={handleDeleteConfirm} disabled={actionLoading} style={{ padding: '7px 18px' }} >
                                {actionLoading ? (
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <span className="spinner" style={{ width: 14, height: 14, borderWidth: 2 }} />
                                        Deleting...
                                    </span>
                                ) : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Todo;