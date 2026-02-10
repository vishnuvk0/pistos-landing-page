"use client";

import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";

// Moody's rating scale for Y-axis (top = best)
const RATINGS = ["Aaa", "Aa", "A", "Baa", "Ba"];

// X-axis months: Feb 2025 → Feb 2026
const MONTHS = ["F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D", "J", "F"];

// Pistos: dense data with market-like shakiness
// Format: [fractional month index, rating value]
// Lower value = better rating (0 = Aaa, 4 = Ba)
const PISTOS_DATA: [number, number][] = [
  [0, 1.80],
  [0.25, 1.86],
  [0.5, 1.78],
  [0.75, 1.83],
  [1, 1.72],
  [1.2, 1.76],
  [1.45, 1.68],
  [1.7, 1.74],
  [1.9, 1.88],
  [2, 2.05],
  [2.15, 2.22],
  [2.35, 2.42],
  [2.5, 2.50],
  [2.7, 2.38],
  [2.85, 2.18],
  [3, 1.82],
  [3.2, 1.87],
  [3.45, 1.76],
  [3.7, 1.70],
  [3.9, 1.66],
  [4, 1.62],
  [4.2, 1.67],
  [4.5, 1.57],
  [4.75, 1.52],
  [5, 1.42],
  [5.2, 1.47],
  [5.45, 1.43],
  [5.7, 1.49],
  [6, 1.52],
  [6.2, 1.56],
  [6.5, 1.60],
  [6.75, 1.64],
  [7, 1.68],
  [7.15, 1.63],
  [7.4, 1.56],
  [7.65, 1.50],
  [7.85, 1.45],
  [8, 1.42],
  [8.2, 1.46],
  [8.45, 1.39],
  [8.7, 1.34],
  [9, 1.22],
  [9.2, 1.26],
  [9.45, 1.19],
  [9.7, 1.16],
  [10, 1.12],
  [10.25, 1.16],
  [10.5, 1.10],
  [10.75, 1.06],
  [11, 1.02],
  [11.2, 1.06],
  [11.5, 0.98],
  [11.75, 0.94],
  [12, 0.92],
];

// Moody's: quarterly step data — [monthIndex, ratingValue]
const MOODYS_STEPS: [number, number][] = [
  [0, 1.8],
  [3, 2.0],
  [6, 1.5],
  [9, 1.3],
];
const MOODYS_LAST_MONTH = 10;

// Chart layout — extra padding for larger labels
const W = 720;
const H = 340;
const PAD = { top: 28, right: 32, bottom: 56, left: 72 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;

function xPos(monthIndex: number) {
  return PAD.left + (monthIndex / (MONTHS.length - 1)) * PLOT_W;
}

function yPos(rating: number) {
  return PAD.top + (rating / (RATINGS.length - 1)) * PLOT_H;
}

/** Smooth Pistos path from dense data */
function pistosPath(): string {
  return PISTOS_DATA.map(
    ([mi, val], i) => `${i === 0 ? "M" : "L"}${xPos(mi)},${yPos(val)}`
  ).join(" ");
}

/** Stepped Moody's path — flat between quarterly updates */
function moodysSteppedPath(): string {
  const parts: string[] = [];
  for (let i = 0; i < MOODYS_STEPS.length; i++) {
    const [mi, val] = MOODYS_STEPS[i];
    if (i === 0) {
      parts.push(`M${xPos(mi)},${yPos(val)}`);
    } else {
      parts.push(`L${xPos(mi)},${yPos(MOODYS_STEPS[i - 1][1])}`);
      parts.push(`L${xPos(mi)},${yPos(val)}`);
    }
  }
  const lastVal = MOODYS_STEPS[MOODYS_STEPS.length - 1][1];
  parts.push(`L${xPos(MOODYS_LAST_MONTH)},${yPos(lastVal)}`);
  return parts.join(" ");
}

/** Dotted extension from Dec 2025 → Feb 2026 (stale) */
function moodysDottedPath(): string {
  const lastVal = MOODYS_STEPS[MOODYS_STEPS.length - 1][1];
  return `M${xPos(MOODYS_LAST_MONTH)},${yPos(lastVal)} L${xPos(MONTHS.length - 1)},${yPos(lastVal)}`;
}

export function RatingComparisonChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pistosRef = useRef<SVGPathElement>(null);
  const moodysRef = useRef<SVGPathElement>(null);

  const isInView = useInView(containerRef, { once: true, margin: "-60px" });

  const [lengths, setLengths] = useState({ pistos: 0, moodys: 0 });

  useEffect(() => {
    const p = pistosRef.current?.getTotalLength() ?? 0;
    const m = moodysRef.current?.getTotalLength() ?? 0;
    setLengths({ pistos: p, moodys: m });
  }, []);

  const lastPoint = PISTOS_DATA[PISTOS_DATA.length - 1];
  const lastX = xPos(lastPoint[0]);
  const lastY = yPos(lastPoint[1]);

  return (
    <div className="space-y-4" ref={containerRef}>
      <h3 className="text-xs font-medium uppercase tracking-widest text-text-tertiary">
        Rating Accuracy
      </h3>

      <div className="overflow-hidden rounded-xl border border-border bg-surface-elevated p-4 md:p-6">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Horizontal grid lines */}
          {RATINGS.map((_, i) => (
            <line
              key={`grid-h-${i}`}
              x1={PAD.left}
              y1={yPos(i)}
              x2={W - PAD.right}
              y2={yPos(i)}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth={1}
            />
          ))}

          {/* Y-axis labels */}
          {RATINGS.map((label, i) => (
            <text
              key={`y-${label}`}
              x={PAD.left - 12}
              y={yPos(i)}
              textAnchor="end"
              dominantBaseline="middle"
              fill="#666"
              fontSize={20}
              fontFamily="ui-monospace, monospace"
            >
              {label}
            </text>
          ))}

          {/* X-axis labels */}
          {MONTHS.map((label, i) => (
            <text
              key={`x-${i}`}
              x={xPos(i)}
              y={H - 10}
              textAnchor="middle"
              fill="#666"
              fontSize={18}
              fontFamily="ui-monospace, monospace"
            >
              {label}
            </text>
          ))}

          {/* ── Moody's stepped line (gray, solid) ── */}
          <path
            ref={moodysRef}
            d={moodysSteppedPath()}
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth={3.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={lengths.moodys || undefined}
            strokeDashoffset={isInView ? 0 : lengths.moodys}
            style={{
              transition: lengths.moodys
                ? "stroke-dashoffset 2.5s ease-in-out 0.4s"
                : "none",
            }}
          />

          {/* ── Moody's dotted extension (stale) ── */}
          <motion.path
            d={moodysDottedPath()}
            fill="none"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth={3.5}
            strokeDasharray="8 6"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 3 }}
          />

          {/* ── Pistos line (red, animated draw) ── */}
          <path
            ref={pistosRef}
            d={pistosPath()}
            fill="none"
            stroke="#ef4444"
            strokeWidth={3.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={lengths.pistos || undefined}
            strokeDashoffset={isInView ? 0 : lengths.pistos}
            style={{
              transition: lengths.pistos
                ? "stroke-dashoffset 3s ease-in-out 0.2s"
                : "none",
              filter: "drop-shadow(0 0 6px rgba(239, 68, 68, 0.35))",
            }}
          />

          {/* ── Blinking "live" indicator at Pistos endpoint ── */}
          {isInView && (
            <>
              {/* Pulsing outer ring */}
              <motion.circle
                cx={lastX}
                cy={lastY}
                r={5}
                fill="none"
                stroke="#ef4444"
                strokeWidth={1.5}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.3 }}
              >
                <animate
                  attributeName="r"
                  values="5;12;5"
                  dur="2s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.7;0;0.7"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </motion.circle>

              {/* Solid center dot */}
              <motion.circle
                cx={lastX}
                cy={lastY}
                r={5}
                fill="#ef4444"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: 3.3,
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                }}
                style={{
                  filter: "drop-shadow(0 0 4px rgba(239, 68, 68, 0.6))",
                }}
              />
            </>
          )}
        </svg>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 border-t border-white/5 pt-4 text-xs">
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-0.5 w-6 rounded-full bg-[#ef4444]"
              style={{ boxShadow: "0 0 4px rgba(239, 68, 68, 0.5)" }}
            />
            <span className="text-text-secondary">Pistos</span>
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ef4444] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#ef4444]" />
            </span>
            <span className="font-medium text-[#ef4444]">Live</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-block h-0.5 w-6 rounded-full bg-white/25" />
            <span className="text-text-secondary">Moody&apos;s</span>
            <svg width="20" height="2" className="inline-block">
              <line
                x1="0"
                y1="1"
                x2="20"
                y2="1"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
            </svg>
            <span className="text-text-tertiary">Stale</span>
          </div>
        </div>
      </div>
    </div>
  );
}
