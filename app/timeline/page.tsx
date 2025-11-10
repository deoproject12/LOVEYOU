"use client";

import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Calendar, Heart, Camera } from "lucide-react";
import { motion } from 'framer-motion';
import Image from "next/image";
import FloatingHearts from '@/components/floating-hearts';
import RomanticMusicPlayer from '@/components/romantic-music-player';
import AdminNav from '@/components/admin-nav';

export default function TimelinePage() {
  const [memories, setMemories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for timeline
  useEffect(() => {
    const mockMemories = [
      {
        id: 1,
        title: "Pertemuan Pertama",
        date: "15 Mei 2020",
        content: "Hari itu adalah hari yang tak terlupakan ketika aku melihat senyummu pertama kalinya. Aku tahu sejak saat itu, kamu adalah orang yang istimewa untukku.",
        imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop"
      },
      {
        id: 2,
        title: "Kencan Pertama",
        date: "20 Juni 2020",
        content: "Kencan pertama kita di taman kota. Kita berbicara panjang lebar sampai malam hari, seolah waktu berhenti untuk kita berdua.",
        imageUrl: "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?w=800&h=600&fit=crop"
      },
      {
        id: 3,
        title: "Pengakuan Cinta",
        date: "14 Februari 2021",
        content: "Hari Valentine yang tak akan terlupakan. Aku memberanikan diri mengungkapkan perasaanku, dan kamu menjawab dengan senyuman yang paling indah.",
        imageUrl: "https://images.unsplash.com/photo-1533090368676-1fd25485db88?w=800&h=600&fit=crop"
      },
      {
        id: 4,
        title: "Awal Hubungan",
        date: "22 Maret 2021",
        content: "Hari pertama kita resmi menjadi sepasang kekasih. Perjalanan cinta kita dimulai dari hari ini, dengan janji untuk selalu bersama.",
        imageUrl: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&h=600&fit=crop"
      },
      {
        id: 5,
        title: "Petualangan Pertama",
        date: "10 Juli 2021",
        content: "Perjalanan pertama kita ke Gunung Bromo. Melihat matahari terbit bersamamu adalah momen yang tak akan pernah kulupakan seumur hidup.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
      },
      {
        id: 6,
        title: "Momen Romantis",
        date: "12 Desember 2021",
        content: "Makan malam romantis di atap gedung, menatap bintang-bintang sambil membicarakan masa depan kita bersama.",
        imageUrl: "https://images.unsplash.com/photo-1517248135467-4d348d3b1eba?w=800&h=600&fit=crop"
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
            <Heart className="w-12 h-12 text-pink-500" />
          </motion.div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 bg-clip-text text-transparent font-geist-sans mb-4">
            Kisah Kami
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Perjalanan cinta yang penuh dengan kenangan indah dan momen tak terlupakan
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
          </div>
        ) : (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-pink-300 to-rose-300 dark:from-pink-700 dark:to-rose-700 transform -translate-x-1/2"></div>

            <div className="space-y-12">
              {memories.map((memory, index) => (
                <motion.div
                  key={memory.id}
                  id={memory.id.toString()}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className={`relative flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 -translate-x-1/2 top-6 w-4 h-4 rounded-full bg-pink-500 border-4 border-white dark:border-gray-800 z-10"></div>

                  <div className={`w-full max-w-md ${index % 2 === 0 ? 'mr-8' : 'ml-8'}`}>
                    <Card 
                      className={`p-6 bg-gradient-to-br from-pink-50 to-white dark:from-pink-900/20 dark:to-gray-800 border-pink-200 dark:border-pink-700 shadow-lg ${index % 2 === 0 ? 'rounded-r-xl' : 'rounded-l-xl'}`}
                    >
                      <div className="flex items-center text-pink-600 dark:text-pink-400 mb-3">
                        <Calendar className="w-5 h-5 mr-2" />
                        <span className="text-sm font-medium">{memory.date}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">{memory.title}</h3>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{memory.content}</p>
                      
                      {memory.imageUrl && (
                        <div className="relative aspect-video rounded-lg overflow-hidden">
                          <Image
                            src={memory.imageUrl}
                            alt={memory.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}