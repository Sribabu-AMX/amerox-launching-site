"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { ArrowUpRight, ChevronRight, Download, Menu, Send, X } from "lucide-react";
import { SITE, installHref, installLabel } from "@/lib/site";

const LINKS = [
  { label: "Features", href: "/#features" },
  { label: "Security", href: "/#security" },
  { label: "Developers", href: "/#developers" },
  { label: "Docs", href: "/docs" },
];

/** The DEX's floating pill navbar: frosted gold glass, logo left, links centre, action right.
 *  Below 1024px the links move into a panel that opens from the pill. */
export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While the menu is open: the page underneath doesn't scroll, Escape closes it, and
  // growing the window to desktop width closes it (the inline links take over).
  useEffect(() => {
    if (!open) return undefined;
    lenis?.stop();
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onWide = (e: MediaQueryListEvent) => { if (e.matches) setOpen(false); };
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onWide);
    return () => {
      lenis?.start();
      html.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onWide);
    };
  }, [open, lenis]);

  const close = () => setOpen(false);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            key="scrim"
            className="fixed inset-0 z-40 bg-black/65 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            aria-hidden
          />
        )}
      </AnimatePresence>

      <nav className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-4 sm:pt-4 md:px-6 md:pt-6" aria-label="Main">
        <div
          className={`pointer-events-auto w-full max-w-7xl overflow-hidden rounded-[32px] border border-white/10 backdrop-blur-xl transition-[background-color,box-shadow] duration-300 ${
            open
              ? "bg-[#14110a]/95 shadow-[0_24px_70px_rgba(0,0,0,0.7)]"
              : scrolled
                ? "bg-[#E2B649]/[0.12] shadow-[0_10px_40px_rgba(0,0,0,0.45)]"
                : "bg-[#E2B649]/[0.08]"
          }`}
        >
          <div className="flex h-[60px] items-center justify-between gap-3 pl-4 pr-2.5 sm:pl-5 sm:pr-3 md:h-16 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-6">
            <Link href="/" onClick={close} aria-label="Amerox Wallet home" className="flex min-w-0 items-center gap-2.5 justify-self-start">
              <Image src="/brand/coin-hero.png" alt="" width={32} height={32} className="h-7 w-7 shrink-0 md:h-8 md:w-8" priority />
              <Image src="/brand/amerox-wordmark.png" alt="Amero X" width={1038} height={125} className="h-[15px] w-auto shrink-0 md:h-[18px]" priority />
              <span className="ml-0.5 hidden shrink-0 rounded-full border border-gold/30 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold md:inline">Wallet</span>
            </Link>

            <div className="hidden items-center gap-8 text-sm font-medium text-gray-300 lg:flex">
              {LINKS.map((l) => (
                <Link key={l.href} href={l.href} className="whitespace-nowrap transition-colors hover:text-gold-bright">
                  {l.label}
                </Link>
              ))}
            </div>

            <div className="flex shrink-0 items-center gap-1.5 justify-self-end">
              <Link
                href={installHref}
                className="bg-gold-gradient glow-gold hidden items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold text-black transition-transform hover:scale-105 active:scale-95 sm:inline-flex md:px-5"
              >
                <Download size={15} strokeWidth={2.4} />
                {installLabel}
              </Link>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-gray-100 transition-colors hover:bg-white/10 active:bg-white/15 lg:hidden"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={open ? "x" : "menu"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="flex"
                  >
                    {open ? <X size={22} /> : <Menu size={22} />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </div>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                id="mobile-menu"
                key="menu"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="lg:hidden"
              >
                <div className="max-h-[calc(100svh-96px)] overflow-y-auto border-t border-white/10 px-3 pb-4 pt-2" data-lenis-prevent>
                  <ul className="flex flex-col">
                    {LINKS.map((l, i) => (
                      <motion.li
                        key={l.href}
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.04 * i + 0.05 }}
                      >
                        <Link
                          href={l.href}
                          onClick={close}
                          className="flex min-h-[52px] items-center justify-between rounded-2xl px-3 text-[17px] font-medium text-gray-100 transition-colors hover:bg-white/5 active:bg-white/10"
                        >
                          {l.label}
                          <ChevronRight size={18} className="text-gray-500" />
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                  <Link
                    href={installHref}
                    onClick={close}
                    className="bg-gold-gradient mt-3 flex h-12 items-center justify-center gap-2 rounded-full font-bold text-black sm:hidden"
                  >
                    <Download size={17} strokeWidth={2.4} />
                    {installLabel}
                  </Link>
                  <div className="mt-4 flex items-center justify-between gap-3 px-2 text-sm text-gray-400">
                    <a href={SITE.dexUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-gold">
                      Amerox DEX <ArrowUpRight size={14} />
                    </a>
                    <a href={SITE.social.telegram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-gold">
                      <Send size={14} /> Support
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </>
  );
}
