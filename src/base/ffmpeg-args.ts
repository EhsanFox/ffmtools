export default class ffmpegArgs {
  private readonly inputs: string[] = [];
  private readonly args: string[] = [];
  private readonly maps: string[] = [];

  constructor(srcPath: string, mapPos = 0) {
    this.addInput(srcPath, mapPos);
  }

  addInput(src: string, mapPos: number) {
    this.inputs.push(`-i`, src);
    this.maps.push(`-map`, `${mapPos}:0`);

    return this;
  }

  addMetadata(data: Record<string, unknown>) {
    Object.keys(data).forEach((k, i) =>
      this.args.push(`-metadata`, `${k}=${data[i]}`)
    );

    return this;
  }

  setCodec(codec: string | "mp3") {
    this.args.push(`-codec`, codec);

    return this;
  }

  build(dstPath: string) {
    const result = this.args.concat(this.inputs, this.maps);
    result.push(`-y`, dstPath);

    return result;
  }
}
