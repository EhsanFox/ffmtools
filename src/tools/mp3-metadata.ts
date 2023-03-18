import ffmpegArgs from "../base/ffmpeg-args";
import { ffmpegClient } from "../client";
import { MP3Metadata } from "../types";

export default (
  source: string,
  dest: string,
  data: MP3Metadata,
  cb?: (e: Error | unknown | undefined, result?: boolean) => void,
  ffmpegPath: string = process.env["FFMPEG_PATH"] || "ffmpeg"
) => {
  const ffmpeg = new ffmpegClient(ffmpegPath);
  const arg = new ffmpegArgs(source, 0);
  const { attachments: _, ...allData } = data;

  if (_)
    if (Array.isArray(_))
      _.map((x) => arg.addInput(x, arg.inputs.length / 2, `-codec:v`, "copy"));
    else arg.addInput(_, arg.inputs.length / 2, `-codec:v`, "copy");

  arg.addMetadata(allData);

  return ffmpeg.execute(dest, arg, cb);
};
