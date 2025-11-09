"use client";

import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Heart, BookOpen } from "lucide-react";
import { motion } from 'framer-motion';
import Image from "next/image";
import AdminNav from '@/components/admin-nav';

export default function StoryPage() {
  const [storyItems, setStoryItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const mockStoryItems = [
      {
        id: 1,
        title: "Pertemuan Pertama",
        date: "15 Mei 2020",
        content: "Di sebuah kafe kecil, cinta ini bermula dengan senyuman pertama yang tak terlupakan. Seolah waktu berhenti hanya untuk kita berdua.",
        imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop"
      },
      {
        id: 2,
        title: "Kencan Pertama",
        date: "20 Juni 2020",
        content: "Kencan pertama yang penuh tawa dan obrolan panjang hingga malam tiba. Saat itulah aku tahu kamu adalah orang yang istimewa.",
        imageUrl: "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?w=800&h=600&fit=crop"
      },
      {
        id: 3,
        title: "Petualangan Bersama",
        date: "10 Juli 2021",
        content: "Travelling ke tempat-tempat indah bersama, membuat kenangan yang tak ternilai harganya. Setiap matahari terbit bersamamu adalah keajaiban.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
      }
    ];

    setTimeout(() => {
      setStoryItems(mockStoryItems);
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
            <BookOpen className="w-12 h-12 text-pink-500" />
          </motion.div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 bg-clip-text text-transparent font-parkinsans mb-4">
            Cerita Kita
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Kisah cinta yang penuh dengan canda tawa, kebahagiaan, dan kenangan tak terlupakan
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
          </div>
        ) : (
          <div className="space-y-12">
            {storyItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="flex flex-col md:flex-row gap-8 items-center"
              >
                <div className="md:w-1/2">
                  <div className="relative aspect-video rounded-xl overflow-hidden">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-1/2 space-y-4">
                  <div className="flex items-center text-pink-600 dark:text-pink-400">
                    <Heart className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">{item.date}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.content}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}