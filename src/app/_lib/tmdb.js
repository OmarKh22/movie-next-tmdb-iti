
import axios from 'axios';

const apiKey = process.env.API_KEY;
const baseURL = 'https://api.themoviedb.org/3';

export const getNowPlaying = async (page = 1) => {
  const response = await axios.get(
    `${baseURL}/movie/now_playing`,
    {
      params: {
        api_key: apiKey,
        language: 'en-US',
        page,
      },
    }
  );
  return response.data;
};
