"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Heart } from "lucide-react";
import confetti from "canvas-confetti";

export function AnnoyMeForever() {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);

    // Fire confetti
    const defaults = {
      spread: 360,
      ticks: 80,
      gravity: 0.6,
      decay: 0.94,
      startVelocity: 20,
      colors: ["#f9c6d3", "#e75480", "#fff6ec", "#ff85a2", "#ffd1dc"],
    };

    confetti({
      ...defaults,
      particleCount: 60,
      origin: { x: 0.5, y: 0.6 },
    });

    setTimeout(() => {
      confetti({
        ...defaults,
        particleCount: 40,
        origin: { x: 0.3, y: 0.5 },
      });
    }, 200);

    setTimeout(() => {
      confetti({
        ...defaults,
        particleCount: 40,
        origin: { x: 0.7, y: 0.5 },
      });
    }, 400);

    // Open mailto
    const email = "email@example.com";
    const subject = encodeURIComponent("I'm thinking about you \u2764\uFE0F");
    const body = encodeURIComponent(
      "Hey you,\n\nJust wanted to let you know that you crossed my mind (again). You always do.\n\nI love you more than words could ever say.\n\nForever yours \u2764\uFE0F"
    );
    window.open(`mailto:${email}?subject=${subject}&body=${body}`, "_self");
  };

  return (
    <section className="px-4 py-24 md:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-4xl font-bold text-foreground md:text-5xl">
            {"Molestame"}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            Andale te doy permiso tlj, hazlo sin miedo al excito!!
          </p>
        </motion.div>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <button
            type="button"
            onClick={handleClick}
            className="group inline-flex items-center gap-3 rounded-full bg-primary px-10 py-4 text-lg font-semibold text-primary-foreground shadow-lg transition-all hover:shadow-xl hover:brightness-110"
          >
            <Mail className="h-5 w-5 transition-transform group-hover:-rotate-12" />
            Mandame un abracho
            <Heart className="h-5 w-5 transition-transform group-hover:scale-125" />
          </button>
        </motion.div>

        <AnimatePresence>
          {clicked && (
            <motion.p
              className="mt-8 font-serif text-lg italic text-primary"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              Felicidades ahora me podras molestar mmmm siempre :)
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
