interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center";
}

export function SectionWrapper({
  id,
  children,
  className = "",
  align = "left",
}: SectionWrapperProps) {
  return (
    <section id={id} className={`py-10 md:py-14 ${className}`}>
      <div
        className={`max-w-[100%] px-6 md:px-8${align === "center" ? " mx-auto" : ""}`}
      >
        {children}
      </div>
    </section>
  );
}
