"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { StoreBadges } from "@/components/site/StoreBadges";
import { ANDROID_ONLY_NETWORKS, NETWORKS, playCountriesText } from "@/lib/site";
import { PhoneFrame } from "./Frames";
import { EASE_OUT, Eyebrow } from "./primitives";

// The phones start stacked behind the middle one and fan out once the row comes into view.
const fan = (x: string, rotate: number): Variants => ({
  hidden: { x, rotate: 0, opacity: 0 },
  visible: { x: "0%", rotate, opacity: 1, transition: { duration: 1.1, ease: EASE_OUT, delay: 0.25 } },
});
const rise: Variants = {
  hidden: { y: 80, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 1, ease: EASE_OUT } },
};

/** The Android app (0.1.0 on Google Play), fanned out as it comes into view. */
export function Android() {
  const reduce = useReducedMotion();

  return (
    <section id="android" className="relative z-10 overflow-hidden px-6 py-24 md:py-36">
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow>Now on Google Play · Android</Eyebrow>
        <h2 className="mt-6 font-serif text-5xl leading-[1.02] text-white md:text-7xl">
          Your wallet, <span className="text-gold">in your pocket.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-gray-400">
          Send, receive, swap and buy AMX on your phone — plus Tron, with TRX and USDT, and moving USDT between networks. Use dapps in the built-in browser or with WalletConnect, and unlock with your fingerprint.
        </p>
        <StoreBadges chrome={false} className="mt-8" />
        <p className="mx-auto mt-4 max-w-md text-sm text-gray-500">
          Available in {playCountriesText} for Android 7.0 and newer. More countries are coming.
        </p>
      </div>

      <ul className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2" aria-label="Networks in the Android app">
        {NETWORKS.map((n) => (
          <li key={n.id} className="flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-3.5 py-1.5 text-sm text-gray-300">
            <span className="h-2 w-2 rounded-full" style={{ background: n.color }} />
            {n.name}
          </li>
        ))}
        {ANDROID_ONLY_NETWORKS.map((n) => (
          <li key={n.id} className="flex items-center gap-2 rounded-full border border-gold/30 bg-gold/[0.06] px-3.5 py-1.5 text-sm text-white">
            <span className="h-2 w-2 rounded-full" style={{ background: n.color }} />
            {n.name} <span className="hidden text-gray-400 sm:inline">· {n.detail}</span>
            <span className="whitespace-nowrap rounded-full bg-gold/15 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-gold">Android only</span>
          </li>
        ))}
      </ul>

      <motion.div
        // The phones fade out at the bottom through a mask, so they melt into whatever the
        // background is doing behind them (a colour overlay would show as a band).
        className="relative mx-auto mt-10 flex max-w-5xl items-end justify-center gap-4 px-6 pt-10 [mask-image:linear-gradient(to_bottom,#000_60%,transparent_97%)] md:mt-16 md:gap-10"
        initial={reduce ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-20% 0px" }}
      >
        <motion.div variants={fan("35%", -7)} className="hidden w-[210px] origin-bottom-right sm:block lg:w-[250px]">
          <PhoneFrame src="/shots/android/bridge.png" alt="Moving USDT from Tron to BNB Smart Chain in the Android app" />
        </motion.div>
        <motion.div variants={rise} className="relative z-10 w-[240px] lg:w-[280px]">
          <PhoneFrame src="/shots/android/home-tron.png" alt="The Android wallet on Tron, showing TRX and USDT" />
        </motion.div>
        <motion.div variants={fan("-35%", 7)} className="hidden w-[210px] origin-bottom-left sm:block lg:w-[250px]">
          <PhoneFrame src="/shots/android/networks-tron.png" alt="The network list in the Android app, with Tron below the EVM networks" />
        </motion.div>
      </motion.div>
    </section>
  );
}
