export function multiply(a: i32, b: i32): i32 {
  return a * b;
}

export function factorial(n: i32): i32 {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

export function fibonacci(n: i32): i32 {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

export function power(base: i32, exponent: i32): i32 {
  if (exponent === 0) return 1;
  return base * power(base, exponent - 1);
}


import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import { PexelProvider } from './context/PexelContext.js'; 

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

const root = ReactDOM.createRoot(rootElement);

// Wrapping the App component with PexelProvider
root.render(
  <React.StrictMode>
    <PexelProvider>
      <App />
    </PexelProvider>
  </React.StrictMode>
);

// Cleanup logic when needed (e.g., unmounting)
if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    root.unmount(); // Unmount the React tree
    console.log('React tree unmounted and cleanup performed.');
  });
}


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
