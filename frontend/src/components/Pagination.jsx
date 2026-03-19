import React from 'react';

const Pagination = ({ pagination, onPageChange }) => {
    const { page, totalPages, total, limit } = pagination;

    if (totalPages <= 1) return null;

    const from = (page - 1) * limit + 1;
    const to = Math.min(page * limit, total);

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <div className="pagination">
            <span>Showing {from}–{to} of {total}</span>
            <div className="pagination-controls">
                <button className="page-btn" onClick={() => onPageChange(page - 1)} disabled={page === 1}>   ‹ </button>
                {pages.map((p) => (
                    <button key={p} className={`page-btn ${p === page ? 'active' : ''}`} onClick={() => onPageChange(p)}>
                        {p}
                    </button>
                ))}
                <button className="page-btn" onClick={() => onPageChange(page + 1)} disabled={page === totalPages}>
                    ›
                </button>
            </div>
        </div>
    );
};

export default Pagination;