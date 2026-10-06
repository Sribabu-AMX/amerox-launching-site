"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PopupFrame } from "./Frames";
import { Eyebrow, SectionTitle } from "./primitives";

const STEPS = [
  {
    tag: "Set up",
    title: "Ready in a minute.",
    body: "Create a new wallet or import one with its 12- or 24-word recovery phrase. Your password encrypts it on this device — at least 10 characters, and Amerox tells you how strong it is.",
    src: "/shots/extension/onboarding-welcome.png",
    alt: "The welcome screen: create a new wallet or import an existing one",
  },
  {
    tag: "Back up",
    title: "Back up the only key.",
    body: "Your recovery phrase stays blurred until you choose to reveal it, and you confirm a few words before the wallet is finished. No screenshots, no cloud notes — paper.",
    src: "/shots/extension/onboarding-backup.png",
    alt: "The backup screen with the recovery phrase hidden",
  },
  {
    tag: "Swap",
    title: "The best price, found for you.",
    body: "Quotes from the 0x aggregator and the Amerox DEX, with the rate, the minimum you'll receive and the network fee shown before you swap.",
    src: "/shots/extension/swap.png",
    alt: "A swap from BNB to BTCB with a live quote",
  },
  {
    tag: "Buy AMX",
    title: "AMX, straight to your wallet.",
    body: "Pay with BNB, USDT or USDC on BNB Chain and receive AMX at the same address on Amero X Network. Price and limits come from the sale contract itself.",
    src: "/shots/extension/buy-amx.png",
    alt: "Buying AMX with BNB",
  },
  {
    tag: "Sign",
    title: "Know what you sign.",
    body: "Every request opens its own screen with the amount, the recipient, the network and the fee. Unlimited spending permissions are called out in red before you agree.",
    src: "/shots/extension/approval-permit.png",
    alt: "A spending permission flagged as unlimited",
  },
  {
    tag: "Connect",
    title: "Connect on your terms.",
    body: "A site sees only the account you choose, and only after you say yes. Disconnect any site from the wallet at any time.",
    src: "/shots/extension/approval-connect.png",
    alt: "A site asking to connect, with the accounts to share",
  },
];

/** Apple's sticky-product pattern: the words scroll, the device holds still and changes screen. */
export function StoryScroller() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative z-10 px-6 py-24" aria-label="How Amerox works">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>How it works</Eyebrow>
          <SectionTitle lead="Everything you need." highlight="Nothing you don't." className="mt-6" />
        </div>

        <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-2 md:gap-16">
          <div>
            {STEPS.map((s, i) => (
              <div
                key={s.tag}
                ref={(el) => { refs.current[i] = el; }}
                data-index={i}
                className="flex min-h-[70vh] flex-col justify-center py-10 md:min-h-[85vh]"
              >
                <div className="md:hidden">
                  <PopupFrame src={s.src} alt={s.alt} className="mx-auto mb-8 w-[250px]" />
                </div>
                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gold/80">
                  {String(i + 1).padStart(2, "0")} · {s.tag}
                </span>
                <h3 className={`mt-4 font-display text-3xl font-semibold tracking-tight transition-colors duration-500 md:text-5xl ${active === i ? "text-white" : "text-white/35"}`}>
                  {s.title}
                </h3>
                <p className={`mt-5 max-w-md text-lg leading-relaxed transition-colors duration-500 ${active === i ? "text-gray-300" : "text-gray-600"}`}>
                  {s.body}
                </p>
              </div>
            ))}
          </div>

          <div className="relative hidden md:block">
            <div className="sticky top-[14vh] flex h-[72vh] items-center justify-center">
              <div className="absolute h-[70%] w-[70%] rounded-full bg-[radial-gradient(circle,rgba(226,182,73,0.2),transparent_70%)]" />
              <div className="relative w-[320px] lg:w-[340px]">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 40, scale: 0.96, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -40, scale: 0.96, filter: "blur(6px)" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <PopupFrame src={STEPS[active].src} alt={STEPS[active].alt} sizes="340px" />
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="absolute -right-2 top-1/2 flex -translate-y-1/2 flex-col gap-2">
                {STEPS.map((s, i) => (
                  <span key={s.tag} className={`block w-1.5 rounded-full transition-all duration-500 ${active === i ? "h-8 bg-gold" : "h-1.5 bg-white/20"}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
