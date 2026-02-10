"use client";

import { motion } from "motion/react";
import Marquee from "react-fast-marquee";
import { ALUMNI_LOGOS } from "@/lib/constants";

export function LogoMarquee() {
  return (
    <motion.section
      className="marquee-container py-8 md:py-16"
      aria-label="Companies our team members previously worked at"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <p className="mb-8 text-center text-sm text-text-tertiary uppercase tracking-widest">
          Built by alumni from
        </p>
      </div>
      <Marquee speed={40} gradient={false} pauseOnHover={true}>
        {Array.from({ length: 3 }, (_, i) =>
          ALUMNI_LOGOS.map((logo) => (
            <div
              key={`${logo.name}-${i}`}
              className="mx-8 flex h-12 items-center justify-center"
            >
              <img
                src={logo.logoPath}
                alt={logo.name}
                style={{
                  height: logo.height,
                  ...("offsetY" in logo && { transform: `translateY(${logo.offsetY}px)` }),
                }}
                className={`${"filterClass" in logo ? logo.filterClass : "logo-white"} w-auto opacity-60 transition-opacity hover:opacity-100`}
              />
            </div>
          ))
        )}
      </Marquee>
    </motion.section>
  );
}
