import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';
import { Quiz } from '../types/quiz';

interface QuizPlayerProps {
  quiz: Quiz;
  onQuizUpdate: (quiz: Quiz) => void;
}

const QuizPlayer: React.FC<QuizPlayerProps> = ({ quiz, onQuizUpdate }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(
    quiz.userAnswers[quiz.currentQuestion]
  );

  const currentQuestion = quiz.questions[quiz.currentQuestion];
  const progress = ((quiz.currentQuestion + 1) / quiz.questions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const updatedAnswers = [...quiz.userAnswers];
    updatedAnswers[quiz.currentQuestion] = selectedAnswer;

    let updatedScore = quiz.score;
    if (selectedAnswer === currentQuestion.correctAnswer) {
      updatedScore += 1;
    }

    const isLastQuestion = quiz.currentQuestion === quiz.questions.length - 1;

    const updatedQuiz: Quiz = {
      ...quiz,
      userAnswers: updatedAnswers,
      score: updatedScore,
      currentQuestion: isLastQuestion ? quiz.currentQuestion : quiz.currentQuestion + 1,
      isCompleted: isLastQuestion,
    };

    onQuizUpdate(updatedQuiz);
    
    if (!isLastQuestion) {
      setSelectedAnswer(updatedAnswers[quiz.currentQuestion + 1]);
    }
  };

  const handlePrevious = () => {
    if (quiz.currentQuestion === 0) return;
    
    const updatedQuiz: Quiz = {
      ...quiz,
      currentQuestion: quiz.currentQuestion - 1,
    };

    onQuizUpdate(updatedQuiz);
    setSelectedAnswer(quiz.userAnswers[quiz.currentQuestion - 1]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden">
        {/* Progress Bar */}
        <div className="h-2 bg-gray-200">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                {quiz.topic}
              </span>
              <span className="text-sm text-gray-500">
                {quiz.currentQuestion + 1} of {quiz.questions.length}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 leading-relaxed">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 transform hover:scale-[1.01] ${
                  selectedAnswer === index
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswer === index
                      ? 'border-purple-500 bg-purple-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedAnswer === index && (
                      <CheckCircle className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <span className="font-medium">{option}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={quiz.currentQuestion === 0}
              className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleNext}
              disabled={selectedAnswer === null}
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-xl hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              <span>{quiz.currentQuestion === quiz.questions.length - 1 ? 'Finish Quiz' : 'Next'}</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPlayer;