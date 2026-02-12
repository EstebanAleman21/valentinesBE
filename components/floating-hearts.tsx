"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function FloatingHearts() {
  const [hearts, setHearts] = useState<Array<{
    id: number;
    x: number;
    delay: number;
    duration: number;
    size: number;
    opacity: number;
    sway: number;
  }> | null>(null);

  useEffect(() => {
    setHearts(
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 8 + Math.random() * 8,
        size: 12 + Math.random() * 18,
        opacity: 0.08 + Math.random() * 0.12,
        sway: Math.sin(i) * 40,
      }))
    );
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {hearts?.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-primary"
          style={{
            left: `${heart.x}%`,
            fontSize: heart.size,
            opacity: heart.opacity,
            bottom: -30,
          }}
          animate={{
            y: [0, -900],
            x: [0, heart.sway],
            rotate: [0, 360],
          }}
          transition={{
            duration: heart.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: heart.delay,
            ease: "linear",
          }}
        >
          {"\u2665"}
        </motion.div>
      ))}
    </div>
  );
}
