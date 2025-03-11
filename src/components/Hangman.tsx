import React, { useState, useEffect } from "react";
import Letter from "./Letter";
import "../styles/styles.scss";

const Hangman: React.FC = () => {
    
  const [wordToGuess, setWordToGuess] = useState<string>(""); 
  const [usedLetters, setUsedLetters] = useState<string[]>([]); 
  const [mistakes, setMistakes] = useState<number>(0);  
  const [isGameOver, setIsGameOver] = useState<boolean>(false);   
  const [playerWon, setPlayerWon] = useState<boolean>(false);   

  useEffect(() => {
    loadNewWord();
  }, []);

  // Загружаем новое слово из файла
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
    if (isGameOver || usedLetters.includes(letter)) {
      return;
    }

    setUsedLetters([...usedLetters, letter]);

    if (!wordToGuess.includes(letter)) {  
      const newMistakes: number = mistakes + 1;
      setMistakes(newMistakes);
      
      if (newMistakes >= 6) {
        setIsGameOver(true);
      }       
    }

    const isWordGuessed: boolean = wordToGuess
      .split("")
      .every((char) => usedLetters.includes(char) || char === letter);
    
    if (isWordGuessed) {
      setPlayerWon(true);
      setIsGameOver(true);
    }
  };

  const startNewGame = (): void => {
    setUsedLetters([]);
    setMistakes(0);
    setIsGameOver(false);
    setPlayerWon(false);
    loadNewWord();
  };

  return (
    <div>
      <h1>Виселица</h1>
      <p>
        {wordToGuess.split("").map((char, i) => (
          <Letter key={i} char={char} guessed={usedLetters.includes(char)} />
        ))}
      </p>
      <p>Ошибки: {mistakes}/6</p>
      {isGameOver && (
        <p className={`game-message ${playerWon ? "win" : "lose"}`}>
          {playerWon ? "Вы выиграли!" : "Вы проиграли!"}
        </p>
      )}
      <div style={{ textAlign: "center" }}>
        {"а б в г д е ё ж з и й к л м н о п р с т у ф х ц ч ш щ ы э ю я".split(" ").map((letter) => (
          <button 
            key={letter} 
            onClick={() => checkLetter(letter)} 
            disabled={usedLetters.includes(letter) || isGameOver}
          >
            {letter}
          </button>
        ))}
      </div>
      <button onClick={startNewGame}>Начать новую игру</button>
    </div>
  );
};

export default Hangman;