"use client";

import { motion } from "framer-motion";
import { LoveCard } from "./love-card";

const reasons = [
  {
    title: "Tu sonrisa",
    description:
      "La forma en que tu sonrisa ilumina cada lugar al que entras. Fue lo primero de lo que me enamoré y todavía hace que mi corazón se acelere.",
  },
  {
    title: "Tu bondad",
    description:
      "Tienes el corazón más hermoso. La manera en que cuidas a todos a tu alrededor me inspira a ser una mejor persona cada día.",
  },
  {
    title: "Tu risa",
    description:
      "Me encanta tu risa tan preciosa que hace que aun cuando me siento mal o estresado me aliviana el dia por completo.",
  },
  {
    title: "Tu fortaleza",
    description:
      "La forma en que enfrentas cada desafío es asombroso me encanta. Tu forma de ver las cosas positivas es una de las cosas que más admiro de ti.",
  },
  {
    title: "Tu chisqueadez",
    description:
      "Lo adoroooo, me encanta como es cada partecita de ti, tu forma de ser tan chisqueada es una de las cosas que más amo de ti, y que mas disfruto todooos los dias.",
  },
  {
    title: "Tu paciencia conmigo jeje",
    description:
      "Cómo siempre sabes el momento adecuado para escuchar y el momento adecuado para hablar. Me haces sentir realmente escuchado.",
  },
  {
    title: "Tu creatividad",
    description:
      "Admiro tu manera de ser tan creativa con aboslutamente todo, manualidades, arte, etc. Te lo juro qu eme encanta!",
  },
  {
    title: "Todo",
    description:
      "Por que la verdad podria seguir aqui todo el dia diciendo cosas que amo de ti, pero la verdad es que amo absolutamente todo de ti, cada partecita de ti es lo que me hace amarte tanto, y lo que me hace querer seguir amandote cada dia mas y mas.",
  },
];


export function WhyILoveYou() {
  return (
    <section id="why-i-love-you" className="px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-4xl font-bold text-foreground md:text-5xl">
            ¿Por qué te amo con todo mi corazón?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            Estas son algunas de las millones de razones por las que eres lo mejor que me ha pasado.
          </p>
        </motion.div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, i) => (
            <LoveCard
              key={reason.title}
              title={reason.title}
              description={reason.description}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
