import { Footer } from "@/components/site/Footer";
import { Nav } from "@/components/site/Nav";
import { SmoothScroll } from "@/components/site/SmoothScroll";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <Nav />
      <main className="relative overflow-x-clip">{children}</main>
      <Footer />
    </SmoothScroll>
  );
}
