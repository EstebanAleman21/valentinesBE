"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface TimelineItemProps {
  date: string;
  title: string;
  description: string;
  index: number;
  isLast: boolean;
}

export function TimelineItem({
  date,
  title,
  description,
  index,
  isLast,
}: TimelineItemProps) {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      className="relative flex w-full items-start gap-6 md:gap-0"
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      {/* Left side content (desktop) */}
      <div className="hidden w-5/12 md:block">
        {isLeft && (
          <div className="pr-8 text-right">
            <p className="text-sm font-semibold text-primary">{date}</p>
            <h3 className="mt-1 font-serif text-xl font-semibold text-foreground">
              {title}
            </h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
        )}
      </div>

      {/* Center line + dot */}
      <div className="relative flex flex-col items-center">
        <div className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary shadow-md">
          <Heart className="h-4 w-4 text-primary-foreground" />
        </div>
        {!isLast && (
          <motion.div
            className="w-0.5 grow bg-border"
            style={{ minHeight: 80 }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
          />
        )}
      </div>

      {/* Right side content (desktop) / Main content (mobile) */}
      <div className="flex-1 pb-12 md:w-5/12 md:flex-none">
        {/* Mobile: always show */}
        <div className="md:hidden">
          <p className="text-sm font-semibold text-primary">{date}</p>
          <h3 className="mt-1 font-serif text-xl font-semibold text-foreground">
            {title}
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
        {/* Desktop: only show on right */}
        {!isLeft && (
          <div className="hidden pl-8 md:block">
            <p className="text-sm font-semibold text-primary">{date}</p>
            <h3 className="mt-1 font-serif text-xl font-semibold text-foreground">
              {title}
            </h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
