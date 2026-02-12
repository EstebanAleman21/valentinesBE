"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const START_DATE = new Date("2023-11-28T00:00:00");

function getTimeSince(start: Date) {
  const now = new Date();
  const diff = now.getTime() - start.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  if (now.getDate() < start.getDate()) {
    months -= 1;
    if (months < 0) {
      years -= 1;
      months += 12;
    }
  }

  const remainingDays = days - Math.floor((years * 365.25) + (months * 30.44));

  return {
    years,
    months,
    days: Math.max(0, remainingDays),
    hours: hours % 24,
    minutes: minutes % 60,
    seconds: seconds % 60,
    totalDays: days,
  };
}

function CounterUnit({ value, label, index }: { value: number; label: string; index: number }) {
  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-card shadow-md md:h-24 md:w-24">
        <motion.span
          key={value}
          className="font-serif text-3xl font-bold text-primary md:text-4xl"
          initial={{ y: -8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {value}
        </motion.span>
      </div>
      <span className="mt-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
    </motion.div>
  );
}

export function TogetherCounter() {
  const [time, setTime] = useState(getTimeSince(START_DATE));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeSince(START_DATE));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { value: time.years, label: "Years" },
    { value: time.months, label: "Months" },
    { value: time.days, label: "Days" },
    { value: time.hours, label: "Hours" },
    { value: time.minutes, label: "Minutes" },
    { value: time.seconds, label: "Seconds" },
  ];

  return (
    <section className="px-4 py-24 md:py-32">
      <div className="mx-auto max-w-3xl">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-4xl font-bold text-foreground md:text-5xl">
            How Long We Have Been Together
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            Every second with you is a second I treasure.
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          {units.map((unit, i) => (
            <CounterUnit key={unit.label} value={unit.value} label={unit.label} index={i} />
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="inline-flex items-center gap-2 font-serif text-lg italic text-muted-foreground">
            <Heart className="h-4 w-4 fill-primary text-primary" />
            That is {time.totalDays.toLocaleString()} days of loving you
            <Heart className="h-4 w-4 fill-primary text-primary" />
          </p>
        </motion.div>
      </div>
    </section>
  );
}
