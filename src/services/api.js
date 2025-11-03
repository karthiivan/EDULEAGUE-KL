import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email, password) => api.post('/users/login', { email, password }),
  register: (userData) => api.post('/users/register', userData),
  getProfile: () => api.get('/users/profile'),
  updateProfile: (id, data) => api.put(`/users/${id}`, data)
};

// Problems API
export const problemsAPI = {
  getAll: (filters) => api.get('/problems', { params: filters }),
  getById: (id) => api.get(`/problems/${id}`),
  submit: (id, solution) => api.post(`/problems/${id}/submit`, { solution }),
  getSubmissions: (userId) => api.get(`/problems/submissions/${userId}`)
};

// Placements API
export const placementsAPI = {
  getAll: () => api.get('/placements'),
  getById: (id) => api.get(`/placements/${id}`)
};

// Mentorships API
export const mentorshipsAPI = {
  getAll: () => api.get('/mentorships'),
  book: (mentorId, data) => api.post(`/mentorships/${mentorId}/book`, data),
  getMySessions: () => api.get('/mentorships/my-sessions')
};

// Projects API
export const projectsAPI = {
  getAll: () => api.get('/projects'),
  getById: (id) => api.get(`/projects/${id}`),
  create: (data) => api.post('/projects', data),
  join: (id) => api.post(`/projects/${id}/join`)
};

// Quizzes API
export const quizzesAPI = {
  getAll: () => api.get('/quizzes'),
  getById: (id) => api.get(`/quizzes/${id}`),
  submit: (id, answers) => api.post(`/quizzes/${id}/submit`, { answers })
};

// Notifications API
export const notificationsAPI = {
  getAll: () => api.get('/notifications'),
  markAsRead: (id) => api.put(`/notifications/${id}/read`)
};

export default api;
