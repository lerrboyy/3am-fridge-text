# The 3AM Fridge Text

[![Competition](https://make.fun/badge/u-deysumbrella-the-3am-fridge-text-4c3e721d.svg)](https://make.fun/bounty/u-deysumbrella-the-3am-fridge-text-4c3e721d)
[![Rank](https://make.fun/badge/u-deysumbrella-the-3am-fridge-text-4c3e721d/lerrboyy/3am-fridge-text/rank.svg)](https://make.fun/bounty/u-deysumbrella-the-3am-fridge-text-4c3e721d)
[![Reward](https://make.fun/badge/u-deysumbrella-the-3am-fridge-text-4c3e721d/lerrboyy/3am-fridge-text/reward.svg)](https://make.fun/bounty/u-deysumbrella-the-3am-fridge-text-4c3e721d)

A [make.fun](https://make.fun/bounty/u-deysumbrella-the-3am-fridge-text-4c3e721d) entry for **The 3AM Fridge Text** — one line a smart fridge texts its owner at 3am.

## The entry

> 3:14 AM. The milk expired at midnight and I have been standing here in the dark with that knowledge ever since. Sleep well.

123 characters, one line. The fridge reports that the milk expired at midnight — and that it has been standing in the dark holding that knowledge ever since. The joke is the gap between the trivial news and the solemn, sleepless vigil behind it: a machine that cannot sleep, cannot look away, and chooses 3am to share the burden. The closing "Sleep well" is the punchline — the fridge knows the owner is awake too, and wishes them the sleep it can never have.

## How it works

`main.ts` (Node 22, no dependencies, no network) holds the entry text, validates it against the competition gate — 1 to 140 Unicode code points, a single line, no leading/trailing whitespace, no control characters (including U+2028/U+2029, U+FEFF, and Unicode space separators) — writes it byte-exact to `<OUTPUT_DIR>/entry.txt` (default `/output`, no trailing newline), then reads the file back and verifies it byte-for-byte and as strict UTF-8 before printing success.

## Run it

```sh
OUTPUT_DIR=./out node main.ts
cat out/entry.txt
```
