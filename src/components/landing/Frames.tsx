import Image from "next/image";
import { clsx } from "clsx";

/** The extension popup as it floats under the browser toolbar. Screens are 440×600, captured at 3×. */
export function PopupFrame({ src, alt, className, priority = false, sizes = "(max-width: 768px) 70vw, 360px" }: { src: string; alt: string; className?: string; priority?: boolean; sizes?: string }) {
  return (
    <div className={clsx("relative overflow-hidden rounded-[22px] bg-black ring-1 ring-white/12 glow-gold-lg", className)}>
      <Image src={src} alt={alt} width={1320} height={1800} sizes={sizes} priority={priority} quality={90} className="block h-auto w-full" />
      <div className="pointer-events-none absolute inset-0 rounded-[22px] ring-1 ring-inset ring-white/5" />
    </div>
  );
}

/** A modern phone, for the Android screens (1080×2400). */
export function PhoneFrame({ src, alt, className, sizes = "(max-width: 768px) 55vw, 280px" }: { src: string; alt: string; className?: string; sizes?: string }) {
  return (
    <div className={clsx("relative rounded-[44px] bg-[#1b1b1b] p-[10px] shadow-[0_40px_100px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.08)]", className)}>
      <div className="relative overflow-hidden rounded-[35px] bg-black">
        <Image src={src} alt={alt} width={1080} height={2400} sizes={sizes} quality={90} className="block h-auto w-full" />
        <div className="absolute left-1/2 top-2.5 h-[18px] w-[18px] -translate-x-1/2 rounded-full bg-black ring-1 ring-white/10" />
      </div>
    </div>
  );
}
