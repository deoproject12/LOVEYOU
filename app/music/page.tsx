"use client";

import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music, Heart, Play, Pause } from "lucide-react";
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import FloatingHearts from '@/components/floating-hearts';
import RomanticMusicPlayer from '@/components/romantic-music-player';
import AdminNav from '@/components/admin-nav';

export default function MusicPage() {
  const [songs, setSongs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [playingSong, setPlayingSong] = useState<number | null>(null);

  // Mock data for initial display
  useEffect(() => {
    const mockSongs = [
      {
        id: 1,
        title: "Monolog",
        artist: "Kunto Aji",
        description: "Lagu ini selalu mengingatkanku padamu. Saat kita pertama kali mendengarkannya bersama.",
        youtubeUrl: "https://www.youtube.com/watch?v=-mwsPoerFWU",
      },
      {
        id: 2,
        title: "Hujan",
        artist: "Raisa",
        description: "Saat hujan turun, aku selalu teringat padamu dan lagu ini.",
        youtubeUrl: "https://www.youtube.com/watch?v=...",
      }
    ];

    setTimeout(() => {
      setSongs(mockSongs);
      setIsLoading(false);
    }, 800);
  }, []);

  const togglePlay = (id: number) => {
    if (playingSong === id) {
      setPlayingSong(null);
    } else {
      setPlayingSong(id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 dark:from-pink-900/20 dark:via-gray-900 dark:to-rose-900/20 relative">
      <AdminNav />
      <FloatingHearts />
      <div className="relative z-10">
        <div className="text-center py-16 relative px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <div className="flex flex-col items-center justify-center gap-3 mb-6">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }}
                className="romantic-heart"
              >
                <Music className="w-16 h-16 text-pink-500" />
              </motion.div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 bg-clip-text text-transparent font-parkinsans">
                Lagu Favorit
              </h1>
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 dark:text-gray-300">
                Melodi Kenangan Kita
              </h2>
            </div>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4 mb-8">
              Koleksi lagu-lagu yang menjadi soundtrack cinta kita
            </p>
          </motion.div>
        </div>

        <main className="container mx-auto px-4 sm:px-6 pb-16 max-w-5xl">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {songs.map((song, index) => (
                <motion.div
                  key={song.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <Card className="overflow-hidden h-full relative bg-gradient-to-br from-pink-900/30 to-rose-900/30 dark:from-pink-900/50 dark:to-rose-900/50 border-pink-700">
                    <div className="absolute -top-3 -right-3 text-2xl">🎵</div>
                    <div className="p-6">
                      <div className="flex items-center justify-center mb-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
                          <Music className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-1">{song.title}</h3>
                      <p className="text-pink-600 dark:text-pink-400 mb-3">{song.artist}</p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{song.description}</p>
                      <div className="flex justify-between items-center">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => togglePlay(song.id)}
                          className="border-pink-500 text-pink-600 dark:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-900/20"
                        >
                          {playingSong === song.id ? (
                            <>
                              <Pause className="w-4 h-4 mr-1" /> Berhenti
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4 mr-1" /> Putar
                            </>
                          )}
                        </Button>
                        <Button variant="outline" size="sm" className="border-pink-500 text-pink-600 dark:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-900/20">
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                      {playingSong === song.id && (
                        <div className="mt-4">
                          <iframe 
                            className="w-full aspect-video rounded-lg"
                            src={`https://www.youtube.com/embed/${song.youtubeUrl.split('v=')[1]?.split('&')[0]}?autoplay=1`}
                            title={song.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </main>
      </div>
      <RomanticMusicPlayer />
    </div>
  );
}