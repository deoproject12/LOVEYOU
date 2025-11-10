"use client";

import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Utensils, Heart } from "lucide-react";
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import FloatingHearts from '@/components/floating-hearts';
import RomanticMusicPlayer from '@/components/romantic-music-player';
import AdminNav from '@/components/admin-nav';

export default function FoodPage() {
  const [foods, setFoods] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for initial display
  useEffect(() => {
    const mockFoods = [
      {
        id: 1,
        name: "Nasi Goreng Special",
        description: "Nasi goreng yang kita makan pertama kali di warung kecil itu. Rasa yang tak terlupakan hingga kini.",
        imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop",
      },
      {
        id: 2,
        name: "Martabak Manis",
        description: "Makanan yang selalu kita pesan bersama saat jalan-jalan malam. Kamu selalu memilih coklat keju.",
        imageUrl: "https://images.unsplash.com/photo-1578894740433-85c21dbd4a76?w=800&h=600&fit=crop",
      }
    ];

    setTimeout(() => {
      setFoods(mockFoods);
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
                <Utensils className="w-16 h-16 text-pink-500" />
              </motion.div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 bg-clip-text text-transparent font-geist-sans">
                Makanan Favorit
              </h1>
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 dark:text-gray-300">
                Kenangan Lezat Bersama
              </h2>
            </div>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4 mb-8">
              Kumpulan makanan yang menjadi saksi kenangan indah kita bersama
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
              {foods.map((food, index) => (
                <motion.div
                  key={food.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <Card className="overflow-hidden h-full relative bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 border-rose-200 dark:border-rose-700">
                    <div className="absolute -top-3 -right-3 text-2xl">🍽️</div>
                    <div className="p-6">
                      <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
                        <img
                          src={food.imageUrl}
                          alt={food.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">{food.name}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{food.description}</p>
                      <div className="mt-4 flex justify-center">
                        <Button variant="outline" className="border-pink-500 text-pink-600 dark:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-900/20">
                          <Heart className="w-4 h-4 mr-2" />
                          Favorit
                        </Button>
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