import api from '../config/api';

const examService = {
  // Submit exam (Candidate)
  submitExam: async (examData) => {
    try {
      const response = await api.post('/exams/submit', examData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Failed to submit exam' };
    }
  },

  // Get my results (Candidate)
  getMyResults: async () => {
    try {
      const response = await api.get('/exams/results/me');
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Failed to fetch results' };
    }
  },

  // Get all results (Admin)
  getAllResults: async (params = {}) => {
    try {
      const response = await api.get('/exams/results', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Failed to fetch results' };
    }
  },

  // Get result by ID
  getResultById: async (id) => {
    try {
      const response = await api.get(`/exams/results/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Failed to fetch result' };
    }
  },

  // Delete result (Admin)
  deleteResult: async (id) => {
    try {
      const response = await api.delete(`/exams/results/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Failed to delete result' };
    }
  },

  // Update result (Admin)
  updateResult: async (id, questions) => {
    try {
      const response = await api.put(`/exams/results/${id}`, { questions });
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Failed to update result' };
    }
  },

  // Get statistics (Admin)
  getStatistics: async () => {
    try {
      const response = await api.get('/exams/statistics');
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Failed to fetch statistics' };
    }
  }
};

export default examService;

