import type { Metadata } from "next";
import { DocsHeader, DocsSidebar, DocsToc, PrevNext } from "@/components/docs/DocsChrome";

export const metadata: Metadata = {
  title: { default: "Documentation", template: "%s · Amerox Docs" },
  description: "How to use the Amerox wallet, and how to integrate it into your dapp.",
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-page">
      <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_at_top,rgba(226,182,73,0.12),transparent_65%)]" />
      <DocsHeader />
      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-5 md:px-6 lg:grid-cols-[250px_minmax(0,1fr)] xl:grid-cols-[250px_minmax(0,1fr)_220px]">
        <DocsSidebar />
        <main className="min-w-0 py-10 md:py-14">
          <article className="docs-content mx-auto max-w-3xl">{children}</article>
          <div className="mx-auto max-w-3xl">
            <PrevNext />
          </div>
        </main>
        <DocsToc />
      </div>
    </div>
  );
}
