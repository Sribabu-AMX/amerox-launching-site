"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { Lock, RotateCw } from "lucide-react";
import { PopupFrame } from "./Frames";

/** A caption that owns one slice of the pinned scroll. */
function Caption({ progress, range, title, body }: { progress: MotionValue<number>; range: [number, number, number, number]; title: string; body: string }) {
  const opacity = useTransform(progress, range, [0, 1, 1, 0]);
  const y = useTransform(progress, range, [24, 0, 0, -24]);
  return (
    <motion.div style={{ opacity, y }} className="absolute inset-x-0 top-0 mx-auto max-w-3xl px-6 text-center">
      <h2 className="font-display text-3xl font-semibold tracking-tight text-white md:text-5xl">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-base text-gray-400 md:text-lg">{body}</p>
    </motion.div>
  );
}

/** Abstract dapp page inside the browser mock — deliberately generic, not anyone's product. */
function DappPage() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0c0c0c]">
      <div className="absolute -left-20 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(226,182,73,0.22),transparent_70%)]" />
      <div className="absolute bottom-0 right-10 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(253,182,72,0.12),transparent_70%)]" />
      <div className="relative grid h-full grid-cols-12 gap-4 p-6 md:p-10">
        <div className="col-span-7 space-y-4">
          <div className="h-3 w-24 rounded-full bg-white/10" />
          <div className="h-8 w-4/5 rounded-lg bg-white/[0.08] md:h-10" />
          <div className="h-8 w-3/5 rounded-lg bg-white/[0.06] md:h-10" />
          <div className="mt-6 space-y-2">
            <div className="h-2.5 w-full rounded-full bg-white/[0.05]" />
            <div className="h-2.5 w-11/12 rounded-full bg-white/[0.05]" />
            <div className="h-2.5 w-4/6 rounded-full bg-white/[0.05]" />
          </div>
          <div className="bg-gold-gradient mt-6 h-9 w-36 rounded-full opacity-80" />
        </div>
        <div className="col-span-5 rounded-2xl border border-white/5 bg-white/[0.03] p-4">
          <div className="h-2.5 w-16 rounded-full bg-white/10" />
          <div className="mt-4 h-20 rounded-xl bg-white/[0.04]" />
          <div className="mt-3 h-20 rounded-xl bg-white/[0.04]" />
        </div>
      </div>
    </div>
  );
}

export function ProductReveal() {
  const ref = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  // Where the popup sits when it is "open under the toolbar icon": its right edge at the icon.
  const anchorX = useRef(0);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  useEffect(() => {
    const measure = () => {
      const w = stageRef.current?.offsetWidth ?? 0;
      const pw = popupRef.current?.offsetWidth ?? 0;
      anchorX.current = Math.max(0, w / 2 - pw / 2 - 10);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (stageRef.current) ro.observe(stageRef.current);
    if (popupRef.current) ro.observe(popupRef.current);
    return () => ro.disconnect();
  }, []);

  // Browser window: tilted back in 3D, settles flat, then steps back for the trio.
  const rotateX = useTransform(p, [0, 0.28], [32, 0]);
  const winScale = useTransform(p, [0, 0.28, 0.62, 0.85], [0.84, 1, 1, 0.92]);
  const winY = useTransform(p, [0, 0.28], [80, 0]);
  const winOpacity = useTransform(p, [0, 0.1, 0.62, 0.85], [0.4, 1, 1, 0.3]);

  // The popup opens out of the toolbar icon, then glides to the centre for the trio.
  const popScale = useTransform(p, [0.3, 0.48], [0.06, 1]);
  const popOpacity = useTransform(p, [0.3, 0.36], [0, 1]);
  const popX = useTransform(p, (v) => {
    const t = Math.min(1, Math.max(0, (v - 0.6) / 0.2)); // 0.6 → 0.8
    const ease = 1 - Math.pow(1 - t, 3);
    return anchorX.current * (1 - ease);
  });

  // Two more screens slide in beside it.
  const leftX = useTransform(p, [0.62, 0.84], ["22%", "0%"]);
  const rightX = useTransform(p, [0.62, 0.84], ["-22%", "0%"]);
  const sideOpacity = useTransform(p, [0.64, 0.8], [0, 1]);
  const sideRotL = useTransform(p, [0.62, 0.84], [0, -7]);
  const sideRotR = useTransform(p, [0.62, 0.84], [0, 7]);
  const iconGlow = useTransform(p, [0.18, 0.3, 0.46], [0, 1, 0]);
  const iconShadow = useTransform(iconGlow, (g) => `0 0 ${20 * g}px rgba(252,218,123,${0.85 * g})`);

  if (reduce) {
    return (
      <section className="relative z-10 px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-semibold text-white md:text-5xl">One click away, on every site.</h2>
          <p className="mt-3 text-gray-400">Amerox lives in your browser toolbar. Open it to check balances, send, swap, and approve what sites ask for.</p>
        </div>
        <div className="mx-auto mt-12 w-[300px]"><PopupFrame src="/shots/extension/home.png" alt="The Amerox home screen" /></div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative z-10 h-[340vh]" aria-label="The Amerox extension">
      <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pt-20 md:pt-24">
        <div className="relative mb-4 h-[150px] w-full sm:h-[124px] md:mb-8">
          <Caption progress={p} range={[0.02, 0.09, 0.24, 0.3]} title="It lives in your browser." body="A wallet in the toolbar of Chrome and other Chromium browsers — ready on every site you visit." />
          <Caption progress={p} range={[0.32, 0.4, 0.55, 0.61]} title="One click away." body="Open it to see balances across your networks, send, receive, swap and buy AMX." />
          <Caption progress={p} range={[0.65, 0.73, 0.96, 1.01]} title="Every request, in plain words." body="Connections, transactions and signatures each open their own screen — nothing happens until you say so." />
        </div>

        {/* The stage is sized by the viewport height so the whole window always fits. */}
        <div ref={stageRef} className="relative w-[min(980px,calc((100svh-330px)*1.6),100%)] [perspective:1600px]">
          <motion.div
            style={{ rotateX, scale: winScale, y: winY, opacity: winOpacity, transformOrigin: "50% 0%" }}
            className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#141414] shadow-[0_50px_120px_rgba(0,0,0,0.7)] md:rounded-3xl"
          >
            <div className="flex h-11 items-center gap-3 border-b border-white/5 bg-[#171717] px-3 md:px-4">
              <div className="hidden gap-1.5 sm:flex">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]/80" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]/80" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]/80" />
              </div>
              <RotateCw size={14} className="hidden text-gray-500 sm:block" />
              <div className="flex flex-1 items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 text-[11px] text-gray-400 md:text-xs">
                <Lock size={11} /> app.example
              </div>
              <motion.div className="relative flex h-7 w-7 items-center justify-center rounded-full" style={{ boxShadow: iconShadow }}>
                <Image src="/brand/coin-hero.png" alt="" width={22} height={22} className="h-5 w-5" />
              </motion.div>
            </div>
            <DappPage />
          </motion.div>

          <div className="pointer-events-none absolute inset-x-0 top-[50px] flex justify-center">
            <div className="relative flex items-start justify-center gap-4 lg:gap-8">
              <motion.div style={{ x: leftX, opacity: sideOpacity, rotate: sideRotL }} className="mt-10 hidden w-[190px] origin-bottom-right md:block lg:w-[230px]">
                <PopupFrame src="/shots/extension/approval-connect.png" alt="A site asking to connect" sizes="230px" />
              </motion.div>
              <motion.div
                ref={popupRef}
                style={{ x: popX, scale: popScale, opacity: popOpacity, transformOrigin: "100% 0%" }}
                className="w-[190px] sm:w-[220px] lg:w-[270px]"
              >
                <PopupFrame src="/shots/extension/home.png" alt="The Amerox home screen" priority sizes="270px" />
              </motion.div>
              <motion.div style={{ x: rightX, opacity: sideOpacity, rotate: sideRotR }} className="mt-10 hidden w-[190px] origin-bottom-left md:block lg:w-[230px]">
                <PopupFrame src="/shots/extension/approval-transaction.png" alt="A transaction to review" sizes="230px" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
