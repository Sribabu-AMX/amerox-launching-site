"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { Eyebrow, SectionTitle } from "./primitives";

const FAQ = [
  {
    q: "Is Amerox free?",
    a: "Yes. The extension and the Android app are free to install and use. Sending, swapping and buying still cost network (gas) fees, which go to the network — the wallet shows every fee before you confirm.",
  },
  {
    q: "Can Amerox recover my wallet if I lose my recovery phrase?",
    a: "No. Your keys are created and stored only on your device, so nobody — including Amero X — can see, move or restore your funds. Write your recovery phrase on paper and keep it somewhere safe.",
  },
  {
    q: "Which networks does it support?",
    a: "Amero X Network, Ethereum, Base, Arbitrum One, Polygon and BNB Smart Chain are built into both the extension and the Android app, and you can add any other EVM network yourself. The Android app also has Tron, with TRX and USDT (TRC-20) — Tron isn't in the extension yet.",
  },
  {
    q: "Does it work if I also use MetaMask?",
    a: "Yes. Amerox never takes over another wallet's place in the page. Dapps that support EIP-6963 list both wallets by name, so you choose which one to connect.",
  },
  {
    q: "Where can I use Buy AMX?",
    a: "Buy AMX runs on BNB Chain: you pay in BNB, USDT or USDC, and AMX is delivered to the same address on Amero X Network. The current price and purchase limits are shown in the wallet.",
  },
  {
    q: "Which browsers are supported?",
    a: "Chrome 111 or newer, and other Chromium-based browsers that install extensions from the Chrome Web Store, such as Brave.",
  },
  {
    q: "Is there a mobile app?",
    a: "Yes — Amerox for Android is on Google Play in the United States, the United Kingdom, Nigeria and Ukraine, with more countries to come. It runs on Android 7.0 and newer, and you can import the same recovery phrase you use in the extension. On top of the extension's features, it has Tron, moving USDT between networks, a built-in dapp browser and WalletConnect.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative z-10 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <Eyebrow>FAQ</Eyebrow>
          <SectionTitle lead="Questions," highlight="answered." className="mt-6" />
        </div>
        <div className="mt-14 divide-y divide-white/8 border-y border-white/8">
          {FAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className={`font-display text-lg font-semibold transition-colors md:text-xl ${isOpen ? "text-gold" : "text-white"}`}>{item.q}</span>
                  <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.3 }} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-gold">
                    <Plus size={16} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-12 leading-relaxed text-gray-400">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
