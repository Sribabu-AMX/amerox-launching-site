"use client";

import { ArrowRight, Braces } from "lucide-react";
import { GhostButton, GoldButton } from "@/components/site/Buttons";
import { Eyebrow, Reveal } from "./primitives";

const K = ({ children }: { children: React.ReactNode }) => <span className="text-[#f47067]">{children}</span>;
const S = ({ children }: { children: React.ReactNode }) => <span className="text-[#96d0ff]">{children}</span>;
const F = ({ children }: { children: React.ReactNode }) => <span className="text-[#dcbdfb]">{children}</span>;
const C = ({ children }: { children: React.ReactNode }) => <span className="text-[#768390]">{children}</span>;

export function Developers() {
  return (
    <section id="developers" className="relative z-10 px-6 py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        <Reveal className="min-w-0">
          <Eyebrow>For developers</Eyebrow>
          <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white md:text-6xl">
            Standard by design. <span className="text-gold">Easy to find.</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-400">
            Amerox is an EIP-1193 provider that announces itself through EIP-6963 as <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[0.9em] text-gold">io.amerox.wallet</code>. If your dapp uses wagmi, viem, ethers or any modern connector, it already works.
          </p>
          <ul className="mt-8 space-y-3 text-gray-300">
            {[
              "Coexists with other wallets — never overwrites window.ethereum",
              "Standard errors: 4001, 4100, 4200, 4900, 4902",
              "Add or switch to Amero X (chain 3535) with the usual wallet_ calls",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <GoldButton href="/docs/developers">
              <Braces size={16} /> Developer guide
            </GoldButton>
            <GhostButton href="/docs/developers/rpc-methods">
              RPC reference <ArrowRight size={16} />
            </GhostButton>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="min-w-0">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d0d] shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
            <div className="flex items-center gap-2 border-b border-white/5 px-5 py-3">
              <span className="h-3 w-3 rounded-full bg-white/10" />
              <span className="h-3 w-3 rounded-full bg-white/10" />
              <span className="h-3 w-3 rounded-full bg-white/10" />
              <span className="ml-3 font-mono text-xs text-gray-500">find-amerox.ts</span>
            </div>
            <pre className="overflow-x-auto p-6 font-mono text-[13px] leading-7 text-[#adbac7] md:text-sm">
              <code>
                <C>{"// EIP-6963: ask every installed wallet to announce itself"}</C>{"\n"}
                <K>window</K>.<F>addEventListener</F>(<S>{'"eip6963:announceProvider"'}</S>, (<K>event</K>) {"=> {"}{"\n"}
                {"  "}<K>const</K> {"{ info, provider }"} = event.detail;{"\n"}
                {"  "}<K>if</K> (info.rdns === <S>{'"io.amerox.wallet"'}</S>) {"{"}{"\n"}
                {"    "}amerox = provider;{"\n"}
                {"  }"}{"\n"}
                {"});"}{"\n"}
                <K>window</K>.<F>dispatchEvent</F>(<K>new</K> <F>Event</F>(<S>{'"eip6963:requestProvider"'}</S>));{"\n"}
                {"\n"}
                <C>{"// Then it is plain EIP-1193"}</C>{"\n"}
                <K>const</K> [account] = <K>await</K> amerox.<F>request</F>({"{"}{"\n"}
                {"  "}method: <S>{'"eth_requestAccounts"'}</S>,{"\n"}
                {"});"}
              </code>
            </pre>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
