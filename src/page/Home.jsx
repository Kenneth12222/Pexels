import React, { useContext, useEffect, useState } from 'react';
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
    performWasmOperation,
  } = useContext(PexelContext);

  const [calcResult, setCalcResult] = useState(null);

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

  const calculate = () => {
    // Example: Call WASM multiply function
    const result = performWasmOperation('multiply', 6, 7);
    console.log('WASM Multiply Result:', result);
    setCalcResult(result); // Store result in state
  };

  const calculateFactorial = () => {
    // Example: Call WASM factorial function
    const result = performWasmOperation('factorial', 5);
    console.log('WASM Factorial Result:', result);
    setCalcResult(result); // Store result in state
  };

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
      <button onClick={calculate} className="calculate-button">
        Calculate (6 x 7)
      </button>
      <button onClick={calculateFactorial} className="calculate-button">
        Calculate Factorial (5)
      </button>
      {calcResult !== null && (
        <div className="calc-result">
          <p>Calculation Result: {calcResult}</p>
        </div>
      )}
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
