"use client";

import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Camera, Heart, MessageCircle } from "lucide-react";
import { motion } from 'framer-motion';
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FloatingHearts from '@/components/floating-hearts';
import RomanticMusicPlayer from '@/components/romantic-music-player';
import AdminNav from '@/components/admin-nav';

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Load gallery data from server
  useEffect(() => {
    const loadGallery = async () => {
      try {
        const response = await fetch('/api/gallery');
        if (response.ok) {
          const data = await response.json();
          // Format data to include likes
          const formattedData = data.map((item: any) => ({
            ...item,
            likes: item.likes || Math.floor(Math.random() * 50) + 10 // Random likes if not specified
          }));
          setGalleryItems(formattedData);
        } else {
          // Fallback to mock data if API fails
          const mockGallery = [
            {
              id: 1,
              imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop",
              caption: "Hari pertama kita bertemu di kafe kecil",
              date: "15 Mei 2020",
              likes: 24
            },
            {
              id: 2,
              imageUrl: "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?w=800&h=600&fit=crop",
              caption: "Kencan pertama kita, seolah waktu berhenti untuk kita berdua",
              date: "20 Juni 2020",
              likes: 32
            },
            {
              id: 3,
              imageUrl: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&h=600&fit=crop",
              caption: "Pengakuan cinta di hari valentine yang tak terlupakan",
              date: "14 Feb 2021",
              likes: 45
            },
            {
              id: 4,
              imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
              caption: "Petualangan pertama kita ke Gunung Bromo",
              date: "10 Juli 2021",
              likes: 28
            },
            {
              id: 5,
              imageUrl: "https://images.unsplash.com/photo-1517248135467-4d348d3b1eba?w=800&h=600&fit=crop",
              caption: "Momen romantis menatap bintang-bintang di malam hari",
              date: "12 Des 2021",
              likes: 39
            },
            {
              id: 6,
              imageUrl: "https://images.unsplash.com/photo-1533090368676-1fd25485db88?w=800&h=600&fit=crop",
              caption: "Perjalanan ke tempat-tempat indah bersama",
              date: "8 Mar 2022",
              likes: 27
            },
            {
              id: 7,
              imageUrl: "https://images.unsplash.com/photo-1511497584788-876760239760?w=800&h=600&fit=crop",
              caption: "Tertawa bersama dalam kebahagiaan",
              date: "22 Mei 2022",
              likes: 31
            },
            {
              id: 8,
              imageUrl: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop",
              caption: "Kesederhanaan yang membuat kita bahagia",
              date: "5 Agu 2022",
              likes: 22
            }
          ];
          setGalleryItems(mockGallery);
        }
      } catch (error) {
        console.error('Error loading gallery:', error);
        // Fallback to mock data
        const mockGallery = [
          {
            id: 1,
            imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop",
            caption: "Hari pertama kita bertemu di kafe kecil",
            date: "15 Mei 2020",
            likes: 24
          },
          {
            id: 2,
            imageUrl: "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?w=800&h=600&fit=crop",
            caption: "Kencan pertama kita, seolah waktu berhenti untuk kita berdua",
            date: "20 Juni 2020",
            likes: 32
          },
          {
            id: 3,
            imageUrl: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&h=600&fit=crop",
            caption: "Pengakuan cinta di hari valentine yang tak terlupakan",
            date: "14 Feb 2021",
            likes: 45
          },
          {
            id: 4,
            imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
            caption: "Petualangan pertama kita ke Gunung Bromo",
            date: "10 Juli 2021",
            likes: 28
          },
          {
            id: 5,
            imageUrl: "https://images.unsplash.com/photo-1517248135467-4d348d3b1eba?w=800&h=600&fit=crop",
            caption: "Momen romantis menatap bintang-bintang di malam hari",
            date: "12 Des 2021",
            likes: 39
          },
          {
            id: 6,
            imageUrl: "https://images.unsplash.com/photo-1533090368676-1fd25485db88?w=800&h=600&fit=crop",
            caption: "Perjalanan ke tempat-tempat indah bersama",
            date: "8 Mar 2022",
            likes: 27
          },
          {
            id: 7,
            imageUrl: "https://images.unsplash.com/photo-1511497584788-876760239760?w=800&h=600&fit=crop",
            caption: "Tertawa bersama dalam kebahagiaan",
            date: "22 Mei 2022",
            likes: 31
          },
          {
            id: 8,
            imageUrl: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop",
            caption: "Kesederhanaan yang membuat kita bahagia",
            date: "5 Agu 2022",
            likes: 22
          }
        ];
        setGalleryItems(mockGallery);
      } finally {
        setIsLoading(false);
      }
    };

    loadGallery();
  }, []);

  const openImage = (image: any) => {
    setSelectedImage(image);
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 dark:from-pink-900/20 dark:via-gray-900 dark:to-rose-900/20 relative">
      <AdminNav />
      <FloatingHearts />
      <div className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl pt-12">
          <div className="text-center mb-16 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-6"
            >
              <Camera className="w-12 h-12 text-pink-500" />
            </motion.div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 bg-clip-text text-transparent font-geist-sans mb-4">
              Galeri Kenangan
            </h1>
            <div className="flex justify-center mb-4">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    scale: [1, 1.3, 1],
                    rotate: [0, 15, -15, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  className="text-2xl mx-1"
                >
                  🌸
                </motion.div>
              ))}
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Kumpulan foto dan kenangan indah perjalanan cinta kami
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="cursor-pointer group relative"
                  onClick={() => openImage(item)}
                >
                  <div className="absolute -top-3 -right-3 text-xl z-20">💖</div>
                  <Card className="overflow-hidden bg-gradient-to-b from-pink-50 to-white dark:from-pink-900/20 dark:to-gray-800 border-pink-200 dark:border-pink-700 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="relative aspect-square">
                      <Image
                        src={item.imageUrl}
                        alt={item.caption}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-sm">{item.caption}</p>
                        <div className="flex items-center mt-2 text-xs">
                          <Heart className="w-3 h-3 mr-1" />
                          <span>{item.likes}</span>
                          <span className="mx-2">•</span>
                          <span>{item.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">{item.caption}</p>
                      <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                        <CalendarIcon className="w-3 h-3 mr-1" />
                        <span>{item.date}</span>
                        <span className="mx-2">•</span>
                        <Heart className="w-3 h-3 mr-1" />
                        <span>{item.likes}</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Dialog for enlarged image */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-4xl w-full p-0 border-0 bg-transparent shadow-none">
            <DialogHeader className="hidden">
              <DialogTitle>Gambar Kenangan</DialogTitle>
            </DialogHeader>
            {selectedImage && (
              <>
                <div className="relative aspect-square">
                  <Image
                    src={selectedImage.imageUrl}
                    alt={selectedImage.caption}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">{selectedImage.caption}</h3>
                  <div className="flex items-center justify-between">
                    <span>{selectedImage.date}</span>
                    <div className="flex items-center">
                      <Heart className="w-4 h-4 mr-1" />
                      <span>{selectedImage.likes}</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
      <RomanticMusicPlayer />
    </div>
  );
}

// Define CalendarIcon component for the gallery page
const CalendarIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
  </svg>
);