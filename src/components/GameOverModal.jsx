import React from 'react';

const GameOverModal = ({ winner, onRestart, onMenu }) => {
    return (
        <div className="modal-overlay animate-fade">
            <div className="glass-panel modal-content">
                <p style={{ color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '2px' }}>
                    Game Over
                </p>

                {winner === 'Draw' ? (
                    <h2 className="winner-text" style={{ color: '#e2e8f0' }}>DRAW!</h2>
                ) : (
                    <h2 className="winner-text" style={{
                        color: winner === 'X' ? 'var(--primary-x)' : 'var(--primary-o)'
                    }}>
                        {winner} WINS!
                    </h2>
                )}

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
                    <button className="btn-primary" onClick={onRestart}>
                        Play Again
                    </button>
                    <button className="btn-secondary" onClick={onMenu}>
                        Menu
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GameOverModal;
