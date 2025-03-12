import React, { useState } from 'react';
import './styles/KeyboardInput.scss';

interface KeyboardInputProps {
  onGuess: (word: string) => void;
  isGameOver: boolean;
}

const KeyboardInput: React.FC<KeyboardInputProps> = ({ onGuess, isGameOver }) => {
  const [guess, setGuess] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (guess.trim()) {
      onGuess(guess.trim().toLowerCase());
      setGuess('');
    }
  };

  return (
    <form className="keyboard-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Введите слово целиком"
        disabled={isGameOver}
        className="keyboard-input__field"
        autoComplete="off"
      />
      <button 
        type="submit" 
        disabled={!guess.trim() || isGameOver}
        className="keyboard-input__button"
      >
        Угадать слово
      </button>
    </form>
  );
};

export default KeyboardInput;