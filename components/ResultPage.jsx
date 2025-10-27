import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { XCircle, Award, Home, CheckCircle } from 'lucide-react';
import { fadeIn } from '../utils/motion';
import examService from '../services/examService';
import authService from '../services/authService';

const ResultPage = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const lastResultId = localStorage.getItem('lastResultId');
        
        if (lastResultId) {
          // Fetch specific result by ID
          const response = await examService.getResultById(lastResultId);
          if (response.success) {
            setResult(response.data);
          }
        } else {
          // Fetch latest result
          const response = await examService.getMyResults();
          if (response.success && response.data.length > 0) {
            setResult(response.data[0]); // Get latest result
          }
        }
      } catch (error) {
        console.error('Error fetching result:', error);
        alert('Failed to load results');
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchResult();
    } else {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const handleBackToDashboard = () => {
    const confirmed = window.confirm(
      'Exam completed! Clicking OK will log you out and redirect to the login page for security purposes. Are you sure you want to continue?'
    );
    
    if (confirmed) {
      // Clear exam-related data
      localStorage.removeItem('lastResultId');
      
      // Logout user and clear credentials
      authService.logout();
      
      // Show logout message
      alert('You have been successfully logged out. Thank you for completing the exam!');
      
      // Navigate to login page
      navigate('/login');
    }
  };

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading results...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">No exam results found</p>
          <button onClick={() => navigate('/candidate')} className="bg-blue-600 text-white px-4 py-2 rounded">
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const { score, totalQuestions, percentage, correctAnswers, wrongAnswers, attemptedQuestions } = result;
  const passed = score >= (totalQuestions * 0.4); // 40% passing criteria

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <motion.div 
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl"
        {...fadeIn}
      >
        <div className="text-center">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${
            passed ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {passed ? (
              <Award className="h-10 w-10 text-green-600" />
            ) : (
              <XCircle className="h-10 w-10 text-red-600" />
            )}
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Examination {passed ? 'Completed' : 'Completed'}
          </h1>
          
          <p className={`text-lg mb-8 ${
            passed ? 'text-green-600' : 'text-red-600'
          }`}>
            {passed ? 'Congratulations! You have passed the exam.' : 'You did not meet the passing criteria.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center p-6 bg-blue-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">{score}</div>
            <div className="text-sm text-gray-600">Your Score</div>
          </div>
          
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="text-3xl font-bold text-gray-900 mb-2">{totalQuestions}</div>
            <div className="text-sm text-gray-600">Total Questions</div>
          </div>
          
          <div className="text-center p-6 bg-purple-50 rounded-lg">
            <div className="text-3xl font-bold text-purple-600 mb-2">{percentage}%</div>
            <div className="text-sm text-gray-600">Percentage</div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Exam Summary</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Candidate:</span>
              <span className="font-medium text-gray-900">{result.candidateName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Hall Ticket:</span>
              <span className="font-medium text-gray-900">{result.hallTicket}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Exam Date:</span>
              <span className="font-medium text-gray-900">{new Date(result.submittedAt).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className={`font-medium ${
                passed ? 'text-green-600' : 'text-red-600'
              }`}>
                {passed ? 'PASSED' : 'FAILED'}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Answer Statistics</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600 mb-1">{correctAnswers}</div>
              <div className="text-sm text-gray-600">Correct</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <XCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-600 mb-1">{wrongAnswers}</div>
              <div className="text-sm text-gray-600">Wrong</div>
            </div>
            <div className="text-center p-4 bg-gray-100 rounded-lg">
              <div className="text-2xl font-bold text-gray-600 mb-1">{totalQuestions - attemptedQuestions}</div>
              <div className="text-sm text-gray-600">Unattempted</div>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <h4 className="font-semibold text-yellow-800 mb-2">Scoring Information</h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Each correct answer: +1 mark</li>
            <li>• Each incorrect answer: -1 mark</li>
            <li>• Unanswered questions: 0 marks</li>
            <li>• Passing criteria: 40% (18 marks minimum)</li>
          </ul>
        </div>

        <div className="text-center">
          <button
            onClick={handleBackToDashboard}
            className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto"
          >
            <Home className="h-5 w-5" />
            Complete Exam & Logout
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ResultPage;