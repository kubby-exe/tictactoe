import React from 'react';
import Cell from './Cell';

const Board = ({ board, onCellClick, winningLine, disabled }) => {
    return (
        <div className="board-grid">
            {board.map((value, index) => (
                <Cell
                    key={index}
                    value={value}
                    onClick={() => onCellClick(index)}
                    isWinning={winningLine.includes(index)}
                    disabled={disabled || value !== null}
                />
            ))}
        </div>
    );
};

export default Board;
