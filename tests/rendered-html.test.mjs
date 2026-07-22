import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders Aabishkar's complete portfolio shell", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Aabishkar Shrestha — Creative Professional/i);
  assert.match(html, /Making brands shine through visuals that connect/i);
  assert.match(html, /The first frame/i);
  assert.match(html, /Selected work/i);
  assert.match(html, /Let(?:&apos;|&#x27;|')s/i);
  assert.match(html, /aabishkarshrestha\.np@gmail\.com/i);
  assert.match(html, /DYma01JOIg8/);
  assert.match(html, /DYy35kCuRYw/);
  assert.match(html, /Da1osUlBBiV/);
  assert.match(html, /DasUnMxh84c/);
  assert.match(html, /project-01-thumbnail\.webp/);
  assert.match(html, /project-04-thumbnail\.webp/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
});

test("ships the required verified visual assets", async () => {
  const assets = [
    "../public/images/hero-cutout-cropped.png",
    "../public/images/about-portrait.png",
    "../public/images/project-01.jpg",
    "../public/images/project-02.jpg",
    "../public/images/project-03.jpg",
    "../public/images/project-04.jpg",
    "../public/images/project-01-generated.webp",
    "../public/images/project-02-generated.webp",
    "../public/images/project-03-generated.webp",
    "../public/images/project-04-generated.webp",
    "../public/images/project-01-thumbnail.webp",
    "../public/images/project-02-thumbnail.webp",
    "../public/images/project-03-thumbnail.webp",
    "../public/images/project-04-thumbnail.webp",
    "../public/og.png",
    "../public/favicon.png",
  ];
  await Promise.all(assets.map((asset) => access(new URL(asset, import.meta.url))));
});
