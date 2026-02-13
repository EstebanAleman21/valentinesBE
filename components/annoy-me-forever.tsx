"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Heart } from "lucide-react";
import confetti from "canvas-confetti";
import emailjs from "@emailjs/browser";

export function AnnoyMeForever() {
  const [clicked, setClicked] = useState(false);
  const [sending, setSending] = useState(false);

  const handleClick = async () => {
    if (sending) return;
    
    setSending(true);
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

    // Send email using EmailJS
    try {
      await emailjs.send(
        'service_i596kms', // You'll need to replace this
        'template_n547r39', // You'll need to replace this
        {
          to_email: 'esteban21112002@gmail.com',
          message: 'Te extraño, aquí estoy molestándote ❤️',
        },
        'lfsf9oAUbJohqnjrD' // You'll need to replace this
      );
      console.log('Email sent successfully!');
    } catch (error) {
      console.error('Failed to send email:', error);
    } finally {
      setSending(false);
    }
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
            disabled={sending}
            className="group inline-flex items-center gap-3 rounded-full bg-primary px-10 py-4 text-lg font-semibold text-primary-foreground shadow-lg transition-all hover:shadow-xl hover:brightness-110 disabled:opacity-50"
          >
            <Mail className="h-5 w-5 transition-transform group-hover:-rotate-12" />
            {sending ? "Enviando..." : "Mandame un abracho"}
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
