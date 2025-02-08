import { glob, stat } from "node:fs/promises";
import { argv, exit } from "node:process";
import { getAudioDurationInSeconds } from "get-audio-duration";
import prettyBytes from "pretty-bytes";
import prettyMilliseconds from "pretty-ms";

const MAX_PLAYTIME: number = 4800000;

const paths: string[] = argv.slice(2) ?? (() => {
  console.error("Missing glob argument");
  exit(1);
})();

const files: string[] = await Array.fromAsync(glob(paths));
console.log(files.join("\n"), "\n");
console.log(`${files.length} tracks`);

const durations: number[] = await Promise.all(
  files.map(async file =>
    await getAudioDurationInSeconds(file) * 1000
  )
);

const playtime: number = durations.reduce(
  (previous, current) => previous + current,
  0
);
console.log(`${prettyMilliseconds(playtime)} ${playtime < MAX_PLAYTIME ? "✅" : "❌"}`);

const sizes: number[] = await Promise.all(
  files.map(async file =>
    (await stat(file)).size
  )
);

const size: number = sizes.reduce(
  (previous, current) => previous + current,
  0
);
console.log(`${prettyBytes(size)}`);