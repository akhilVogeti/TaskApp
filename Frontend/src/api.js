
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (userData) => api.post('/auth/register', userData);
export const getTasks = (token) => api.get('/tasks', { headers: { Authorization: `Bearer ${token}` } });
export const createTask = (taskData, token) => api.post('/tasks', taskData, { headers: { Authorization: `Bearer ${token}` } });
export const updateTask = (id, taskData, token) => api.put(`/tasks/${id}`, taskData, { headers: { Authorization: `Bearer ${token}` } });
export const deleteTask = (id, token) => api.delete(`/tasks/${id}`, { headers: { Authorization: `Bearer ${token}` } });
export const logout = () => {
  localStorage.removeItem('token');
};
