import React from 'react';
import { Trophy, RotateCcw, Target, CheckCircle, XCircle } from 'lucide-react';
import { Quiz } from '../types/quiz';

interface QuizResultsProps {
  quiz: Quiz;
  onRestart: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({ quiz, onRestart }) => {
  const percentage = Math.round((quiz.score / quiz.questions.length) * 100);
  
  const getScoreColor = () => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = () => {
    if (percentage >= 80) return 'from-green-500 to-emerald-500';
    if (percentage >= 60) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  const getPerformanceMessage = () => {
    if (percentage >= 90) return 'Outstanding! 🌟';
    if (percentage >= 80) return 'Great job! 👏';
    if (percentage >= 70) return 'Well done! 👍';
    if (percentage >= 60) return 'Good effort! 😊';
    return 'Keep practicing! 💪';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden">
        {/* Header */}
        <div className={`bg-gradient-to-r ${getScoreBgColor()} p-8 text-white text-center`}>
          <Trophy className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-2">Quiz Complete!</h1>
          <p className="text-xl opacity-90">{getPerformanceMessage()}</p>
        </div>

        <div className="p-8">
          {/* Score Summary */}
          <div className="text-center mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 rounded-xl p-6">
                <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">{quiz.score}</p>
                <p className="text-gray-600">Correct Answers</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <div className={`text-4xl font-bold ${getScoreColor()} mb-1`}>
                  {percentage}%
                </div>
                <p className="text-gray-600">Score</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <p className="text-2xl font-bold text-gray-800">{quiz.questions.length}</p>
                <p className="text-gray-600">Total Questions</p>
              </div>
            </div>
            
            <p className="text-lg text-gray-600 mb-2">Topic: <span className="font-semibold text-purple-600">{quiz.topic}</span></p>
          </div>

          {/* Question Review */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Question Review</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {quiz.questions.map((question, index) => {
                const userAnswer = quiz.userAnswers[index];
                const isCorrect = userAnswer === question.correctAnswer;
                
                return (
                  <div key={question.id} className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                      <div className={`mt-1 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                        {isCorrect ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 mb-2">
                          {index + 1}. {question.question}
                        </p>
                        <div className="text-sm space-y-1">
                          <p className="text-gray-600">
                            Your answer: <span className={isCorrect ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                              {userAnswer !== null ? question.options[userAnswer] : 'No answer'}
                            </span>
                          </p>
                          {!isCorrect && (
                            <p className="text-gray-600">
                              Correct answer: <span className="text-green-600 font-medium">
                                {question.options[question.correctAnswer]}
                              </span>
                            </p>
                          )}
                          <p className="text-gray-500 italic mt-2">{question.explanation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-center">
            <button
              onClick={onRestart}
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 active:scale-95 font-medium"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Create New Quiz</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;