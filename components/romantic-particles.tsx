'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface RomanticParticle {
  id: number;
  x: number;
  y: number;
  type: 'heart' | 'flower' | 'star';
  size: number;
  duration: number;
}

export default function RomanticParticles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<RomanticParticle[]>([]);

  useEffect(() => {
    // Create initial particles
    const initialParticles: RomanticParticle[] = [];
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
      initialParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        type: ['heart', 'flower', 'star'][Math.floor(Math.random() * 3)] as 'heart' | 'flower' | 'star',
        size: Math.random() * 20 + 10,
        duration: Math.random() * 10 + 10,
      });
    }
    
    particlesRef.current = initialParticles;
  }, []);

  // Emoji untuk efek partikel
  const getParticleEmoji = (type: 'heart' | 'flower' | 'star') => {
    switch (type) {
      case 'heart': return '💖';
      case 'flower': return '🌸';
      case 'star': return '✨';
      default: return '💖';
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {particlesRef.current.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute text-2xl opacity-30"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            fontSize: `${particle.size}px`,
          }}
          animate={{
            y: [`-${particle.y * 2}%`, `100vh`],
            x: [`${particle.x}%`, `${particle.x + (Math.random() * 40 - 20)}%`],
            rotate: [0, 360],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {getParticleEmoji(particle.type)}
        </motion.div>
      ))}
    </div>
  );
}