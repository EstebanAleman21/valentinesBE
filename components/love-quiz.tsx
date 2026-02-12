"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ChevronRight, RotateCcw } from "lucide-react";
import confetti from "canvas-confetti";

interface Question {
  question: string;
  options: string[];
  correct: number;
}

const questions: Question[] = [
  {
    question: "What is my favorite comfort food?",
    options: ["Pizza", "Pasta", "Sushi", "Tacos"],
    correct: 1,
  },
  {
    question: "What was the first movie we watched together?",
    options: ["The Notebook", "La La Land", "Titanic", "About Time"],
    correct: 3,
  },
  {
    question: "What is my go-to coffee order?",
    options: ["Espresso", "Iced Latte", "Cappuccino", "Flat White"],
    correct: 1,
  },
  {
    question: "What do I do when I can not sleep?",
    options: ["Read a book", "Scroll my phone", "Talk to you", "Overthink everything"],
    correct: 3,
  },
  {
    question: "Which song reminds me of us?",
    options: ["Perfect by Ed Sheeran", "All of Me by John Legend", "Lucky by Jason Mraz", "Thinking Out Loud by Ed Sheeran"],
    correct: 0,
  },
  {
    question: "What is my love language?",
    options: ["Words of Affirmation", "Quality Time", "Physical Touch", "Acts of Service"],
    correct: 2,
  },
];

const scoreMessages = [
  { min: 0, max: 2, title: "Hmm...", message: "Looks like we need more date nights! But hey, you are still my favorite person." },
  { min: 3, max: 4, title: "Not bad!", message: "You know me pretty well. A few more heart-to-hearts and you will ace this." },
  { min: 5, max: 5, title: "Almost perfect!", message: "You really pay attention. One more and you would have been flawless!" },
  { min: 6, max: 6, title: "Soulmate status!", message: "You know me better than I know myself. I am so lucky you are mine." },
];

function getScoreMessage(score: number) {
  return scoreMessages.find((m) => score >= m.min && score <= m.max) || scoreMessages[0];
}

export function LoveQuiz() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);

  const handleSelect = (optionIndex: number) => {
    if (answered) return;
    setSelected(optionIndex);
    setAnswered(true);
    if (optionIndex === questions[current].correct) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setShowResult(true);
      if (score >= 4) {
        confetti({
          particleCount: 80,
          spread: 360,
          origin: { x: 0.5, y: 0.5 },
          colors: ["#f9c6d3", "#e75480", "#fff6ec", "#ff85a2", "#ffd1dc"],
        });
      }
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setAnswered(false);
  };

  const question = questions[current];
  const result = getScoreMessage(score);

  return (
    <section className="bg-secondary/40 px-4 py-24 md:py-32">
      <div className="mx-auto max-w-2xl">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-4xl font-bold text-foreground md:text-5xl">
            How Well Do You Know Me?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            {"Let's see if you have been paying attention. No cheating!"}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={`q-${current}`}
              className="rounded-2xl border border-border bg-card p-8 shadow-lg md:p-10"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
            >
              {/* Progress */}
              <div className="mb-6 flex items-center justify-between">
                <span className="text-sm font-semibold text-muted-foreground">
                  Question {current + 1} of {questions.length}
                </span>
                <span className="text-sm font-semibold text-primary">
                  Score: {score}
                </span>
              </div>
              <div className="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <motion.div
                  className="h-full rounded-full bg-primary"
                  initial={{ width: `${(current / questions.length) * 100}%` }}
                  animate={{ width: `${((current + 1) / questions.length) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              {/* Question */}
              <h3 className="mb-8 font-serif text-xl font-bold text-foreground md:text-2xl">
                {question.question}
              </h3>

              {/* Options */}
              <div className="flex flex-col gap-3">
                {question.options.map((option, i) => {
                  let optionStyle = "border-border bg-background hover:border-primary/50 hover:bg-secondary/50";
                  if (answered) {
                    if (i === question.correct) {
                      optionStyle = "border-green-400 bg-green-50 text-green-800";
                    } else if (i === selected && i !== question.correct) {
                      optionStyle = "border-red-300 bg-red-50 text-red-700";
                    } else {
                      optionStyle = "border-border bg-muted/50 opacity-60";
                    }
                  } else if (i === selected) {
                    optionStyle = "border-primary bg-secondary";
                  }

                  return (
                    <motion.button
                      key={option}
                      type="button"
                      onClick={() => handleSelect(i)}
                      className={`flex items-center rounded-xl border-2 px-5 py-4 text-left text-sm font-medium transition-all md:text-base ${optionStyle}`}
                      whileHover={!answered ? { scale: 1.02 } : undefined}
                      whileTap={!answered ? { scale: 0.98 } : undefined}
                    >
                      <span className="mr-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">
                        {String.fromCharCode(65 + i)}
                      </span>
                      {option}
                    </motion.button>
                  );
                })}
              </div>

              {/* Next button */}
              {answered && (
                <motion.div
                  className="mt-8 flex justify-end"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:shadow-lg hover:brightness-110"
                  >
                    {current < questions.length - 1 ? "Next" : "See Results"}
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="result"
              className="rounded-2xl border border-border bg-card p-10 text-center shadow-lg md:p-14"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              >
                <Heart className="mx-auto h-16 w-16 fill-primary text-primary" />
              </motion.div>
              <h3 className="mt-6 font-serif text-3xl font-bold text-foreground md:text-4xl">
                {result.title}
              </h3>
              <p className="mt-2 text-5xl font-bold text-primary">
                {score}/{questions.length}
              </p>
              <p className="mx-auto mt-4 max-w-sm text-muted-foreground">
                {result.message}
              </p>
              <button
                type="button"
                onClick={handleRestart}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:shadow-lg hover:brightness-110"
              >
                <RotateCcw className="h-4 w-4" />
                Try Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
