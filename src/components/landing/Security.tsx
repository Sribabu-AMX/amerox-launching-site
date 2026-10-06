"use client";

import { motion } from "motion/react";
import { Ban, EyeOff, KeyRound, Lock, MousePointerClick, TriangleAlert } from "lucide-react";
import { Eyebrow, Reveal } from "./primitives";

const RULES = [
  {
    icon: <Ban size={18} />,
    title: "Blind signing is refused",
    body: "eth_sign — the method that signs raw bytes nobody can read — is permanently disabled. So are other legacy methods that could be abused.",
  },
  {
    icon: <MousePointerClick size={18} />,
    title: "Every signature asks. Every time.",
    body: "Transactions, messages and chain switches each open an approval. There is no “remember my choice”.",
  },
  {
    icon: <EyeOff size={18} />,
    title: "Sites see nothing until you connect",
    body: "A site learns your address only after you approve, and only the accounts you pick. A locked wallet shows nothing to anyone.",
  },
  {
    icon: <TriangleAlert size={18} />,
    title: "Unlimited permissions are called out",
    body: "When a site asks to spend an unlimited amount of a token, Amerox says so in red — before you sign, not after.",
  },
  {
    icon: <Lock size={18} />,
    title: "Locked means locked",
    body: "Auto-lock after 1, 5, 15 or 30 minutes. Locking cancels anything still waiting for approval.",
  },
  {
    icon: <KeyRound size={18} />,
    title: "Only what it needs",
    body: "The extension asks Chrome for storage and alarms, and network access to the endpoints it uses — nothing more.",
  },
];

export function Security() {
  return (
    <section id="security" className="relative z-10 px-6 py-24 md:py-36">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <Eyebrow>Security</Eyebrow>
            <h2 className="mt-6 font-serif text-5xl leading-[1.02] text-white md:text-7xl">
              Built to <span className="italic text-gold">say no.</span>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-gray-400">
              Most wallet losses start with a signature someone didn&apos;t understand. Amerox is designed around refusing the dangerous ones and explaining the rest.
            </p>
            <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-gray-300">
              <KeyRound size={16} className="text-gold" />
              Vault encryption: Argon2id + XChaCha20-Poly1305
            </div>
          </Reveal>
        </div>

        <div className="relative">
          <motion.div
            aria-hidden
            className="absolute left-[21px] top-2 w-px bg-gradient-to-b from-gold via-gold/30 to-transparent"
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true, margin: "-20% 0px" }}
            transition={{ duration: 1.6, ease: "easeOut" }}
          />
          <ul className="space-y-10">
            {RULES.map((r, i) => (
              <motion.li
                key={r.title}
                className="relative flex gap-6"
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-[#141008] text-gold shadow-[0_0_24px_rgba(252,218,123,0.15)]">{r.icon}</span>
                <div className="pt-1.5">
                  <h3 className="font-display text-xl font-semibold text-white md:text-2xl">{r.title}</h3>
                  <p className="mt-2 max-w-xl leading-relaxed text-gray-400">{r.body}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
