# Amerox Wallet — website

Landing page, user and developer docs, and privacy policy for the Amerox Wallet browser
extension. Styled to match the Amerox DEX landing (same palette, gold gradients, glows,
circuit backdrop, pixel wordmark), with scroll-driven, Apple-style product animations.

- **Next.js 16** (App Router, Turbopack) · **React 19** · **Tailwind CSS 4**
- **Motion** for animation, **Lenis** for smooth scrolling on the landing page
- **MDX** docs (`@next/mdx`, GitHub-flavoured tables, Shiki code highlighting)
- Every route is static — no server data, no cookies, no analytics.

## Run it

```sh
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
npm run lint
```

Copy `.env.example` to `.env.local` and set:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | The public URL (metadata, sitemap, share image). |
| `NEXT_PUBLIC_CHROME_STORE_URL` | The Chrome Web Store listing. Empty → buttons say "Get the extension" and open the install guide. Set → they say "Add to Chrome" and open the listing. |

## Where things live

| Path | What |
|---|---|
| `src/app/(site)/page.tsx` | The landing page (sections in `src/components/landing/`) |
| `src/app/(site)/privacy/` | Privacy policy (MDX). Flip `REVIEWED` in its `layout.tsx` once legal has approved it. |
| `src/app/docs/**/page.mdx` | Docs pages — one folder per page |
| `src/lib/docs-nav.ts` | Docs sidebar order, search index, previous/next |
| `src/mdx-components.tsx`, `src/components/docs/Mdx.tsx` | MDX components: `Callout`, `Steps`, `Cards`/`Card`, `MethodTable`, `Screens` |
| `src/lib/site.ts` | Links, company details, built-in network list |
| `src/app/globals.css` | Design tokens (from the DEX) and docs typography |
| `public/brand/` | Coin, wordmark, floating coins, circuit pattern (from the DEX) |
| `public/shots/` | Extension (440×600 @3×) and Android screenshots |

### Adding a docs page

1. Create `src/app/docs/<slug>/page.mdx` starting with
   `export const metadata = { title: "…", description: "…" }`.
2. Add it to `src/lib/docs-nav.ts` so it appears in the sidebar and search.

Every factual statement in the docs was checked against the extension source
(`amerox/apps/extension`). Keep it that way when the extension changes.

## Refreshing the extension screenshots

`scripts/capture-extension-shots.mjs` drives the **built** extension in Chromium with the
public Hardhat test phrase, shows demo balances through a local RPC proxy, fetches live
swap and Buy AMX quotes, and photographs approvals raised from a neutral `app.example`
page. Nothing is signed or broadcast.

```sh
# once, in the wallet repo
cd ../amerox/apps/extension && npm run build
cd e2e && npm install && npx playwright install chromium

# then, from this folder
node scripts/capture-extension-shots.mjs            # writes public/shots/extension
AMEROX_REPO=/path/to/amerox node scripts/capture-extension-shots.mjs
```

## Before launch

- Set `NEXT_PUBLIC_CHROME_STORE_URL` and `NEXT_PUBLIC_SITE_URL`.
- Have the privacy policy reviewed, then set `REVIEWED = true` (it is the URL the Chrome Web Store listing needs).
- Replace the Android screenshots when the app ships.

## Deploying

Any Node host works (`npm run build && npm start`); Vercel needs no configuration.
# amerox-launching-site
