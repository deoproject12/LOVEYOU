"use client";

import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Users, Heart, Calendar, Coffee, Star } from "lucide-react";
import { motion } from 'framer-motion';
import Image from "next/image";
import AdminNav from '@/components/admin-nav';

export default function AboutPage() {
  const [aboutInfo, setAboutInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data for about information
    const mockAboutInfo = {
      couple: {
        name1: "Abdullah",
        name2: "Nayla",
        relationshipSince: "15 Mei 2020",
        relationshipDays: 2083, // Approximate from May 2020 to Nov 2025
        sharedInterests: ["Travelling", "Cooking", "Music", "Watching Movies", "Reading"],
        favoriteThingAboutEachOther: {
          abdullah: "Ketulusan hati dan senyuman manismu yang selalu mampu membuatku bahagia",
          nayla: "Kesetiaan dan perhatianmu yang selalu membuatku merasa menjadi orang paling berharga"
        }
      },
      stats: [
        { label: "Kencan Spesial", value: "40+" },
        { label: "Tempat Dikunjungi", value: "12" },
        { label: "Lagu Dibagi", value: "100+" },
        { label: "Momen Tak Terlupakan", value: "∞" }
      ]
    };

    setTimeout(() => {
      setAboutInfo(mockAboutInfo);
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
            <Users className="w-12 h-12 text-pink-500" />
          </motion.div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 bg-clip-text text-transparent font-parkinsans mb-4">
            Tentang Kami
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Cerita cinta Abdullah & Nayla, kisah yang penuh dengan kasih sayang dan kebahagiaan
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Couple Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="flex justify-center space-x-8 mb-8">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl font-bold">{aboutInfo?.couple?.name1?.charAt(0)}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">{aboutInfo?.couple?.name1}</h3>
                </div>
                <div className="flex items-center justify-center">
                  <Heart className="w-8 h-8 text-pink-500" />
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl font-bold">{aboutInfo?.couple?.name2?.charAt(0)}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">{aboutInfo?.couple?.name2}</h3>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-pink-100 to-rose-100 dark:from-pink-900/20 dark:to-rose-900/20 rounded-2xl p-8">
                <div className="flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-pink-500 mr-2" />
                  <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Bersama sejak {aboutInfo?.couple?.relationshipSince} • {aboutInfo?.couple?.relationshipDays}+ hari
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Kami adalah sepasang kekasasih yang menjalani hubungan penuh cinta, 
                  tawa, dan pengertian. Setiap hari bersama adalah anugerah yang tak ternilai.
                </p>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {aboutInfo?.stats?.map((stat: any, index: number) => (
                <div 
                  key={index} 
                  className="bg-gradient-to-br from-pink-50 to-white dark:from-pink-900/20 dark:to-gray-800 rounded-xl p-6 text-center shadow"
                >
                  <div className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-2">{stat.value}</div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Shared Interests */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-br from-pink-50 to-white dark:from-pink-900/20 dark:to-gray-800 rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">Minat Bersama</h2>
              <div className="flex flex-wrap justify-center gap-3">
                {aboutInfo?.couple?.sharedInterests?.map((interest: string, index: number) => (
                  <span 
                    key={index} 
                    className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full text-sm font-medium"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Favorite Things */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <div className="bg-gradient-to-br from-pink-50 to-white dark:from-pink-900/20 dark:to-gray-800 rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                  <Heart className="w-5 h-5 text-pink-500 mr-2" />
                  Apa yang Abdullah Kagumi dari Nayla
                </h3>
                <p className="text-gray-600 dark:text-gray-400 italic">"{aboutInfo?.favoriteThingAboutEachOther?.abdullah}"</p>
              </div>
              
              <div className="bg-gradient-to-br from-rose-50 to-white dark:from-rose-900/20 dark:to-gray-800 rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                  <Heart className="w-5 h-5 text-rose-500 mr-2" />
                  Apa yang Nayla Kagumi dari Abdullah
                </h3>
                <p className="text-gray-600 dark:text-gray-400 italic">"{aboutInfo?.favoriteThingAboutEachOther?.nayla}"</p>
              </div>
            </motion.div>

            {/* Special Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center py-12"
            >
              <div className="inline-block">
                <Star className="w-12 h-12 text-pink-500 mx-auto mb-4" />
                <blockquote className="text-2xl font-medium text-gray-800 dark:text-gray-200 italic max-w-2xl mx-auto">
                  "Cinta bukan tentang bagaimana lama kita bersama, tapi seberapa dalam kita saling mencintai dan memahami satu sama lain."
                </blockquote>
                <p className="mt-6 text-lg text-pink-600 dark:text-pink-400 font-semibold">
                  - Abdullah & Nayla
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}