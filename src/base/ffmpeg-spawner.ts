import {
  ChildProcessWithoutNullStreams,
  spawn,
  SpawnOptionsWithoutStdio,
} from "child_process";

export default (
  ffmpegPath: string = process.env["FFMPEG_PATH"] || "ffmpeg"
): ((
  args: string[],
  opts?: SpawnOptionsWithoutStdio
) => ChildProcessWithoutNullStreams) => spawn.bind(null, ffmpegPath);
