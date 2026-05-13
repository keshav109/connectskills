import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const jobApi = {
  createJob: async (jobData) => {
    return apiClient.post('/jobs/create', jobData);
  },

  getAllJobs: async () => {
    return apiClient.get('/jobs');
  },

  getJobById: async (id) => {
    return apiClient.get(`/jobs/${id}`);
  },

  getCustomerJobs: async (customerId) => {
    return apiClient.get(`/jobs/customer/${customerId}`);
  }
};

export default apiClient;
