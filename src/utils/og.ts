import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import satori from "satori";
import { html } from "satori-html";
import { Resvg } from "@resvg/resvg-js";
import { OG_GLYPH_ROW } from "../data/telugu";
import { SITE } from "../data/constants";
import { formatDate } from "./date";

// satori needs static, non-variable TTF/OTF/WOFF (not WOFF2/variable).
const require = createRequire(import.meta.url);
const load = (pkg: string) => readFileSync(require.resolve(pkg));

const fonts = [
  {
    name: "Inter",
    data: load("@fontsource/inter/files/inter-latin-600-normal.woff"),
    weight: 600 as const,
    style: "normal" as const,
  },
  {
    name: "JetBrains Mono",
    data: load("@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff"),
    weight: 400 as const,
    style: "normal" as const,
  },
  {
    name: "Noto Sans Telugu",
    data: load("@fontsource/noto-sans-telugu/files/noto-sans-telugu-telugu-400-normal.woff"),
    weight: 400 as const,
    style: "normal" as const,
  },
];

interface OgOptions {
  title: string;
  /** Optional publish date shown bottom-right (post cards). */
  date?: Date;
}

// Card design is fixed to the light palette; satori cannot read CSS vars (§12).
export async function renderOgImage({ title, date }: OgOptions): Promise<Buffer> {
  const dateLabel = date ? formatDate(date) : "";
  const glyphRow = OG_GLYPH_ROW.join(" ");

  const markup = html`
    <div style="display:flex;flex-direction:column;width:1200px;height:630px;background:#FAF9F5;font-family:'JetBrains Mono';">
      <div style="display:flex;width:1200px;height:10px;background:#C15F3C;"></div>
      <div style="display:flex;flex-direction:column;flex:1;justify-content:space-between;padding:64px;">
        <div style="display:flex;font-family:'Inter';font-weight:600;font-size:64px;line-height:1.15;color:#1F1D1A;max-width:1072px;">
          ${title}
        </div>
        <div style="display:flex;align-items:flex-end;justify-content:space-between;">
          <div style="display:flex;font-family:'JetBrains Mono';font-size:28px;color:#5E5A51;">
            ${SITE.url.replace(/^https?:\/\//, "")}
          </div>
          <div style="display:flex;flex-direction:column;align-items:flex-end;">
            <div style="display:flex;font-family:'JetBrains Mono';font-size:28px;color:#5E5A51;margin-bottom:${dateLabel ? "16px" : "0"};">${dateLabel}</div>
            <div style="display:flex;font-family:'Noto Sans Telugu';font-size:32px;color:#C15F3C;opacity:0.4;letter-spacing:6px;">${glyphRow}</div>
          </div>
        </div>
      </div>
    </div>
  `;

  const svg = await satori(markup, { width: 1200, height: 630, fonts });
  const resvg = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } });
  return Buffer.from(resvg.render().asPng());
}

/** 180×180 apple-touch-icon: the "#" monogram on the cream surface (§13). */
export async function renderAppleIcon(): Promise<Buffer> {
  const markup = html`
    <div style="display:flex;align-items:center;justify-content:center;width:180px;height:180px;background:#F0EEE6;font-family:'JetBrains Mono';font-weight:700;font-size:112px;color:#C15F3C;">
      #
    </div>
  `;
  const svg = await satori(markup, { width: 180, height: 180, fonts });
  const resvg = new Resvg(svg, { fitTo: { mode: "width", value: 180 } });
  return Buffer.from(resvg.render().asPng());
}
