export default class ffmpegArgs {
  readonly inputs: string[] = [];
  readonly args: string[] = [];
  readonly maps: string[] = [];
  readonly metadatas: string[] = [];
  readonly codec: string[] = [];
  constructor(srcPath: string, mapPos = 0) {
    this.addInput(srcPath, mapPos);
    this.args.push(`-y`);
  }

  addInput(src: string, mapPos: number) {
    this.inputs.push(`-i`, src);
    this.maps.push(`-map`, `${mapPos}:0`);

    return this;
  }

  addMetadata(data: Record<string, unknown>) {
    Object.keys(data).forEach((k, i) =>
      this.metadatas.push(`-metadata`, `${k}=${data[i]}`)
    );

    return this;
  }

  setCodec(codec: string | "mp3", codecTag = "-c") {
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
