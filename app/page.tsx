"use client";

import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Calendar, Camera, MessageCircle, User } from "lucide-react";
import { motion } from 'framer-motion';
import Image from "next/image";
import Link from "next/link";
import { RomanticButton } from '@/components/romantic-button';
import { RomanticCard } from '@/components/romantic-card';
import FloatingHearts from '@/components/floating-hearts';
import RomanticMusicPlayer from '@/components/romantic-music-player';
import AdminNav from '@/components/admin-nav';
import RelationshipAIAssistant from '@/components/relationship-ai-assistant';

export default function RomanticHome() {
  const [featuredQuotes, setFeaturedQuotes] = useState<any[]>([]);
  const [featuredGallery, setFeaturedGallery] = useState<any[]>([]);
  const [recentMemories, setRecentMemories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from API
  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch quotes
        const quotesResponse = await fetch('/api/quotes');
        if (quotesResponse.ok) {
          const quotesData = await quotesResponse.json();
          setFeaturedQuotes(quotesData.filter((q: any) => q.isFeatured));
        }

        // Fetch gallery
        const galleryResponse = await fetch('/api/gallery');
        if (galleryResponse.ok) {
          const galleryData = await galleryResponse.json();
          setFeaturedGallery(galleryData.filter((g: any) => g.isFeatured).slice(0, 2));
        }

        // Fetch memories
        const memoriesResponse = await fetch('/api/memories');
        if (memoriesResponse.ok) {
          const memoriesData = await memoriesResponse.json();
          setRecentMemories(memoriesData.slice(0, 2));
        }
      } catch (error) {
        console.error('Error loading data:', error);
        // Fallback to mock data with correct information
        const mockQuotes = [
          {
            id: 1,
            text: "Cinta bukan tentang menemukan seseorang yang sempurna, tapi tentang menemukan seseorang yang membuat kita ingin menjadi lebih baik.",
            author: "Abdullah"
          },
          {
            id: 2,
            text: "Setiap hari bersamamu adalah hari yang tak ternilai harganya.",
            author: "Nayla"
          }
        ];

        const mockGallery = [
          {
            id: 1,
            imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop",
            caption: "Kami pertama kali bertemu di bot Telegram Leo Match"
          },
          {
            id: 2,
            imageUrl: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&h=600&fit=crop",
            caption: "Momen indah setelah kami jadian"
          }
        ];

        const mockMemories = [
          {
            id: 1,
            title: "Pertemuan di Leo Match",
            date: "2025-06-29", // Correct anniversary date
            content: "Kami pertama kali bertemu di bot Telegram Leo Match, tempat yang membawa kami bersama. Hubungan kami dimulai pada tanggal 29 Juni 2025."
          },
          {
            id: 2,
            title: "Awal Hubungan",
            date: "2025-06-29",
            content: "Hubungan kami dimulai dari pertemuan di Leo Match, kini kami menjalin hubungan yang penuh kasih sayang."
          }
        ];

        setFeaturedQuotes(mockQuotes);
        setFeaturedGallery(mockGallery);
        setRecentMemories(mockMemories);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 dark:from-pink-900/20 dark:via-gray-900 dark:to-rose-900/20 relative">
      <AdminNav />
      <FloatingHearts />
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="text-center py-16 relative px-4">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute -bottom-20 -left-40 w-80 h-80 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute top-40 left-1/2 w-80 h-80 bg-fuchsia-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
          </div>

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
                <Heart className="w-16 h-16 text-pink-500" />
              </motion.div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 bg-clip-text text-transparent font-parkinsans">
                Kisah Cinta
              </h1>
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 dark:text-gray-300">
                Abdullah & Nayla Lintang Aisyah
              </h2>
              <div className="mt-2 flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  >
                    💖
                  </motion.div>
                ))}
              </div>
            </div>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4 mb-8">
              Berawal dari pertemuan di bot Telegram Leo Match, kini kami menjalin hubungan penuh kasih sayang
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/timeline">
                <RomanticButton className="py-6 px-8 text-lg">
                  <Calendar className="mr-2 h-5 w-5" />
                  Kisah Kami
                </RomanticButton>
              </Link>
              <Link href="/gallery">
                <RomanticButton variant="romantic-outline" className="py-6 px-8 text-lg">
                  <Camera className="mr-2 h-5 w-5" />
                  Galeri Kenangan
                </RomanticButton>
              </Link>
            </div>
            
            <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
              Jadian: 29 Juni 2025 • Bertemu di Leo Match • Abdullah (23 Juni 2008) & Nayla (28 Mei 2009)
            </div>
          </motion.div>
        </div>

        <main className="container mx-auto px-4 sm:px-6 pb-16 max-w-5xl">
          {/* Featured Quotes */}
          <section className="mb-16">
            <div className="text-center mb-10 relative">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">Kata-Kata Cinta</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-rose-500 mx-auto rounded-full"></div>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Heart className="w-6 h-6 text-pink-500 mx-auto" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredQuotes.map((quote) => (
                <motion.div
                  key={quote.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * quote.id }}
                >
                  <RomanticCard className="p-6 h-full relative">
                    <div className="absolute -top-3 -right-3 text-2xl">💕</div>
                    <div className="flex items-start space-x-4">
                      <Heart className="flex-shrink-0 w-6 h-6 text-pink-500 mt-1" />
                      <div>
                        <p className="text-lg italic text-gray-700 dark:text-gray-300 mb-4">"{quote.text}"</p>
                        <div className="flex items-center">
                          <User className="w-4 h-4 text-pink-500 mr-2" />
                          <span className="text-sm font-medium text-pink-600 dark:text-pink-400">
                            - {quote.author}
                          </span>
                        </div>
                      </div>
                    </div>
                  </RomanticCard>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Featured Gallery */}
          <section className="mb-16">
            <div className="text-center mb-10 relative">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">Kenangan Terpilih</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-rose-500 to-pink-500 mx-auto rounded-full"></div>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Camera className="w-6 h-6 text-rose-500 mx-auto" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredGallery.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * item.id }}
                  whileHover={{ y: -10 }}
                  className="overflow-hidden rounded-xl shadow-lg relative"
                >
                  <div className="absolute -top-3 -right-3 text-xl z-10">🌸</div>
                  <div className="relative aspect-square">
                    <Image
                      src={item.imageUrl}
                      alt={item.caption}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 bg-white dark:bg-gray-800">
                    <p className="text-gray-600 dark:text-gray-300">{item.caption}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Recent Memories */}
          <section>
            <div className="text-center mb-10 relative">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">Momen Terbaru</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Calendar className="w-6 h-6 text-purple-500 mx-auto" />
              </div>
            </div>

            <div className="space-y-6">
              {recentMemories.map((memory) => (
                <motion.div
                  key={memory.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * memory.id }}
                  className="relative"
                >
                  <div className="absolute -top-4 -left-4 text-2xl">💞</div>
                  <RomanticCard className="p-6 relative">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">{memory.title}</h3>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-2 sm:mt-0">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(memory.date).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{memory.content}</p>
                    <Link href={`/timeline#${memory.id}`}>
                      <RomanticButton variant="romantic-ghost" className="p-0 h-auto">
                        Baca selengkapnya →
                      </RomanticButton>
                    </Link>
                  </RomanticCard>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Milestone Timeline Section */}
          <section className="mb-16">
            <div className="text-center mb-10 relative">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">Perjalanan Cinta Kami</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-rose-500 mx-auto rounded-full"></div>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Heart className="w-6 h-6 text-pink-500 mx-auto" />
              </div>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-pink-500 to-rose-500"></div>
              
              <div className="space-y-12">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative flex items-center"
                >
                  <div className="w-1/2 pr-8 text-right">
                    <RomanticCard className="p-6">
                      <h3 className="text-xl font-bold text-pink-600 dark:text-pink-400 mb-2">Pertemuan di Leo Match</h3>
                      <p className="text-gray-600 dark:text-gray-300">Juni 2025</p>
                      <p className="mt-3 text-gray-700 dark:text-gray-200">Kami pertama kali bertemu di bot Telegram Leo Match, tempat yang membawa kami bersama.</p>
                    </RomanticCard>
                  </div>
                  <div className="absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-pink-500 z-10"></div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative flex items-center"
                >
                  <div className="absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-rose-500 z-10"></div>
                  <div className="w-1/2 pl-8">
                    <RomanticCard className="p-6">
                      <h3 className="text-xl font-bold text-rose-600 dark:text-rose-400 mb-2">Tanggal Jadian</h3>
                      <p className="text-gray-600 dark:text-gray-300">29 Juni 2025</p>
                      <p className="mt-3 text-gray-700 dark:text-gray-200">Kami resmi menjadi pasangan pada tanggal 29 Juni 2025, setelah mengenal satu sama lain di Leo Match.</p>
                    </RomanticCard>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative flex items-center"
                >
                  <div className="w-1/2 pr-8 text-right">
                    <RomanticCard className="p-6">
                      <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-2">Hubungan yang Tumbuh</h3>
                      <p className="text-gray-600 dark:text-gray-300">Sekarang</p>
                      <p className="mt-3 text-gray-700 dark:text-gray-200">Kisah cinta kami terus berlanjut, dengan cinta yang semakin dalam setiap harinya.</p>
                    </RomanticCard>
                  </div>
                  <div className="absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-purple-500 z-10"></div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative flex items-center"
                >
                  <div className="absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-yellow-500 z-10"></div>
                  <div className="w-1/2 pl-8">
                    <RomanticCard className="p-6">
                      <h3 className="text-xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">Masa Depan Bersama</h3>
                      <p className="text-gray-600 dark:text-gray-300">Masa Depan</p>
                      <p className="mt-3 text-gray-700 dark:text-gray-200">Kami merencanakan masa depan yang penuh dengan kebahagiaan dan cinta.</p>
                    </RomanticCard>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Love Statistics Section */}
          <section className="mb-16">
            <div className="text-center mb-10 relative">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">Statistik Cinta Kami</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Heart className="w-6 h-6 text-purple-500 mx-auto" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <RomanticCard className="p-6 text-center">
                  <div className="text-4xl font-bold text-pink-600 dark:text-pink-400 mb-2">1000+</div>
                  <div className="text-gray-600 dark:text-gray-300">Hari Berbahagia</div>
                </RomanticCard>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <RomanticCard className="p-6 text-center">
                  <div className="text-4xl font-bold text-rose-600 dark:text-rose-400 mb-2">500+</div>
                  <div className="text-gray-600 dark:text-gray-300">Kenangan Indah</div>
                </RomanticCard>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <RomanticCard className="p-6 text-center">
                  <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">∞</div>
                  <div className="text-gray-600 dark:text-gray-300">Cinta yang Tak Terbatas</div>
                </RomanticCard>
              </motion.div>
            </div>
          </section>

          {/* Favorite Things Section */}
          <section className="mb-16">
            <div className="text-center mb-10 relative">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">Hal Favorit Kami</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Heart className="w-6 h-6 text-blue-500 mx-auto" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Tempat Favorit", description: "Taman kota tempat pertama kali kami kencan" },
                { title: "Makanan Kesukaan", description: "Sate padang yang selalu kami nikmati bersama" },
                { title: "Lagu Kekasih", description: "Lagu yang mengingatkan kami satu sama lain" },
                { title: "Kegiatan Bersama", description: "Bersepeda di pagi hari sambil menikmati keindahan alam" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <RomanticCard className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                  </RomanticCard>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="mb-16">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">Jelajahi Lebih Banyak Kisah Kami</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Temukan lebih banyak kenangan, foto, dan cerita indah dalam perjalanan cinta kami
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/timeline">
                  <RomanticButton className="py-4 px-8 text-lg">
                    <Calendar className="mr-2 h-5 w-5" />
                    Kisah Lengkap Kami
                  </RomanticButton>
                </Link>
                <Link href="/gallery">
                  <RomanticButton variant="romantic-outline" className="py-4 px-8 text-lg">
                    <Camera className="mr-2 h-5 w-5" />
                    Lihat Galeri
                  </RomanticButton>
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>
      <RomanticMusicPlayer />
      <RelationshipAIAssistant />
    </div>
  );
}