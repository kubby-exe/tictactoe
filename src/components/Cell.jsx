import React from 'react';

const Cell = ({ value, onClick, isWinning, disabled }) => {
    return (
        <button
            className={`cell ${value ? value.toLowerCase() : ''} ${isWinning ? 'winner' : ''}`}
            onClick={onClick}
            disabled={disabled}
        >
            {value && <span className="animate-pop">{value}</span>}
        </button>
    );
};

export default Cell;
