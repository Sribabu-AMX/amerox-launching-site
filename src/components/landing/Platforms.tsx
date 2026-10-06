"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { Check } from "lucide-react";
import type { ReactNode } from "react";
import { StoreBadges } from "@/components/site/StoreBadges";
import { SITE, playCountriesText } from "@/lib/site";
import { PhoneFrame, PopupFrame } from "./Frames";
import { EASE_OUT, Eyebrow, SectionTitle } from "./primitives";

const card: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_OUT } },
};
const device: Variants = {
  hidden: { opacity: 0, y: 90, scale: 0.94 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.1, ease: EASE_OUT, delay: 0.15 } },
};

function Platform({ tag, title, points, footer, children }: { tag: string; title: string; points: string[]; footer: ReactNode; children: ReactNode }) {
  return (
    <motion.article
      variants={card}
      className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-white/8 bg-[#101010] transition-[border-color,transform] duration-500 hover:-translate-y-1.5 hover:border-gold/30"
    >
      <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(252,218,123,0.16),transparent_70%)]" />
      {/* The device rises into the card once it comes into view, then floats. */}
      <div className="relative flex h-[300px] items-start justify-center overflow-hidden pt-10 sm:h-[360px] md:h-[400px] md:pt-12">
        <motion.div variants={device} className="w-[220px] sm:w-[240px]">
          <div className="transition-transform duration-700 group-hover:-translate-y-2">
            <div className="device-float">{children}</div>
          </div>
        </motion.div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#101010] to-transparent" />
      </div>
      <div className="relative flex flex-1 flex-col px-7 pb-8 pt-2 md:px-9 md:pb-10">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold/80">{tag}</span>
        <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">{title}</h3>
        <ul className="mt-5 space-y-2.5">
          {points.map((p) => (
            <li key={p} className="flex gap-3 text-gray-300">
              <Check size={18} className="mt-0.5 shrink-0 text-gold" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-8">{footer}</div>
      </div>
    </motion.article>
  );
}

/** Right under the hero: the two ways to get Amerox, side by side. Everything here animates
 *  once, on a timer, when it comes into view — nothing is tied to the scroll position, so it
 *  can never stop half-way. */
export function Platforms() {
  const reduce = useReducedMotion();
  return (
    <section id="get" className="relative z-10 px-6 py-24 md:py-32" aria-label="Get Amerox">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>Chrome · Android</Eyebrow>
          <SectionTitle lead="One wallet." highlight="Two ways in." className="mt-6" />
          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-400">
            Use Amerox in your browser, on your phone, or both — with the same recovery phrase.
          </p>
        </div>

        <motion.div
          className="mt-14 grid gap-6 md:mt-20 md:grid-cols-2 md:gap-8"
          initial={reduce ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-15% 0px" }}
          variants={{ visible: { transition: { staggerChildren: 0.18 } } }}
        >
          <Platform
            tag="Chrome extension"
            title="In your browser toolbar"
            points={[
              "Amero X, Ethereum, Base, Arbitrum One, Polygon and BNB Smart Chain",
              "Send, receive, swap and buy AMX",
              "Connect to dapps on any site — nothing is signed without your approval",
            ]}
            footer={
              <div className="flex flex-col items-start gap-3">
                <StoreBadges play={false} className="justify-start!" />
                <span className="text-sm text-gray-500">Chrome 111+ and other Chromium browsers</span>
              </div>
            }
          >
            <PopupFrame src="/shots/extension/home.png" alt="The Amerox extension home screen" sizes="240px" />
          </Platform>

          <Platform
            tag="Android app"
            title="In your pocket"
            points={[
              "The same six networks, plus Tron with TRX and USDT (TRC-20)",
              "Move USDT between networks, swap and buy AMX",
              "Built-in dapp browser, WalletConnect and fingerprint unlock",
            ]}
            footer={
              <div className="flex flex-col items-start gap-3">
                {SITE.playStoreUrl ? <StoreBadges chrome={false} className="justify-start!" /> : null}
                <span className="text-sm text-gray-500">On Google Play in {playCountriesText} · Android 7.0+</span>
              </div>
            }
          >
            <PhoneFrame src="/shots/android/home-tron.png" alt="The Amerox Android app on Tron, showing TRX and USDT" sizes="240px" />
          </Platform>
        </motion.div>
      </div>
    </section>
  );
}
