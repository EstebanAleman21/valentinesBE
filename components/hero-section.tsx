"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FloatingHearts } from "./floating-hearts";

export function HeroSection() {
  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4"
      style={{
        background:
          "linear-gradient(180deg, hsl(340 60% 92%) 0%, hsl(30 100% 96%) 100%)",
      }}
    >
      <FloatingHearts />
      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.h1
          className="font-serif text-5xl font-bold tracking-tight text-foreground md:text-7xl lg:text-8xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          La historia mas maravillosa.
        </motion.h1>
        <motion.p
          className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground md:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Todo historia de amor desde hace miles de años, en obras de teatro hasta hoy en dia en Instagram tienen lo suyo, sin embargo... La nuestra es mi favorita.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <a
            href="#together-counter"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:shadow-xl hover:brightness-110"
          >
            Descubrelo :)
            <ChevronDown className="h-4 w-4" />
          </a>
        </motion.div>
      </motion.div>
      <motion.div
        className="absolute bottom-8"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <ChevronDown className="h-6 w-6 text-muted-foreground" />
      </motion.div>
    </section>
  );
}
