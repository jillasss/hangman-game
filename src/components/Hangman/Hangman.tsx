import React, { useState, useEffect } from "react";
import Letters from "../Letters/Letters";
import KeyboardInput from "../Keyboard/KeyboardInput";
import ManDrawing from "../ManDrawing/ManDrawing";

import "./styles/Hangman.scss";

const Hangman: React.FC = () => {
  const [wordToGuess, setWordToGuess] = useState<string>("");
  const [usedLetters, setUsedLetters] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [playerWon, setPlayerWon] = useState<boolean>(false);

  useEffect(() => {
    loadNewWord();
  }, []);

  const loadNewWord = (): void => {
    fetch("/data/words.txt")
      .then((response) => response.text())
      .then((text) => {
        const words: string[] = text.split("\n");
        const randomWord: string = words[Math.floor(Math.random() * words.length)];
        setWordToGuess(randomWord.trim());
      })
      .catch((error) => {
        alert("Не получилось загрузить слова");
        console.log("Ошибка:", error);
      });
  };

  const checkLetter = (letter: string): void => {
    if (isGameOver) {
      return;
    }
    if (usedLetters.includes(letter)) {
      return;
    }

    setUsedLetters([...usedLetters, letter]);

    if (!wordToGuess.includes(letter)) {
      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);
      
      if (newMistakes >= 6) {
        setIsGameOver(true);
        setUsedLetters(wordToGuess.split('').filter((letter, index, arr) => 
          arr.indexOf(letter) === index
        ));
      }
    }

    const isWordGuessed = wordToGuess
      .split("")
      .every((char) => usedLetters.includes(char) || char === letter);
    
    if (isWordGuessed) {
      setPlayerWon(true);
      setIsGameOver(true);
    }
  };

  const checkWord = (guessedWord: string): void => {
    if (guessedWord.toLowerCase() === wordToGuess.toLowerCase()) {
      setUsedLetters(wordToGuess.split('').filter((letter, index, arr) => 
        arr.indexOf(letter) === index
      ));
      setPlayerWon(true);
      setIsGameOver(true);
    } else {
      const newMistakes = mistakes + 2;
      setMistakes(newMistakes);
      if (newMistakes >= 6) {
        setIsGameOver(true);
        setUsedLetters(wordToGuess.split('').filter((letter, index, arr) => 
          arr.indexOf(letter) === index
        ));
      }
    }
  };

  const startNewGame = (): void => {
    setMistakes(0);
    setUsedLetters([]);
    setIsGameOver(false);
    setPlayerWon(false);
    loadNewWord();
  };

  return (
    <div className="hangman-container">
      <h1 className="hangman-title">Виселица</h1>
      
      <ManDrawing mistakes={mistakes} />

      <Letters
        wordToGuess={wordToGuess}
        onLetterClick={checkLetter}
        usedLetters={usedLetters}
        isGameOver={isGameOver}
      />

      <p className="mistakes-counter">Ошибки: {mistakes}/6</p>
      
      {isGameOver && (
        <p className={`game-message ${playerWon ? "win" : "lose"}`}>
          {playerWon ? "Вы выиграли!" : `Вы проиграли! Загаданное слово: ${wordToGuess}`}
        </p>
      )}

      <KeyboardInput 
        onGuess={checkWord}
        isGameOver={isGameOver}
      />

      <button onClick={startNewGame} className="new-game-button">
        Начать новую игру
      </button>
    </div>
  );
};

export default Hangman;