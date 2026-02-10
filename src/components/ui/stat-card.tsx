interface StatCardProps {
  value: string;
  label: string;
  description: string;
}

export function StatCard({ value, label, description }: StatCardProps) {
  return (
    <div className="rounded-xl border border-border bg-surface-elevated p-8 text-center transition-colors duration-200 hover:border-white-20">
      <div className="text-4xl font-bold text-white md:text-5xl">{value}</div>
      <div className="mt-2 text-sm font-medium text-text-secondary">{label}</div>
      <p className="mt-3 text-sm text-text-tertiary leading-relaxed">{description}</p>
    </div>
  );
}
