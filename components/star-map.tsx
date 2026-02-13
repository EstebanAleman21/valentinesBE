"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import * as Astronomy from "astronomy-engine";

const THE_DATE = "July 19, 2023";
const THE_TIME = "12:00 AM";
// Monterrey, Mexico coordinates
const LATITUDE = 25.6866;
const LONGITUDE = -100.3161;

// Create the specific date and time
const targetDate = new Date("2023-07-19T00:00:00-06:00"); // CST timezone

interface Star {
  name: string;
  x: number;
  y: number;
  brightness: number;
}

export function StarMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const [mounted, setMounted] = useState(false);
  const [stars, setStars] = useState<Star[]>([]);

  // Calculate actual star positions
  useEffect(() => {
    if (!mounted) return;

    const observer = new Astronomy.Observer(LATITUDE, LONGITUDE, 0);
    const calculatedStars: Star[] = [];

    // Get positions of visible planets and bright stars
    const bodies = [
      Astronomy.Body.Sun,
      Astronomy.Body.Moon,
      Astronomy.Body.Mars,
      Astronomy.Body.Jupiter,
      Astronomy.Body.Saturn,
      Astronomy.Body.Venus,
    ];

    bodies.forEach((body) => {
      try {
        const equator = Astronomy.Equator(body, targetDate, observer, true, true);
        const horizon = Astronomy.Horizon(targetDate, observer, equator.ra, equator.dec, "normal");
        
        // Only show objects above horizon
        if (horizon.altitude > 0) {
          calculatedStars.push({
            name: Astronomy.Body[body],
            x: horizon.azimuth,
            y: horizon.altitude,
            brightness: body === Astronomy.Body.Moon ? 0.9 : body === Astronomy.Body.Venus ? 0.8 : 0.7,
          });
        }
      } catch (e) {
        // Skip if calculation fails
      }
    });

    setStars(calculatedStars);
  }, [mounted]);

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

    // Background: deep night sky gradient
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, "#0a0a1a");
    grad.addColorStop(0.5, "#1a1033");
    grad.addColorStop(1, "#050510");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Random background stars for atmosphere
    const time = Date.now() * 0.0005;
    const starCount = Math.floor((w * h) / 1000);
    
    for (let i = 0; i < starCount; i++) {
      const sx = (i * 137.5) % w;
      const sy = (i * 214.3) % h;
      const size = (i % 3) * 0.5 + 0.3;
      const brightness = 0.2 + ((i % 5) / 5) * 0.3 + Math.sin(time + i * 0.7) * 0.1;
      ctx.beginPath();
      ctx.arc(sx, sy, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
      ctx.fill();
    }

    // Draw actual calculated celestial objects
    stars.forEach((star) => {
      // Convert azimuth and altitude to canvas coordinates
      // Azimuth: 0-360 degrees (0=North, 90=East, 180=South, 270=West)
      // Altitude: 0-90 degrees (0=horizon, 90=zenith)
      
      const azimuthRad = (star.x * Math.PI) / 180;
      const altitudeNormalized = star.y / 90; // 0 to 1
      
      // Map to canvas - altitude determines radius from center
      const centerX = w / 2;
      const centerY = h / 2;
      const maxRadius = Math.min(w, h) * 0.4;
      const radius = maxRadius * (1 - altitudeNormalized);
      
      const x = centerX + radius * Math.sin(azimuthRad);
      const y = centerY - radius * Math.cos(azimuthRad);

      // Draw star with glow
      const pulse = 1 + Math.sin(time * 2 + star.x) * 0.2;
      const glowSize = 12 * pulse * star.brightness;
      const glow = ctx.createRadialGradient(x, y, 0, x, y, glowSize);
      glow.addColorStop(0, `rgba(255, 255, 255, ${star.brightness})`);
      glow.addColorStop(0.3, `rgba(249, 198, 211, ${star.brightness * 0.6})`);
      glow.addColorStop(0.6, `rgba(231, 84, 128, ${star.brightness * 0.3})`);
      glow.addColorStop(1, "rgba(231, 84, 128, 0)");
      
      ctx.beginPath();
      ctx.arc(x, y, glowSize, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      // Core
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fillStyle = "#fff";
      ctx.fill();

      // Label
      ctx.font = "11px sans-serif";
      ctx.fillStyle = "rgba(249, 198, 211, 0.7)";
      ctx.fillText(star.name, x + 10, y - 10);
    });

    // Date label
    ctx.font = "13px sans-serif";
    ctx.fillStyle = "rgba(249, 198, 211, 0.6)";
    ctx.textAlign = "center";
    ctx.fillText(`The night sky on ${THE_DATE} at ${THE_TIME}`, w / 2, h - 20);
    ctx.fillText(`Monterrey, Mexico`, w / 2, h - 5);
    ctx.textAlign = "start";

    animFrameRef.current = requestAnimationFrame(draw);
  }, [stars]);

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
      <div className="mx-auto max-w-6xl">
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
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-3xl border border-[rgba(249,198,211,0.2)] shadow-2xl">
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
