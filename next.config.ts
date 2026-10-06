import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Docs pages are `page.mdx` files under src/app/docs.
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  // `next dev` blocks its scripts on any hostname but localhost, which leaves the page blank
  // and unanimated. Allow the Mac's own network addresses (opening http://192.168.x.x:5173,
  // e.g. from a phone on the same Wi-Fi) and VS Code / Microsoft dev tunnels
  // (e.g. abc123-8080.inc1.devtunnels.ms) so the site works when forwarded.
  allowedDevOrigins: ["127.0.0.1", "192.168.*.*", "10.*.*.*", "*.devtunnels.ms", "**.devtunnels.ms"],
  images: {
    formats: ["image/avif", "image/webp"],
    // Next 16 allows only quality 75 unless listed; UI screenshots use 90 to keep small text crisp.
    qualities: [75, 90],
  },
};

// Plugins are given by name (not imported) so the config stays serialisable for Turbopack.
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: [
      "rehype-slug",
      ["rehype-pretty-code", { theme: "github-dark-dimmed", keepBackground: false }],
    ],
  },
});

export default withMDX(nextConfig);
