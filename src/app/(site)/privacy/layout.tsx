import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How the Amerox Wallet extension and this website handle your data.",
};

/** Set to true once Amero X's legal counsel has approved the policy text. */
const REVIEWED = false;

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative z-10 px-5 pb-24 pt-36 md:pt-44">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_at_top,rgba(226,182,73,0.14),transparent_65%)]" />
      <article className="docs-content relative mx-auto max-w-3xl">
        {!REVIEWED && (
          <p className="!mb-8 rounded-2xl border border-amber-400/30 bg-amber-400/[0.06] px-4 py-3 text-sm text-amber-200">
            Draft — this policy is pending review by Amero X&apos;s legal counsel and may change before launch.
          </p>
        )}
        {children}
      </article>
    </div>
  );
}
