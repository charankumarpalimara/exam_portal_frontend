import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Save, SkipForward, Send } from 'lucide-react';
import { fadeIn } from '../utils/motion';
import questionService from '../services/questionService';
import examService from '../services/examService';

const ExamInterface = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(90 * 60); // 90 minutes in seconds
  const [examQuestions, setExamQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startTime] = useState(Date.now());
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  // Fetch questions from backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await questionService.getRandomQuestions();
        if (response.success && response.data) {
          // Split questions into 3 tabs of 15 each
          const allQuestions = response.data;
          setExamQuestions([
            allQuestions.slice(0, 15),
            allQuestions.slice(15, 30),
            allQuestions.slice(30, 45)
          ]);
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
        alert('Failed to load questions. Please try again.');
        navigate('/candidate');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [navigate]);

  const submitExam = useCallback(async () => {
    if (submitting) return;
    
    setSubmitting(true);
    const timeTaken = Math.floor((Date.now() - startTime) / 1000); // time in seconds

    try {
      const response = await examService.submitExam({
        answers,
        timeTaken
      });

      if (response.success) {
        // Store result ID for viewing
        localStorage.setItem('lastResultId', response.data._id);
        navigate('/result');
      } else {
        alert('Failed to submit exam. Please try again.');
        setSubmitting(false);
      }
    } catch (error) {
      console.error('Error submitting exam:', error);
      alert('Error submitting exam. Please try again.');
      setSubmitting(false);
    }
  }, [answers, startTime, navigate, submitting]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          submitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [submitExam]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answer) => {
    const questionId = examQuestions[currentTab][currentQuestion].id || examQuestions[currentTab][currentQuestion]._id;
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const saveAndNext = () => {
    if (currentQuestion < 14) {
      setCurrentQuestion(prev => prev + 1);
    } else if (currentTab < 2) {
      setCurrentTab(prev => prev + 1);
      setCurrentQuestion(0);
    }
  };

  const skipQuestion = () => {
    if (currentQuestion < 14) {
      setCurrentQuestion(prev => prev + 1);
    } else if (currentTab < 2) {
      setCurrentTab(prev => prev + 1);
      setCurrentQuestion(0);
    }
  };

  const jumpToQuestion = (tabIndex, questionIndex) => {
    setCurrentTab(tabIndex);
    setCurrentQuestion(questionIndex);
  };

  if (!currentUser || currentUser.userType !== 'Candidate') {
    navigate('/login');
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading exam questions...</p>
        </div>
      </div>
    );
  }

  if (examQuestions.length === 0 || !examQuestions[currentTab] || !examQuestions[currentTab][currentQuestion]) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load questions</p>
          <button onClick={() => navigate('/candidate')} className="bg-blue-600 text-white px-4 py-2 rounded">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const currentQ = examQuestions[currentTab][currentQuestion];
  const questionId = currentQ.id || currentQ._id;
  const selectedAnswer = answers[questionId];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 py-3 sm:h-16 sm:py-0">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Online Examination</h1>
              <p className="text-sm text-gray-600">Hall Ticket: <span className="font-mono font-semibold">{currentUser.hallTicket}</span></p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-lg">
                <Clock className="h-5 w-5 text-red-600" />
                <span className="font-mono text-red-600 font-semibold">{formatTime(timeLeft)}</span>
              </div>
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to logout? Your exam progress will be lost.')) {
                    localStorage.removeItem('currentUser');
                    navigate('/login');
                  }
                }}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Question Navigation */}
          <div className="lg:col-span-1">
            <motion.div className="bg-white rounded-xl shadow-sm p-6" {...fadeIn}>
              <h3 className="font-semibold text-gray-900 mb-4">Question Navigation</h3>
              {[0, 1, 2].map(tabIndex => (
                <div key={tabIndex} className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Section {tabIndex + 1}</h4>
                  <div className="grid grid-cols-5 gap-2">
                    {Array.from({ length: 15 }, (_, qIndex) => {
                      const qId = examQuestions[tabIndex]?.[qIndex]?.id || examQuestions[tabIndex]?.[qIndex]?._id;
                      const isAnswered = answers[qId];
                      const isCurrent = currentTab === tabIndex && currentQuestion === qIndex;
                      return (
                        <button
                          key={qIndex}
                          onClick={() => jumpToQuestion(tabIndex, qIndex)}
                          disabled={submitting}
                          className={`w-8 h-8 text-xs rounded transition-colors ${
                            isCurrent
                              ? 'bg-blue-600 text-white'
                              : isAnswered
                              ? 'bg-green-100 text-green-700 hover:bg-green-200'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                          {qIndex + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Question Content */}
          <div className="lg:col-span-3">
            <motion.div className="bg-white rounded-xl shadow-sm p-8" {...fadeIn}>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">Section {currentTab + 1} - Question {currentQuestion + 1} of 15</span>
                  <span className="text-sm text-gray-500">Question ID: {questionId}</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">{currentQ.question}</h2>
              </div>

              <div className="space-y-4 mb-8">
                {currentQ.options.map((option, index) => (
                  <label
                    key={index}
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedAnswer === option
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="answer"
                      value={option}
                      checked={selectedAnswer === option}
                      onChange={() => handleAnswerSelect(option)}
                      className="mr-4 h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-900">{option}</span>
                  </label>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    onClick={saveAndNext}
                    disabled={submitting}
                    className="flex items-center justify-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    <Save className="h-4 w-4" />
                    Save & Next
                  </button>
                  <button
                    onClick={skipQuestion}
                    disabled={submitting}
                    className="flex items-center justify-center gap-2 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    <SkipForward className="h-4 w-4" />
                    Skip
                  </button>
                </div>
                <button
                  onClick={submitExam}
                  disabled={submitting}
                  className="flex items-center justify-center gap-2 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                  {submitting ? 'Submitting...' : 'Submit Exam'}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamInterface;