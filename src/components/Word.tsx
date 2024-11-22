import React from 'react';

interface WordProps {
  word: string;
  guessedLetters: Set<string>;
  reveal?: boolean;
}

const Word: React.FC<WordProps> = ({ word, guessedLetters, reveal = false }) => {
  return (
    <div className="flex justify-center gap-1 my-8">
      {word.split('').map((letter, index) => (
        <div key={index} className="word-letter">
          {reveal || guessedLetters.has(letter.toUpperCase()) ? (
            <span className={reveal && !guessedLetters.has(letter.toUpperCase()) ? 'text-rose-500' : ''}>
              {letter.toUpperCase()}
            </span>
          ) : (
            ''
          )}
        </div>
      ))}
    </div>
  );
};

export default Word;