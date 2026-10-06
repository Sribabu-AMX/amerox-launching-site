import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt = "Amerox Wallet — Your keys. Your control.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** The link preview: the coin, the promise, and where it runs. Rendered once at build. */
export default async function OpenGraphImage() {
  const [coin, serif] = await Promise.all([
    readFile(path.join(process.cwd(), "src/assets/og-coin.png")),
    readFile(path.join(process.cwd(), "src/fonts/Gambarino-Regular.ttf")),
  ]);
  const coinSrc = `data:image/png;base64,${coin.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "0 90px",
          backgroundImage: "linear-gradient(90deg, #0a0a0a 0%, #0a0a0a 38%, #2a2210 72%, #4a3a14 100%)",
          color: "#fff",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ display: "flex", fontSize: 26, letterSpacing: 6, color: "#FCDA7B", textTransform: "uppercase" }}>Amerox Wallet</div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 26, fontFamily: "Gambarino", fontSize: 104, lineHeight: 1.02 }}>
            <span style={{ color: "#FCDA7B" }}>Your keys.</span>
            <span style={{ color: "#FDB648" }}>Your control.</span>
          </div>
          <div style={{ display: "flex", marginTop: 34, fontSize: 30, color: "#cfcfcf", maxWidth: 620 }}>
            The self-custody wallet for Amero X Network — now for Chrome.
          </div>
        </div>
        <img src={coinSrc} width={380} height={380} alt="" />
      </div>
    ),
    { ...size, fonts: [{ name: "Gambarino", data: serif, style: "normal", weight: 400 }] },
  );
}
