import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Key, Hash } from 'lucide-react';
import { fadeIn } from '../utils/motion';
import authService from '../services/authService';

const LoginPage = () => {
  const [loginType, setLoginType] = useState('candidate');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    hallTicket: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoginTypeChange = (type) => {
    setLoginType(type);
    setFormData({ username: '', password: '', hallTicket: '' });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Prepare login credentials
      const credentials = {
        userType: loginType === 'admin' ? 'Admin' : 'Candidate',
        ...(loginType === 'admin' ? {
          username: formData.username,
          password: formData.password
        } : {
          hallTicket: formData.hallTicket
        })
      };

      console.log('Attempting login with:', { ...credentials, password: credentials.password ? '***' : undefined });

      // Call backend API
      const response = await authService.login(credentials);

      console.log('Login response:', response);

      if (response.success) {
        console.log('Login successful! User type:', response.user.userType);
        // Navigate based on user type
        if (response.user.userType === 'Admin') {
          console.log('Navigating to /admin');
          navigate('/admin');
        } else {
          console.log('Navigating to /candidate');
          navigate('/candidate');
        }
      } else {
        console.log('Login failed:', response.message);
        setError(response.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Backend connection failed. Make sure backend is running on http://localhost:8080');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <motion.div 
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
        {...fadeIn}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Examination Portal</h1>
          <p className="text-gray-600">Please login to continue</p>
        </div>

        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
          <button
            type="button"
            onClick={() => handleLoginTypeChange('candidate')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              loginType === 'candidate'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Candidate
          </button>
          <button
            type="button"
            onClick={() => handleLoginTypeChange('admin')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              loginType === 'admin'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Admin
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {loginType === 'admin' ? (
            <>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Username"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="relative">
                <Key className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </>
          ) : (
            <div className="relative">
              <Hash className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Hall Ticket Number"
                value={formData.hallTicket}
                onChange={(e) => setFormData({...formData, hallTicket: e.target.value})}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          )}

          {error && (
            <motion.div 
              className="text-red-600 text-sm text-center bg-red-50 p-2 rounded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-medium transition-colors ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-xs font-semibold text-gray-700 mb-2 text-center">Demo Credentials:</p>
          <div className="space-y-1 text-xs text-gray-600">
            <div className="flex justify-between">
              <span className="font-medium">Admin:</span>
              <span>admin / admin123</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Candidate 1:</span>
              <span>2025J291234</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Candidate 2:</span>
              <span>2025J291235</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;