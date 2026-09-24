// Render one animated cover: frame-driven capture -> PNG frames -> GIF.
// usage: node render.js specs/webhook.json out/webhook [frames]
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const palette = require("./palette");

const [, , specPath, outBase, framesArg] = process.argv;
const FRAMES = parseInt(framesArg || "60", 10);
let W = 1200, H = 1200;

(async () => {
  // a palette.json (see palette.js) fills in accent, ink, ground and brand the spec leaves out
  const { spec, file: paletteFile, warnings } = palette.apply(JSON.parse(fs.readFileSync(specPath, "utf8")), specPath);
  if (paletteFile) {
    const rel = path.relative(process.cwd(), paletteFile);
    console.log("palette: " + (rel.startsWith("..") ? paletteFile : rel));
    (warnings || []).forEach(w => console.log("  " + w));
  }
  W = spec.width || W; H = spec.height || H;
  const frameDir = outBase + ".frames";
  fs.rmSync(frameDir, { recursive: true, force: true });
  fs.mkdirSync(frameDir, { recursive: true });
  fs.mkdirSync(path.dirname(outBase), { recursive: true });

  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--force-device-scale-factor=1"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });

  // inject the spec before the template's script runs
  await page.evaluateOnNewDocument((s) => { window.SPEC = s; }, spec);
  page.on("pageerror", e => console.log("PAGE ERROR:", e.message));
  // "style" picks a template from styles/; "flow" is bbg.html. An explicit "template" wins.
  const tpl = spec.template || (!spec.style || spec.style === "flow" ? "bbg.html" : `styles/${spec.style}.html`);
  await page.goto("file://" + path.resolve(__dirname, tpl),
                  { waitUntil: "networkidle0" });
  await page.waitForFunction("window.__ready === true");
  const overlaps = await page.evaluate(() => window.__overlaps || []);
  if (overlaps.length) console.log("OVERLAPS:\n  " + overlaps.join("\n  "));

  for (let i = 0; i < FRAMES; i++) {
    await page.evaluate((i, n) => window.setFrame(i, n), i, FRAMES);
    await page.screenshot({
      path: path.join(frameDir, String(i).padStart(3, "0") + ".png"),
    });
  }
  await browser.close();
  console.log(`captured ${FRAMES} frames -> ${frameDir}`);
})();
