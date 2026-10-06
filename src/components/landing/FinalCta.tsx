"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { GhostButton } from "@/components/site/Buttons";
import { StoreBadges } from "@/components/site/StoreBadges";
import { BlurWords } from "./primitives";

export function FinalCta() {
  const reduce = useReducedMotion();
  return (
    <section className="relative z-10 px-6 pb-32 pt-24 md:pb-44">
      <div className="absolute inset-x-0 top-0 h-[120px] -translate-y-1/2">
        <div className="h-full w-full bg-gradient-to-r from-transparent via-gold-muted to-transparent opacity-40 blur-[70px]" />
      </div>
      <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
        <motion.div
          className="w-36 md:w-48 [perspective:800px]"
          initial={reduce ? false : { opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div animate={reduce ? undefined : { rotateY: [-28, 28, -28], y: [0, -8, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>
            <Image src="/brand/coin-hero.png" alt="" width={400} height={400} className="h-auto w-full drop-shadow-[0_0_50px_rgba(252,218,123,0.35)]" />
          </motion.div>
        </motion.div>
        <BlurWords as="h2" text="Take control of your keys." className="mt-10 font-serif text-5xl leading-[1.05] text-gold md:text-7xl" />
        <p className="mt-6 max-w-xl text-lg text-gray-400">Install Amerox, create a wallet in a minute, and keep the only key yourself.</p>
        <div className="mt-10 flex flex-col items-center gap-5">
          <StoreBadges />
          <GhostButton href="/docs/install">
            Installation guide <ArrowRight size={16} />
          </GhostButton>
        </div>
      </div>
    </section>
  );
}
