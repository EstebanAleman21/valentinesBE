"use client";

import { motion } from "framer-motion";
import { TimelineItem } from "./timeline-item";

const milestones = [
  {
    date: "July 19, 2024",
    title: "The Day We Met",
    description:
      "It was just another ordinary day until it wasn't. One look and I knew something extraordinary was about to begin.",
  },
  {
    date: "Summer 2024",
    title: "Our First Date",
    description:
      "Nervous butterflies, awkward laughs, and the beginning of something magical. That night changed everything.",
  },
  {
    date: "Fall 2024",
    title: "Falling For You",
    description:
      "Somewhere between the late-night calls and the little moments, I realized I was completely, hopelessly in love.",
  },
  {
    date: "Winter 2024",
    title: "Our First Holidays Together",
    description:
      "Cozy nights, shared laughter, and the warmth of having you by my side through the cold days.",
  },
  {
    date: "July 2025",
    title: "One Year of Us",
    description:
      "365 days of love, growth, laughter, and a few silly arguments that always ended in hugs.",
  },
  {
    date: "Today",
    title: "Still Falling",
    description:
      "Every day I discover something new to love about you. This is just the beginning of our forever.",
  },
];

export function TimelineSection() {
  return (
    <section className="px-4 py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-4xl font-bold text-foreground md:text-5xl">
            Timeline of Us
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            The chapters of our love story, each one more beautiful than the
            last.
          </p>
        </motion.div>
        <div className="flex flex-col items-center">
          {milestones.map((milestone, i) => (
            <TimelineItem
              key={milestone.date}
              date={milestone.date}
              title={milestone.title}
              description={milestone.description}
              index={i}
              isLast={i === milestones.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
