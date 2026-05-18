declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Window extends IGolang { }
}

export interface IGolang {
  Go: typeof Go;
  callWasm: () => void;
  greet: (name: string) => string;
  decode: (
    buffer: Uint8Array<ArrayBuffer>,
    onProgress: (percent: number) => void,
  ) => Promise<string>;
}

declare class Go {
  constructor();

  argv: string[];
  env: Record<string, string>;
  exit: (code: number) => void;
  importObject: WebAssembly.Imports;

  run(instance: WebAssembly.Instance): Promise<void>;
  _resume(): void;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  _makeFuncWrapper(id: number): Function;
}
