import { STATS, SECTIONS } from "@/lib/constants";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { StatCard } from "@/components/ui/stat-card";

export function Problem() {
  return (
    <SectionWrapper id="problem">
      <div className="section-divider mb-20" />
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white md:text-4xl">
          {SECTIONS.problem.heading}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-text-secondary">
          {SECTIONS.problem.description}
        </p>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {STATS.map((stat) => (
          <StatCard
            key={stat.value}
            value={stat.value}
            label={stat.label}
            description={stat.description}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
