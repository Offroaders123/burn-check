#!/usr/bin/env node

import { glob, stat } from "node:fs/promises";
import { argv, exit } from "node:process";
import { getAudioDurationInSeconds } from "get-audio-duration";
import prettyBytes from "pretty-bytes";
import prettyMilliseconds from "pretty-ms";

/** @type {number} */
const MAX_PLAYTIME = 4800000;

/** @type {string} */
const paths = argv.at(2) ?? (() => {
  console.error("Missing glob argument");
  exit(1);
})();

/** @type {string[]} */
const files = await Array.fromAsync(glob(paths));
console.log(files.join("\n"), "\n");
console.log(`${files.length} tracks`);

/** @type {number[]} */
const durations = await Promise.all(
  files.map(async file =>
    await getAudioDurationInSeconds(file) * 1000
  )
);

/** @type {number} */
const playtime = durations.reduce(
  (previous, current) => previous + current,
  0
);
console.log(`${prettyMilliseconds(playtime)} ${playtime < MAX_PLAYTIME ? "✅" : "❌"}`);

/** @type {number[]} */
const sizes = await Promise.all(
  files.map(async file =>
    (await stat(file)).size
  )
);

/** @type {number} */
const size = sizes.reduce(
  (previous, current) => previous + current,
  0
);
console.log(`${prettyBytes(size)}`);