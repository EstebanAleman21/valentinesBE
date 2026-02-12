"use client";

import { motion } from "framer-motion";
import { LoveCard } from "./love-card";

const reasons = [
  {
    title: "Your Smile",
    description:
      "The way your smile lights up every room you walk into. It is the first thing I fell in love with and still makes my heart skip.",
  },
  {
    title: "Your Kindness",
    description:
      "You have the most beautiful heart. The way you care for everyone around you inspires me to be a better person every single day.",
  },
  {
    title: "Your Laugh",
    description:
      "That laugh that starts quietly and then takes over completely. It is the most contagious and wonderful sound in the world.",
  },
  {
    title: "Your Strength",
    description:
      "How you face every challenge with grace and determination. Your resilience is one of the things I admire most about you.",
  },
  {
    title: "Your Weirdness",
    description:
      "The little quirky things you do that nobody else does. Every one of those little moments makes me fall for you all over again.",
  },
  {
    title: "Your Dreams",
    description:
      "The way your eyes sparkle when you talk about things you are passionate about. I love watching you chase your dreams.",
  },
  {
    title: "Your Patience",
    description:
      "How you always know the right moment to listen and the right moment to speak. You make me feel truly heard.",
  },
  {
    title: "Everything",
    description:
      "Because listing reasons would take forever. I love you for the big things, the small things, and everything in between.",
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
