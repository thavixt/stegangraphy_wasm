import "../public/wasm_exec";
import type { IGolang } from "../src/window";

declare const Go: IGolang["Go"];
const go = new Go();
const self = globalThis.self as IGolang;

async function init() {
  const response = await fetch("/main.wasm");
  const buffer = await response.arrayBuffer();
  const obj = await WebAssembly.instantiate(buffer, go.importObject);
  go.run(obj.instance);
}

const readyPromise = init();

onmessage = async (event: MessageEvent) => {
  await readyPromise;
  const { type, payload } = event.data;

  if (type === "decode") {
    try {
      const result = self.decode(
        new Uint8Array(payload.buffer),
        (p: number) => {
          postMessage({ type: "progress", payload: p });
        },
      );
      postMessage({ type: "success", payload: result });
    } catch (err) {
      postMessage({
        type: "error",
        payload: err instanceof Error ? err.message : String(err),
      });
    }
  }
};
