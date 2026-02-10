import { COMPANY } from "@/lib/constants";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { Button } from "@/components/ui/button";

export function About() {
  return (
    <SectionWrapper id="about">
      <div className="section-divider mb-20" />
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-white md:text-4xl">
          About {COMPANY.name}
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-text-secondary">
          {COMPANY.mission}
        </p>
        <div className="mt-10">
          <Button href={`mailto:${COMPANY.contactEmail}`}>
            Contact Us
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
}
