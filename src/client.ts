import through, { ThroughStream } from "through";
import { ffmpegSpawner, ffmpegArgBuilder } from "./base";

export class ffmpegClient {
  private readonly ffmpeg: ReturnType<typeof ffmpegSpawner>;
  constructor(
    private readonly ffmpegPath: string = process.env["FFMPEG_PATH"] || "ffmpeg"
  ) {
    this.ffmpeg = ffmpegSpawner(ffmpegPath);
  }

  execute(
    fileDst: string,
    args: ffmpegArgBuilder,
    cb?: (e: Error | unknown | undefined, result?: boolean) => void
  ): ThroughStream | void {
    const ffmpegProcess = this.ffmpeg(args.build(fileDst), {
      env: process.env,
    });
    const stream = through();

    ffmpegProcess.on("error", stream.emit.bind(stream, "error"));
    ffmpegProcess.stdout?.on("data", stream.emit.bind(stream, "data"));
    ffmpegProcess.on("close", (code) => {
      if (code === 0) {
        stream.emit("end");
      } else {
        stream.emit("error", new Error(`ffmpeg spawn exit without code 0`));
      }
    });

    if (cb) {
      stream.on("end", () => cb(undefined, true));
      stream.on("error", (e) => cb(e));
    }

    return stream;
  }
}
