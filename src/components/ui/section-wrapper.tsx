interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export function SectionWrapper({
  id,
  children,
  className = "",
}: SectionWrapperProps) {
  return (
    <section id={id} className={`py-10 md:py-14 ${className}`}>
      <div className="mx-auto max-w-5xl px-6 md:px-8">{children}</div>
    </section>
  );
}
