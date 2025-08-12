import React, { useState, useEffect } from 'react';
import Starfield from './Starfield';

// --- Sound Effects ---
const placeSound = new Audio('/sounds/place.wav');
const winSound = new Audio('/sounds/win.wav');

// --- Funny Win Messages ---
const winMessages = [
  "{winnerName}, you're a Tic-Tac-Titan!",
  "SYSTEM OVERLOAD! {winnerName} WINS!",
  "Victory for {winnerName}! The Matrix is broken.",
  "{winnerName}, you've got the magic touch. Well played!",
  "CRITICAL HIT! Well done, {winnerName}."
];

// --- Game Components ---

function Square({ value, onSquareClick, isWinning }) {
  const className = `square ${isWinning ? 'winning' : ''}`;
  return (
    <button className={className} onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ squares, onPlay, xIsNext }) {
  const winnerInfo = calculateWinner(squares);

  function handleClick(i) {
    if (winnerInfo || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    placeSound.play();
    onPlay(nextSquares);
  }

  return (
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
  );
}

function Game({ playerNames, onRestart }) {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const winnerInfo = calculateWinner(currentSquares);

  // Effect to play the win sound
  useEffect(() => {
    if (winnerInfo) {
      winSound.play();
    }
  }, [winnerInfo]);

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  let status;
  if (winnerInfo) {
    const winnerName = winnerInfo.winner === 'X' ? playerNames.X : playerNames.O;
    const randomMessage = winMessages[Math.floor(Math.random() * winMessages.length)];
    status = randomMessage.replace('{winnerName}', winnerName);
  } else if (currentSquares.every(Boolean)) {
    status = 'DRAW GAME';
  } else {
    const nextPlayerName = xIsNext ? playerNames.X : playerNames.O;
    status = `PLAYER: ${nextPlayerName}'S TURN`;
  }

  return (
    <div className="game">
      <div className="game-board">
        <div className="status">{status}</div>
        <Board squares={currentSquares} onPlay={handlePlay} xIsNext={xIsNext} />
      </div>
      <div className="game-info">
        <button className="new-game-button" onClick={onRestart}>NEW GAME</button>
        <h3>MOVE HISTORY</h3>
        <ol>
          {history.map((_squares, move) => (
            <li key={move}>
              <button onClick={() => jumpTo(move)}>
                {move === 0 ? 'GO TO GAME START' : `GO TO MOVE #${move}`}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function GameSetup({ onGameStart }) {
  const [playerX, setPlayerX] = useState('');
  const [playerO, setPlayerO] = useState('');

  const handleStart = () => {
    onGameStart({
      X: playerX || 'Player X',
      O: playerO || 'Player O',
    });
  };

  return (
    <div className="setup-container">
      <h1>RETRO TIC-TAC-TOE</h1>
      <div className="player-inputs">
        <input
          type="text"
          placeholder="Enter Player X Name"
          value={playerX}
          onChange={(e) => setPlayerX(e.target.value)}
          maxLength="12"
        />
        <input
          type="text"
          placeholder="Enter Player O Name"
          value={playerO}
          onChange={(e) => setPlayerO(e.target.value)}
          maxLength="12"
        />
      </div>
      <button className="start-button" onClick={handleStart}>START GAME</button>
    </div>
  );
}

export default function App() {
  const [gameState, setGameState] = useState('setup'); // 'setup' or 'playing'
  const [playerNames, setPlayerNames] = useState({ X: 'Player X', O: 'Player O' });
  
  const currentSquares = gameState === 'playing' ? [] : null; // A placeholder to check winner
  const winnerInfo = calculateWinner(currentSquares || []);

  const handleGameStart = (names) => {
    setPlayerNames(names);
    setGameState('playing');
  };

  const handleRestart = () => {
    setGameState('setup');
  };
  
  // Add a 'glitch-active' class to the main container when there is a winner
  const appContainerClass = `app-container ${winnerInfo ? 'glitch-active' : ''}`;

  return (
    <div className={appContainerClass}>
      <Starfield />
      {gameState === 'setup' ? (
        <GameSetup onGameStart={handleGameStart} />
      ) : (
        <Game playerNames={playerNames} onRestart={handleRestart} />
      )}
    </div>
  );
}

// Helper function to determine the winner
function calculateWinner(squares) {
  if (!squares) return null; // Add a check for null squares
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