import {API_MAIN, API_KEY} from '@env';
import axios from 'axios';

export const getPhotos = async () => {
  try {
    const response = await axios.get(`${API_MAIN}/photos?client_id=${API_KEY}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
