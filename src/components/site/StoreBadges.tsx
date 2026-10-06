import Image from "next/image";
import { clsx } from "clsx";
import { SITE } from "@/lib/site";

/** The Chrome logo: three 120° bands bounded by lines tangent to the white ring, and the
 *  blue centre. */
function ChromeLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path fill="#EA4335" d="M24 14H43.6A22 22 0 0 0 5.54 12.03L15.34 29A10 10 0 0 1 24 14Z" />
      <path fill="#FBBC04" d="M43.6 14A22 22 0 0 1 22.86 45.97L32.66 29A10 10 0 0 0 24 14Z" />
      <path fill="#34A853" d="M22.86 45.97A22 22 0 0 1 5.54 12.03L15.34 29A10 10 0 0 0 32.66 29Z" />
      <circle cx="24" cy="24" r="10" fill="#fff" />
      <circle cx="24" cy="24" r="8" fill="#1A73E8" />
    </svg>
  );
}

const lift = "transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_28px_rgba(252,218,123,0.28)] active:translate-y-0";

/** "Add to Chrome", drawn to sit as a pair with the Google Play badge: same height, shape and
 *  black face (Google's own Chrome Web Store badge only comes in white). */
function ChromeButton({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Add Amerox to Chrome — Chrome Web Store (opens in a new tab)"
      className={clsx(
        "flex h-11 items-center gap-1.5 rounded-[7px] border border-[#a6a6a6] bg-black pl-1.5 pr-2.5 text-left text-white sm:h-14 sm:gap-3 sm:rounded-[9px] sm:pl-3 sm:pr-5",
        lift,
      )}
    >
      <ChromeLogo className="h-6 w-6 shrink-0 sm:h-9 sm:w-9" />
      <span className="flex flex-col leading-none">
        <span className="text-[8px] font-medium uppercase tracking-[0.08em] text-white/80 sm:text-[11px]">Add to Chrome</span>
        <span className="mt-1 whitespace-nowrap text-[12.5px] font-semibold tracking-tight sm:text-[19px]">Chrome Web Store</span>
      </span>
    </a>
  );
}

/** The official Google Play badge, unmodified apart from size (Google Play brand rules). */
function PlayBadge({ href }: { href: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={clsx("block rounded-[7px] sm:rounded-[9px]", lift)}>
      <Image src="/brand/google-play-badge.png" alt="Get it on Google Play" width={564} height={168} className="h-11 w-auto sm:h-14" />
    </a>
  );
}

/** The two store buttons. Each appears only while its store URL is set, and they are always
 *  the same height — Google Play's badge may not be shown smaller than another store's. */
export function StoreBadges({ className, chrome = true, play = true }: { className?: string; chrome?: boolean; play?: boolean }) {
  const showChrome = chrome && !!SITE.chromeStoreUrl;
  const showPlay = play && !!SITE.playStoreUrl;
  if (!showChrome && !showPlay) return null;
  return (
    <div className={clsx("flex flex-wrap items-center justify-center gap-2 sm:gap-4", className)}>
      {showChrome && <ChromeButton href={SITE.chromeStoreUrl} />}
      {showPlay && <PlayBadge href={SITE.playStoreUrl} />}
    </div>
  );
}

/** Google's trademark attribution for the Google Play badge and the store names, for the footer. */
export const STORE_TRADEMARKS =
  "Chrome, the Chrome Web Store, Google Play and the Google Play logo are trademarks of Google LLC.";
