type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

const variants = {
  primary:
    "bg-lime text-black hover:bg-[#d4ff74] shadow-[0_0_0_1px_rgba(199,255,79,0.2),0_20px_55px_rgba(199,255,79,0.18)]",
  secondary:
    "border border-white/12 bg-white/5 text-copy hover:border-lime/40 hover:bg-white/10",
  ghost:
    "border border-white/12 bg-transparent text-copy hover:border-white/25 hover:bg-white/5"
};

export function Button({
  href,
  children,
  variant = "primary",
  className = ""
}: ButtonProps) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium tracking-[0.08em] transition duration-300 ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  );
}

