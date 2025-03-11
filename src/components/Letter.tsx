import React from "react";

interface LetterProps {
  char: string;
  guessed: boolean;
}

const Letter:React.FC<LetterProps> = ({ char, guessed }) => <span>{guessed ? char : "_"}</span>;

export default Letter;

