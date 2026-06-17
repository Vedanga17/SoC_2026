import React, { useState } from "react";
import "./App.css";
import diceImage from "./assets/dice_image.jpg"; 

// --- HOME COMPONENT ---
function Home({ startGame }) {
  return (
    <div className="home-container">
      <img 
        src={diceImage} 
        alt="Red Dice" 
        className="home-dice-img" 
      />
      
      <div className="hero-content">
        <h1>Dice Game</h1>
        <p>Roll the dice, test your luck, and score some points!</p>
        <button className="primary-btn" onClick={startGame}>
          Click to play!
        </button>
      </div>
    </div>
  );
}

// --- GAME COMPONENT ---
function Game() {
  // Game State
  const [score, setScore] = useState(0);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [currentDice, setCurrentDice] = useState(1);
  const [error, setError] = useState("");
  const [showRules, setShowRules] = useState(false);

  // Statistics State
  const [stats, setStats] = useState({ rolls: 0, correct: 0, wrong: 0 });
  
  // Leaderboard State (Array to store past sessions)
  const [leaderboard, setLeaderboard] = useState([]);

  // Mapping dice faces to their corresponding numbers
  const diceFaces = ["", "⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
  const numbers = [1, 2, 3, 4, 5, 6];

  const handleNumberSelect = (value) => {
    setSelectedNumber(value);
    setError("");  // on selecting the number, the error goes away.
  };

  const rollDice = () => {
    if (!selectedNumber) {
      setError("You have not selected any number, select one!"); // forces the user to select a number
      return;
    }

    const randomRoll = Math.floor(Math.random() * 6) + 1; // randomizing the roll
    setCurrentDice(randomRoll);

    const isCorrect = selectedNumber === randomRoll;

    // Update Score according to rules
    if (isCorrect) {
      setScore((prev) => prev + selectedNumber);
    } else {
      setScore((prev) => prev - 2);
    }

    // Update Live Statistics
    setStats((prevStats) => ({
      rolls: prevStats.rolls + 1,
      correct: isCorrect ? prevStats.correct + 1 : prevStats.correct,
      wrong: isCorrect ? prevStats.wrong : prevStats.wrong + 1,
    }));

    setSelectedNumber(null); // Have to select a new number everytime
  };

  // Save the current session and reset the board
  const saveAndResetGame = () => {
    if (stats.rolls === 0) return; // Don't save empty games

    // Calculate accuracy safely (avoiding dividing by zero)
    const accuracy = ((stats.correct / stats.rolls) * 100).toFixed(1);

    const newSession = {
      id: Date.now(), // Creates a unique ID based on the current time
      finalScore: score,
      totalRolls: stats.rolls,
      accuracy: accuracy,
    };

    // Creates a new array with all old sessions and the new session
    const updatedLeaderboard = [...leaderboard, newSession];

    // Have to sort the array so that the highest finalScore is at the top
    updatedLeaderboard.sort((a, b) => b.finalScore - a.finalScore);

    // Save the sorted array to React State
    setLeaderboard(updatedLeaderboard);

    // Reset the current game board
    setScore(0);
    setStats({ rolls: 0, correct: 0, wrong: 0 });
    setSelectedNumber(null);
    setCurrentDice(1);
  };

  // Calculate current live accuracy
  const liveAccuracy = stats.rolls > 0 ? ((stats.correct / stats.rolls) * 100).toFixed(1) : 0;

  return (
    <div className="game-container">
      
      <header className="game-header">
        <div className="score-box">
          <h2>{score}</h2>
          <p>Total Score</p>
        </div>

        <div className="number-selector">
          <p className="error-text">{error}</p>
          <div className="boxes">
            {numbers.map((num) => (
              <div
                key={num}
                className={`number-box ${selectedNumber === num ? "selected" : ""}`}
                onClick={() => handleNumberSelect(num)}
              >
                {num}
              </div>
            ))}
          </div>
          <p>Select Number</p>
        </div>
      </header>

      <main className="play-area">
        <div className="dice-container" onClick={rollDice}>
          <div className="dice">{diceFaces[currentDice]}</div>
          <p>Click on Dice to roll</p>
        </div>

        <div className="controls">
          <button className="secondary-btn" onClick={saveAndResetGame}>
            End Game and save your score
          </button>
          <button 
            className="secondary-btn dark" 
            onClick={() => setShowRules(!showRules)}
          >
            {showRules ? "Hide Rules" : "Show Rules"} 
          </button> 
        </div>

        {showRules && (
          <div className="rules-box">
            <h3>How to play dice game?</h3>
            <ul>
              <li>Select any number from 1 to 6.</li>
              <li>Click on the dice image to roll it.</li>
              <li>If the selected number matches the dice roll, you score points.</li>
              <li>If your guess is wrong, 2 points are deducted.</li>
            </ul>
          </div>
        )}

        {/*Data & History Section */}
        <div className="dashboard-container">
          
          {/* Live Statistics Card */}
          <div className="stats-card">
            <h3>Live Statistics</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-value">{stats.rolls}</span>
                <span className="stat-label">Total Rolls</span>
              </div>
              <div className="stat-item">
                <span className="stat-value text-green">{stats.correct}</span>
                <span className="stat-label">Correct</span>
              </div>
              <div className="stat-item">
                <span className="stat-value text-red">{stats.wrong}</span>
                <span className="stat-label">Wrong</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{liveAccuracy}%</span>
                <span className="stat-label">Accuracy</span>
              </div>
            </div>
          </div>

          {/* Leaderboard Card */}
          <div className="leaderboard-card">
            <h3>Session Leaderboard</h3>
            {leaderboard.length === 0 ? (
              <p className="empty-msg">No sessions saved yet. End a game to save your score!</p>
            ) : (
              <ul className="session-list">
                {leaderboard.map((session, index) => (
                  <li key={session.id} className="session-item">
                    <div className="session-rank">#{index + 1}</div>
                    <div className="session-details">
                      <strong>Score: {session.finalScore}</strong>
                      <span>({session.totalRolls} rolls | {session.accuracy}% accuracy)</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}

export default function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);

  return (
    <div className="app">
      {isGameStarted ? <Game /> : <Home startGame={() => setIsGameStarted(true)} />}
    </div>
  );
}