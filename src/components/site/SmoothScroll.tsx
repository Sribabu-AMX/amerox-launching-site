"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/** Lenis momentum scrolling, as on the DEX landing — off for people who asked for less motion. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    <ReactLenis root options={{ lerp: 0.085, smoothWheel: true, anchors: { offset: -96 } }}>
      {children}
    </ReactLenis>
  );
}
