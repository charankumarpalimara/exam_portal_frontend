import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Save, RotateCcw, CheckCircle, XCircle } from 'lucide-react';
import examService from '../services/examService';

const ResultEditModal = ({ result, onClose, onUpdate }) => {
  const [questions, setQuestions] = useState(result.questions || []);
  const [loading, setLoading] = useState(false);
  const [originalQuestions] = useState(JSON.parse(JSON.stringify(result.questions || [])));

  const handleAnswerChange = (questionIndex, newAnswer) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex] = {
      ...updatedQuestions[questionIndex],
      userAnswer: newAnswer,
      isCorrect: newAnswer === updatedQuestions[questionIndex].correctAnswer
    };
    setQuestions(updatedQuestions);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await examService.updateResult(result._id, questions);
      if (response.success) {
        alert('Result updated successfully!');
        onUpdate(response.data);
        onClose();
      }
    } catch (error) {
      console.error('Error updating result:', error);
      alert(error.message || 'Failed to update result');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setQuestions(JSON.parse(JSON.stringify(originalQuestions)));
  };

  const calculateNewScore = () => {
    let correctAnswers = 0;
    let wrongAnswers = 0;
    let attemptedQuestions = 0;

    questions.forEach(question => {
      if (question.userAnswer) {
        attemptedQuestions++;
        if (question.userAnswer === question.correctAnswer) {
          correctAnswers++;
        } else {
          wrongAnswers++;
        }
      }
    });

    const score = correctAnswers - wrongAnswers;
    const percentage = ((score / result.totalQuestions) * 100).toFixed(2);

    return {
      correctAnswers,
      wrongAnswers,
      attemptedQuestions,
      score,
      percentage: parseFloat(percentage)
    };
  };

  const newScore = calculateNewScore();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-xl max-w-6xl w-full max-h-[95vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="bg-gray-50 border-b px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Edit Exam Result</h3>
            <p className="text-sm text-gray-600">
              {result.candidateName} - {result.hallTicket}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
              disabled={loading}
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Score Preview */}
        <div className="bg-blue-50 border-b px-6 py-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Correct</p>
              <p className="text-lg font-bold text-green-600">{newScore.correctAnswers}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Wrong</p>
              <p className="text-lg font-bold text-red-600">{newScore.wrongAnswers}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Attempted</p>
              <p className="text-lg font-bold text-blue-600">{newScore.attemptedQuestions}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Score</p>
              <p className="text-lg font-bold text-purple-600">{newScore.score}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Percentage</p>
              <p className="text-lg font-bold text-orange-600">{newScore.percentage}%</p>
            </div>
          </div>
        </div>

        {/* Questions List */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {questions.map((question, index) => (
              <div
                key={index}
                className={`border rounded-lg p-4 ${
                  question.isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 mb-2">
                      Q{index + 1}. {question.question}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {question.options.map((option, optionIndex) => (
                        <label
                          key={optionIndex}
                          className={`flex items-center p-2 rounded border cursor-pointer transition-colors ${
                            question.userAnswer === option
                              ? question.isCorrect
                                ? 'bg-green-100 border-green-300'
                                : 'bg-red-100 border-red-300'
                              : 'bg-white border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          <input
                            type="radio"
                            name={`question-${index}`}
                            value={option}
                            checked={question.userAnswer === option}
                            onChange={(e) => handleAnswerChange(index, e.target.value)}
                            className="mr-2"
                          />
                          <span className="text-sm">{option}</span>
                          {question.userAnswer === option && (
                            <div className="ml-auto">
                              {question.isCorrect ? (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              ) : (
                                <XCircle className="h-4 w-4 text-red-600" />
                              )}
                            </div>
                          )}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="ml-4 flex flex-col items-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold mb-2 ${
                        question.isCorrect ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                      }`}
                    >
                      {question.isCorrect ? 'Correct' : 'Wrong'}
                    </span>
                    <div className="text-xs text-gray-500 text-center">
                      <p>Correct: {question.correctAnswer}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ResultEditModal;
