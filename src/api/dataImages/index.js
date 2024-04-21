import axios from 'axios';

export const getImageApi = async (searchValue, page) => {
  const BASE_URL = 'https://pixabay.com/api/?';
  const API_KEY = '42224356-31537d6cd2f97832aeb8b3ce8';
  const params = new URLSearchParams({
    key: API_KEY,
    q: searchValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 12,
  });

  const { data } = await axios.get(`${BASE_URL}${params}`);
  return data;
};
