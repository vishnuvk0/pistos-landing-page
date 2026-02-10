"use client";

import { motion } from "motion/react";
import { COMPANY } from "@/lib/constants";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { Button } from "@/components/ui/button";

export function About() {
  return (
    <SectionWrapper id="about">
      <div className="section-divider mb-20" />
      <div className="mx-auto max-w-3xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-3xl font-bold text-white md:text-4xl"
        >
          About {COMPANY.name}
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
          className="mt-6 text-lg leading-relaxed text-text-secondary"
        >
          {COMPANY.mission}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: 0.5,
            delay: 0.2,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="mt-10"
        >
          <Button href={`mailto:${COMPANY.contactEmail}`}>
            Contact Us
          </Button>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
