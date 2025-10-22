import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Eye, Trash2, TrendingUp, TrendingDown, Award, Clock } from 'lucide-react';
import { fadeIn } from '../utils/motion';
import examService from '../services/examService';

const ResultManagement = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchHallTicket, setSearchHallTicket] = useState('');
  const [searchName, setSearchName] = useState('');
  const [selectedResult, setSelectedResult] = useState(null);
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    fetchResults();
    fetchStatistics();
  }, []);

  const fetchResults = async (hallTicket = '', candidateName = '') => {
    setLoading(true);
    try {
      const params = {};
      if (hallTicket) params.hallTicket = hallTicket;
      if (candidateName) params.candidateName = candidateName;

      const response = await examService.getAllResults(params);
      if (response.success) {
        setResults(response.data);
      }
    } catch (error) {
      console.error('Error fetching results:', error);
      alert('Failed to load results');
    } finally {
      setLoading(false);
    }
  };

  const fetchStatistics = async () => {
    try {
      const response = await examService.getStatistics();
      if (response.success) {
        setStatistics(response.data);
      }
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchResults(searchHallTicket, searchName);
  };

  const handleClearSearch = () => {
    setSearchHallTicket('');
    setSearchName('');
    fetchResults();
  };

  const handleViewDetails = async (resultId) => {
    try {
      const response = await examService.getResultById(resultId);
      if (response.success) {
        setSelectedResult(response.data);
      }
    } catch (error) {
      console.error('Error fetching result details:', error);
      alert('Failed to load result details');
    }
  };

  const handleDeleteResult = async (resultId) => {
    if (window.confirm('Are you sure you want to delete this result?')) {
      try {
        const response = await examService.deleteResult(resultId);
        if (response.success) {
          alert('Result deleted successfully');
          fetchResults(searchHallTicket, searchName);
          fetchStatistics();
        }
      } catch (error) {
        console.error('Error deleting result:', error);
        alert(error.message || 'Failed to delete result');
      }
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 75) return 'text-green-600 bg-green-50';
    if (percentage >= 50) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="space-y-6">
      {/* Statistics Section */}
      {statistics && (
        <motion.div {...fadeIn} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Total Exams</p>
                <p className="text-2xl font-bold text-blue-700">{statistics.totalResults}</p>
              </div>
              <Award className="h-10 w-10 text-blue-500 opacity-50" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Average Score</p>
                <p className="text-2xl font-bold text-green-700">
                  {statistics.statistics?.averageScore?.toFixed(2) || 0}
                </p>
              </div>
              <TrendingUp className="h-10 w-10 text-green-500 opacity-50" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">Highest Score</p>
                <p className="text-2xl font-bold text-purple-700">
                  {statistics.statistics?.maxScore || 0}
                </p>
              </div>
              <TrendingUp className="h-10 w-10 text-purple-500 opacity-50" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600 font-medium">Avg Percentage</p>
                <p className="text-2xl font-bold text-orange-700">
                  {statistics.statistics?.averagePercentage?.toFixed(2) || 0}%
                </p>
              </div>
              <TrendingDown className="h-10 w-10 text-orange-500 opacity-50" />
            </div>
          </div>
        </motion.div>
      )}

      {/* Search Section */}
      <motion.div {...fadeIn} className="bg-white rounded-lg shadow-sm border p-4">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by Hall Ticket..."
              value={searchHallTicket}
              onChange={(e) => setSearchHallTicket(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by Candidate Name..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Search className="h-4 w-4" />
              Search
            </button>
            <button
              type="button"
              onClick={handleClearSearch}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Clear
            </button>
          </div>
        </form>
      </motion.div>

      {/* Results Table */}
      <motion.div {...fadeIn} className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hall Ticket
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Candidate Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Percentage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Attempted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                    Loading results...
                  </td>
                </tr>
              ) : results.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                    No results found
                  </td>
                </tr>
              ) : (
                results.map((result) => (
                  <tr key={result._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium text-gray-900">{result.hallTicket}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-gray-900">{result.candidateName}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-semibold text-gray-900">{result.score}</span>
                      <span className="text-gray-500 text-sm"> / {result.totalQuestions}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(result.percentage)}`}>
                        {result.percentage}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-gray-900">
                        {result.attemptedQuestions} / {result.totalQuestions}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(result.submittedAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewDetails(result._id)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                          title="View Details"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteResult(result._id)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                          title="Delete Result"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Result Details Modal */}
      {selectedResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Exam Result Details</h3>
              <button
                onClick={() => setSelectedResult(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Candidate Info */}
              <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Candidate Name</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedResult.candidateName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Hall Ticket</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedResult.hallTicket}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedResult.candidate?.email || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedResult.candidate?.phone || 'N/A'}</p>
                </div>
              </div>

              {/* Score Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <p className="text-sm text-blue-600 font-medium">Total Score</p>
                  <p className="text-2xl font-bold text-blue-700">{selectedResult.score}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <p className="text-sm text-green-600 font-medium">Correct</p>
                  <p className="text-2xl font-bold text-green-700">{selectedResult.correctAnswers}</p>
                </div>
                <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                  <p className="text-sm text-red-600 font-medium">Wrong</p>
                  <p className="text-2xl font-bold text-red-700">{selectedResult.wrongAnswers}</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <p className="text-sm text-purple-600 font-medium">Percentage</p>
                  <p className="text-2xl font-bold text-purple-700">{selectedResult.percentage}%</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-5 w-5" />
                    <span className="text-sm font-medium">Time Taken</span>
                  </div>
                  <p className="text-xl font-semibold text-gray-900 mt-2">
                    {formatTime(selectedResult.timeTaken)}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 font-medium">Submitted At</p>
                  <p className="text-xl font-semibold text-gray-900 mt-2">
                    {formatDate(selectedResult.submittedAt)}
                  </p>
                </div>
              </div>

              {/* Questions Details */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Question-wise Analysis</h4>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {selectedResult.questions && selectedResult.questions.map((q, index) => (
                    <div
                      key={index}
                      className={`border rounded-lg p-4 ${
                        q.isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <p className="font-medium text-gray-900">Q{index + 1}. {q.question}</p>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            q.isCorrect ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                          }`}
                        >
                          {q.isCorrect ? 'Correct' : 'Wrong'}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-600">Your Answer: </span>
                          <span className="font-medium text-gray-900">{q.userAnswer || 'Not Attempted'}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Correct Answer: </span>
                          <span className="font-medium text-green-700">{q.correctAnswer}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ResultManagement;

