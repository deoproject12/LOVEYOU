"use client";

import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Heart, Calendar } from "lucide-react";
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import FloatingHearts from '@/components/floating-hearts';
import RomanticMusicPlayer from '@/components/romantic-music-player';
import AdminNav from '@/components/admin-nav';

export default function MemoriesBookPage() {
  const [memories, setMemories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for initial display
  useEffect(() => {
    const mockMemories = [
      {
        id: 1,
        title: "Pertemuan Pertama",
        date: "2020-05-15",
        content: "Hari itu adalah hari yang tak terlupakan ketika aku melihat senyummu pertama kalinya. Aku tahu sejak saat itu, kamu adalah orang yang istimewa untukku. Kita berbincang panjang hingga malam hari di taman kota.",
        imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop",
      },
      {
        id: 2,
        title: "Kencan Pertama",
        date: "2020-06-20",
        content: "Kencan pertama kita di kafe kecil di pinggir jalan. Aku sangat gugup, tapi senyummu membuatku tenang. Kita berbicara tentang banyak hal, dari mimpi hingga masa depan. Aku tahu kamu adalah orang yang aku tunggu-tunggu.",
        imageUrl: "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?w=800&h=600&fit=crop",
      }
    ];

    setTimeout(() => {
      setMemories(mockMemories);
      setIsLoading(false);
    }, 800);
  }, []);

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
                <BookOpen className="w-16 h-16 text-pink-500" />
              </motion.div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 bg-clip-text text-transparent font-parkinsans">
                Buku Kenangan
              </h1>
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 dark:text-gray-300">
                Cerita Cinta Kita
              </h2>
            </div>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4 mb-8">
              Kumpulan kenangan indah yang kita tulis bersama sepanjang perjalanan cinta ini
            </p>
          </motion.div>
        </div>

        <main className="container mx-auto px-4 sm:px-6 pb-16 max-w-5xl">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
            </div>
          ) : (
            <div className="space-y-8">
              {memories.map((memory, index) => (
                <motion.div
                  key={memory.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <Card className="overflow-hidden relative bg-gradient-to-br from-pink-50 to-white dark:from-pink-900/20 dark:to-gray-800 border-pink-200 dark:border-pink-700">
                    <div className="absolute -top-4 -left-4 text-3xl">📖</div>
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/3">
                          {memory.imageUrl && (
                            <div className="relative aspect-square rounded-lg overflow-hidden">
                              <img
                                src={memory.imageUrl}
                                alt={memory.title}
                                className="object-cover w-full h-full"
                              />
                            </div>
                          )}
                        </div>
                        <div className="md:w-2/3">
                          <div className="flex items-center text-pink-600 dark:text-pink-400 mb-3">
                            <Calendar className="w-5 h-5 mr-2" />
                            <span className="text-sm font-medium">
                              {new Date(memory.date).toLocaleDateString('id-ID', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">{memory.title}</h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{memory.content}</p>
                          <div className="flex items-center">
                            <Button variant="outline" className="border-pink-500 text-pink-600 dark:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-900/20">
                              <Heart className="w-4 h-4 mr-2" />
                              Favorit
                            </Button>
                          </div>
                        </div>
                      </div>
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