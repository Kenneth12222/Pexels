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
