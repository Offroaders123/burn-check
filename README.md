# burn-check

Needed a little script to automate my process of preparing my albums when burning them to CDs (lol). I need it to test whether the duration of the album is too long to fit on a single CD.

The script also shows the metadata for the duration of the album, which is another metric to account for when determining if the whole album will fit on the disc. This seems to be able to fluctuate to some extent for some reason, because the duration limit seems to be more correct most of the time. I am still learning more about the limitations, but so far the duration seems to be a better metric to go by, rather than the initial file size.

The general rule of thumb appears to be that it should be no longer than 80 minutes, or 700 MB in size. I have been able to burn an album larger than 700 MB though, so I think there must be something different with the calculations of the WAV files, compared to the data that ends up being written to the disc.

## Install

This project is written purely in TypeScript, without a JavaScript build step. I wanted to try out the new `--experimental-strip-types` feature that is now unflagged and stable in Node v23.

```sh
npm install --global git+https://github.com/Offroaders123/burn-check.git
```

## Usage

The only argument to pass in is a glob string for the files you'd like to test on. This can be any file format, essentially anything you would be able to read with `ffprobe` (which is what this script uses under the hood).

The glob string must be quoted, because it is meant to be handled by the script itself, rather than expanded by your shell into separate arguments.

```sh
burn-check "/Music/Logic/Bounces/<your-album>/*.wav"
```

Happy CD burning!
