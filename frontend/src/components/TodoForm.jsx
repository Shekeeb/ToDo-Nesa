import React, { useState, useEffect } from 'react';

const TodoForm = ({ onSubmit, onCancel, initial, loading, mode }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('pending');
    const [titleError, setTitleError] = useState('');

    useEffect(() => {
        if (initial) {
            setTitle(initial.title || '');
            setDescription(initial.description || '');
            setStatus(initial.status || 'pending');
        }
    }, [initial]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) {
            setTitleError('Title is required');
            return;
        }
        setTitleError('');
        onSubmit({ title: title.trim(), description: description.trim(), status });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Title <span style={{ color: '#e11d48' }}>*</span></label>
                <input type="text" value={title} onChange={(e) => { setTitle(e.target.value); setTitleError(''); }} placeholder="Enter todo title" className={titleError ? 'error-input' : ''} />
                {titleError && <p className="error-text">{titleError}</p>}
            </div>

            <div className="form-group">
                <label>Description <span style={{ color: '#999', fontWeight: 400 }}>(optional)</span></label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter description" />
            </div>

            {mode === 'edit' && (
                <div className="form-group">
                    <label>Status</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
            )}

            <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={onCancel}>
                    Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? (
                        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span className="spinner" style={{ width: 14, height: 14, borderWidth: 2 }} />
                            Saving...
                        </span>
                    ) : mode === 'edit' ? 'Update' : 'Add'}
                </button>
            </div>
        </form>
    );
};

export default TodoForm;