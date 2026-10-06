"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/** The DEX landing's fixed backdrop: a faint circuit pattern and three gold glows that
 *  drift across the page as you scroll. Decorative only. */
export function Background() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const b1x = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], ["50vw", "12vw", "88vw", "50vw"]);
  const b1y = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], ["62vh", "22vh", "78vh", "60vh"]);
  const b1s = useTransform(scrollYProgress, [0, 0.4, 0.8], [1.5, 1, 1.2]);
  const b2x = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], ["82vw", "60vw", "30vw", "70vw"]);
  const b2y = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], ["18vh", "80vh", "12vh", "40vh"]);
  const b3x = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], ["10vw", "50vw", "6vw", "30vw"]);
  const b3y = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], ["80vh", "50vh", "42vh", "85vh"]);
  const circuit = useTransform(scrollYProgress, [0, 0.2, 0.35, 0.5, 0.85, 0.95], [0.06, 0.02, 0.02, 0.08, 0.08, 0.03]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/brand/circuit.svg)",
          backgroundSize: "1200px",
          backgroundPosition: "center",
          opacity: reduce ? 0.05 : circuit,
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />
      {/* The glows move with transforms only (no layout or repaint per scroll frame). */}
      <motion.div className="absolute left-0 top-0" style={{ x: b1x, y: b1y, scale: b1s }}>
        <div className="h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full md:h-[640px] md:w-[640px]" style={{ background: "radial-gradient(circle, rgba(226,182,73,0.28) 0%, rgba(226,182,73,0) 70%)" }} />
      </motion.div>
      <motion.div className="absolute left-0 top-0" style={{ x: b2x, y: b2y }}>
        <div className="h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full md:h-[520px] md:w-[520px]" style={{ background: "radial-gradient(circle, rgba(252,218,123,0.18) 0%, rgba(252,218,123,0) 70%)" }} />
      </motion.div>
      <motion.div className="absolute left-0 top-0" style={{ x: b3x, y: b3y }}>
        <div className="h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full md:h-[720px] md:w-[720px]" style={{ background: "radial-gradient(circle, rgba(253,182,72,0.13) 0%, rgba(253,182,72,0) 70%)" }} />
      </motion.div>
    </div>
  );
}
