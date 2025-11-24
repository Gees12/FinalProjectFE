import axios from 'axios';

const API_BASE = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE,
});

// Genre CRUD operations
export const genreAPI = {
  getAll: () => api.get('/genres'),
  getById: (id) => api.get(`/genres/${id}`),
  create: (data) => api.post('/genres', data),
  update: (id, data) => api.put(`/genres/${id}`, data),
  delete: (id) => api.delete(`/genres/${id}`),
};

// Subscription Benefits CRUD operations
export const benefitsAPI = {
  getAll: () => api.get('/subscriptionBenefits'),
  getById: (id) => api.get(`/subscriptionBenefits/${id}`),
  create: (data) => api.post('/subscriptionBenefits', data),
  update: (id, data) => api.put(`/subscriptionBenefits/${id}`, data),
  delete: (id) => api.delete(`/subscriptionBenefits/${id}`),
};

export default api;