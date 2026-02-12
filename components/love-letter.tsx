"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

const letterText = `My dearest,

From the very first moment I saw you, something in me knew that you were going to change my life. I did not know how, and I did not know when, but I felt it in every part of me.

You walked into my world and suddenly everything made sense. The songs I never understood, the poems that felt exaggerated, the movies I thought were unrealistic — you made all of it real.

I love the way you scrunch your nose when you laugh too hard. I love the way you hold my hand a little tighter when you are nervous. I love the way you always save the last bite for me even though you pretend you don't.

There are days when the world feels heavy, but then I look at you and I remember — I have the best reason to keep going. You are my peace, my chaos, my calm in the storm, and the storm itself.

Thank you for choosing me. Thank you for staying. Thank you for being the most extraordinary part of my ordinary life.

I will love you in this lifetime and every one after it.

Forever yours.`;

function TypewriterText({ text, speed = 25 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    indexRef.current = 0;
    setDisplayed("");
    setDone(false);

    const interval = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayed(text.slice(0, indexRef.current + 1));
        indexRef.current += 1;
      } else {
        setDone(true);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <p className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground md:text-base">
      {displayed}
      {!done && (
        <span className="inline-block w-0.5 h-4 bg-primary animate-pulse ml-0.5 align-middle" />
      )}
    </p>
  );
}

export function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="bg-secondary/40 px-4 py-24 md:py-32">
      <div className="mx-auto max-w-3xl">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-4xl font-bold text-foreground md:text-5xl">
            A Letter For You
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            Some things are better written than spoken. Open it when you are ready.
          </p>
        </motion.div>

        <div className="flex justify-center">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              <motion.button
                key="envelope"
                type="button"
                onClick={() => setIsOpen(true)}
                className="group relative cursor-pointer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, y: -30 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                {/* Envelope body */}
                <div className="relative h-48 w-72 rounded-xl bg-[#f9c6d3] shadow-lg md:h-56 md:w-96">
                  {/* Envelope flap */}
                  <div
                    className="absolute inset-x-0 top-0 h-24 origin-top md:h-28"
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                      background: "hsl(340 72% 55%)",
                    }}
                  />
                  {/* Heart seal */}
                  <div className="absolute inset-0 flex items-center justify-center pt-4">
                    <motion.div
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <Heart className="h-10 w-10 fill-primary-foreground text-primary-foreground drop-shadow-md" />
                    </motion.div>
                  </div>
                  {/* Bottom fold lines */}
                  <div
                    className="absolute inset-x-0 bottom-0 h-24 md:h-28"
                    style={{
                      clipPath: "polygon(0 100%, 50% 0, 100% 100%)",
                      background: "hsl(340 60% 85%)",
                    }}
                  />
                </div>
                <p className="mt-6 text-center font-serif text-base italic text-muted-foreground transition-colors group-hover:text-primary">
                  Tap to open
                </p>
              </motion.button>
            ) : (
              <motion.div
                key="letter"
                className="w-full max-w-2xl rounded-2xl border border-border bg-card p-8 shadow-xl md:p-12"
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="mb-6 flex items-center gap-2">
                  <Heart className="h-5 w-5 fill-primary text-primary" />
                  <span className="font-serif text-xs uppercase tracking-widest text-muted-foreground">
                    A love letter
                  </span>
                </div>
                <TypewriterText text={letterText} speed={20} />
                <motion.div
                  className="mt-8 flex justify-end"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 20 }}
                >
                  <Heart className="h-4 w-4 fill-primary text-primary" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
