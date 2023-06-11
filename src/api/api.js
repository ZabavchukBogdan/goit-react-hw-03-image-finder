import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = '35854292-19f54c877684ffd2565072a73';

export const getPictures = async (textForSearch, page, per_page) => {
  const response = await axios.get(
    `?q=${textForSearch}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${per_page}`
  );
  return response.data;
};