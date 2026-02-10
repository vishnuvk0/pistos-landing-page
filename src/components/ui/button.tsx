interface ButtonProps {
  href: string;
  variant?: "primary" | "outline";
  children: React.ReactNode;
  className?: string;
}

const variants = {
  primary:
    "inline-flex items-center justify-center px-6 py-3 bg-white text-black font-medium text-sm rounded-md transition-all no-underline hover:opacity-90 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]",
  outline:
    "inline-flex items-center justify-center px-6 py-3 bg-transparent text-white font-medium text-sm border border-white/20 rounded-md transition-all no-underline hover:border-white/40 hover:bg-white/5",
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
