interface ButtonProps {
  href: string;
  variant?: "primary" | "outline";
  children: React.ReactNode;
  className?: string;
}

export function Button({
  href,
  variant = "primary",
  children,
  className = "",
}: ButtonProps) {
  const variantClass = variant === "primary" ? "btn-primary" : "btn-outline";

  return (
    <a href={href} className={`${variantClass} ${className}`}>
      {children}
    </a>
  );
}
