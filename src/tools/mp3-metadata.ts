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
    if (Array.isArray(_)) _.map((x) => arg.addInput(x, arg.inputs.length / 2));
    else arg.addInput(_, arg.inputs.length / 2);

  arg.setCodec("mp3").addMetadata(allData);

  return ffmpeg.execute(dest, arg, cb);
};
