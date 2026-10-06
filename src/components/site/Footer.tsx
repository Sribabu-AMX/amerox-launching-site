import Image from "next/image";
import Link from "next/link";
import { Mail, Send } from "lucide-react";
import { SITE, installHref } from "@/lib/site";
import { PixelWordmark } from "./PixelWordmark";
import { STORE_TRADEMARKS } from "./StoreBadges";

function XIcon({ size = 15 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
    </svg>
  );
}

const COLUMNS = [
  {
    title: "Wallet",
    links: [
      { label: "Chrome extension", href: installHref },
      { label: "Android app", href: SITE.playStoreUrl || "/#android" },
      { label: "Features", href: "/#features" },
      { label: "Security", href: "/#security" },
    ],
  },
  {
    title: "Docs",
    links: [
      { label: "Getting started", href: "/docs/install" },
      { label: "Security tips", href: "/docs/security" },
      { label: "Developer guide", href: "/docs/developers" },
      { label: "RPC reference", href: "/docs/developers/rpc-methods" },
    ],
  },
  {
    title: "Amero X",
    links: [
      { label: "Amerox DEX", href: SITE.dexUrl },
      { label: "AMX explorer", href: SITE.explorerUrl },
      { label: "Network details", href: "/docs/networks" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Email support", href: `mailto:${SITE.email.support}` },
      { label: "Telegram support", href: SITE.social.telegram },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative z-10 overflow-hidden bg-black pb-10 pt-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{ backgroundImage: "url(/brand/circuit.svg)", backgroundSize: "800px" }}
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-20 md:mb-24">
          <PixelWordmark />
        </div>

        <div className="flex flex-col gap-12 border-t border-white/10 pt-14 lg:flex-row lg:gap-20">
          <div className="space-y-5 lg:w-72 lg:shrink-0">
            <div className="flex items-center gap-2.5">
              <Image src="/brand/coin-hero.png" alt="" width={32} height={32} className="h-8 w-8" />
              <Image src="/brand/amerox-wordmark.png" alt="Amero X" width={1038} height={125} className="h-4 w-auto" />
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              The self-custody wallet for Amero X Network. Your keys are generated and kept on your device — nobody else holds them, including us.
            </p>
            <div className="flex gap-3">
              {[
                { label: "Amero X on X", href: SITE.social.x, icon: <XIcon /> },
                { label: "Amero X support on Telegram", href: SITE.social.telegram, icon: <Send size={15} /> },
                { label: "Email support", href: `mailto:${SITE.email.support}`, icon: <Mail size={15} /> },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-gray-400 transition-colors hover:bg-gold/10 hover:text-gold"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-4">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h4 className="mb-5 font-display text-sm font-bold text-white">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      {/^(https?:|mailto:)/.test(l.href) ? (
                        <a href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="break-words text-sm text-gray-400 transition-colors hover:text-gold">
                          {l.label}
                        </a>
                      ) : (
                        <Link href={l.href} className="text-sm text-gray-400 transition-colors hover:text-gold">
                          {l.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/5 pt-8 text-xs text-gray-500 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.company.name} · Company no. {SITE.company.number} · {SITE.company.address}
          </p>
          <p>Crypto assets are volatile. Only you can recover your wallet — keep your recovery phrase safe.</p>
        </div>
        <p className="mt-4 text-xs text-gray-600">{STORE_TRADEMARKS}</p>
      </div>
    </footer>
  );
}
