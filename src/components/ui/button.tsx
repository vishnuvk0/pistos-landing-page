interface ButtonProps {
  href: string;
  variant?: "primary" | "outline";
  children: React.ReactNode;
  className?: string;
}

const variants = {
  primary:
    "inline-flex items-center justify-center px-7 py-3.5 bg-white text-black font-medium text-sm rounded-lg transition-all duration-200 no-underline hover:bg-white/90 hover:shadow-[0_0_24px_rgba(255,255,255,0.12)]",
  outline:
    "inline-flex items-center justify-center px-7 py-3.5 bg-transparent text-white font-medium text-sm border border-white/20 rounded-lg transition-all duration-200 no-underline hover:border-white/50 hover:bg-white/5",
};

export function Button({
  href,
  variant = "primary",
  children,
  className = "",
}: ButtonProps) {
  return (
    <a href={href} className={`${variants[variant]} ${className}`}>
      {children}
    </a>
  );
}
