import React, { useState, useEffect } from 'react';
import Starfield from './Starfield'; // Import our new component

// --- Audio objects for sound effects ---
const placeSound = new Audio('/sounds/place.wav');
const winSound = new Audio('/sounds/win.wav');

function Square({ value, onSquareClick, isWinning }) {
  const className = `square ${isWinning ? 'winning' : ''}`;
  return (
    <button className={className} onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo ? winnerInfo.winner : null;

  useEffect(() => {
    if (winner) {
      winSound.play();
    }
  }, [winner]);

  function handleClick(i) {
    if (squares[i] || winner) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    placeSound.play();
    onPlay(nextSquares);
  }

  let status;
  if (winner) {
    status = `PLAYER ${winner} WINS!`;
  } else if (squares.every(Boolean)) {
    status = 'DRAW GAME';
  } else {
    status = `PLAYER ${xIsNext ? 'X' : 'O'}'S TURN`;
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board">
        {squares.map((value, i) => (
          <Square
            key={i}
            value={value}
            onSquareClick={() => handleClick(i)}
            isWinning={winnerInfo && winnerInfo.line.includes(i)}
          />
        ))}
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }
  
  return (
    <>
      {/* Render the animated background */}
      <Starfield /> 
      
      {/* The main game container */}
      <div className="game">
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
        <div className="game-info">
          <h3>MOVE HISTORY</h3>
          <ol>
            {history.map((_squares, move) => (
              <li key={move}>
                <button onClick={() => jumpTo(move)}>
                  {move === 0 ? 'RESTART GAME' : `GO TO MOVE #${move}`}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}

// Helper function to determine the winner (no changes needed here)
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
}