export default class ffmpegArgs {
  readonly inputs: string[] = [];
  readonly args: string[] = [];
  readonly maps: string[] = [];
  readonly metadatas: string[] = [];
  readonly codec: string[] = [];
  constructor(
    srcPath: string,
    mapPos = 0,
    codecTag = "-codec:a",
    codec = "mp3"
  ) {
    this.addInput(srcPath, mapPos, codecTag, codec);
    this.args.push(`-y`);
  }

  addInput(src: string, mapPos: number, codecTag: string, codec: string) {
    this.inputs.push(`-i`, src);
    this.maps.push(`-map`, `${mapPos}:0`);
    this.setCodec(codec, `${codecTag}:${mapPos}`);
    return this;
  }

  addMetadata(data: Record<string, unknown>) {
    Object.keys(data).forEach((k, i) =>
      this.metadatas.push(`-metadata`, `${k}=${data[i]}`)
    );

    return this;
  }

  private setCodec(codec: string | "mp3", codecTag = "-codec:a") {
    this.codec.push(codecTag, codec);

    return this;
  }

  build(dstPath: string) {
    const argsResult = this.args.concat(this.inputs, this.maps, this.codec);
    const result = argsResult.concat(this.metadatas);

    result.push(dstPath);

    return result;
  }
}
