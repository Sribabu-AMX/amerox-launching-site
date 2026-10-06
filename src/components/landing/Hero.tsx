"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { GhostButton } from "@/components/site/Buttons";
import { StoreBadges } from "@/components/site/StoreBadges";
import { SITE } from "@/lib/site";
import { BlurWords, Eyebrow } from "./primitives";

/** A small coin that drifts with the scroll. Its entrance and bobbing are CSS, so they run
 *  from the first paint and never wait for JavaScript. */
function FloatingCoin({ src, className, delay, speed, size }: { src: string; className: string; delay: number; speed: number; size: number }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, speed * 220]);
  return (
    <motion.div className={`absolute ${className}`} style={{ y }}>
      <div className="hero-coin" style={{ animationDelay: `${0.3 + delay}s` }}>
        <div className="hero-float" style={{ animationDelay: `${delay}s` }}>
          <Image src={src} alt="" width={size} height={size} className="h-auto w-full drop-shadow-2xl" />
        </div>
      </div>
    </motion.div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.95], [1, 0]);
  const coinScale = useTransform(scrollYProgress, [0, 1], [1, 0.6]);
  const coinOpacity = useTransform(scrollYProgress, [0, 0.8], [0.22, 0]);

  return (
    <section ref={ref} className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pb-16 pt-32">
      {/* The giant coin, faint behind the headline, as on the DEX hero. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 w-[280px] -translate-x-1/2 -translate-y-1/2 md:w-[560px]"
        style={reduce ? { opacity: 0.2 } : { scale: coinScale, opacity: coinOpacity }}
      >
        <div className="hero-pop">
          <div className="hero-sway">
            <Image src="/brand/coin-hero.png" alt="" width={1020} height={1020} preload className="h-auto w-full drop-shadow-[0_0_60px_rgba(252,218,123,0.25)]" />
          </div>
        </div>
      </motion.div>

      <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
        <FloatingCoin src="/brand/coin1.png" size={120} className="left-[6%] top-[20%] w-14 md:w-20" delay={0} speed={-0.5} />
        <FloatingCoin src="/brand/coin2.png" size={160} className="left-[80%] top-[16%] w-16 md:w-28" delay={0.2} speed={-0.2} />
        <FloatingCoin src="/brand/coin3.png" size={140} className="left-[4%] top-[72%] w-14 md:w-24" delay={0.4} speed={0.3} />
        <FloatingCoin src="/brand/coin4.png" size={180} className="left-[84%] top-[68%] hidden w-32 blur-[1px] md:block" delay={0.6} speed={0.5} />
      </div>

      <motion.div style={reduce ? undefined : { y: textY, opacity: textOpacity }} className="relative z-10 flex max-w-5xl flex-col items-center text-center">
        <div className="hero-rise">
          <Eyebrow>Amerox Wallet<span className="hidden sm:inline"> · {SITE.playStoreUrl ? "Chrome & Android" : "Browser extension"}</span></Eyebrow>
        </div>

        <h1 className="mt-8 font-serif text-[3.25rem] leading-[1.02] tracking-tight drop-shadow-lg sm:text-7xl md:text-8xl lg:text-[7.5rem]">
          <BlurWords as="span" onLoad text="Your keys." className="block text-gold" delay={0.15} />
          <BlurWords as="span" onLoad text="Your control." className="block text-gold-deep" delay={0.45} />
        </h1>

        <p className="hero-rise mt-8 max-w-2xl text-lg font-light leading-relaxed text-gray-200 md:text-xl" style={{ animationDelay: "0.9s" }}>
          The self-custody wallet for Amero X Network and the EVM chains you already use. Swap, buy AMX and connect to dapps — without ever handing over your keys.
        </p>

        <div className="hero-rise mt-10 flex flex-col items-center gap-5" style={{ animationDelay: "1.1s" }}>
          <StoreBadges />
          <GhostButton href="/docs">
            Read the docs <ArrowRight size={16} />
          </GhostButton>
        </div>
        <p className="hero-fade mt-5 max-w-xl text-sm text-gray-500" style={{ animationDelay: "1.4s" }}>
          {SITE.playStoreUrl
            ? "Free · Chrome and other Chromium browsers · Android in the US, UK, Nigeria and Ukraine · No account, no sign-up"
            : "Free · For Chrome and other Chromium browsers · No account, no sign-up"}
        </p>
      </motion.div>

      <div
        aria-hidden
        className="hero-fade absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-gray-500 md:flex"
        style={{ animationDelay: "2s" }}
      >
        Scroll
        <span className="hero-scroll-line block h-10 w-px origin-top bg-gradient-to-b from-gold to-transparent" />
      </div>
    </section>
  );
}
