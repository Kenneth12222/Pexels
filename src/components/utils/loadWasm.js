export const loadWasm = async (url) => {
  let wasmModuleInstance = null;
  
  try {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();

    const magicWord = new Uint8Array(buffer.slice(0, 4));
    if (magicWord[0] !== 0x00 || magicWord[1] !== 0x61 || magicWord[2] !== 0x73 || magicWord[3] !== 0x6d) {
      throw new Error('Invalid WebAssembly file');
    }

    const wasmModule = await WebAssembly.instantiate(buffer);
    wasmModuleInstance = wasmModule.instance;
    const exports = wasmModuleInstance.exports;

    const wasmFunctions = {};
    for (const key of Object.keys(exports)) {
      if (typeof exports[key] === 'function') {
        wasmFunctions[key] = (...args) => exports[key](...args);
      }
    }

    return {
      wasmFunctions,
      cleanup: () => {
        // If the module provides a cleanup function, invoke it (e.g., _free())
        if (wasmModuleInstance && wasmModuleInstance.exports._free) {
          wasmModuleInstance.exports._free();
        }
        console.log('WASM resources cleaned up');
      }
    };

  } catch (error) {
    console.error("Error loading WebAssembly module:", error);
    throw error;
  }
};
