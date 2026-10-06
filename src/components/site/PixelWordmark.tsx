"use client";

import { motion } from "motion/react";

/** The DEX footer's pixel-matrix AMERO X, lit dot by dot as it scrolls into view. */
const LETTERS: Record<string, number[][]> = {
  A: [[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1]],
  M: [[1,0,0,0,1],[1,1,0,1,1],[1,0,1,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1]],
  E: [[1,1,1,1,1],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,0],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,1]],
  R: [[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0],[1,0,1,0,0],[1,0,0,1,0],[1,0,0,0,1]],
  O: [[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],
  X: [[1,0,0,0,1],[0,1,0,1,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,1,0,1,0],[1,0,0,0,1]],
};

function Letter({ letter, delay }: { letter: string; delay: number }) {
  return (
    <div className="flex flex-col gap-px sm:gap-1 lg:gap-1.5" aria-hidden>
      {LETTERS[letter].map((row, r) => (
        <div key={r} className="flex gap-px sm:gap-1 lg:gap-1.5">
          {row.map((on, c) => (
            <motion.div
              key={c}
              className={`h-1.5 w-1.5 rounded-[1px] sm:h-2 sm:w-2 lg:h-3 lg:w-3 ${on ? "shadow-[0_0_8px_rgba(252,218,123,0.5)]" : "bg-[#1A1A1A] opacity-30"}`}
              style={{ background: on ? "linear-gradient(135deg, #FFD951, #FCDA7B, #FDB648)" : undefined }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: on ? 1 : 0.3, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: delay + r * 0.05 + c * 0.05, ease: "backOut" }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function PixelWordmark() {
  return (
    <div className="flex flex-nowrap justify-center gap-1 opacity-80 sm:gap-3 md:gap-5 lg:gap-8" role="img" aria-label="Amero X">
      {["A", "M", "E", "R", "O"].map((l, i) => <Letter key={i} letter={l} delay={i * 0.1} />)}
      <div className="w-1.5 md:w-3 lg:w-4" />
      <Letter letter="X" delay={0.6} />
    </div>
  );
}
