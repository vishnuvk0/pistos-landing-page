"use client";

import { motion } from "motion/react";

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

function x(monthIndex: number) {
  return PAD.left + (monthIndex / (MONTHS.length - 1)) * PLOT_W;
}

function y(rating: number) {
  return PAD.top + (rating / (RATINGS.length - 1)) * PLOT_H;
}

/** Smooth Pistos path with monthly data points */
function pistosPath(): string {
  return PISTOS_DATA.map(
    (val, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(val)}`
  ).join(" ");
}

/** Stepped Moody's path — flat between quarterly updates */
function moodysSteppedPath(): string {
  const parts: string[] = [];
  for (let i = 0; i < MOODYS_STEPS.length; i++) {
    const [mi, val] = MOODYS_STEPS[i];
    if (i === 0) {
      parts.push(`M ${x(mi)} ${y(val)}`);
    } else {
      // Horizontal to current month, then vertical to new rating
      parts.push(`L ${x(mi)} ${y(MOODYS_STEPS[i - 1][1])}`);
      parts.push(`L ${x(mi)} ${y(val)}`);
    }
  }
  // Extend flat to Dec 2025
  const lastVal = MOODYS_STEPS[MOODYS_STEPS.length - 1][1];
  parts.push(`L ${x(MOODYS_LAST_MONTH)} ${y(lastVal)}`);
  return parts.join(" ");
}

/** Dotted extension from Dec 2025 → Feb 2026 (stale) */
function moodysDottedPath(): string {
  const lastVal = MOODYS_STEPS[MOODYS_STEPS.length - 1][1];
  return `M ${x(MOODYS_LAST_MONTH)} ${y(lastVal)} L ${x(MONTHS.length - 1)} ${y(lastVal)}`;
}

export function RatingComparisonChart() {
  const lastX = x(PISTOS_DATA.length - 1);
  const lastY = y(PISTOS_DATA[PISTOS_DATA.length - 1]);

  return (
    <div className="space-y-4">
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
              y1={y(i)}
              x2={W - PAD.right}
              y2={y(i)}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth={1}
            />
          ))}

          {/* Y-axis labels */}
          {RATINGS.map((label, i) => (
            <text
              key={`y-${label}`}
              x={PAD.left - 10}
              y={y(i)}
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
              x={x(i)}
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
          <motion.path
            d={moodysSteppedPath()}
            fill="none"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.5, ease: "easeInOut", delay: 0.4 }}
          />

          {/* Moody's quarterly dots */}
          {MOODYS_STEPS.map(([mi, val], i) => (
            <motion.circle
              key={`m-dot-${i}`}
              cx={x(mi)}
              cy={y(val)}
              r={3.5}
              fill="rgba(255,255,255,0.25)"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.6 + i * 0.5 }}
            />
          ))}

          {/* ── Moody's dotted extension (stale) ── */}
          <motion.path
            d={moodysDottedPath()}
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth={2}
            strokeDasharray="6 5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 3 }}
          />

          {/* ── Pistos line (red, animated draw) ── */}
          <motion.path
            d={pistosPath()}
            fill="none"
            stroke="#ef4444"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 3, ease: "easeInOut", delay: 0.2 }}
            style={{
              filter: "drop-shadow(0 0 6px rgba(239, 68, 68, 0.35))",
            }}
          />

          {/* Pistos monthly dots */}
          {PISTOS_DATA.map((val, i) => (
            <motion.circle
              key={`p-dot-${i}`}
              cx={x(i)}
              cy={y(val)}
              r={3}
              fill="#ef4444"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: 0.2 + i * 0.23 }}
            />
          ))}

          {/* ── Blinking "live" indicator at Pistos endpoint ── */}
          {/* Pulsing outer ring */}
          <motion.circle
            cx={lastX}
            cy={lastY}
            r={5}
            fill="none"
            stroke="#ef4444"
            strokeWidth={1.5}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 3.3 }}
          >
            <animate
              attributeName="r"
              values="5;10;5"
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
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
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
