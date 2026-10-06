import Link from "next/link";
import { clsx } from "clsx";
import type { ComponentProps, ReactNode } from "react";

type Props = { href: string; children: ReactNode; className?: string; size?: "md" | "lg" } & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

const isExternal = (href: string) => /^https?:\/\//.test(href);

/** The DEX's primary action: a gold-gradient pill with black text. */
export function GoldButton({ href, children, className, size = "md", ...rest }: Props) {
  const cls = clsx(
    "bg-gold-gradient glow-gold inline-flex items-center justify-center gap-2 rounded-full font-bold text-black transition-all duration-300",
    "hover:-translate-y-0.5 hover:shadow-[0_0_34px_rgba(253,182,72,0.55)] active:translate-y-0 active:scale-[0.98]",
    size === "lg" ? "px-7 py-3.5 text-base md:px-8 md:py-4 md:text-lg" : "px-5 py-2.5 text-sm",
    className,
  );
  if (isExternal(href)) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{children}</a>;
  }
  return <Link href={href} className={cls} {...rest}>{children}</Link>;
}

/** Secondary action: a glassy outline pill. */
export function GhostButton({ href, children, className, size = "md", ...rest }: Props) {
  const cls = clsx(
    "inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] font-semibold text-white backdrop-blur-md transition-colors duration-300",
    "hover:border-gold/50 hover:text-gold",
    size === "lg" ? "px-7 py-3.5 text-base md:px-8 md:py-4 md:text-lg" : "px-5 py-2.5 text-sm",
    className,
  );
  if (isExternal(href)) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{children}</a>;
  }
  return <Link href={href} className={cls} {...rest}>{children}</Link>;
}
