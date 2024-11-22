import React, { useState, useCallback, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import HangmanDrawing from '@/components/HangmanDrawing';
import Keyboard from '@/components/Keyboard';
import Word from '@/components/Word';

const WORDS = {
  Animals: ['ELEPHANT', 'GIRAFFE', 'PENGUIN', 'KANGAROO', 'DOLPHIN'],
  Countries: ['FRANCE', 'JAPAN', 'BRAZIL', 'CANADA', 'EGYPT'],
  Foods: ['PIZZA', 'SUSHI', 'BURGER', 'PASTA', 'TACO'],
};

const MAX_MISTAKES = 10;

const Index = () => {
  const { toast } = useToast();
  const [category, setCategory] = useState<keyof typeof WORDS>('Animals');
  const [word, setWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [correctLetters, setCorrectLetters] = useState<Set<string>>(new Set());
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const wrongGuesses = [...guessedLetters].filter(letter => !word.includes(letter)).length;

  const initializeGame = useCallback(() => {
    const newWord = WORDS[category][Math.floor(Math.random() * WORDS[category].length)];
    setWord(newWord);
    setGuessedLetters(new Set());
    setCorrectLetters(new Set());
    setGameOver(false);
  }, [category]);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const onGuess = (letter: string) => {
    const newGuessedLetters = new Set(guessedLetters).add(letter);
    setGuessedLetters(newGuessedLetters);

    if (word.includes(letter)) {
      const newCorrectLetters = new Set(correctLetters).add(letter);
      setCorrectLetters(newCorrectLetters);

      // Check win condition
      if ([...word].every(l => newGuessedLetters.has(l.toUpperCase()))) {
        setScore(prev => prev + 1);
        setGameOver(true);
        toast({
          title: "Congratulations!",
          description: "You won! Click New Game to play again.",
        });
      }
    } else if (wrongGuesses + 1 >= MAX_MISTAKES) {
      setGameOver(true);
      toast({
        variant: "destructive",
        title: "Game Over",
        description: `The word was ${word}. Try again!`,
      });
    }
  };

  return (
    <div className="min-h-screen p-8 flex flex-col items-center">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Hangman</h1>
        <div className="flex gap-4 justify-center mb-4">
          <div className="text-slate-600">Score: {score}</div>
          <div className="text-slate-600">Category: {category}</div>
        </div>
        <div className="flex gap-2 justify-center">
          {(Object.keys(WORDS) as (keyof typeof WORDS)[]).map((cat) => (
            <Button
              key={cat}
              variant={category === cat ? "default" : "outline"}
              onClick={() => setCategory(cat)}
              disabled={!gameOver}
            >
              {cat}
            </Button>
          ))}
          <Button 
            variant="default"
            onClick={initializeGame}
          >
            New Game
          </Button>
        </div>
      </div>

      <HangmanDrawing wrongGuesses={wrongGuesses} />
      
      <Word 
        word={word} 
        guessedLetters={guessedLetters}
        reveal={gameOver}
      />

      <Keyboard
        guessedLetters={guessedLetters}
        correctLetters={correctLetters}
        onGuess={onGuess}
        disabled={gameOver}
      />
    </div>
  );
};

export default Index;