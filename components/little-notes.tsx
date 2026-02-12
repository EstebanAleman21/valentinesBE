"use client";

import { motion } from "framer-motion";

const notes = [
  { text: "You are my favorite notification.", color: "bg-[#f9c6d3]", rotate: -3 },
  { text: "Home is wherever I am with you.", color: "bg-[#fff6ec]", rotate: 2 },
  { text: "You make ordinary days feel magical.", color: "bg-[#fde4cf]", rotate: -1.5 },
  { text: "I love you more than yesterday, less than tomorrow.", color: "bg-[#f9c6d3]", rotate: 3 },
  { text: "Thank you for being you.", color: "bg-[#fff6ec]", rotate: -2.5 },
  { text: "You are worth every mile.", color: "bg-[#fde4cf]", rotate: 1.5 },
  { text: "Forever sounds perfect with you.", color: "bg-[#f9c6d3]", rotate: -1 },
  { text: "P.S. I adore you.", color: "bg-[#fff6ec]", rotate: 2.5 },
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
            Little Notes
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            Tiny love letters I wish I could slip into your pocket every day.
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
