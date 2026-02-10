"use client";

import Marquee from "react-fast-marquee";
import { ALUMNI_LOGOS } from "@/lib/constants";

export function LogoMarquee() {
  return (
    <section
      className="marquee-container py-16"
      aria-label="Companies our team members previously worked at"
    >
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <p className="mb-8 text-center text-sm text-text-tertiary uppercase tracking-widest">
          Built by alumni from
        </p>
      </div>
      <Marquee speed={40} gradient={false} pauseOnHover={true}>
        {ALUMNI_LOGOS.map((logo) => (
          <img
            key={logo.name}
            src={logo.logoPath}
            alt={logo.name}
            style={{ height: logo.height }}
            className="logo-white mx-6 w-auto opacity-60 transition-opacity hover:opacity-100"
          />
        ))}
      </Marquee>
    </section>
  );
}
