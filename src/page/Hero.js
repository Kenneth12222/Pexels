// src/components/Hero.js
import React from 'react';
import '../style/Hero.css';

const Hero = ({ handleSearch }) => {
  return (
    <div className="hero-section">
      <div className="overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">Discover Stunning Photos</h1>
        <p className="hero-subtitle">Explore and download high-quality images from talented photographers worldwide.</p>
        <form onSubmit={handleSearch} className="search-form">
          <input type="text" name="query" className="search-input" placeholder="Search for photos..." />
          <button type="submit" className="search-button">Search</button>
        </form>
      </div>
    </div>
  );
};

export default Hero;
