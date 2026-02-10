"use client";

import { motion } from "motion/react";
import { STATS, SECTIONS } from "@/lib/constants";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { StatCard } from "@/components/ui/stat-card";

export function Problem() {
  return (
    <SectionWrapper id="problem">
      <div className="section-divider mb-20" />
      <div className="text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-3xl font-bold text-white md:text-4xl"
        >
          {SECTIONS.problem.heading}
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
          {SECTIONS.problem.description}
        </motion.p>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.value}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.5,
              delay: i * 0.12,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <StatCard
              value={stat.value}
              label={stat.label}
              description={stat.description}
            />
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
