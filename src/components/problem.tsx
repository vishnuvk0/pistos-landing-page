import { STATS } from "@/lib/constants";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { StatCard } from "@/components/ui/stat-card";

export function Problem() {
  return (
    <SectionWrapper id="problem">
      <div className="section-divider mb-20" />
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white md:text-4xl">
          The Credit Rating Gap
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-text-secondary">
          The municipal bond market is massive — yet chronically underserved by
          legacy rating agencies that lack the technology and incentives to
          provide broad coverage.
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
