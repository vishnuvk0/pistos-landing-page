"use client";

import { motion } from "motion/react";
import { PROCESS_STEPS, SECTIONS } from "@/lib/constants";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { RatingComparisonChart } from "@/components/rating-comparison-chart";

export function Solution() {
  return (
    <SectionWrapper id="solution">
      <div className="section-divider mb-10" />
      <div>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-3xl font-bold text-white md:text-4xl"
        >
          {SECTIONS.solution.heading}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: 0.6,
            delay: 0.1,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="mt-4 max-w-2xl text-text-secondary"
        >
          {SECTIONS.solution.description}
        </motion.p>
      </div>

      {/* 2x2 card grid */}
      <div className="mt-10 flex flex-col gap-6 md:flex-row md:flex-wrap">
        {/* Row 1 left: Process terminal */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="rounded-xl border border-border bg-surface-elevated p-6 md:flex-1"
        >
          {/* Terminal dots */}
          <div className="mb-5 flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
          </div>

          {/* Process lines */}
          <div className="space-y-0">
            {PROCESS_STEPS.map((step, i) => {
              const isLast = i === PROCESS_STEPS.length - 1;
              return (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.3,
                    delay: 0.3 + i * 0.18,
                    ease: "easeOut",
                  }}
                  className={`flex items-center justify-between py-3 ${
                    !isLast ? "border-b border-white/5" : ""
                  }`}
                >
                  <span className="text-sm font-mono text-text-secondary">
                    {step}
                  </span>
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.25,
                      delay: 0.6 + i * 0.18,
                      type: "spring",
                      stiffness: 300,
                      damping: 15,
                    }}
                    className={
                      isLast
                        ? "text-xs font-mono font-medium text-accent-green"
                        : "text-accent-green text-sm"
                    }
                  >
                    {isLast ? "4m 12s" : "\u2713"}
                  </motion.span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Row 1 right: Lead Time comparison */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="space-y-6 rounded-xl border border-border bg-surface-elevated p-6 md:flex-1"
        >
          <h3 className="text-xs font-medium uppercase tracking-widest text-text-tertiary">
            Lead Time
          </h3>

          {/* Legacy bar */}
          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-text-secondary">Moody&apos;s</span>
              <span className="text-text-tertiary">4-8 weeks</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/5">
              <motion.div
                className="h-full rounded-full bg-white/20"
                initial={{ width: 0 }}
                whileInView={{ width: "96%" }}
                viewport={{ once: true }}
                transition={{ duration: 2.5, ease: "linear" }}
              />
            </div>
          </div>
        {/* Legacy bar */}
          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-text-secondary">S&P Global</span>
              <span className="text-text-tertiary">2-6 weeks</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/5">
              <motion.div
                className="h-full rounded-full bg-white/20"
                initial={{ width: 0 }}
                whileInView={{ width: "94%" }}
                viewport={{ once: true }}
                transition={{ duration: 2.5, ease: "linear" }}
              />
            </div>
          </div>

          {/* Pistos bar */}
          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span className="font-medium text-white">Pistos</span>
              <span className="font-medium text-accent-green"> &lt; 5 Min</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/5">
              <motion.div
                className="h-full rounded-full bg-accent-green"
                initial={{ width: 0 }}
                whileInView={{ width: "10%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
                style={{
                  boxShadow: "0 0 12px rgba(52, 211, 153, 0.4)",
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Data Freshness comparison */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="space-y-6 rounded-xl border border-border bg-surface-elevated p-6 md:flex-1"
        >
          <h3 className="text-xs font-medium uppercase tracking-widest text-text-tertiary">
            Data Freshness
          </h3>

          {/* Kroll — stale, quarterly */}
          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-text-secondary">Kroll</span>
              <span className="text-text-tertiary">Quarterly updates</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/5">
              <motion.div
                className="h-full rounded-full bg-white/20"
                initial={{ width: 0 }}

                whileInView={{ width: "25%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Moodys — stale, quarterly */}
          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-text-secondary">Moody&apos;s</span>
              <span className="text-text-tertiary">Quarterly updates</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/5">
              <motion.div
                className="h-full rounded-full bg-white/20"
                initial={{ width: 0 }}

                whileInView={{ width: "25%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Fitch — stale, quarterly */}
          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-text-secondary">Fitch</span>
              <span className="text-text-tertiary">No coverage</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/5">
              <motion.div
                className="h-full rounded-full bg-white/20"
                initial={{ width: 0 }}
                whileInView={{ width: "5%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Pistos — always live */}
          <div>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium text-white">Pistos</span>
              <span className="flex items-center gap-2 font-medium text-accent-green">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-green opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-green" />
                </span>
                Real Time
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/5">
              <motion.div
                className="h-full rounded-full bg-accent-green"
                initial={{ width: 0 }}
                whileInView={{ width: "98%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                style={{
                  boxShadow: "0 0 12px rgba(52, 211, 153, 0.4)",
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
      {/* Rating accuracy chart — full-width row */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        className="mt-6 rounded-xl border border-border bg-surface-elevated p-6"
      >
        <RatingComparisonChart />
      </motion.div>

      {/* Integration badges — left-half below grid */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        className="mt-6 space-y-4 md:w-1/2"
      >
        <h3 className="text-xs font-medium uppercase tracking-widest text-text-tertiary">
          Works with your stack
        </h3>
        <div className="flex flex-wrap gap-3">
          {["Excel", "Python", "Bloomberg", "SAP", "SQL"].map((tool, i) => (
            <motion.span
              key={tool}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.3,
                delay: 0.1 + i * 0.08,
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
              className="rounded-md border border-border bg-white/[0.03] px-3 py-1.5 text-xs font-mono text-text-secondary"
            >
              {tool}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
