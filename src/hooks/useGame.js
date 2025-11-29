import { useState, useEffect, useCallback } from 'react';
import { checkWinner, getBestMove } from '../utils/gameLogic';

export function useGame() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [gameStatus, setGameStatus] = useState('menu'); // 'menu', 'playing', 'finished'
    const [winner, setWinner] = useState(null); // 'X', 'O', 'Draw'
    const [winningLine, setWinningLine] = useState([]);
    const [gameMode, setGameMode] = useState('pvp'); // 'pvp', 'pvai'
    const [scores, setScores] = useState({ X: 0, O: 0, Draws: 0 });
    const [isAiThinking, setIsAiThinking] = useState(false);

    const resetGame = useCallback(() => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
        setGameStatus('playing');
        setWinner(null);
        setWinningLine([]);
        setIsAiThinking(false);
    }, []);

    const returnToMenu = useCallback(() => {
        setGameStatus('menu');
        setBoard(Array(9).fill(null));
        setWinner(null);
        setWinningLine([]);
        setScores({ X: 0, O: 0, Draws: 0 });
    }, []);

    const updateScore = (result) => {
        setScores(prev => ({
            ...prev,
            [result === 'Draw' ? 'Draws' : result]: prev[result === 'Draw' ? 'Draws' : result] + 1
        }));
    };

    const makeMove = useCallback((index) => {
        if (board[index] || winner) return;

        const newBoard = [...board];
        newBoard[index] = isXNext ? 'X' : 'O';
        setBoard(newBoard);

        const result = checkWinner(newBoard);
        if (result) {
            setWinner(result.winner);
            setWinningLine(result.line);
            setGameStatus('finished');
            updateScore(result.winner);
        } else {
            setIsXNext(!isXNext);
        }
    }, [board, isXNext, winner]);

    // AI Turn Effect
    useEffect(() => {
        if (gameMode === 'pvai' && !isXNext && gameStatus === 'playing' && !winner) {
            setIsAiThinking(true);
            const timer = setTimeout(() => {
                const bestMove = getBestMove([...board], 'O');
                if (bestMove !== -1) {
                    makeMove(bestMove);
                }
                setIsAiThinking(false);
            }, 600); // Artificial delay for realism
            return () => clearTimeout(timer);
        }
    }, [isXNext, gameMode, gameStatus, winner, board, makeMove]);

    return {
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
    };
}
