"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface LoveCardProps {
  title: string;
  description: string;
  index: number;
}

export function LoveCard({ title, description, index }: LoveCardProps) {
  return (
    <motion.div
      className="group cursor-default rounded-2xl bg-card p-6 shadow-sm transition-shadow hover:shadow-xl md:p-8"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.03 }}
    >
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
        <Heart className="h-5 w-5 text-primary" />
      </div>
      <h3 className="font-serif text-xl font-semibold text-foreground">
        {title}
      </h3>
      <p className="mt-2 leading-relaxed text-muted-foreground">
        {description}
      </p>
    </motion.div>
  );
}
