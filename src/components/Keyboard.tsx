import React from 'react';

const KEYS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];

interface KeyboardProps {
  guessedLetters: Set<string>;
  correctLetters: Set<string>;
  onGuess: (letter: string) => void;
  disabled: boolean;
}

const Keyboard: React.FC<KeyboardProps> = ({
  guessedLetters,
  correctLetters,
  onGuess,
  disabled
}) => {
  const getButtonClass = (letter: string) => {
    const baseClass = 'letter-button';
    if (!guessedLetters.has(letter)) return `${baseClass} unused`;
    return `${baseClass} ${correctLetters.has(letter) ? 'correct' : 'wrong'}`;
  };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      {KEYS.map((row, i) => (
        <div key={i} className="flex justify-center gap-1 my-1">
          {row.map(letter => (
            <button
              key={letter}
              onClick={() => onGuess(letter)}
              disabled={guessedLetters.has(letter) || disabled}
              className={getButtonClass(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;