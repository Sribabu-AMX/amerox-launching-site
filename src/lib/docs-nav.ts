/** The docs table of contents: drives the sidebar, previous/next links and search. */

export type DocPage = { title: string; href: string; description: string; keywords?: string };
export type DocSection = { title: string; pages: DocPage[] };

export const DOCS_NAV: DocSection[] = [
  {
    title: "Using Amerox",
    pages: [
      { title: "Introduction", href: "/docs", description: "What Amerox is and where to start." },
      { title: "Install Amerox", href: "/docs/install", description: "Add the extension to Chrome, or get the Android app on Google Play.", keywords: "chrome web store brave edge pin toolbar android google play phone app" },
      { title: "Create or import a wallet", href: "/docs/create-wallet", description: "Set up a new wallet or restore one from a recovery phrase.", keywords: "onboarding password seed phrase 12 24 words import" },
      { title: "Back up and recover", href: "/docs/backup", description: "Keep your recovery phrase safe, reveal it, and recover access.", keywords: "seed phrase forgot password restore reveal private key" },
      { title: "Accounts", href: "/docs/accounts", description: "Add accounts, import a private key, or watch an address.", keywords: "account private key watch-only derivation ledger" },
      { title: "Send and receive", href: "/docs/send-receive", description: "Send tokens safely and share your address.", keywords: "transfer address poisoning qr receive" },
      { title: "Networks", href: "/docs/networks", description: "The six built-in networks, Tron on Android, and adding your own.", keywords: "amero x chain id rpc custom network ethereum bnb base arbitrum polygon tron trx usdt trc-20" },
      { title: "Swap", href: "/docs/swap", description: "Swap tokens at the best available price.", keywords: "0x aggregator slippage approval minimum received dex" },
      { title: "Buy AMX", href: "/docs/buy-amx", description: "Buy AMX with BNB, USDT or USDC on BNB Chain.", keywords: "purchase amx sale vault price limits delivery" },
      { title: "Dapps and connected sites", href: "/docs/connected-sites", description: "Connect to dapps, review requests and disconnect.", keywords: "connect approve sign permission revoke walletconnect" },
      { title: "Security tips", href: "/docs/security", description: "Habits that keep your funds safe.", keywords: "phishing scam approvals seed phrase" },
      { title: "Troubleshooting", href: "/docs/troubleshooting", description: "Fixes for common problems.", keywords: "faq not showing balance pending stuck error" },
    ],
  },
  {
    title: "Developers",
    pages: [
      { title: "Overview", href: "/docs/developers", description: "Integrate Amerox into your dapp.", keywords: "eip-1193 eip-6963 provider quick start" },
      { title: "Detect the wallet", href: "/docs/developers/detect", description: "Find Amerox with EIP-6963 or window.ethereum.", keywords: "rdns io.amerox.wallet announceProvider isAmerox" },
      { title: "Connect and accounts", href: "/docs/developers/connect", description: "Request accounts and handle permissions.", keywords: "eth_requestAccounts eth_accounts wallet_requestPermissions revoke" },
      { title: "RPC methods", href: "/docs/developers/rpc-methods", description: "Every supported method and how it behaves.", keywords: "reference methods eth_call proxy rejected" },
      { title: "Signing", href: "/docs/developers/signing", description: "personal_sign and EIP-712 typed data.", keywords: "eth_signTypedData_v4 v3 personal_sign eth_sign siwe" },
      { title: "Transactions", href: "/docs/developers/transactions", description: "Send transactions and understand fee models.", keywords: "eth_sendTransaction gas eip-1559 legacy" },
      { title: "Networks and Amero X", href: "/docs/developers/networks", description: "Switch or add chains, and Amero X parameters.", keywords: "wallet_switchEthereumChain wallet_addEthereumChain 4902 chain 3535" },
      { title: "Events and errors", href: "/docs/developers/events-errors", description: "Provider events and error codes.", keywords: "accountsChanged chainChanged disconnect 4001 4100 4200 4900" },
      { title: "Libraries", href: "/docs/developers/libraries", description: "Use Amerox with viem, wagmi and ethers.", keywords: "viem wagmi ethers defineChain connector" },
      { title: "Limits", href: "/docs/developers/limits", description: "Rate limits, queues and timeouts.", keywords: "rate limit eth_getLogs block range timeout queue" },
    ],
  },
];

export const ALL_DOCS = DOCS_NAV.flatMap((s) => s.pages.map((p) => ({ ...p, section: s.title })));
