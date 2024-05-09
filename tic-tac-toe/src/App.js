import { useState } from 'react';
import Board from './GameBoard';

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  // handle game info every move
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  // jump to game state
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  //undo last move
  function UndoButton({ squares }) {
    return (
      <button
        onClick={() => jumpTo(currentMove - 1 >= 0 ? currentMove - 1 : 0)}
      >
        Undo
      </button>
    );
  }

  // reset the game
  function ResetButton({ squares }) {
    return <button onClick={() => jumpTo(0)}>Reset</button>;
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Start over';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          currentMove={currentMove}
          onPlay={handlePlay}
        />
      </div>
      <div className="controls">
        <UndoButton />
        <ResetButton />
      </div>
      {/* <div className="game-info">
        <ol>{moves}</ol>
      </div> */}
    </div>
  );
}
