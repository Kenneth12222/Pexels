assemly needs to improve it with gc or multiple threaded natre not question ask

// assembly/index.ts
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


// index.js
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




// src/utils/loadWasm.js
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


// context/PexelContext.js

import React, { createContext, useState, useEffect } from 'react';
import { fetchPhotos } from '../services/PexelsService.js';
import { loadWasm } from '../utils/loadWasm.js';

export const PexelContext = createContext();

export const PexelProvider = ({ children }) => {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState('nature');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [similarPhotos, setSimilarPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [wasmFunctions, setWasmFunctions] = useState(null);
  const [cleanupWasm, setCleanupWasm] = useState(null);

  // Load WASM module and its functions
  useEffect(() => {
    const loadWasmFunctions = async () => {
      try {
        const wasm = await loadWasm('/wasm/index.wasm');
        setWasmFunctions(wasm.wasmFunctions);
        setCleanupWasm(wasm.cleanup); // Save cleanup function for later
        console.log('WASM functions loaded:', wasm.wasmFunctions);
      } catch (error) {
        console.error('Error loading WASM functions:', error);
      }
    };
    loadWasmFunctions();

    // Cleanup on unmount
    return () => {
      if (cleanupWasm) {
        cleanupWasm(); // Clean up WASM resources
      }
    };
  }, []);

  // Fetch photos from Pexels API
  const getPhotos = async () => {
    try {
      const fetchedPhotos = await fetchPhotos(query);
      setPhotos((prevPhotos) => [...prevPhotos, ...fetchedPhotos]);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  // Perform a WASM operation dynamically
  const performWasmOperation = (funcName, ...args) => {
    if (wasmFunctions && wasmFunctions[funcName]) {
      console.log(`Calling ${funcName} with arguments:`, args);
      const result = wasmFunctions[funcName](...args);
      console.log(`${funcName} result:`, result);
      return result;
    }
    console.warn(`WASM function ${funcName} not loaded or not found.`);
    return null;
  };

  // Update photos when query changes
  useEffect(() => {
    setPhotos([]); // Clear photos when query changes
    setPage(1); // Reset page to 1
    getPhotos();
  }, [query]); // Runs when query changes

  // Select a photo and fetch similar photos
  const selectPhoto = async (photo) => {
    setSelectedPhoto(photo);
    try {
      const fetchedSimilarPhotos = await fetchPhotos(photo.alt || '');
      setSimilarPhotos(fetchedSimilarPhotos);
    } catch (error) {
      console.error('Error fetching similar photos:', error);
    }
  };

  // Load more photos (pagination)
  const loadMorePhotos = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <PexelContext.Provider
      value={{
        photos,
        setQuery,
        selectedPhoto,
        similarPhotos,
        setSelectedPhoto,
        performWasmOperation,
        loadMorePhotos,
        selectPhoto,
      }}
    >
      {children}
    </PexelContext.Provider>
  );
};


// src/page/Home.js
import React, { useContext, useEffect } from 'react';
import { PexelContext } from '../context/PexelContext.js';
import '../style/Home.css';
import Hero from './Hero.js';

const Home = () => {
  const {
    photos,
    setQuery,
    selectedPhoto,
    similarPhotos,
    selectPhoto,
    setSelectedPhoto,
    loadMorePhotos,
  } = useContext(PexelContext);



  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.elements.query.value;
    if (query) {
      setQuery(query);
    }
  };

  useEffect(() => {
    loadMorePhotos();
  }, []);



  return (
    <div className="home-container">
      <Hero handleSearch={handleSearch} />
      <div className="photo-grid">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="photo-item"
            onClick={() => selectPhoto(photo)}
          >
            <img
              src={photo.src.medium}
              alt={photo.photographer}
              className="photo-image"
            />
            <div className="photo-details">
              <span className="photographer">{photo.photographer}</span>
              <a
                href={photo.url}
                className="photo-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Pexels
              </a>
            </div>
          </div>
        ))}
      </div>
      {selectedPhoto && (
        <div className="modal">
          <div className="modal-content">
            <span
              className="close"
              onClick={() => setSelectedPhoto(null)}
            >
              &times;
            </span>
            <img
              src={selectedPhoto.src.large}
              alt={selectedPhoto.photographer}
              className="selected-photo"
            />
            <div className="selected-photo-details">
              <h2>{selectedPhoto.photographer}</h2>
              <a
                href={selectedPhoto.url}
                className="photo-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Pexels
              </a>
            </div>
            <h3>Similar Photos</h3>
            <div className="similar-photo-grid">
              {similarPhotos.map((photo) => (
                <div
                  key={photo.id}
                  className="similar-photo-item"
                  onClick={() => selectPhoto(photo)}
                >
                  <img
                    src={photo.src.small}
                    alt={photo.photographer}
                    className="similar-photo-image"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="load-more-container">
        <button onClick={loadMorePhotos} className="load-more-button">
          Load More
        </button>
      </div>
    </div>
  );
};

export default Home;
