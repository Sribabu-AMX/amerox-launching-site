"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

const word: Variants = {
  hidden: { opacity: 0.14 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

/** Apple-style statement: the words light up one after another as it comes into view.
 *  It plays on its own once started, so it never sits half-lit if you stop scrolling. */
export function Statement() {
  const reduce = useReducedMotion();
  const text = "Nobody — including us — can access your funds or restore them for you. Your recovery phrase is the only key, and it never leaves your device.";
  const gold = new Set(["Nobody", "us", "only", "key,"]);
  const words = text.split(" ");

  return (
    <section className="relative z-10 px-6 py-32 md:py-48">
      <motion.p
        className="mx-auto max-w-5xl font-display text-[2rem] font-semibold leading-[1.18] tracking-tight md:text-6xl md:leading-[1.12]"
        initial={reduce ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-25% 0px" }}
        variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
      >
        {words.map((w, i) => (
          <motion.span key={i} variants={word} className={gold.has(w) ? "text-gold" : "text-white"}>
            {w}{" "}
          </motion.span>
        ))}
      </motion.p>
    </section>
  );
}
