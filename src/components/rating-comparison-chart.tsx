"use client";

import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";

// Moody's rating scale for Y-axis (top = best)
const RATINGS = ["Aaa", "Aa", "A", "Baa", "Ba"];

// X-axis months: Feb 2025 → Feb 2026
const MONTHS = [
  "Feb '25",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
  "Jan '26",
  "Feb '26",
];

// Pistos: monthly data — lower value = better rating (0 = Aaa, 4 = Ba)
// Dips in April, recovers in May, trends upward over time
const PISTOS_DATA = [
  1.8, 1.7, 2.5, 1.8, 1.6, 1.4, 1.5, 1.7, 1.4, 1.2, 1.1, 1.0, 0.9,
];

// Moody's: quarterly step data — [monthIndex, ratingValue]
// Updates every 3 months, approximates Pistos but lags behind
const MOODYS_STEPS: [number, number][] = [
  [0, 1.8], // Feb 2025 — initial, same as Pistos
  [3, 2.0], // May 2025 — catches April dip late, overreacts
  [6, 1.5], // Aug 2025 — catches up
  [9, 1.3], // Nov 2025 — closer but still behind
];
const MOODYS_LAST_MONTH = 10; // Dec 2025 — last solid data point

// Chart layout
const W = 720;
const H = 320;
const PAD = { top: 24, right: 32, bottom: 44, left: 52 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;

function xPos(monthIndex: number) {
  return PAD.left + (monthIndex / (MONTHS.length - 1)) * PLOT_W;
}

function yPos(rating: number) {
  return PAD.top + (rating / (RATINGS.length - 1)) * PLOT_H;
}

/** Smooth Pistos path with monthly data points */
function pistosPath(): string {
  return PISTOS_DATA.map(
    (val, i) => `${i === 0 ? "M" : "L"}${xPos(i)},${yPos(val)}`
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
      // Horizontal to current month at old rating, then vertical to new rating
      parts.push(`L${xPos(mi)},${yPos(MOODYS_STEPS[i - 1][1])}`);
      parts.push(`L${xPos(mi)},${yPos(val)}`);
    }
  }
  // Extend flat to Dec 2025
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
  const moodysDottedRef = useRef<SVGPathElement>(null);

  const isInView = useInView(containerRef, { once: true, margin: "-60px" });

  const [lengths, setLengths] = useState({
    pistos: 0,
    moodys: 0,
    moodysDotted: 0,
  });

  useEffect(() => {
    const p = pistosRef.current?.getTotalLength() ?? 0;
    const m = moodysRef.current?.getTotalLength() ?? 0;
    const md = moodysDottedRef.current?.getTotalLength() ?? 0;
    setLengths({ pistos: p, moodys: m, moodysDotted: md });
  }, []);

  const lastX = xPos(PISTOS_DATA.length - 1);
  const lastY = yPos(PISTOS_DATA[PISTOS_DATA.length - 1]);

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
              x={PAD.left - 10}
              y={yPos(i)}
              textAnchor="end"
              dominantBaseline="middle"
              fill="#555"
              fontSize={11}
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
              y={H - 8}
              textAnchor="middle"
              fill="#555"
              fontSize={10}
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
            stroke="rgba(255,255,255,0.25)"
            strokeWidth={2}
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

          {/* Moody's quarterly dots */}
          {MOODYS_STEPS.map(([mi, val], i) => (
            <motion.circle
              key={`m-dot-${i}`}
              cx={xPos(mi)}
              cy={yPos(val)}
              r={3.5}
              fill="rgba(255,255,255,0.25)"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.6 + i * 0.5 }}
            />
          ))}

          {/* ── Moody's dotted extension (stale) ── */}
          <path
            ref={moodysDottedRef}
            d={moodysDottedPath()}
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth={2}
            strokeDasharray={
              lengths.moodysDotted
                ? `6 5`
                : undefined
            }
            strokeDashoffset={isInView ? 0 : lengths.moodysDotted + 100}
            style={{
              transition: lengths.moodysDotted
                ? "stroke-dashoffset 0.8s ease-out 3s"
                : "none",
            }}
          />

          {/* ── Pistos line (red, animated draw) ── */}
          <path
            ref={pistosRef}
            d={pistosPath()}
            fill="none"
            stroke="#ef4444"
            strokeWidth={2.5}
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

          {/* Pistos monthly dots */}
          {PISTOS_DATA.map((val, i) => (
            <motion.circle
              key={`p-dot-${i}`}
              cx={xPos(i)}
              cy={yPos(val)}
              r={3}
              fill="#ef4444"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.2 + i * 0.23 }}
            />
          ))}

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
                  values="5;11;5"
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
                r={4.5}
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
