import React from 'react';
import { useGame } from './hooks/useGame';
import Board from './components/Board';
import Menu from './components/Menu';
import GameOverModal from './components/GameOverModal';

function App() {
  const {
    board,
    isXNext,
    gameStatus,
    winner,
    winningLine,
    gameMode,
    scores,
    setGameMode,
    resetGame,
    returnToMenu,
    makeMove,
    isAiThinking
  } = useGame();

  const handleStartGame = (mode) => {
    setGameMode(mode);
    resetGame();
  };

  if (gameStatus === 'menu') {
    return (
      <>
        <Menu onStart={handleStartGame} />
        <div className="footer">Created by Kubby</div>
      </>
    );
  }

  return (
    <div className="animate-fade">
      <div className="status-bar glass-panel">
        <div className={`player-badge ${isXNext ? 'active' : ''}`}>
          <span style={{ color: 'var(--primary-x)', fontWeight: 900 }}>X</span>
          <span className="score">{scores.X}</span>
        </div>

        <div style={{ color: '#64748b', fontWeight: 600 }}>
          {isAiThinking ? 'AI Thinking...' : (winner ? 'GAME OVER' : 'VS')}
        </div>

        <div className={`player-badge ${!isXNext ? 'active' : ''}`}>
          <span className="score">{scores.O}</span>
          <span style={{ color: 'var(--primary-o)', fontWeight: 900 }}>O</span>
        </div>
      </div>

      <Board
        board={board}
        onCellClick={makeMove}
        winningLine={winningLine}
        disabled={isAiThinking}
      />

      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <button className="btn-secondary" onClick={resetGame}>
          Reset Board
        </button>
        <button className="btn-secondary" onClick={returnToMenu}>
          Main Menu
        </button>
      </div>

      {gameStatus === 'finished' && (
        <GameOverModal
          winner={winner}
          onRestart={resetGame}
          onMenu={returnToMenu}
        />
      )}

      <div className="footer">Created by Kubby</div>
    </div>
  );
}

export default App;
