// src/utils photoProcessor.js

import { loadWasmModule } from './loadWasm.js';

export const processPhotoGrid = async (containerWidth, photoWidths, photoHeights, spacing) => {
  const wasm = await loadWasmModule();
  const { processPhotoGrid } = wasm.exports;

  // Allocate arrays in WASM memory
  const widthsPtr = wasm.exports.__newArray(wasm.exports.Int32Array_ID, photoWidths);
  const heightsPtr = wasm.exports.__newArray(wasm.exports.Int32Array_ID, photoHeights);

  // Call WASM function
  const positionsPtr = processPhotoGrid(containerWidth, widthsPtr, heightsPtr, spacing);

  // Retrieve and return the processed data
  const result = wasm.exports.__getArray(positionsPtr);

  // Clean up WASM memory
  wasm.exports.__release(widthsPtr);
  wasm.exports.__release(heightsPtr);
  wasm.exports.__release(positionsPtr);

  return result;
};
