const selector = [
  "pre code.language-goat",
  "pre code.language-ascii",
  "pre code.language-svgbob",
].join(",");

const wasmUrl = "https://cdn.jsdelivr.net/npm/svgbob-wasm@1.0.0/svgbob_wasm_bg.wasm";

let wasmExportsPromise;
let wasmVectorLength = 0;
let cachedUint8Memory;
let cachedInt32Memory;

function getUint8Memory(wasmExports) {
  if (!cachedUint8Memory || cachedUint8Memory.buffer !== wasmExports.memory.buffer) {
    cachedUint8Memory = new Uint8Array(wasmExports.memory.buffer);
  }

  return cachedUint8Memory;
}

function getInt32Memory(swasmExports) {
  if (!cachedInt32Memory || cachedInt32Memory.buffer !== swasmExports.memory.buffer) {
    cachedInt32Memory = new Int32Array(swasmExports.memory.buffer);
  }

  return cachedInt32Memory;
}

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true });

function passStringToWasm(value, malloc, realloc, wasmExports) {
  if (!realloc) {
    const encoded = textEncoder.encode(value);
    const pointer = malloc(encoded.length);
    getUint8Memory(wasmExports).subarray(pointer, pointer + encoded.length).set(encoded);
    wasmVectorLength = encoded.length;
    return pointer;
  }

  let length = value.length;
  let pointer = malloc(length);
  const memory = getUint8Memory(wasmExports);

  let offset = 0;
  for (; offset < length; offset += 1) {
    const code = value.charCodeAt(offset);
    if (code > 0x7f) break;
    memory[pointer + offset] = code;
  }

  if (offset !== length) {
    const remaining = offset === 0 ? value : value.slice(offset);
    pointer = realloc(pointer, length, (length = offset + remaining.length * 3));
    const view = getUint8Memory(wasmExports).subarray(pointer + offset, pointer + length);
    const encoded = textEncoder.encodeInto(remaining, view);
    offset += encoded.written;
  }

  wasmVectorLength = offset;
  return pointer;
}

function getStringFromWasm(pointer, length, wasmExports) {
  return textDecoder.decode(getUint8Memory(wasmExports).subarray(pointer, pointer + length));
}

async function getWasmExports() {
  if (!wasmExportsPromise) {
    wasmExportsPromise = (async () => {
      const imports = {};

      if (typeof WebAssembly.instantiateStreaming === "function") {
        try {
          const result = await WebAssembly.instantiateStreaming(fetch(wasmUrl), imports);
          return result.instance.exports;
        } catch (error) {
          console.warn("Falling back to ArrayBuffer wasm instantiation", error);
        }
      }

      const response = await fetch(wasmUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch ASCII diagram renderer wasm: ${response.status}`);
      }

      const bytes = await response.arrayBuffer();
      const result = await WebAssembly.instantiate(bytes, imports);
      return result.instance.exports;
    })();
  }

  return wasmExportsPromise;
}

function renderSvg(source, wasmExports) {
  let resultPointer = 0;
  let resultLength = 0;

  try {
    const stackPointer = wasmExports.__wbindgen_add_to_stack_pointer(-16);
    const sourcePointer = passStringToWasm(
      source,
      wasmExports.__wbindgen_malloc,
      wasmExports.__wbindgen_realloc,
      wasmExports,
    );
    wasmExports.render(stackPointer, sourcePointer, wasmVectorLength);

    const memory = getInt32Memory(wasmExports);
    resultPointer = memory[stackPointer / 4];
    resultLength = memory[stackPointer / 4 + 1];

    return getStringFromWasm(resultPointer, resultLength, wasmExports);
  } finally {
    wasmExports.__wbindgen_add_to_stack_pointer(16);
    if (resultPointer || resultLength) {
      wasmExports.__wbindgen_free(resultPointer, resultLength);
    }
  }
}

async function renderAsciiDiagrams() {
  const codeBlocks = Array.from(document.querySelectorAll(selector));
  if (!codeBlocks.length) return;

  let wasmExports;
  try {
    wasmExports = await getWasmExports();
  } catch (error) {
    console.error("ASCII diagram renderer failed to load", error);
    return;
  }

  for (const code of codeBlocks) {
    const source = (code.textContent || "").replace(/\u00a0/g, " ");
    if (!source.trim()) continue;

    try {
      const svg = renderSvg(source, wasmExports);
      const wrapper = document.createElement("div");
      wrapper.className = "ascii-diagram-rendered";
      wrapper.innerHTML = svg;

      const pre = code.closest("pre");
      if (pre && pre.parentNode) {
        pre.parentNode.replaceChild(wrapper, pre);
      }
    } catch (error) {
      console.error("Failed to render ASCII diagram", error);
    }
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    renderAsciiDiagrams();
  });
} else {
  renderAsciiDiagrams();
}
