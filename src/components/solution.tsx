"use client";

import { motion } from "motion/react";
import { PROCESS_STEPS, SECTIONS } from "@/lib/constants";
import { SectionWrapper } from "@/components/ui/section-wrapper";

export function Solution() {
  return (
    <SectionWrapper id="solution">
      <div className="section-divider mb-20" />
      <div className="text-center">
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
          className="mx-auto mt-4 max-w-2xl text-text-secondary"
        >
          {SECTIONS.solution.description}
        </motion.p>
      </div>

      {/* Process terminal */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="mx-auto mt-16 max-w-xl rounded-xl border border-border bg-surface-elevated p-6"
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

      {/* Speed comparison */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mx-auto mt-16 max-w-xl space-y-6"
      >
        {/* Legacy bar */}
        <div>
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-text-secondary">Legacy Agencies</span>
            <span className="text-text-tertiary">4-8 weeks</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/5">
            <motion.div
              className="h-full rounded-full bg-white/20"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 2.5, ease: "linear" }}
            />
          </div>
        </div>

        {/* Pistos bar */}
        <div>
          <div className="mb-2 flex justify-between text-sm">
            <span className="font-medium text-white">Pistos</span>
            <span className="font-medium text-accent-green">Minutes</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/5">
            <motion.div
              className="h-full rounded-full bg-accent-green"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
              style={{
                boxShadow: "0 0 12px rgba(52, 211, 153, 0.4)",
              }}
            />
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
