/**
 * Probes TxLINE endpoints and logs full responses.
 * Run: node scripts/test-txline-api.mjs
 */
import axios from "axios";
import { readFileSync, writeFileSync } from "fs";

const env = Object.fromEntries(
  readFileSync(".env.local", "utf8")
    .split("\n")
    .filter((line) => line.trim() && !line.startsWith("#"))
    .map((line) => {
      const idx = line.indexOf("=");
      return [line.slice(0, idx), line.slice(idx + 1)];
    })
);

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${env.TXLINE_JWT}`,
  "X-Api-Token": env.TXLINE_API_TOKEN,
};

const origins = [
  { label: "mainnet", url: "https://txline.txodds.com" },
  { label: "devnet", url: env.TXLINE_API_ORIGIN ?? "https://txline-dev.txodds.com" },
];

const log = {};

for (const { label, url } of origins) {
  console.log(`\n${"=".repeat(60)}\n${label.toUpperCase()} — ${url}\n${"=".repeat(60)}`);
  log[label] = {};

  // User-requested plain paths
  for (const path of ["/api/fixtures", "/api/scores", "/api/odds"]) {
    const res = await axios.get(`${url}${path}`, {
      headers,
      timeout: 20000,
      validateStatus: () => true,
    });
    const entry = { status: res.status, data: res.data };
    log[label][path] = entry;
    console.log(`\nGET ${path} → ${res.status}`);
    console.log(JSON.stringify(res.data, null, 2));
  }

  // Documented snapshot path
  const fixturesRes = await axios.get(`${url}/api/fixtures/snapshot`, {
    headers,
    timeout: 20000,
    validateStatus: () => true,
  });
  log[label]["/api/fixtures/snapshot"] = {
    status: fixturesRes.status,
    count: Array.isArray(fixturesRes.data) ? fixturesRes.data.length : null,
    data: fixturesRes.data,
  };
  console.log(`\nGET /api/fixtures/snapshot → ${fixturesRes.status}`);
  console.log(
    JSON.stringify(
      {
        status: fixturesRes.status,
        count: Array.isArray(fixturesRes.data) ? fixturesRes.data.length : null,
        sample: Array.isArray(fixturesRes.data) ? fixturesRes.data[0] : fixturesRes.data,
        all: fixturesRes.data,
      },
      null,
      2
    )
  );

  if (fixturesRes.status !== 200 || !Array.isArray(fixturesRes.data) || fixturesRes.data.length === 0) {
    continue;
  }

  const wc = fixturesRes.data.find((f) => f.Competition === "World Cup") ?? fixturesRes.data[0];
  const fixtureId = wc.FixtureId;
  console.log(`\nUsing fixture #${fixtureId} (${wc.Participant1} vs ${wc.Participant2}) for scores/odds probes`);

  for (const path of [
    `/api/scores/snapshot/${fixtureId}`,
    `/api/scores/updates/${fixtureId}`,
    `/api/odds/snapshot/${fixtureId}`,
    `/api/odds/updates/${fixtureId}`,
  ]) {
    const res = await axios.get(`${url}${path}`, {
      headers,
      timeout: 30000,
      validateStatus: () => true,
    });

    let summary;
    if (Array.isArray(res.data)) {
      summary = {
        status: res.status,
        type: "array",
        length: res.data.length,
        sample: res.data[0] ?? null,
        second: res.data[1] ?? null,
      };
      log[label][path] = { ...summary, data: res.data };
    } else if (typeof res.data === "string" && res.data.startsWith("data:")) {
      const firstEvent = res.data.split("\n\n")[0];
      summary = {
        status: res.status,
        type: "sse",
        preview: firstEvent,
        totalLength: res.data.length,
      };
      log[label][path] = summary;
    } else {
      summary = { status: res.status, data: res.data };
      log[label][path] = summary;
    }

    console.log(`\nGET ${path} → ${res.status}`);
    console.log(JSON.stringify(summary, null, 2));
  }
}

writeFileSync("scripts/txline-api-log.json", JSON.stringify(log, null, 2));
console.log("\n\nFull log saved to scripts/txline-api-log.json");