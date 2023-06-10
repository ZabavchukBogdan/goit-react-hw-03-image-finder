import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '35854292-19f54c877684ffd2565072a73';

export const getPictures = async (textForSearch, page) => {
  const response = await axios.get(
    `${BASE_URL}?q=${textForSearch}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data;
};
