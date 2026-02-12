"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface GalleryItemProps {
  src: string;
  alt: string;
  index: number;
  onClick: () => void;
}

export function GalleryItem({ src, alt, index, onClick }: GalleryItemProps) {
  return (
    <motion.button
      type="button"
      className="group relative overflow-hidden rounded-2xl shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      aria-label={`View ${alt}`}
    >
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={600}
        height={400}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/10" />
    </motion.button>
  );
}
