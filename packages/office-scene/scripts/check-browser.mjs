import { chromium } from "playwright";
import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";

const url = process.env.OFFICE_URL || "http://127.0.0.1:5173";
const browser = await chromium.launch({ channel: "chrome", headless: true });
await mkdir("../../docs/reports", { recursive: true });
const errors = [];
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  reducedMotion: "reduce",
});
page.on("pageerror", (error) => errors.push(error.message));
await page.goto(url, { waitUntil: "networkidle" });
await page
  .getByRole("button", { name: /Desarrollo: Necesita tu respuesta/ })
  .click();
await page.getByRole("heading", { name: "Desarrollo" }).waitFor();
assert.equal(
  await page.getByRole("tab", { name: "Ahora" }).getAttribute("aria-selected"),
  "true",
);
await page.getByLabel(/Mensaje para Desarrollo/).fill("¿Cómo va Ediflow?");
await page.getByRole("tab", { name: "Resultados" }).click();
await page.getByText("Propuesta de cambio de ejemplo").waitFor();
await page.getByRole("button", { name: /Investigación: Disponible/ }).click();
await page
  .getByRole("button", { name: /Desarrollo: Necesita tu respuesta/ })
  .click();
assert.equal(
  await page.getByLabel(/Mensaje para Desarrollo/).inputValue(),
  "¿Cómo va Ediflow?",
);
await page.getByRole("button", { name: "Plano cenital" }).click();
assert.equal(
  await page
    .getByRole("button", { name: "Plano cenital" })
    .getAttribute("aria-pressed"),
  "true",
);
await page.waitForTimeout(250);
await assertDeskLabelsVisible(page);
await page.screenshot({
  path: "../../docs/reports/f0-05-plan.png",
  fullPage: true,
});
await page.getByRole("button", { name: "Vista espacial" }).click();
await page.waitForTimeout(250);
await assertDeskLabelsVisible(page);
await page.screenshot({
  path: "../../docs/reports/f0-05-spatial.png",
  fullPage: true,
});
await page.getByRole("button", { name: "Lista accesible" }).click();
await page.getByRole("button", { name: /Ventas Sin configurar/ }).focus();
await page.keyboard.press("Enter");
await page.getByRole("heading", { name: "Ventas" }).waitFor();
await page.getByRole("button", { name: /Pendientes/ }).click();
await page.getByRole("heading", { name: "Pendientes" }).waitFor();
await page.getByRole("button", { name: "Configuración" }).click();
await page.getByRole("heading", { name: "Configuración" }).waitFor();
await page.getByRole("button", { name: "Oficina" }).click();
await page.getByRole("button", { name: "Lista accesible" }).click();
await page.waitForTimeout(1400);
const fps = await page.locator("#scene-metric").textContent();
assert.match(fps, /\d+ FPS/);
assert.deepEqual(errors, []);
const metrics = await page.evaluate(() => ({
  navigationMs: Math.round(
    performance.getEntriesByType("navigation")[0].duration,
  ),
  domReadyMs: Math.round(
    performance.getEntriesByType("navigation")[0].domContentLoadedEventEnd,
  ),
  fpsText: document.querySelector("#scene-metric").textContent,
  webgl: Boolean(document.querySelector("#scene").getContext("webgl2")),
}));
const fallback = await browser.newPage({
  viewport: { width: 390, height: 844 },
  reducedMotion: "reduce",
});
await fallback.addInitScript(() => {
  const original = HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext = function (kind, ...args) {
    if (kind === "webgl" || kind === "webgl2" || kind === "experimental-webgl")
      return null;
    return original.call(this, kind, ...args);
  };
});
await fallback.goto(url, { waitUntil: "domcontentloaded" });
assert.equal(await fallback.locator("#team-list").isVisible(), true);
await fallback
  .getByRole("button", { name: /Desarrollo Necesita tu respuesta/ })
  .click();
await fallback.getByRole("heading", { name: "Desarrollo" }).waitFor();
assert.equal(
  await fallback.evaluate(
    () => document.documentElement.scrollWidth > innerWidth,
  ),
  false,
);
console.log(JSON.stringify({ status: "passed", metrics, errors }, null, 2));
await browser.close();

async function assertDeskLabelsVisible(page) {
  const visibility = await page.evaluate(() => {
    const scene = document.querySelector("#scene-wrap").getBoundingClientRect();
    return [...document.querySelectorAll(".desk-button")].map((button) => {
      const rect = button.getBoundingClientRect();
      return (
        rect.left >= scene.left &&
        rect.right <= scene.right &&
        rect.top >= scene.top &&
        rect.bottom <= scene.bottom
      );
    });
  });
  assert(
    visibility.every(Boolean),
    "Las seis etiquetas deben quedar dentro de la escena",
  );
}
