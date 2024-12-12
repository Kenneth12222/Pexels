// import assert from "assert";
// import { add } from "../build/debug.js";
// assert.strictEqual(add(1, 2), 3);
// console.log("ok");
import { loadWasm } from './src/utils/loadWasm';

(async () => {
  const wasmFunctions = await loadWasm('./dist/module.wasm');
  console.log(wasmFunctions.multiply(2, 3)); // Should log: 6
})();
