import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, AlertCircle, CheckCircle, FileText } from 'lucide-react';
import { fadeIn, slideIn } from '../utils/motion';

const CandidateDashboard = () => {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    localStorage.removeItem('lastResultId');
    navigate('/login');
  };

  const startExam = () => {
    if (agreedToTerms) {
      navigate('/exam');
    }
  };

  if (!currentUser || currentUser.userType !== 'Candidate') {
    navigate('/login');
    return null;
  }

  const instructions = [
    {
      icon: Clock,
      title: "Exam Duration",
      content: "The exam duration is 90 minutes. A countdown timer will be displayed on the right side of the screen."
    },
    {
      icon: FileText,
      title: "Question Structure",
      content: "The exam consists of 45 questions divided into 3 tabs, with 15 questions in each tab. Questions are randomized for each candidate."
    },
    {
      icon: CheckCircle,
      title: "Navigation",
      content: "You can navigate between questions by clicking on question numbers. Only one question is displayed at a time."
    },
    {
      icon: AlertCircle,
      title: "Answer Options",
      content: "For each question, you have three options: Save (saves answer and moves to next), Skip (moves to next without saving), or Submit (ends exam immediately)."
    }
  ];

  const rules = [
    "Each correct answer carries +1 mark",
    "Each incorrect answer carries -1 mark (negative marking)",
    "Unanswered questions carry 0 marks",
    "Maximum possible score is 45 marks",
    "Once submitted, you cannot change your answers",
    "Your Hall Ticket Number will be displayed as a watermark during the exam",
    "Do not refresh the browser during the exam",
    "Ensure stable internet connection throughout the exam"
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="bg-white rounded-2xl shadow-xl overflow-hidden" {...fadeIn}>
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Examination Instructions</h1>
                <p className="text-blue-100">Welcome, {currentUser.name}</p>
                <p className="text-blue-200 font-mono text-sm">Hall Ticket: {currentUser.hallTicket}</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="p-8">
            <motion.div className="mb-8" {...slideIn}>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <FileText className="h-6 w-6 text-blue-600" />
                Important Instructions
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {instructions.map((instruction, index) => {
                  const IconComponent = instruction.icon;
                  return (
                    <motion.div 
                      key={index}
                      className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex-shrink-0">
                        <IconComponent className="h-6 w-6 text-blue-600 mt-1" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1">{instruction.title}</h3>
                        <p className="text-gray-600 text-sm">{instruction.content}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div className="mb-8" {...slideIn}>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <AlertCircle className="h-6 w-6 text-amber-600" />
                Examination Rules
              </h2>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                <ul className="space-y-3">
                  {rules.map((rule, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-start gap-3 text-gray-700"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm">{rule}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div className="mb-8" {...slideIn}>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Scoring System</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">+1</div>
                  <div className="text-sm text-green-700">Correct Answer</div>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-red-600 mb-1">-1</div>
                  <div className="text-sm text-red-700">Wrong Answer</div>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-gray-600 mb-1">0</div>
                  <div className="text-sm text-gray-700">Not Attempted</div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="border-t pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <input
                  type="checkbox"
                  id="agreement"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="agreement" className="text-gray-700 cursor-pointer">
                  I have read and understood all the instructions and rules. I agree to the terms and conditions.
                </label>
              </div>

              <button
                onClick={startExam}
                disabled={!agreedToTerms}
                className={`w-full py-4 rounded-lg font-semibold text-lg transition-all ${
                  agreedToTerms
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {agreedToTerms ? 'Start Examination' : 'Please agree to terms and conditions'}
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CandidateDashboard;