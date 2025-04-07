// client\src\api.js
import axios from 'axios';
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add auth token to requests
API.interceptors.request.use((config) => {
  if (config.url.includes('/auth/login')) {
    return config;
  }
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  } else {
    console.warn('No token - redirecting to login');
    window.location.href = '/login';
    return Promise.reject(new Error('No auth token'));
  }
  return config;
});

// Response interceptor to handle 401 errors
API.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      console.error('Authentication error - redirecting to login');
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const login = async (credentials) => {
  try {
    // Clear any existing token first
    localStorage.removeItem('token');
    
    const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
    
    if (response.data?.token) {
      localStorage.setItem('token', response.data.token);
      return response;
    }
    throw new Error('No token in response');
  } catch (error) {
    localStorage.removeItem('token');
    throw error;
  }
};


// export const login = (credentials) => API.post('/auth/login', credentials);
export const updatePassword = (data) => API.put('/auth/update-password', data);

// Puzzle API
export const getPuzzles = () => API.get('/puzzles');
export const createPuzzle = (puzzle) => API.post('/puzzles', puzzle);
export const deletePuzzle = (id) => API.delete(`/puzzles/${id}`);
export const updatePuzzle = (id, puzzle) => API.put(`/puzzles/${id}`, puzzle);


// Tools API
export const getTools = () => API.get('/tools');
export const createTool = (tool) => API.post('/tools', tool);
export const deleteTool = (id) => API.delete(`/tools/${id}`);
export const updateTool = (id, tool) => API.put(`/tools/${id}`, tool);

// Shop API
export const getShopItems = () => API.get('/shop');
export const createShopItem = (item) => API.post('/shop', item);
export const deleteShopItem = (id) => API.delete(`/shop/${id}`);
export const updateShopItem = (id, item) => API.put(`/shop/${id}`, item);

export default API;