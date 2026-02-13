"use client";

import { motion } from "framer-motion";

const notes = [
  { text: "Me encantan tus abrachos", color: "bg-[#f9c6d3]", rotate: -3 },
  { text: "Tu eres mi hogar", color: "bg-[#fff6ec]", rotate: 2 },
  { text: "Haces que los días normales se sientan asombrosos.", color: "bg-[#fde4cf]", rotate: -1.5 },
  { text: "Te amo más que ayer, menos que mañana.", color: "bg-[#f9c6d3]", rotate: 3 },
  { text: "Gracias por ser tú.", color: "bg-[#fff6ec]", rotate: -2.5 },
  { text: "Eres el amor de mi vida", color: "bg-[#fde4cf]", rotate: 1.5 },
  { text: "Para siempre suena perfecto contigo.", color: "bg-[#f9c6d3]", rotate: -1 },
  { text: "Por cierto, te amo.", color: "bg-[#fff6ec]", rotate: 2.5 },
];

export function LittleNotes() {
  return (
    <section className="bg-secondary/40 px-4 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-4xl font-bold text-foreground md:text-5xl">
            Pequeños Recordatorios
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
             Pequeños recordatorios de lo mucho que te amo.
          </p>
        </motion.div>
        <div className="flex flex-wrap items-center justify-center gap-6">
          {notes.map((note, i) => (
            <motion.div
              key={note.text}
              className={`${note.color} w-44 rounded-lg p-5 shadow-md md:w-52`}
              style={{ rotate: `${note.rotate}deg` }}
              initial={{ opacity: 0, scale: 0.8, rotate: note.rotate }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{
                scale: 1.08,
                rotate: 0,
                boxShadow: "0 10px 30px rgba(231, 84, 128, 0.15)",
              }}
            >
              <p className="font-serif text-sm italic leading-relaxed text-foreground">
                {`"${note.text}"`}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
