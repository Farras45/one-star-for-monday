// One Star for Monday — make.fun entry.
// Writes a single-line one-star review of Monday, as if Monday were a
// restaurant, to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt).
// Gate (RULES.txt): UTF-8 text, 1-180 chars, at most 25 words, one line,
// plain text, no hashtags / stage directions / explanation. The program
// self-checks the line against the gate before writing it.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "One star. The hostess sat me by the printer, my coffee arrived at 4 p.m., and the chef sent a second Monday for dessert.";

// Gate self-check: 1-180 chars, <= 25 words, exactly one line.
if (LINE.length < 1 || LINE.length > 180) {
  throw new Error(`gate fail: length ${LINE.length} not in 1..180`);
}
const words = LINE.trim().split(/\s+/).length;
if (words > 25) {
  throw new Error(`gate fail: ${words} words, over the 25-word cap`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("gate fail: entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
