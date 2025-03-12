import React from 'react';
import './styles/Letter.scss';

interface LettersProps {
  onLetterClick: (letter: string) => void;
  usedLetters: string[];
  isGameOver: boolean;
  wordToGuess: string;
}

const Letters: React.FC<LettersProps> = ({ onLetterClick, usedLetters, isGameOver, wordToGuess }) => {
  const letters = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя".split("");

  return (
    <div className="letters-container">
      <div className="word-container">
        {wordToGuess.split("").map((char, i) => (
          <span key={i} className={`letter ${usedLetters.includes(char) ? 'guessed' : ''}`}>
            {usedLetters.includes(char) ? char : '_'}
          </span>
        ))}
      </div>

      <div className="letters">
        {letters.map((letter) => (
          <button
            key={letter}
            onClick={() => onLetterClick(letter)}
            disabled={usedLetters.includes(letter) || isGameOver}
            className={`letter-button ${usedLetters.includes(letter) ? 'used' : ''}`}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Letters;