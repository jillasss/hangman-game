import React from "react";

interface HintProps {
    word: string;
    guessedLetters: string[];
    incorrectGuesses: number;
    setGuessedLetters: (letters: string[]) => void;
    setIncorrectGuesses: (count: number) => void;
  }

const Hint:React.FC<HintProps> = ({ word, guessedLetters, incorrectGuesses, setGuessedLetters, setIncorrectGuesses }) => {
    const useHint = () => {
        const hiddenLetters = word.split("").filter((char) => !guessedLetters.includes(char));
        if (!hiddenLetters.length || incorrectGuesses + 2 >= 6) return;
    
        setGuessedLetters([...guessedLetters, hiddenLetters[Math.floor(Math.random() * hiddenLetters.length)]]);
        setIncorrectGuesses(incorrectGuesses + 2);
      };
    
      return <button onClick={useHint}>Подсказка (-2 жизни)</button>;
    };

export default Hint;
