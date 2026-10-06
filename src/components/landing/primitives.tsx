"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { Fragment, type ReactNode } from "react";
import { clsx } from "clsx";

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Fade-and-rise into view, once. */
export function Reveal({ children, className, delay = 0, y = 32 }: { children: ReactNode; className?: string; delay?: number; y?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}

/** The DEX's BlurText: words come into focus one after another. */
export function BlurWords({ text, className, delay = 0, as = "p", onLoad = false }: { text: string; className?: string; delay?: number; as?: "p" | "span" | "h1" | "h2"; onLoad?: boolean }) {
  const reduce = useReducedMotion();
  // On page load the words come in with CSS, so they show even before (or without) JavaScript.
  if (onLoad) {
    const Plain = as;
    const words = text.split(" ");
    return (
      <Plain className={className}>
        {words.map((w, i) => (
          <Fragment key={i}>
            <span className="hero-blur inline-block" style={{ animationDelay: `${delay + i * 0.07}s` }}>
              {w}
            </span>
            {i < words.length - 1 ? " " : ""}
          </Fragment>
        ))}
      </Plain>
    );
  }
  const Tag = motion[as];
  const words = text.split(" ");
  const container: Variants = { visible: { transition: { staggerChildren: 0.07, delayChildren: delay } } };
  const word: Variants = {
    hidden: { filter: "blur(10px)", opacity: 0, y: 12 },
    visible: { filter: "blur(0px)", opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };
  return (
    <Tag
      className={className}
      variants={container}
      initial={reduce ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
    >
      {words.map((w, i) => (
        <motion.span key={i} variants={word} className="inline-block">
          {w}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </Tag>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={clsx("inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/[0.06] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold", className)}>
      {children}
    </span>
  );
}

/** Section heading in the DEX's voice: Montserrat, white with a gold highlight. */
export function SectionTitle({ lead, highlight, className }: { lead: string; highlight?: string; className?: string }) {
  return (
    <h2 className={clsx("font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white md:text-6xl", className)}>
      {lead}
      {highlight && (
        <>
          {" "}
          <span className="text-gold">{highlight}</span>
        </>
      )}
    </h2>
  );
}
