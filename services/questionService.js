import api from '../config/api';

const questionService = {
  // Get all questions (Admin)
  getAllQuestions: async (params = {}) => {
    try {
      const response = await api.get('/questions', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Failed to fetch questions' };
    }
  },

  // Get random questions for exam (Candidate)
  getRandomQuestions: async () => {
    try {
      const response = await api.get('/questions/random');
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Failed to fetch exam questions' };
    }
  },

  // Get single question (Admin)
  getQuestion: async (id) => {
    try {
      const response = await api.get(`/questions/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Failed to fetch question' };
    }
  },

  // Create question (Admin)
  createQuestion: async (questionData) => {
    try {
      const response = await api.post('/questions', questionData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Failed to create question' };
    }
  },

  // Update question (Admin)
  updateQuestion: async (id, questionData) => {
    try {
      const response = await api.put(`/questions/${id}`, questionData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Failed to update question' };
    }
  },

  // Delete question (Admin)
  deleteQuestion: async (id) => {
    try {
      const response = await api.delete(`/questions/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Failed to delete question' };
    }
  },

  // Bulk create questions (Admin)
  bulkCreateQuestions: async (questions) => {
    try {
      const response = await api.post('/questions/bulk', { questions });
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Failed to create questions' };
    }
  }
};

export default questionService;

