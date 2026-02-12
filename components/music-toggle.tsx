"use client";

import { useState, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

export function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        // Autoplay may be blocked
      });
    }
    setPlaying(!playing);
  };

  return (
    <>
      {/* biome-ignore lint: audio element with manual controls */}
      <audio ref={audioRef} loop preload="none">
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>
      <motion.button
        type="button"
        onClick={toggle}
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-card text-foreground shadow-lg transition-colors hover:bg-secondary"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={playing ? "Mute music" : "Play music"}
        title={playing ? "Mute music" : "Play music"}
      >
        {playing ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
      </motion.button>
    </>
  );
}
