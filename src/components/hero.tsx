"use client";

import { motion } from "motion/react";
import { COMPANY } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="flex min-h-[60vh] items-center pt-16 md:min-h-[55vh]">
      <div className="max-w-[90%] px-6 py-12 md:px-8 md:py-16">
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-6xl font-medium leading-none tracking-tighter text-white md:text-8xl lg:text-[136px]"
          >
            {COMPANY.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="mt-6 text-2xl font-medium leading-snug text-text-header md:text-[32px] md:leading-snug"
          >
            {COMPANY.tagline}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.7,
              delay: 0.3,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="mt-3 text-lg font-medium leading-relaxed text-text-header md:text-2xl"
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
            <Button href="#solution">How it works</Button>
            <Button
              href="https://calendly.com/vishnuvk-1/15min"
              variant="outline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Schedule a call
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
