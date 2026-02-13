"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { GalleryItem } from "./gallery-item";

const photos = [
  { src: "/static/images/50A31BF8-D358-4041-B9BA-3061A0117246.JPG", alt: "Our beautiful memory" },
  { src: "/static/images/66f56612-0d80-49a3-967c-52e6ac99cb9b.JPG", alt: "Together forever" },
  { src: "/static/images/DSCN1377.JPG", alt: "Special moment" },
  { src: "/static/images/DSCN1596.JPG", alt: "Happy times" },
  { src: "/static/images/F38A3BC9-06C7-417D-B2F3-6283DEDE624D.JPG", alt: "Making memories" },
  { src: "/static/images/IMG_1837.JPG", alt: "Adventure together" },
  { src: "/static/images/IMG_2876.JPG", alt: "Our love story" },
  { src: "/static/images/IMG_2994.JPG", alt: "Sweet moments" },
  { src: "/static/images/IMG_3046.JPG", alt: "Forever and always" },
  { src: "/static/images/IMG_3105.JPG", alt: "Cherished memory" },
  { src: "/static/images/IMG_3349.jpg", alt: "You and me" },
  { src: "/static/images/IMG_3449.JPG", alt: "Perfect day" },
  { src: "/static/images/IMG_3526.JPG", alt: "Unforgettable moment" },
  { src: "/static/images/IMG_3581.jpg", alt: "Love captured" },
  { src: "/static/images/IMG_4266.JPG", alt: "Beautiful together" },
  { src: "/static/images/IMG_4338.JPG", alt: "Our journey" },
];

export function MemoriesGallery() {
  const [selected, setSelected] = useState<number | null>(null);
  const [displayIndices, setDisplayIndices] = useState([0, 1, 2, 3, 4, 5]);

  // Auto-cycle one random tile every 6 seconds, ensuring no duplicates
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayIndices((prev) => {
        const newIndices = [...prev];
        const randomTileIndex = Math.floor(Math.random() * 6);
        
        // Find a photo that's not already displayed
        let newPhotoIndex;
        let attempts = 0;
        do {
          newPhotoIndex = Math.floor(Math.random() * photos.length);
          attempts++;
        } while (newIndices.includes(newPhotoIndex) && attempts < 50);
        
        newIndices[randomTileIndex] = newPhotoIndex;
        return newIndices;
      });
    }, 6000);

    return () => clearInterval(interval);
  }, []);

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
          {displayIndices.map((photoIndex, i) => (
            <AnimatePresence mode="wait" key={i}>
              <motion.div
                key={`${photoIndex}-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <GalleryItem
                  src={photos[photoIndex].src}
                  alt={photos[photoIndex].alt}
                  index={photoIndex}
                  onClick={() => setSelected(photoIndex)}
                />
              </motion.div>
            </AnimatePresence>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Photo preview"
          >
            <motion.div
              className="relative flex max-h-[90vh] max-w-[90vw] items-center justify-center"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={photos[selected].src}
                alt={photos[selected].alt}
                width={1200}
                height={1600}
                className="max-h-[90vh] w-auto rounded-2xl shadow-2xl object-contain"
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
