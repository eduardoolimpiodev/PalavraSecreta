// CSS imports
import './App.css';

// React imports
import { useState, useCallback, useEffect } from 'react';

// Data imports
import { words } from './data/words';

// Components imports
import StartMenu from './components/StartMenu';
import Game from './components/Game';
import GameOver from './components/GameOver';
import Footer from './components/Footer';

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" }
];

const TOTAL_GUESSES = 3;
const LETTER_PRIZE = 100;
const WORD_PRIZE = 1000;

function App() {

  const [currentStage, setCurrentStage] = useState(stages[0].name);

  const [chosenWord, setChosenWord] = useState("");
  const [chosenTopic, setChosenTopic] = useState("");
  const [letters, setLetters] = useState("");

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [rightLetters, setRightLetters] = useState(["a"]);
  const [remainingGuesses, setRemainingGuesses] = useState(TOTAL_GUESSES);
  const [score, setScore] = useState(0);

  const pickRandomCategoryAndWord = useCallback(() => {
    let categories = Object.keys(words);

    let category = categories[Math.floor(Math.random() * categories.length)];

    let word = words[category][Math.floor(Math.random() * words[category].length)];

    return {
      category,
      word
    };
  }, []);

  const startGame = useCallback(() => {

    clearLetterStates();

    const { category, word } = pickRandomCategoryAndWord();

    let wordLetters = word.toUpperCase().split("");

    setChosenTopic(category);
    setChosenWord(word);
    setLetters(wordLetters);

    setCurrentStage(stages[1].name);
  }, [pickRandomCategoryAndWord]);

  const checkLetter = (letter) => {
    
    if(guessedLetters.includes(letter)) {
      return;
    }

    setGuessedLetters((actualGuessedLetters) => [
      ...actualGuessedLetters, letter
    ])

    if(letters.includes(letter)) {
      setScore(score + LETTER_PRIZE);

      setRightLetters((actualRightLetters) => [
        ...actualRightLetters,
        letter
      ])

    } else {
      setRemainingGuesses(remainingGuesses - 1);

      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        letter
      ]);
    }

  };

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
    setRightLetters([]);
  };

  useEffect(() => {
    if(remainingGuesses <= 0) {
      clearLetterStates();

      setCurrentStage(stages[2].name);
    }
  }, [remainingGuesses]);

  useEffect(() => {

    const uniqueLetters = [...new Set(letters)];

    if(rightLetters.length === uniqueLetters.length) {
      setScore(score + WORD_PRIZE);
      startGame();
    }

  }, [guessedLetters, letters, rightLetters.length, score, startGame]);

  const retry = () => {
    setScore(0);
    setRemainingGuesses(TOTAL_GUESSES);

    setCurrentStage(stages[0].name);
  };

  return (
    <div className="App">
      {currentStage === stages[0].name && <StartMenu startGame={startGame} />}
      {currentStage === stages[1].name && <Game checkLetter={checkLetter} gameSettings={
        {
          chosenTopic: chosenTopic, 
          chosenWord: chosenWord,
          letters: letters,
          guessedLetters: guessedLetters,
          wrongLetters: wrongLetters,
          rightLetters: rightLetters,
          remainingGuesses: remainingGuesses,
          score: score
        }
      } />}
      {currentStage === stages[2].name && <GameOver retry={retry} score={score} />}
      <Footer />
    </div>
  );
}

export default App;
