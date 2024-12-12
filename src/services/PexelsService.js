

// src/services/PexelsService.js
import axios from 'axios';

const PEXELS_API_KEY = 'uDsaNoiARkVeopRASv9XPIXAT9zPDZ4OPP4Hf6UypKcwoHfRlOaJJ08G';
const PEXELS_API_URL = 'https://api.pexels.com/v1';

const apiClient = axios.create({
  baseURL: PEXELS_API_URL,
  headers: {
    Authorization: PEXELS_API_KEY,
  },
});

export const fetchPhotos = async (query) => {
  try {
    const response = await apiClient.get('/search', {
      params: {
        query, per_page: 15
      },
    });
    return response.data.photos;
  } catch (error) {
    console.error('Error fetching photos from Pexels API:', error);
    throw error;
  }
};

