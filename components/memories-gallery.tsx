"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { GalleryItem } from "./gallery-item";

const photos = [
  { src: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&h=400&fit=crop", alt: "Couple walking on the beach" },
  { src: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=600&h=400&fit=crop", alt: "Sunset picnic together" },
  { src: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&h=400&fit=crop", alt: "Dancing in the rain" },
  { src: "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=600&h=400&fit=crop", alt: "Coffee date morning" },
  { src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&h=400&fit=crop", alt: "Road trip adventure" },
  { src: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=600&h=400&fit=crop", alt: "Stargazing night" },
];

export function MemoriesGallery() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section className="bg-secondary/40 px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-4xl font-bold text-foreground md:text-5xl">
            Our Memories
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            Every picture holds a thousand words, but none of them can capture
            how happy you make me.
          </p>
        </motion.div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo, i) => (
            <GalleryItem
              key={photo.alt}
              src={photo.src}
              alt={photo.alt}
              index={i}
              onClick={() => setSelected(i)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/70 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Photo preview"
          >
            <motion.div
              className="relative max-h-[85vh] max-w-3xl overflow-hidden rounded-2xl shadow-2xl"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={photos[selected].src.replace("w=600&h=400", "w=1200&h=800") || "/placeholder.svg"}
                alt={photos[selected].alt}
                width={1200}
                height={800}
                className="h-auto w-full object-contain"
              />
              <button
                type="button"
                className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-foreground shadow-md backdrop-blur-sm transition-colors hover:bg-background"
                onClick={() => setSelected(null)}
                aria-label="Close preview"
              >
                <X className="h-5 w-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
