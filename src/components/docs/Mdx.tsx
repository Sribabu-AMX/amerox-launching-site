import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { AlertTriangle, Info, ShieldAlert, Lightbulb, ArrowRight } from "lucide-react";

const TONES = {
  info: { icon: <Info size={16} />, cls: "border-sky-400/25 bg-sky-400/[0.05] text-sky-200" },
  tip: { icon: <Lightbulb size={16} />, cls: "border-gold/30 bg-gold/[0.06] text-[#fde7a7]" },
  warn: { icon: <AlertTriangle size={16} />, cls: "border-amber-400/30 bg-amber-400/[0.06] text-amber-200" },
  danger: { icon: <ShieldAlert size={16} />, cls: "border-red-400/30 bg-red-400/[0.06] text-red-200" },
} as const;

export function Callout({ type = "info", title, children }: { type?: keyof typeof TONES; title?: string; children: ReactNode }) {
  const t = TONES[type];
  return (
    <div className={`not-prose flex gap-3 rounded-2xl border px-4 py-3.5 text-[15px] leading-relaxed ${t.cls}`}>
      <span className="mt-1 shrink-0">{t.icon}</span>
      <div className="min-w-0 [&_p]:m-0 [&_p+p]:mt-2 [&_a]:text-inherit [&_code]:text-inherit">
        {title && <p className="!mb-1 font-semibold text-white">{title}</p>}
        <div className="text-gray-300">{children}</div>
      </div>
    </div>
  );
}

/** Numbered steps: wrap an ordered list of `### Step` headings in <Steps>. */
export function Steps({ children }: { children: ReactNode }) {
  return <div className="docs-steps ml-3 border-l border-white/10 pl-7 [counter-reset:step] [&>h3]:relative [&>h3]:[counter-increment:step] [&>h3]:before:absolute [&>h3]:before:-left-[46px] [&>h3]:before:flex [&>h3]:before:h-8 [&>h3]:before:w-8 [&>h3]:before:items-center [&>h3]:before:justify-center [&>h3]:before:rounded-full [&>h3]:before:border [&>h3]:before:border-gold/40 [&>h3]:before:bg-[#141008] [&>h3]:before:text-sm [&>h3]:before:text-gold [&>h3]:before:content-[counter(step)]">{children}</div>;
}

export function Cards({ children }: { children: ReactNode }) {
  return <div className="not-prose grid gap-4 sm:grid-cols-2">{children}</div>;
}

export function Card({ title, href, children }: { title: string; href: string; children?: ReactNode }) {
  return (
    <Link href={href} className="group block rounded-2xl border border-white/8 bg-[#111] p-5 !no-underline transition-colors hover:border-gold/35">
      <div className="flex items-center justify-between gap-3 font-display text-base font-semibold text-white">
        {title}
        <ArrowRight size={16} className="text-gray-500 transition-all group-hover:translate-x-0.5 group-hover:text-gold" />
      </div>
      {children && <div className="mt-1.5 text-sm leading-relaxed text-gray-400">{children}</div>}
    </Link>
  );
}

type Row = [method: string, note: string];
export function MethodTable({ rows }: { rows: Row[] }) {
  return (
    <div className="docs-table">
      <table>
        <thead>
          <tr>
            <th>Method</th>
            <th>Behaviour</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([m, n]) => (
            <tr key={m}>
              <td className="whitespace-nowrap"><code>{m}</code></td>
              <td>{n}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Real extension screens (440×600, captured at 3×), one or two side by side. */
export function Screens({ items }: { items: { src: string; alt: string; caption?: string }[] }) {
  return (
    <div className="not-prose my-8 flex flex-wrap justify-center gap-6">
      {items.map((it) => (
        <figure key={it.src} className="w-[260px]">
          <div className="overflow-hidden rounded-[20px] bg-black shadow-[0_24px_60px_rgba(0,0,0,0.55)] ring-1 ring-white/10">
            <Image src={it.src} alt={it.alt} width={1320} height={1800} sizes="260px" quality={90} className="block h-auto w-full" />
          </div>
          {it.caption && <figcaption className="mt-3 text-center text-sm text-gray-500">{it.caption}</figcaption>}
        </figure>
      ))}
    </div>
  );
}
