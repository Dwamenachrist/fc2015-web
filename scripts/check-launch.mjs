// Pre-launch gate (TDD §5, §9): fails while any client content is still a
// placeholder. Run before promoting to production: npm run check:launch
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const DIRS = ["app", "components", "content", "lib"];
const MARKER = /\b(TBD|sample)\(\s*"([^"]+)"/g;
const IGNORE = new Set([path.join("content", "markers.ts")]);

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else if (/\.(ts|tsx)$/.test(entry.name) && !IGNORE.has(p)) yield p;
  }
}

const found = [];
for (const dir of DIRS) {
  for await (const file of walk(dir)) {
    const lines = (await readFile(file, "utf8")).split("\n");
    lines.forEach((line, i) => {
      for (const m of line.matchAll(MARKER)) found.push({ file, line: i + 1, kind: m[1], label: m[2] });
    });
  }
}

if (found.length === 0) {
  console.log("✓ No placeholders left. Ready to launch.");
  process.exit(0);
}

console.error(`✗ ${found.length} placeholder(s) still need real client content:\n`);
for (const f of found) console.error(`  ${f.kind.padEnd(6)} ${f.label}  (${f.file}:${f.line})`);
process.exit(1);
