import React from 'react';

const HANGMAN_PARTS = [
  // Base
  <line key="base" x1="20" y1="230" x2="180" y2="230" stroke="currentColor" strokeWidth="4"/>,
  // Vertical pole
  <line key="pole" x1="100" y1="230" x2="100" y2="30" stroke="currentColor" strokeWidth="4"/>,
  // Top horizontal
  <line key="top" x1="100" y1="30" x2="160" y2="30" stroke="currentColor" strokeWidth="4"/>,
  // Rope
  <line key="rope" x1="160" y1="30" x2="160" y2="60" stroke="currentColor" strokeWidth="4"/>,
  // Head
  <circle key="head" cx="160" cy="80" r="20" stroke="currentColor" strokeWidth="4" fill="none"/>,
  // Body
  <line key="body" x1="160" y1="100" x2="160" y2="150" stroke="currentColor" strokeWidth="4"/>,
  // Left arm
  <line key="leftArm" x1="160" y1="120" x2="130" y2="140" stroke="currentColor" strokeWidth="4"/>,
  // Right arm
  <line key="rightArm" x1="160" y1="120" x2="190" y2="140" stroke="currentColor" strokeWidth="4"/>,
  // Left leg
  <line key="leftLeg" x1="160" y1="150" x2="130" y2="180" stroke="currentColor" strokeWidth="4"/>,
  // Right leg
  <line key="rightLeg" x1="160" y1="150" x2="190" y2="180" stroke="currentColor" strokeWidth="4"/>
];

interface HangmanDrawingProps {
  wrongGuesses: number;
}

const HangmanDrawing: React.FC<HangmanDrawingProps> = ({ wrongGuesses }) => {
  return (
    <div className="w-full max-w-[200px] mx-auto">
      <svg width="200" height="250" className="text-slate-700">
        {HANGMAN_PARTS.slice(0, wrongGuesses)}
      </svg>
    </div>
  );
};

export default HangmanDrawing;