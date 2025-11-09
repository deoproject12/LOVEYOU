'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Heart, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import FloatingHearts from '@/components/floating-hearts';
import RomanticMusicPlayer from '@/components/romantic-music-player';
import AdminNav from '@/components/admin-nav';

export default function VerificationPage() {
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Check if the answer is correct
    if (answer.toLowerCase().trim() === 'abdullah') {
      // Store verification in localStorage or session
      localStorage.setItem('verified', 'true');

      // Add a success message
      toast.success('Selamat! Jawaban benar! ❤️');

      // Redirect to the main page after a short delay
      setTimeout(() => {
        router.push('/');
      }, 1500);
    } else {
      // Show error animation and message
      toast.error('Maaf, jawaban salah! 😢 Coba lagi...');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 dark:from-pink-900/20 dark:via-gray-900 dark:to-rose-900/20 flex flex-col relative">
      <AdminNav />
      <FloatingHearts />
      <div className="relative z-10 flex items-center justify-center flex-1 p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="border-pink-200 dark:border-pink-700 shadow-lg bg-gradient-to-b from-pink-50 to-white dark:from-pink-900/30 dark:to-gray-800 relative overflow-hidden">
            <div className="absolute -top-6 -right-6 text-4xl opacity-20">💕</div>
            <div className="absolute -bottom-6 -left-6 text-4xl opacity-20">🌸</div>
            <CardHeader className="text-center space-y-4 relative z-10">
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }}
                className="flex justify-center"
              >
                <Heart className="w-16 h-16 text-pink-500" />
              </motion.div>
              <CardTitle className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                Verifikasi Spesial
              </CardTitle>
              <p className="text-gray-600 dark:text-gray-300">
                Untuk melanjutkan, jawab pertanyaan berikut:
              </p>
            </CardHeader>
            <CardContent className="space-y-6 relative z-10">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  Siapa cowo terganteng? 💖
                </h3>
                <div className="flex justify-center mt-2 space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                      className="text-xl"
                    >
                      💕
                    </motion.div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Tulis jawabanmu di sini..."
                  className="text-center text-lg py-6"
                  disabled={isLoading}
                />

                <Button
                  type="submit"
                  className="w-full py-6 text-lg bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                  disabled={isLoading}
                >
                  {isLoading ? 'Memeriksa...' : 'Verifikasi'}
                </Button>
              </form>

              <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                <p>Hanya orang yang tahu jawabannya yang bisa melihat keindahan cinta ini...</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <RomanticMusicPlayer />
    </div>
  );
}