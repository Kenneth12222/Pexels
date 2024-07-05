// src/context/PexelContext.js
import React, { createContext, useState, useEffect } from 'react';
import { fetchPhotos } from '../services/PexelsService';

export const PexelContext = createContext();

export const PexelProvider = ({ children }) => {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState('nature');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [similarPhotos, setSimilarPhotos] = useState([]);

  useEffect(() => {
    const getPhotos = async () => {
      try {
        const fetchedPhotos = await fetchPhotos(query);
        setPhotos(fetchedPhotos);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };
    getPhotos();
  }, [query]);

  const selectPhoto = async (photo) => {
    setSelectedPhoto(photo);
    try {
      const fetchedSimilarPhotos = await fetchPhotos(photo.alt || ''); // Use the alt text or an empty string as a fallback
      setSimilarPhotos(fetchedSimilarPhotos);
    } catch (error) {
      console.error('Error fetching similar photos:', error);
    }
  };

  return (
    <PexelContext.Provider value={{ photos, setQuery, selectedPhoto, similarPhotos, selectPhoto, setSelectedPhoto }}>
      {children}
    </PexelContext.Provider>
  );
};
