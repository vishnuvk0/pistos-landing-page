"use client";

import { motion } from "motion/react";
import { COMPANY } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="flex min-h-[60vh] items-center pt-16 md:min-h-screen">
      <div className="mx-auto max-w-5xl px-6 py-20 md:px-8 md:py-32">
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-4xl font-bold leading-tight tracking-tighter text-white md:text-6xl md:leading-tight"
          >
            {COMPANY.tagline}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.7,
              delay: 0.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary md:text-xl"
          >
            {COMPANY.description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.4,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <Button href="#solution">See How It Works</Button>
            <Button href={`mailto:${COMPANY.contactEmail}`} variant="outline">
              Get in Touch
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
