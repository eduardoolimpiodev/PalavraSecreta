import { useState, useRef } from 'react';
import './Game.css';

const Game = ({ checkLetter, gameSettings }) => {

  const [inputLetter, setInputLetter] = useState("");
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    checkLetter(inputLetter);

    setInputLetter("");
    inputRef.current.focus();
  }

  return (
    <>
      <div className="game">

        <p className="score">
          Score: <span>{gameSettings.score}</span>
        </p>

        <h2>Guess the word!</h2>

        <h3 className="tip">
          Word tip: <span>{gameSettings.chosenTopic.replace("_", " ")}</span>
        </h3>

        <div className="remainingGuesses">
          Remaining guesses: <span>{gameSettings.remainingGuesses}</span>
        </div>

        <div className="wordContainer">
          {
            gameSettings.letters.map((letter, index) => (
              gameSettings.guessedLetters.includes(letter)
              ?
              <span key={index} className="letter">{letter}</span>
              :
              <span key={index} className="square"></span>
            ))
          }
        </div>

        <div className="letterContainer">
          <p>Try to guess a letter:</p>
          <form onSubmit={handleSubmit}>
            <input type="text" name='letter' maxLength={1} required onChange={(e) => setInputLetter(e.target.value.toUpperCase())} value={inputLetter} autoComplete="off" ref={inputRef} />
            <button className="defaultAppButton">Guess</button>
          </form>
        </div>

        <div className="alreadyTriedContainer">
          <p>Already tried:</p>
          {
            gameSettings.guessedLetters.map((letter, index) => (
              <span key={index}>{letter} {(index != (gameSettings.guessedLetters.length - 1)) ? "-" : ""} </span>
            ))
          }
        </div>

      </div>
    </>
  )
}

export default Game