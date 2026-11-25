// The 3AM Fridge Text — make.fun bounty u-deysumbrella-the-3am-fridge-text-4c3e721d
//
// Writes the one line a smart fridge texts its owner at 3am to
// <OUTPUT_DIR>/entry.txt (default /output) and nothing else.
// Node 22, no dependencies, no network, no secrets.

import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

// The entry: the fridge reports at 3:14 AM that the milk expired at
// midnight, and that it has been standing in the dark with that
// knowledge ever since. Deadpan, sleepless, and the closing
// "Sleep well" is the punchline — the fridge knows the owner is
// awake too, and wishes them the sleep it can never have.
const ENTRY =
  "3:14 AM. The milk expired at midnight and I have been standing here in the dark with that knowledge ever since. Sleep well.";

// Gate from the kit: 1 to 140 characters, not only whitespace.
const MIN_CHARS = 1;
const MAX_CHARS = 140;

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

// Count Unicode code points, not UTF-16 code units, so the count
// matches what the sealed scorer sees for this ASCII text and for
// any future edit with characters outside the BMP.
const length = [...ENTRY].length;

if (length < MIN_CHARS || length > MAX_CHARS) {
  fail(`entry is ${length} characters, outside the ${MIN_CHARS}-${MAX_CHARS} gate`);
}
if (ENTRY.trim().length === 0) {
  fail("entry is only whitespace");
}
if (ENTRY !== ENTRY.trim()) {
  fail("entry has leading or trailing whitespace");
}
if (/\n|\r/.test(ENTRY)) {
  fail("entry must be a single line");
}
// Reject control characters, including the line/paragraph separators
// U+2028 and U+2029, which can split a "single line" on some readers,
// plus the byte-order mark and Unicode space separators, which would
// look like invisible padding or a second line to a strict reader.
for (const ch of ENTRY) {
  const code = ch.codePointAt(0)!;
  if (
    code < 0x20 ||
    code === 0x7f ||
    code === 0xfeff ||
    code === 0x2028 ||
    code === 0x2029 ||
    (code >= 0x2000 && code <= 0x200b) ||
    code === 0x00a0 ||
    code === 0x3000
  ) {
    fail(`entry contains forbidden character U+${code.toString(16).toUpperCase().padStart(4, "0")}`);
  }
}

const outputDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });

const outPath = join(outputDir, "entry.txt");
const bytes = Buffer.from(ENTRY, "utf8");
// No trailing newline: the file content is the line and nothing else.
writeFileSync(outPath, bytes);

// Read it back and verify byte-for-byte before claiming success:
// the bytes must match exactly, and the file must decode as strict
// UTF-8 back to the same single line (a stray byte would fail here).
const written = readFileSync(outPath);
if (!written.equals(bytes)) {
  fail("verification failed: entry.txt does not match the entry byte-for-byte");
}
const decoded = new TextDecoder("utf-8", { fatal: true }).decode(written);
if (decoded !== ENTRY) {
  fail("verification failed: entry.txt does not decode back to the entry");
}

console.log(`wrote ${outPath} (${length} characters, ${bytes.length} bytes, single line, verified byte-for-byte)`);
