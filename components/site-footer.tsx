"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export function SiteFooter() {
  return (
    <footer
      className="px-4 py-16"
      style={{
        background:
          "linear-gradient(0deg, hsl(340 60% 92%) 0%, hsl(30 100% 96%) 100%)",
      }}
    >
      <motion.div
        className="mx-auto flex max-w-md flex-col items-center gap-4 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="font-serif text-lg italic text-foreground">
          You are the best chapter in my story.
        </p>
        <Heart className="h-5 w-5 text-primary" />
        <p className="text-sm text-muted-foreground">
          {"Made with \u2764\uFE0F just for you"}
        </p>
      </motion.div>
    </footer>
  );
}
