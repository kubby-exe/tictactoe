import React from 'react';

const Menu = ({ onStart }) => {
    return (
        <div className="glass-panel animate-fade" style={{ padding: '3rem' }}>
            <h1>TIC TAC TOE</h1>
            <p className="subtitle">Choose your game mode</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <button className="btn-primary" onClick={() => onStart('pvp')}>
                    Player vs Player
                </button>
                <button className="btn-secondary" onClick={() => onStart('pvai')}>
                    Player vs AI
                </button>
            </div>
        </div>
    );
};

export default Menu;
