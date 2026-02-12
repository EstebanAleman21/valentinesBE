"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

// Deterministic pseudo-random based on a seed
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const THE_DATE = "January 15, 2023";
const DATE_SEED = 20230115;

// Named constellations with offsets relative to canvas center
const constellations = [
  {
    name: "Orion",
    stars: [
      { x: -120, y: -80 },
      { x: -90, y: -50 },
      { x: -60, y: -80 },
      { x: -90, y: -20 },
      { x: -90, y: 10 },
      { x: -120, y: 40 },
      { x: -60, y: 40 },
    ],
    lines: [
      [0, 1], [1, 2], [1, 3], [3, 4], [4, 5], [4, 6],
    ],
  },
  {
    name: "Cassiopeia",
    stars: [
      { x: 80, y: -100 },
      { x: 110, y: -70 },
      { x: 140, y: -90 },
      { x: 170, y: -60 },
      { x: 200, y: -80 },
    ],
    lines: [
      [0, 1], [1, 2], [2, 3], [3, 4],
    ],
  },
  {
    name: "Lyra",
    stars: [
      { x: -20, y: 80 },
      { x: -40, y: 110 },
      { x: 0, y: 110 },
      { x: -40, y: 140 },
      { x: 0, y: 140 },
    ],
    lines: [
      [0, 1], [0, 2], [1, 3], [2, 4], [3, 4],
    ],
  },
];

export function StarMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const [mounted, setMounted] = useState(false);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const cx = w / 2;
    const cy = h / 2;

    // Background: deep night sky gradient
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.7);
    grad.addColorStop(0, "#1a1033");
    grad.addColorStop(0.5, "#0d0a1a");
    grad.addColorStop(1, "#050510");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Random background stars
    const rand = seededRandom(DATE_SEED);
    const starCount = Math.floor((w * h) / 600);
    const time = Date.now() * 0.001;

    for (let i = 0; i < starCount; i++) {
      const sx = rand() * w;
      const sy = rand() * h;
      const size = rand() * 1.5 + 0.3;
      const brightness = 0.3 + rand() * 0.5 + Math.sin(time + i * 0.7) * 0.15;
      ctx.beginPath();
      ctx.arc(sx, sy, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
      ctx.fill();
    }

    // Draw constellations
    constellations.forEach((c) => {
      const stars = c.stars.map((s) => ({
        x: cx + s.x,
        y: cy + s.y,
      }));

      // Lines
      ctx.strokeStyle = "rgba(249, 198, 211, 0.25)";
      ctx.lineWidth = 1;
      c.lines.forEach(([a, b]) => {
        ctx.beginPath();
        ctx.moveTo(stars[a].x, stars[a].y);
        ctx.lineTo(stars[b].x, stars[b].y);
        ctx.stroke();
      });

      // Stars with glow
      stars.forEach((s, i) => {
        const pulse = 1 + Math.sin(time * 1.5 + i * 2) * 0.3;
        const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 6 * pulse);
        glow.addColorStop(0, "rgba(249, 198, 211, 0.9)");
        glow.addColorStop(0.5, "rgba(231, 84, 128, 0.3)");
        glow.addColorStop(1, "rgba(231, 84, 128, 0)");
        ctx.beginPath();
        ctx.arc(s.x, s.y, 6 * pulse, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "#fff";
        ctx.fill();
      });

      // Label
      const labelStar = stars[0];
      ctx.font = "11px sans-serif";
      ctx.fillStyle = "rgba(249, 198, 211, 0.5)";
      ctx.fillText(c.name, labelStar.x + 10, labelStar.y - 10);
    });

    // "Our Star" — a special brighter star
    const ourX = cx + 40;
    const ourY = cy - 10;
    const ourPulse = 1 + Math.sin(time * 2) * 0.4;
    const ourGlow = ctx.createRadialGradient(ourX, ourY, 0, ourX, ourY, 14 * ourPulse);
    ourGlow.addColorStop(0, "rgba(255, 255, 255, 1)");
    ourGlow.addColorStop(0.3, "rgba(249, 198, 211, 0.7)");
    ourGlow.addColorStop(0.6, "rgba(231, 84, 128, 0.3)");
    ourGlow.addColorStop(1, "rgba(231, 84, 128, 0)");
    ctx.beginPath();
    ctx.arc(ourX, ourY, 14 * ourPulse, 0, Math.PI * 2);
    ctx.fillStyle = ourGlow;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(ourX, ourY, 3, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();

    ctx.font = "italic 12px serif";
    ctx.fillStyle = "rgba(249, 198, 211, 0.7)";
    ctx.fillText("Our Star", ourX + 16, ourY + 4);

    // Circular border
    ctx.beginPath();
    const radius = Math.min(w, h) * 0.45;
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(249, 198, 211, 0.15)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Date label at bottom of circle
    ctx.font = "13px sans-serif";
    ctx.fillStyle = "rgba(249, 198, 211, 0.5)";
    ctx.textAlign = "center";
    ctx.fillText(`The night sky on ${THE_DATE}`, cx, cy + radius + 24);
    ctx.textAlign = "start";

    animFrameRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    animFrameRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [mounted, draw]);

  // Resize handler
  useEffect(() => {
    if (!mounted) return;
    const handleResize = () => {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = requestAnimationFrame(draw);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mounted, draw]);

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
            The Night We Met
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            The stars were watching over us that night. Here is what the sky looked like.
          </p>
        </motion.div>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative aspect-square w-full max-w-lg overflow-hidden rounded-full border border-[rgba(249,198,211,0.2)] shadow-2xl">
            <canvas
              ref={canvasRef}
              className="h-full w-full"
              style={{ display: mounted ? "block" : "none" }}
            />
            {!mounted && (
              <div className="flex h-full w-full items-center justify-center bg-[#0d0a1a]">
                <Heart className="h-8 w-8 animate-pulse text-primary" />
              </div>
            )}
          </div>
        </motion.div>

        <motion.p
          className="mt-8 text-center font-serif text-base italic text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Under these very stars, our story began.
        </motion.p>
      </div>
    </section>
  );
}
