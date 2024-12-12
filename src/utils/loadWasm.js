export const loadWasm = async (url) => {
  try {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();

    // Check if the buffer starts with the magic word
    const magicWord = new Uint8Array(buffer.slice(0, 4));
    if (magicWord[0] !== 0x00 || magicWord[1] !== 0x61 || magicWord[2] !== 0x73 || magicWord[3] !== 0x6d) {
      throw new Error('Invalid WebAssembly file');
    }

    const wasmModule = await WebAssembly.instantiate(buffer);
    const exports = wasmModule.instance.exports;

    // Dynamically wrap exported functions
    const wasmFunctions = {};
    for (const key of Object.keys(exports)) {
      if (typeof exports[key] === 'function') {
        wasmFunctions[key] = (...args) => exports[key](...args);
      }
    }

    return wasmFunctions;
  } catch (error) {
    console.error("Error loading WebAssembly module:", error);
    throw error;
  }
};
