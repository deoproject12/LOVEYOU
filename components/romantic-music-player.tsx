'use client';

import { useState, useEffect, useRef } from 'react';
import { Heart } from 'lucide-react';

export default function RomanticMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // URL YouTube yang diberikan
  const youtubeUrl = "https://www.youtube.com/embed/-mwsPoerFWU?si=TkjV6asuttz9_r8q&autoplay=1&loop=1&playlist=-mwsPoerFWU";
  
  useEffect(() => {
    // Set mounted to true on client side
    setMounted(true);
  }, []);

  const togglePlayer = () => {
    setShowPlayer(!showPlayer);
  };

  if (!mounted) {
    // Return minimal structure to avoid hydration mismatch
    return (
      <div className="fixed bottom-4 right-4 z-50 flex items-center space-x-2">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-full p-2 shadow-lg">
          <button 
            onClick={() => {}}
            className="p-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white transition-colors opacity-0"
            aria-label="Open music player"
          >
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {showPlayer ? (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-3 shadow-lg w-80 h-60">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-gray-700 dark:text-gray-300">Monolog - Kehilangan</h3>
            <button 
              onClick={togglePlayer}
              className="p-1 rounded-full hover:bg-pink-100 dark:hover:bg-pink-900/50"
              aria-label="Close player"
            >
              ✕
            </button>
          </div>
          <div className="w-full h-40 rounded-lg overflow-hidden">
            <iframe
              src={youtubeUrl}
              title="Romantic Song Player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
          <div className="flex justify-center mt-2">
            <button
              onClick={() => setShowPlayer(false)}
              className="text-xs text-pink-600 dark:text-pink-400 hover:underline"
            >
              Minimize Player
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-full p-2 shadow-lg">
            <button 
              onClick={togglePlayer}
              className="p-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600 transition-colors"
              aria-label="Open music player"
            >
              <Heart className="w-4 h-4" />
            </button>
          </div>
          <div className="text-xs bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-full px-2 py-1 shadow">
            <span className="text-pink-600 dark:text-pink-400">Monolog</span>
          </div>
        </div>
      )}
    </div>
  );
}