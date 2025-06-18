import axios from 'axios';

export default async function handler(req, res) {
  const { method, query } = req;
  
  if (method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { endpoint } = query;
  const apiKey = '271646b1495e3e27c91db4814e3a7193';
  const baseUrl = 'https://api.themoviedb.org/3';

  try {
    const response = await axios.get(`${baseUrl}${endpoint}?api_key=${apiKey}`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.status_message || 'Internal server error',
      error: error.message
    });
  }
} 