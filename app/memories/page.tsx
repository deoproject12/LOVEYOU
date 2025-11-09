"use client";

import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Heart, BookText } from "lucide-react";
import { motion } from 'framer-motion';
import Image from "next/image";
import AdminNav from '@/components/admin-nav';

export default function MemoriesPage() {
  const [memories, setMemories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const mockMemories = [
      {
        id: 1,
        title: "Pertama Kali Tertawa Bersama",
        date: "15 Mei 2020",
        content: "Ketika kamu tertawa lepas karena lelucon kecilku, aku tahu bahwa suara tawamu adalah hal yang ingin selalu kudengar seumur hidupku.",
        imageUrl: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&h=600&fit=crop",
        likes: 24
      },
      {
        id: 2,
        title: "Hadiah Tak Terduga",
        date: "14 Februari 2021",
        content: "Di hari valentine, bukan bunga yang membuatku bahagia, tapi senyumanmu ketika menerima hadiah kecil yang kusiapkan dengan penuh kasih sayang.",
        imageUrl: "https://images.unsplash.com/photo-1533090368676-1fd25485db88?w=800&h=600&fit=crop",
        likes: 32
      },
      {
        id: 3,
        title: "Waktu yang Terhenti",
        date: "10 Juli 2021",
        content: "Menatap bintang-bintang di langit malam bersamamu, seolah waktu berhenti dan dunia hanya milik kita berdua.",
        imageUrl: "https://images.unsplash.com/photo-1517248135467-4d348d3b1eba?w=800&h=600&fit=crop",
        likes: 28
      }
    ];

    setTimeout(() => {
      setMemories(mockMemories);
      setIsLoading(false);
    }, 800);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 dark:from-pink-900/20 dark:via-gray-900 dark:to-rose-900/20">
      <AdminNav />
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl pt-12">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <BookText className="w-12 h-12 text-pink-500" />
          </motion.div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 bg-clip-text text-transparent font-parkinsans mb-4">
            Buku Kenangan
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Kumpulan kenangan indah yang tak akan pernah terlupakan dalam perjalanan cinta kita
          </p>
        </div>

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
                className="bg-gradient-to-br from-pink-50 to-white dark:from-pink-900/20 dark:to-gray-800 rounded-2xl overflow-hidden shadow-lg"
              >
                <div className="md:flex">
                  <div className="md:w-2/5">
                    <div className="relative h-64 md:h-full">
                      <Image
                        src={memory.imageUrl}
                        alt={memory.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="p-8 md:w-3/5">
                    <div className="flex items-center mb-3">
                      <Heart className="w-5 h-5 text-pink-500 mr-2" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">{memory.date}</span>
                      <span className="mx-3">•</span>
                      <span className="text-sm text-pink-600 dark:text-pink-400">{memory.likes} suka</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">{memory.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{memory.content}</p>
                    <button className="text-pink-600 dark:text-pink-400 hover:underline text-sm font-medium">
                      Baca selengkapnya →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}