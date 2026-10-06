/** Site-wide constants. Store links come from the environment, so a listing can be switched
 *  on or off without a code change. */

function playStoreUrl(env: string | undefined) {
  if (env === "off") return "";
  return env || "https://play.google.com/store/apps/details?id=io.amerox.wallet";
}

export const SITE = {
  name: "Amerox Wallet",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://wallet.amerox.io",
  description:
    "Amerox is a self-custody wallet for Amero X Network and the EVM chains you already use. Swap, buy AMX and connect to dapps — your keys never leave your device.",
  /** Chrome Web Store listing (published 0.1.0). The environment can point it elsewhere. */
  chromeStoreUrl: process.env.NEXT_PUBLIC_CHROME_STORE_URL || "https://chromewebstore.google.com/detail/canimdcopjlodioinbejamfelpijmblm",
  /** Google Play listing (published 0.1.0; offered in four countries, so it shows "Not found"
   *  elsewhere). Set NEXT_PUBLIC_PLAY_STORE_URL=off to hide every Play badge. */
  playStoreUrl: playStoreUrl(process.env.NEXT_PUBLIC_PLAY_STORE_URL),
  dexUrl: "https://amerox.io",
  explorerUrl: "https://amxscan.com",
  social: {
    x: "https://x.com/AmeroXchain",
    telegram: "https://t.me/AmeroXSupport",
  },
  email: {
    support: "support@amerox.io",
    contact: "contact@amerox.io",
  },
  company: {
    name: "Amero X LTD",
    number: "16941691",
    address: "71-75 Shelton Street, Covent Garden, London, United Kingdom",
  },
} as const;

/** Where "Add to Chrome" goes: the store listing, or the install guide if the URL is ever cleared. */
export const installHref = SITE.chromeStoreUrl || "/docs/install";
export const installLabel = SITE.chromeStoreUrl ? "Add to Chrome" : "Get the extension";

/** Where the Android app is on Google Play (0.1.0). Other countries come later. */
export const PLAY_COUNTRIES = ["the United States", "the United Kingdom", "Nigeria", "Ukraine"] as const;
export const playCountriesText = `${PLAY_COUNTRIES.slice(0, -1).join(", ")} and ${PLAY_COUNTRIES[PLAY_COUNTRIES.length - 1]}`;

/** The six built-in networks, exactly as the extension ships them
 *  (amerox/apps/extension/src/services/networks.js). */
export const NETWORKS = [
  { id: 3535, name: "Amero X Network", symbol: "AMX", fees: "Legacy", color: "#FCDA7B", home: true },
  { id: 1, name: "Ethereum", symbol: "ETH", fees: "EIP-1559", color: "#8A92B2" },
  { id: 8453, name: "Base", symbol: "ETH", fees: "EIP-1559", color: "#0052FF" },
  { id: 42161, name: "Arbitrum One", symbol: "ETH", fees: "EIP-1559", color: "#28A0F0" },
  { id: 137, name: "Polygon", symbol: "POL", fees: "EIP-1559", color: "#8247E5" },
  { id: 56, name: "BNB Smart Chain", symbol: "BNB", fees: "Legacy", color: "#F0B90B" },
] as const;

/** Networks only the Android app has so far (amerox/apps/mobile/src/services/networks.ts).
 *  The extension's 0.1.0 doesn't include them — always label them Android-only. */
export const ANDROID_ONLY_NETWORKS = [
  { id: 728126428, name: "Tron", symbol: "TRX", detail: "TRX · USDT (TRC-20)", color: "#C23631" },
] as const;
