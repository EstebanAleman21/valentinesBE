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
      "Esa risa que empieza suave y luego lo invade todo. Es el sonido más contagioso y maravilloso del mundo.",
  },
  {
    title: "Tu fortaleza",
    description:
      "La forma en que enfrentas cada desafío con gracia y determinación. Tu resiliencia es una de las cosas que más admiro de ti.",
  },
  {
    title: "Tu rareza",
    description:
      "Esas pequeñas cosas peculiares que haces y que nadie más hace. Cada uno de esos momentos me hace enamorarme de ti una y otra vez.",
  },
  {
    title: "Tus sueños",
    description:
      "La manera en que tus ojos brillan cuando hablas de lo que te apasiona. Me encanta verte perseguir tus sueños.",
  },
  {
    title: "Tu paciencia",
    description:
      "Cómo siempre sabes el momento adecuado para escuchar y el momento adecuado para hablar. Me haces sentir realmente escuchado.",
  },
  {
    title: "Todo",
    description:
      "Porque enumerar razones me llevaría una eternidad. Te amo por las cosas grandes, las pequeñas y todo lo que hay en medio.",
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
            Why I Love You
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            A few of the million reasons why you are the best thing that ever
            happened to me.
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
