
export const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function checkWinner(board) {
  for (let combo of WINNING_COMBINATIONS) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: combo };
    }
  }
  if (board.every((cell) => cell !== null)) {
    return { winner: 'Draw', line: [] };
  }
  return null;
}

export function getBestMove(board, player) {
  const opponent = player === 'X' ? 'O' : 'X';
  
  // Minimax algorithm
  function minimax(currentBoard, depth, isMaximizing) {
    const result = checkWinner(currentBoard);
    if (result) {
      if (result.winner === player) return 10 - depth;
      if (result.winner === opponent) return depth - 10;
      return 0;
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (currentBoard[i] === null) {
          currentBoard[i] = player;
          const score = minimax(currentBoard, depth + 1, false);
          currentBoard[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (currentBoard[i] === null) {
          currentBoard[i] = opponent;
          const score = minimax(currentBoard, depth + 1, true);
          currentBoard[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  }

  let bestScore = -Infinity;
  let move = -1;

  // If it's the very first move of the game, pick center or corner for efficiency
  // (Optimization to prevent lag on first move if AI goes first)
  const emptySpots = board.filter(c => c === null).length;
  if (emptySpots === 9) return 4; // Center
  if (emptySpots === 8 && board[4] === null) return 4; // Take center if available

  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      board[i] = player;
      const score = minimax(board, 0, false);
      board[i] = null;
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
}
