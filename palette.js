// Brand palette: one file every cover picks up, so a series shares its
// accent, text colour and mark without repeating them in each spec.
//
// Lookup: $PALETTE, else the nearest palette.json walking up from the spec's
// folder. Shape (every key optional):
//   { "accent": "#FF5A1F", "ink": "#111111", "brand": "you.dev",
//     "styles": { "poster": { "ground": "#FFE14D" }, "flow": { "accent": "#0A7" } } }
// Precedence: the spec's own keys, then styles.<style>, then the top level.
// Each style keeps its own ground unless a palette or spec sets one; that
// difference between styles is what keeps a feed from looking repetitive.
// One brand colour cannot suit every ground, so a top-level accent below 3:1
// (or ink below 4.5:1) against a style's ground is skipped for that style,
// with a warning; set it under styles.<style> or in the spec to force it.
const fs = require("fs");
const path = require("path");

const KEYS = ["ground", "ink", "accent", "brand"];
const pick = o => Object.fromEntries(KEYS.filter(k => o && o[k] != null).map(k => [k, o[k]]));
/* each style's own ground, for the contrast guard */
const GROUND = { flow: "#FFFFFF", terminal: "#0B0E14", bignumber: "#1D3BFF", chart: "#F4EFE6", sketch: "#FBFAF5",
                 poster: "#FFD400", sequence: "#0A1A33", anatomy: "#FFF1DA", list: "#FF6A4D", timeline: "#24102F", diff: "#EEF1F5",
                 compare: "#FFFFFF" /* its accent sits on the white card, not the teal ground */ };
const MIN = { accent: 3, ink: 4.5 };

const lum = hex => { const m = /^#?([0-9a-f]{6})$/i.exec(String(hex || "").trim()); if (!m) return null;
  const n = parseInt(m[1], 16);
  return [n >> 16 & 255, n >> 8 & 255, n & 255].map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; })
    .reduce((a, v, i) => a + v * [0.2126, 0.7152, 0.0722][i], 0); };
/* WCAG contrast ratio, or null when either colour is not #rrggbb */
function contrast(a, b) { const x = lum(a), y = lum(b); if (x == null || y == null) return null;
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }

function find(specPath) {
  if (process.env.PALETTE) return path.resolve(process.env.PALETTE);
  let d = path.dirname(path.resolve(specPath));
  for (;;) {
    const f = path.join(d, "palette.json");
    if (fs.existsSync(f)) return f;
    const up = path.dirname(d);
    if (up === d) return null;
    d = up;
  }
}

/* returns the spec with palette values filled in where the spec has none */
function apply(spec, specPath) {
  const file = find(specPath);
  if (!file) return { spec, file: null };
  const p = JSON.parse(fs.readFileSync(file, "utf8"));
  const style = spec.style || "flow";
  const top = pick(p), own = pick((p.styles || {})[style]);
  const out = { ...spec }, warnings = [];
  for (const k of KEYS) if (out[k] == null && own[k] != null) out[k] = own[k];
  const ground = out.ground || top.ground || (style === "flow" && spec.theme === "dark" ? "#0A0A0A" : GROUND[style]);
  for (const k of KEYS) {
    if (out[k] != null || top[k] == null) continue;
    const c = MIN[k] && contrast(top[k], ground);
    if (c != null && c < MIN[k]) { warnings.push(`palette ${k} ${top[k]} is ${c.toFixed(1)}:1 on the ${style} ground ${ground}; keeping the style's own (set styles.${style}.${k} to force it)`); continue; }
    out[k] = top[k];
  }
  return { spec: out, file, warnings };
}

/* ground tone for the rotation check: light, dark or colour, from a hex colour */
function toneOf(hex) {
  const m = /^#?([0-9a-f]{6})$/i.exec(String(hex || "").trim());
  if (!m) return null;
  const n = parseInt(m[1], 16), r = (n >> 16 & 255) / 255, g = (n >> 8 & 255) / 255, b = (n & 255) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2;
  const s = max === min ? 0 : (max - min) / (1 - Math.abs(2 * l - 1));
  if (l > 0.82) return "light";
  if (l < 0.22) return "dark";
  return s > 0.45 ? "colour" : l > 0.5 ? "light" : "dark";
}

module.exports = { apply, find, toneOf, contrast, GROUND };
