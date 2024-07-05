// src/pages/Home.jsx
import React, { useContext } from 'react';
import { PexelContext } from '../context/PexelContext';
import '../style/Home.css';
import Hero from './Hero';

const Home = () => {
  const { photos, setQuery, selectedPhoto, similarPhotos, selectPhoto, setSelectedPhoto } = useContext(PexelContext);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.elements.query.value;
    setQuery(query);
  };

  console.log('Similar Photos:', similarPhotos); // Logging

  return (
    <div className="home-container">
    <Hero handleSearch={handleSearch} />
      <div className="photo-grid">
        {photos.map((photo) => (
          <div key={photo.id} className="photo-item" onClick={() => selectPhoto(photo)}>
            <img src={photo.src.medium} alt={photo.photographer} className="photo-image" />
            <div className="photo-details">
              <span className="photographer">{photo.photographer}</span>
              <a href={photo.url} className="photo-link" target="_blank" rel="noopener noreferrer">View on Pexels</a>
            </div>
          </div>
        ))}
      </div>
      {selectedPhoto && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setSelectedPhoto(null)}>&times;</span>
            <img src={selectedPhoto.src.large} alt={selectedPhoto.photographer} className="selected-photo" />
            <div className="selected-photo-details">
              <h2>{selectedPhoto.photographer}</h2>
              <a href={selectedPhoto.url} className="photo-link" target="_blank" rel="noopener noreferrer">View on Pexels</a>
            </div>
            <h3>Similar Photos</h3>
            <div className="similar-photo-grid">
              {similarPhotos.map((photo) => (
                <div key={photo.id} className="similar-photo-item" onClick={() => selectPhoto(photo)}>
                  <img src={photo.src.small} alt={photo.photographer} className="similar-photo-image" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
