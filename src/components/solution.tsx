import { FEATURES } from "@/lib/constants";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { FeatureCard } from "@/components/ui/feature-card";

export function Solution() {
  return (
    <SectionWrapper id="solution">
      <div className="section-divider mb-20" />
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white md:text-4xl">
          A New Kind of Rating Agency
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-text-secondary">
          Pistos combines frontier AI with deep credit expertise to deliver
          faster, more accurate, and more transparent credit analysis.
        </p>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {FEATURES.map((feature) => (
          <FeatureCard
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
