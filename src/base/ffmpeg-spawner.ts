import {
    ChildProcess,
  spawn,
  SpawnOptions,
} from "child_process";

export default (
  ffmpegPath: string = process.env["FFMPEG_PATH"] || "ffmpeg"
): ((
  args: readonly string[],
  opts: SpawnOptions
) => ChildProcess) => spawn.bind(null, ffmpegPath);
