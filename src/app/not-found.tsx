import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-page px-6 text-center">
      <Image src="/brand/coin-hero.png" alt="" width={120} height={120} className="h-24 w-24 opacity-80" />
      <h1 className="mt-8 font-serif text-5xl text-gold md:text-6xl">Page not found</h1>
      <p className="mt-4 max-w-md text-gray-400">That page doesn&apos;t exist — but your keys are exactly where you left them.</p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="bg-gold-gradient rounded-full px-6 py-3 font-bold text-black">Home</Link>
        <Link href="/docs" className="rounded-full border border-white/15 px-6 py-3 font-semibold text-white hover:border-gold/50 hover:text-gold">Docs</Link>
      </div>
    </main>
  );
}
