import React, { useState } from "react";
import "./App.css";

function Square({ value, onClick, highlight }) {
  return (
    <button
      className={`square ${highlight ? "highlight" : ""} ${value ? "filled" : ""}`}
      onClick={onClick}
    >
      {value && <span className="symbol">{value}</span>}
    </button>
  );
}

function Board({ squares, handleClick, winningLine }) {
  return (
    <div className="board">
      {squares.map((square, i) => (
        <Square
          key={i}
          value={square}
          onClick={() => handleClick(i)}
          highlight={winningLine?.includes(i)}
        />
      ))}
    </div>
  );
}

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [score, setScore] = useState({ X: 0, O: 0, Tie: 0 });

  const { winner, line } = calculateWinner(squares);

  function handleClick(i) {
    if (squares[i] || winner) return;

    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  function resetScore() {
    setScore({ X: 0, O: 0, Tie: 0 });
    resetGame();
  }

  let status;
  if (winner) {
    status = `Winner: ${winner}!`;
    setTimeout(() => {
      setScore(prev => ({ ...prev, [winner]: prev[winner] + 1 }));
      resetGame();
    }, 1500);
  } else if (!squares.includes(null)) {
    status = "It's a Tie!";
    setTimeout(() => {
      setScore(prev => ({ ...prev, Tie: prev.Tie + 1 }));
      resetGame();
    }, 1500);
  } else {
    status = `Next Player: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>
      <Board squares={squares} handleClick={handleClick} winningLine={line} />
      <div className="status">{status}</div>
      <div className="scoreboard">
        <span>X: {score.X}</span>
        <span>O: {score.O}</span>
        <span>Ties: {score.Tie}</span>
      </div>
      <div className="buttons">
        <button className="reset-btn" onClick={resetGame}>
          Reset Board
        </button>
        <button className="reset-btn" onClick={resetScore}>
          Reset Score
        </button>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return { winner: null, line: [] };
}

export default App;
