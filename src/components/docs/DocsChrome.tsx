"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Download, Menu, Search, X } from "lucide-react";
import { ALL_DOCS, DOCS_NAV } from "@/lib/docs-nav";
import { SITE, installHref, installLabel } from "@/lib/site";

// ── search ────────────────────────────────────────────────────────────────────

function SearchPanel({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [i, setI] = useState(0);
  const results = useMemo(() => {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return ALL_DOCS;
    return ALL_DOCS.filter((d) => {
      const hay = `${d.title} ${d.description} ${d.keywords ?? ""} ${d.section}`.toLowerCase();
      return terms.every((t) => hay.includes(t));
    });
  }, [q]);
  const go = (href: string) => {
    onClose();
    router.push(href);
  };

  return (
    <motion.div className="fixed inset-0 z-[70] flex items-start justify-center bg-black/70 px-4 pt-[12vh] backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div
        role="dialog"
        aria-label="Search the docs"
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#111] shadow-2xl"
        initial={{ y: -12, scale: 0.98 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: -12, scale: 0.98 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-white/8 px-4">
          <Search size={17} className="text-gray-500" />
          <input
            autoFocus
            value={q}
            onChange={(e) => { setQ(e.target.value); setI(0); }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") { e.preventDefault(); setI((v) => Math.min(v + 1, results.length - 1)); }
              if (e.key === "ArrowUp") { e.preventDefault(); setI((v) => Math.max(v - 1, 0)); }
              if (e.key === "Enter" && results[i]) go(results[i].href);
              if (e.key === "Escape") onClose();
            }}
            placeholder="Search the docs…"
            className="h-14 flex-1 bg-transparent text-base text-white outline-none placeholder:text-gray-500"
          />
          <kbd className="rounded border border-white/10 px-1.5 py-0.5 text-[11px] text-gray-500">Esc</kbd>
        </div>
        <ul className="max-h-[50vh] overflow-y-auto p-2" data-lenis-prevent>
          {results.length === 0 && <li className="px-3 py-6 text-center text-sm text-gray-500">No pages match “{q}”.</li>}
          {results.map((r, idx) => (
            <li key={r.href}>
              <button
                type="button"
                onMouseEnter={() => setI(idx)}
                onClick={() => go(r.href)}
                className={`w-full rounded-xl px-3 py-2.5 text-left ${idx === i ? "bg-gold/10" : ""}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className={`font-medium ${idx === i ? "text-gold" : "text-white"}`}>{r.title}</span>
                  <span className="shrink-0 text-xs text-gray-500">{r.section}</span>
                </div>
                <div className="mt-0.5 text-sm text-gray-400">{r.description}</div>
              </button>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}

function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  return <AnimatePresence>{open && <SearchPanel onClose={onClose} />}</AnimatePresence>;
}

// ── header + sidebar ─────────────────────────────────────────────────────────

function SidebarLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Docs" className="space-y-8">
      {DOCS_NAV.map((section) => (
        <div key={section.title}>
          <h4 className="mb-3 px-3 text-xs font-semibold uppercase tracking-[0.16em] text-gold/80">{section.title}</h4>
          <ul className="space-y-0.5">
            {section.pages.map((p) => {
              const active = pathname === p.href;
              return (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={`block rounded-lg px-3 py-1.5 text-[14.5px] transition-colors ${active ? "bg-gold/10 font-medium text-gold" : "text-gray-400 hover:bg-white/[0.04] hover:text-white"}`}
                  >
                    {p.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export function DocsHeader() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setSearchOpen(true); }
      if (e.key === "/" && !(e.target instanceof HTMLInputElement)) { e.preventDefault(); setSearchOpen(true); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/8 bg-page/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-4 px-4 md:px-6">
          <button type="button" onClick={() => setMenuOpen(true)} className="-ml-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-gray-300 hover:bg-white/5 lg:hidden" aria-label="Open docs menu">
            <Menu size={19} />
          </button>
          <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="Amerox Wallet home">
            <Image src="/brand/coin-hero.png" alt="" width={28} height={28} className="h-7 w-7 shrink-0" />
            <Image src="/brand/amerox-wordmark.png" alt="Amero X" width={1038} height={125} className="hidden h-[15px] w-auto shrink-0 sm:block" />
          </Link>
          <span className="shrink-0 rounded-full border border-gold/30 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">Docs</span>

          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="ml-auto flex h-10 min-w-10 shrink-0 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 text-sm text-gray-400 transition-colors hover:border-gold/40 hover:text-white md:ml-6 md:w-56 md:justify-start lg:w-64"
          >
            <Search size={15} />
            <span className="hidden md:inline">Search docs</span>
            <kbd className="ml-auto hidden rounded border border-white/10 px-1.5 text-[11px] md:inline">⌘K</kbd>
          </button>
          <div className="hidden flex-1 md:block" />
          <Link href="/" className="hidden shrink-0 text-sm text-gray-400 hover:text-gold lg:block">Home</Link>
          <Link href={installHref} className="bg-gold-gradient hidden shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold text-black lg:inline-flex">
            <Download size={15} strokeWidth={2.4} /> {installLabel}
          </Link>
        </div>
      </header>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />

      <AnimatePresence>
        {menuOpen && (
          <motion.div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMenuOpen(false)}>
            <motion.aside
              className="h-full w-[82%] max-w-xs overflow-y-auto border-r border-white/10 bg-[#0d0d0d] p-5"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 38 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="font-display font-semibold text-white">Documentation</span>
                <button type="button" onClick={() => setMenuOpen(false)} className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-gray-300 hover:bg-white/5" aria-label="Close docs menu">
                  <X size={18} />
                </button>
              </div>
              <SidebarLinks onNavigate={() => setMenuOpen(false)} />
              <div className="mt-8 space-y-3 border-t border-white/10 pt-6">
                <Link href={installHref} onClick={() => setMenuOpen(false)} className="bg-gold-gradient flex h-11 items-center justify-center gap-2 rounded-full text-sm font-bold text-black">
                  <Download size={15} strokeWidth={2.4} /> {installLabel}
                </Link>
                <Link href="/" onClick={() => setMenuOpen(false)} className="flex h-11 items-center justify-center rounded-full border border-white/10 text-sm font-semibold text-gray-200 hover:border-gold/40 hover:text-gold">
                  Back to home
                </Link>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function DocsSidebar() {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto py-10 pr-4">
        <SidebarLinks />
      </div>
    </aside>
  );
}

// ── on this page ─────────────────────────────────────────────────────────────

export function DocsToc() {
  const pathname = usePathname();
  const [items, setItems] = useState<{ id: string; text: string; level: number }[]>([]);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".docs-content h2[id], .docs-content h3[id]"));
    // Read the rendered headings after paint (the page's content is the external source here).
    const frame = requestAnimationFrame(() =>
      setItems(els.map((el) => ({ id: el.id, text: el.textContent ?? "", level: el.tagName === "H3" ? 3 : 2 }))),
    );
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -70% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => { cancelAnimationFrame(frame); io.disconnect(); };
  }, [pathname]);

  if (items.length < 2) return <aside className="hidden xl:block" />;
  return (
    <aside className="hidden xl:block">
      <div className="sticky top-16 py-10 pl-2">
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">On this page</h4>
        <ul className="space-y-1.5 border-l border-white/8">
          {items.map((it) => (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                className={`-ml-px block border-l py-0.5 text-[13.5px] transition-colors ${it.level === 3 ? "pl-7" : "pl-4"} ${active === it.id ? "border-gold text-gold" : "border-transparent text-gray-500 hover:text-gray-200"}`}
              >
                {it.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export function PrevNext() {
  const pathname = usePathname();
  const idx = ALL_DOCS.findIndex((d) => d.href === pathname);
  if (idx === -1) return null;
  const prev = ALL_DOCS[idx - 1];
  const next = ALL_DOCS[idx + 1];
  return (
    <div className="mt-16 grid gap-4 border-t border-white/8 pt-8 sm:grid-cols-2">
      {prev ? (
        <Link href={prev.href} className="group rounded-2xl border border-white/8 p-4 transition-colors hover:border-gold/35">
          <div className="flex items-center gap-1.5 text-xs text-gray-500"><ArrowLeft size={13} /> Previous</div>
          <div className="mt-1 font-medium text-white group-hover:text-gold">{prev.title}</div>
        </Link>
      ) : <span />}
      {next && (
        <Link href={next.href} className="group rounded-2xl border border-white/8 p-4 text-right transition-colors hover:border-gold/35">
          <div className="flex items-center justify-end gap-1.5 text-xs text-gray-500">Next <ArrowRight size={13} /></div>
          <div className="mt-1 font-medium text-white group-hover:text-gold">{next.title}</div>
        </Link>
      )}
      <p className="text-sm text-gray-500 sm:col-span-2">
        Something wrong or unclear? Email <a className="text-gold hover:underline" href={`mailto:${SITE.email.support}`}>{SITE.email.support}</a>.
      </p>
    </div>
  );
}
