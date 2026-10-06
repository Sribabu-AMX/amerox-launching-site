/** Marketing screenshots of the real Amerox extension build, at 3x.
 *
 *  Uses the extension e2e harness's Playwright + Chromium and the public Hardhat test
 *  phrase. Balances come from a local JSON-RPC proxy that answers eth_getBalance for the
 *  demo accounts and forwards everything else to the real network. Approvals are raised
 *  from a neutral page served at http://app.example. Nothing is signed or broadcast:
 *  every approval is photographed and then rejected.
 */
import { createServer } from 'node:http';
import { mkdtemp, mkdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';

// Paths into the wallet monorepo. Build the extension first (apps/extension: npm run build)
// and install its e2e harness once (apps/extension/e2e: npm install) — this script borrows
// that harness's Playwright and Chromium.
const REPO = path.resolve(process.env.AMEROX_REPO ?? path.join(import.meta.dirname, '..', '..', 'amerox'));
const E2E = path.join(REPO, 'apps/extension/e2e');
const { chromium } = await import(path.join(E2E, 'node_modules/playwright/index.mjs'));
const EXT = path.join(REPO, 'apps/extension/dist');
const SRC = path.join(REPO, 'apps/extension/src');
const OUT = path.resolve(process.argv[2] ?? path.join(import.meta.dirname, '..', 'public/shots/extension'));
const MNEMONIC = 'test test test test test test test test test test test junk';
const POPUP = { width: 440, height: 600 };

const hex = (n) => '0x' + BigInt(n).toString(16);
const log = (t) => process.stdout.write(`  ${t}\n`);

/** Forwarding RPC with demo balances for our accounts. */
function startProxy({ upstream, chainIdHex, balances }) {
  const bal = new Map(Object.entries(balances).map(([a, v]) => [a.toLowerCase(), v]));
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      const cors = { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*', 'access-control-allow-methods': 'POST, OPTIONS' };
      if (req.method === 'OPTIONS') { res.writeHead(204, cors); res.end(); return; }
      let body = '';
      req.on('data', (c) => { body += c; });
      req.on('end', async () => {
        let msg; try { msg = JSON.parse(body); } catch { msg = null; }
        const answer = async (m) => {
          if (m?.method === 'eth_chainId') return { jsonrpc: '2.0', id: m.id, result: chainIdHex };
          if (m?.method === 'eth_getBalance' && bal.has(String(m.params?.[0] ?? '').toLowerCase())) {
            return { jsonrpc: '2.0', id: m.id, result: bal.get(String(m.params[0]).toLowerCase()) };
          }
          const r = await fetch(upstream, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(m) });
          return r.json();
        };
        try {
          const out = Array.isArray(msg) ? await Promise.all(msg.map(answer)) : await answer(msg);
          res.writeHead(200, { 'content-type': 'application/json', ...cors });
          res.end(JSON.stringify(out));
        } catch (e) {
          res.writeHead(502, cors); res.end(String(e));
        }
      });
    });
    server.listen(0, '127.0.0.1', () => resolve({ url: `http://127.0.0.1:${server.address().port}`, close: () => new Promise((r) => server.close(r)) }));
  });
}

async function settle(page, ms = 250) {
  await page.evaluate(() => {
    const pending = document.getAnimations().filter((a) => {
      try { return a.effect?.getTiming?.().iterations !== Infinity; } catch { return false; }
    }).map((a) => a.finished.catch(() => {}));
    return Promise.race([Promise.all(pending), new Promise((r) => setTimeout(r, 800))]);
  }).catch(() => {});
  await page.waitForTimeout(ms);
}
async function shoot(page, name) {
  await settle(page);
  await page.screenshot({ path: path.join(OUT, `${name}.png`) });
  log(`→ ${name}.png`);
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const kr = await import(path.join(SRC, 'crypto', 'keyring.js'));
  const seed = kr.seedFromMnemonic(MNEMONIC);
  const ring = kr.Keyring.fromSeed(seed);
  const hd = ring.accounts('bip44', 2);
  ring.destroy();
  const seedHex = [...seed].map((b) => b.toString(16).padStart(2, '0')).join('');
  const main0 = hd[0].address;

  const amx = await startProxy({ upstream: 'https://amxrpc.link/public/rpc', chainIdHex: '0xdcf', balances: { [main0]: hex(1250n * 10n ** 18n), [hd[1].address]: hex(320n * 10n ** 18n) } });
  const bsc = await startProxy({ upstream: 'https://bsc-dataseed.bnbchain.org', chainIdHex: '0x38', balances: { [main0]: hex(24n * 10n ** 17n), [hd[1].address]: hex(5n * 10n ** 17n) } });

  const profile = await mkdtemp(path.join(tmpdir(), 'amx-mkt-'));
  const ctx = await chromium.launchPersistentContext(profile, {
    headless: true,
    channel: 'chromium',
    viewport: POPUP,
    deviceScaleFactor: 3,
    args: [`--disable-extensions-except=${EXT}`, `--load-extension=${EXT}`, '--no-first-run', '--no-default-browser-check'],
  });

  try {
    let sw = ctx.serviceWorkers()[0];
    if (!sw) sw = await ctx.waitForEvent('serviceworker', { timeout: 20_000 });
    const id = new URL(sw.url()).host;
    log(`extension ${id}`);
    let popup = await ctx.newPage();
    await popup.setViewportSize(POPUP);
    const open = async (hash = '', wait = 900) => {
      await popup.goto(`chrome-extension://${id}/index.html${hash}`, { waitUntil: 'domcontentloaded' });
      await popup.waitForTimeout(wait);
    };

    // ── onboarding (fresh profile) ────────────────────────────────────────────
    await open('', 2500);
    const firstText = await popup.evaluate(() => document.body.innerText.slice(0, 300));
    log('first screen: ' + firstText.replace(/\n/g, ' | '));
    const getStarted = popup.locator('button:has-text("Get started")');
    if (await getStarted.count()) {
      // Onboarding opens in its own tab and the popup closes itself.
      const tab = ctx.waitForEvent('page', { timeout: 15_000 });
      await getStarted.first().click();
      const ob = await tab;
      await ob.setViewportSize(POPUP);
      await ob.waitForLoadState('domcontentloaded');
      popup = ob;
      await popup.waitForTimeout(1500);
      const again = popup.locator('button:has-text("Get started")');
      if (await again.count()) { await again.first().click(); await popup.waitForTimeout(1000); }
    }
    await popup.waitForSelector('text=Your assets.', { timeout: 15_000 });
    await shoot(popup, 'onboarding-welcome');
    await popup.click('text=Create a new wallet');
    await popup.click('button:text-is("Continue")');
    await popup.waitForSelector('text=Secure this device', { timeout: 10_000 });
    await popup.fill('input[type="password"] >> nth=0', 'amber-lantern-quiet-harbor');
    await popup.fill('input[type="password"] >> nth=1', 'amber-lantern-quiet-harbor');
    await popup.waitForTimeout(400);
    await shoot(popup, 'onboarding-password');
    await popup.click('button:text-is("Continue")');
    await popup.waitForSelector('text=Back up your wallet', { timeout: 10_000 });
    await popup.waitForTimeout(500);
    await shoot(popup, 'onboarding-backup');

    // ── seed an onboarded, unlocked wallet on Amero X with demo balances ──────
    const seedWallet = async (chainId, rpcUrl, extra = {}) => {
      await sw.evaluate(async ({ accounts, seed, chainId: c, rpcUrl: r, extra: x }) => {
        await chrome.storage.local.set({
          'amerox.local': {
            version: 1, onboarded: true, vault: 'c2NyZWVuc2hvdC1maXh0dXJl',
            accounts, activeAddress: accounts[0].address, scheme: 'bip44',
            chainId: c, theme: 'dark', network: { chainId: c, rpcUrl: r, explorerUrl: '', apiUrl: '' },
            autoLockMinutes: 15, ...x,
          },
        });
        await chrome.storage.session.set({
          'amerox.session': { seed, unlockedAt: Date.now(), lastActivityAt: Date.now(), approvals: [] },
        });
      }, {
        accounts: [
          { index: 0, scheme: 'bip44', path: hd[0].path, address: hd[0].address, kind: 'hd', label: 'Main account' },
          { index: 1, scheme: 'bip44', path: hd[1].path, address: hd[1].address, kind: 'hd', label: 'Savings' },
        ],
        seed: seedHex, chainId, rpcUrl, extra,
      });
    };

    await seedWallet(3535, amx.url);
    popup = await ctx.newPage();
    await popup.setViewportSize(POPUP);
    await open('#/home', 2500);
    await shoot(popup, 'home');
    await open('#/receive', 1500);
    await shoot(popup, 'receive');
    await open('#/settings', 1500);
    await shoot(popup, 'settings');
    await open('#/networks', 2000);
    await shoot(popup, 'networks');

    // ── swap on BNB Chain with a live quote ───────────────────────────────────
    await seedWallet(56, bsc.url);
    await open('#/swap', 3000);
    const amountInput = popup.locator('input[inputmode="decimal"], input[type="text"]').first();
    await amountInput.click().catch(() => {});
    await amountInput.fill('0.5').catch(() => {});
    await popup.waitForTimeout(9000);   // quote round trip
    await shoot(popup, 'swap');
    await open('#/buy-amx', 3500);
    const pay = popup.locator('input').first();
    await pay.click().catch(() => {});
    await pay.fill('0.5').catch(() => {});
    await popup.waitForTimeout(5000);
    await shoot(popup, 'buy-amx');

    // ── approvals from a neutral dapp page ────────────────────────────────────
    await seedWallet(3535, amx.url);
    await ctx.route('https://app.example/**', (route) => route.fulfill({
      status: 200, contentType: 'text/html',
      body: '<!doctype html><html><head><title>Example dapp</title></head><body style="background:#0c0c0c;color:#eee;font-family:sans-serif"><h1>Example dapp</h1></body></html>',
    }));
    const dapp = await ctx.newPage();
    await dapp.goto('https://app.example/', { waitUntil: 'domcontentloaded' });
    await dapp.waitForTimeout(800);

    const approval = async (fire, name, act = 'reject') => {
      const opened = ctx.waitForEvent('page', { timeout: 5000 }).catch(() => null);
      await dapp.evaluate(fire);
      let win = await opened;
      if (!win) {
        // Approvals render in the action popup; open it the way the toolbar would.
        await dapp.waitForTimeout(1200);
        win = await ctx.newPage();
        await win.setViewportSize(POPUP);
        await win.goto(`chrome-extension://${id}/index.html`, { waitUntil: 'domcontentloaded' });
        await win.waitForSelector('text=is requesting your approval', { timeout: 10_000 }).catch(() => log('  (no approval header seen)'));
      }
      await win.waitForTimeout(2400);
      await shoot(win, name);
      if (act === 'approve') await win.click('button:text-is("Connect")');
      else await win.click('button:text-is("Reject")').catch(() => {});
      await dapp.waitForTimeout(1200);
      await win.close().catch(() => {});
    };

    await approval(() => { window.ethereum.request({ method: 'eth_requestAccounts' }).catch(() => {}); }, 'approval-connect', 'approve');
    const from = main0.toLowerCase();
    await dapp.evaluate((a) => { window.__from = a; }, from);
    await approval(() => {
      const msg = 'Sign in to Example dapp\n\nThis request will not trigger a transaction or cost any fees.\n\nNonce: 7c21f0';
      const hexMsg = '0x' + Array.from(new TextEncoder().encode(msg)).map((b) => b.toString(16).padStart(2, '0')).join('');
      window.ethereum.request({ method: 'personal_sign', params: [hexMsg, window.__from] }).catch(() => {});
    }, 'approval-sign');
    await approval(() => {
      window.ethereum.request({ method: 'eth_sendTransaction', params: [{ from: window.__from, to: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC', value: '0x1bc16d674ec80000' }] }).catch(() => {});
    }, 'approval-transaction');
    await approval(() => {
      const typed = {
        types: {
          EIP712Domain: [{ name: 'name', type: 'string' }, { name: 'version', type: 'string' }, { name: 'chainId', type: 'uint256' }, { name: 'verifyingContract', type: 'address' }],
          Permit: [{ name: 'owner', type: 'address' }, { name: 'spender', type: 'address' }, { name: 'value', type: 'uint256' }, { name: 'nonce', type: 'uint256' }, { name: 'deadline', type: 'uint256' }],
        },
        primaryType: 'Permit',
        domain: { name: 'Example Token', version: '1', chainId: 3535, verifyingContract: '0x5FbDB2315678afecb367f032d93F642f64180aa3' },
        message: { owner: window.__from, spender: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0', value: '115792089237316195423570985008687907853269984665640564039457584007913129639935', nonce: 0, deadline: 1893456000 },
      };
      window.ethereum.request({ method: 'eth_signTypedData_v4', params: [window.__from, JSON.stringify(typed)] }).catch(() => {});
    }, 'approval-permit');

    await open('#/connected', 1500);
    await shoot(popup, 'connected');
  } finally {
    await ctx.close();
    await amx.close();
    await bsc.close();
    await rm(profile, { recursive: true, force: true });
  }
}

main().catch((e) => { console.error(e); process.exit(2); });
