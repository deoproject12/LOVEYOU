'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function FloatingHearts() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Set mounted to true on client side
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render empty fragment on server to avoid hydration mismatch
    return null;
  }

  // Generate particles only on client side
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute text-3xl opacity-20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          initial={{ y: 0, x: 0, rotate: 0, scale: 0.5 }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            rotate: [0, 360],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        >
          💖
        </motion.div>
      ))}
    </div>
  );
}