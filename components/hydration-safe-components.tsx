'use client';

import { useState, useEffect } from 'react';
import { FloatingHearts as ActualFloatingHearts } from './floating-hearts';
import { RomanticMusicPlayer as ActualRomanticMusicPlayer } from './romantic-music-player';

export function FloatingHeartsWrapper() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" />;
  }

  return <ActualFloatingHearts />;
}

export function RomanticMusicPlayerWrapper() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="fixed bottom-4 right-4 z-50 flex items-center space-x-2">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-full p-2 shadow-lg">
          <div className="p-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white opacity-0 w-8 h-8" />
        </div>
      </div>
    );
  }

  return <ActualRomanticMusicPlayer />;
}