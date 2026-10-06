"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowDownUp, KeyRound, Plug, ScanEye, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";
import { ANDROID_ONLY_NETWORKS, NETWORKS } from "@/lib/site";
import { Eyebrow, SectionTitle } from "./primitives";

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } }}
      className={`group relative overflow-hidden rounded-3xl border border-white/5 bg-[#111] p-7 transition-colors duration-500 hover:border-gold/30 md:p-8 ${className}`}
    >
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(252,218,123,0.12),transparent_70%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
      {children}
    </motion.div>
  );
}

function CardTitle({ icon, title, body }: { icon: ReactNode; title: string; body: string }) {
  return (
    <div className="relative">
      <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gold/20 bg-gold/[0.07] text-gold">{icon}</div>
      <h3 className="font-display text-xl font-semibold text-white md:text-2xl">{title}</h3>
      <p className="mt-2 leading-relaxed text-gray-400">{body}</p>
    </div>
  );
}

function SwapMock() {
  return (
    <div className="relative mt-8 rounded-2xl border border-white/5 bg-black/40 p-4 font-sans">
      <div className="rounded-xl bg-white/[0.04] p-4">
        <div className="flex justify-between text-xs text-gray-500"><span>You pay</span><span>Balance 1.20</span></div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-3xl font-semibold text-white">0.50</span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-white">BNB</span>
        </div>
      </div>
      <div className="relative z-10 -my-3 flex justify-center">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border-4 border-[#0d0d0d] bg-[#1d1d1d] text-gold"><ArrowDownUp size={15} /></span>
      </div>
      <div className="rounded-xl bg-white/[0.04] p-4">
        <div className="text-xs text-gray-500">You receive</div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-3xl font-semibold text-white/90">≈ 376.8</span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-white">USDT</span>
        </div>
      </div>
      <div className="mt-3 space-y-1.5 px-1 text-xs text-gray-500">
        <div className="flex justify-between"><span>Minimum received</span><span className="font-mono text-gray-300">374.9 USDT</span></div>
        <div className="flex justify-between"><span>Slippage tolerance</span><span className="text-gold">0.50%</span></div>
      </div>
      <div className="bg-gold-gradient mt-4 rounded-full py-2.5 text-center text-sm font-bold text-black">Review swap</div>
      <p className="mt-2 text-center text-[10px] text-gray-600">Illustration — prices are live in the wallet.</p>
    </div>
  );
}

export function FeatureBento() {
  return (
    <section id="features" className="relative z-10 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>Features</Eyebrow>
          <SectionTitle lead="A wallet that" highlight="does the work." className="mt-6" />
          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-400">Swap at the best available price, buy AMX, and use your favourite dapps — with the checks a careful person would make, built in.</p>
        </div>

        <motion.div
          className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        >
          <Card className="md:col-span-2 lg:col-span-3 lg:row-span-2">
            <CardTitle icon={<ArrowDownUp size={18} />} title="Swap at the best available price" body="Quotes from the 0x aggregator — and the Amerox DEX on BNB Chain — across Ethereum, Base, Arbitrum One, Polygon and BNB Smart Chain. Your slippage limit is enforced before anything is signed." />
            <SwapMock />
          </Card>

          <Card className="lg:col-span-3">
            <div className="flex items-start gap-6">
              <div className="flex-1">
                <CardTitle icon={<span className="text-sm font-black">AMX</span>} title="Buy AMX in the wallet" body="Pay with BNB, USDT or USDC on BNB Chain. AMX arrives at the same address on Amero X Network — Amerox tracks it until it lands." />
              </div>
              <motion.div className="hidden w-28 shrink-0 lg:block" animate={{ rotate: [0, 8, 0, -8, 0], y: [0, -6, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
                <Image src="/brand/coin-hero.png" alt="" width={200} height={200} className="h-auto w-full drop-shadow-[0_0_30px_rgba(252,218,123,0.3)]" />
              </motion.div>
            </div>
          </Card>

          <Card className="lg:col-span-3">
            <CardTitle icon={<ScanEye size={18} />} title="A second look before you send" body="Look-alike addresses from your history are flagged before you send, and every address is shown in full where you act on it." />
            <div className="mt-6 rounded-xl border border-gold/25 bg-gold/[0.05] p-4 text-sm">
              <div className="font-semibold text-gold">This address looks like one you&apos;ve used</div>
              <div className="mt-1 font-mono text-xs leading-relaxed text-gray-400">0x71C7 656E C7ab 88b0 … 1B74 01B5 f6d8 976F</div>
            </div>
          </Card>

          <Card className="lg:col-span-2">
            <CardTitle icon={<Plug size={18} />} title="Works with your dapps" body="Amerox announces itself through EIP-6963, so modern dapps list it by name — and it never pushes another wallet aside." />
          </Card>

          <Card className="lg:col-span-2">
            <CardTitle icon={<KeyRound size={18} />} title="Encrypted on your device" body="Your vault is sealed with Argon2id and XChaCha20-Poly1305. Auto-lock after 1, 5, 15 or 30 minutes." />
          </Card>

          <Card className="md:col-span-2 lg:col-span-2">
            <CardTitle icon={<ShieldCheck size={18} />} title="No account. No sign-up." body="No email, no KYC, no server holding your keys. Install, create a wallet, and you're in." />
          </Card>

          <Card className="md:col-span-2 lg:col-span-6 !p-0">
            <div className="px-7 pt-7 md:px-8 md:pt-8">
              <h3 className="font-display text-xl font-semibold text-white md:text-2xl">Six networks built in</h3>
              <p className="mt-2 text-gray-400">In the extension and the Android app — plus Tron in the Android app, and any EVM network you add yourself.</p>
            </div>
            <div className="relative mt-6 overflow-hidden pb-8 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
                {[0, 1].map((copy) => (
                  <div key={copy} className="flex gap-3 pr-3" aria-hidden={copy === 1 || undefined}>
                    {NETWORKS.map((n) => (
                      <div key={n.id} className="flex items-center gap-3 rounded-full border border-white/8 bg-white/[0.03] px-5 py-3">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ background: n.color, boxShadow: `0 0 12px ${n.color}` }} />
                        <span className="whitespace-nowrap font-medium text-white">{n.name}</span>
                        <span className="whitespace-nowrap text-sm text-gray-500">Chain {n.id} · {n.symbol}</span>
                      </div>
                    ))}
                    {ANDROID_ONLY_NETWORKS.map((n) => (
                      <div key={n.id} className="flex items-center gap-3 rounded-full border border-gold/25 bg-gold/[0.05] px-5 py-3">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ background: n.color, boxShadow: `0 0 12px ${n.color}` }} />
                        <span className="whitespace-nowrap font-medium text-white">{n.name}</span>
                        <span className="whitespace-nowrap text-sm text-gray-500">{n.detail}</span>
                        <span className="whitespace-nowrap rounded-full bg-gold/15 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-gold">Android only</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
