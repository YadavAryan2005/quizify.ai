"use client"
import React, { useState } from 'react';
import { BookOpen, Play, RotateCcw } from 'lucide-react';
import { Quiz, QuizConfig } from '../types/quiz'
import QuizPlayer from './QuizPlayer';
import QuizResults from './QuizResults';

const QuizMaker: React.FC = () => {
  const [config, setConfig] = useState<QuizConfig>({ topic: '', questionCount: 10 });
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig(prev => ({ ...prev, topic: e.target.value }));
  };

  const handleQuestionCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig(prev => ({ ...prev, questionCount: parseInt(e.target.value) }));
  };

async function generateQuiz(topic: string, noOfQuestion: number): Promise<Quiz> {
  const token=localStorage.getItem("token")
  const response = await fetch("http://localhost:5000/generateQuiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization":`barer ${token}`
        },
        body: JSON.stringify({ topic,noOfQuestion }),
      });
      const geminiResponse = await response.json();
      // if(geminiResponse.status===401)
      // {
      //   localStorage.removeItem("token");

      // }
      const questions=geminiResponse.generatedQuiz;
  return {
    topic,
    questions,
    currentQuestion: 0,
    score: 0,
    userAnswers: new Array(noOfQuestion).fill(null),
    isCompleted: false,
  };
}

  const handleGenerateQuiz = async () => {
    if (!config.topic.trim()) return;
    try {  
    setIsGenerating(true);
    const newQuiz =await generateQuiz(config.topic, config.questionCount);
    if(newQuiz){
    setQuiz(newQuiz);
    setIsGenerating(false);
    }
    } catch (error) {
      console.log(error,"error")
    }finally{
      setIsGenerating(false);
    }

  };

  const handleResetQuiz = () => {
    setQuiz(null);
    setConfig({ topic: '', questionCount: 10 });
  };

  if (quiz?.isCompleted) {
    return <QuizResults quiz={quiz} onRestart={handleResetQuiz} />;
  }

  if (quiz) {
    return <QuizPlayer quiz={quiz} onQuizUpdate={setQuiz} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/20">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Quiz Maker</h1>
          <p className="text-white/80">Create custom quizzes on any topic</p>
        </div>

        {isGenerating ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white/30 border-t-white mb-4"></div>
            <p className="text-white font-medium">Generating your quiz...</p>
            <p className="text-white/70 text-sm mt-2">Creating {config.questionCount} questions about {config.topic}</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <label htmlFor="topic" className="block text-white font-medium mb-2">
                Quiz Topic
              </label>
              <input
                id="topic"
                type="text"
                value={config.topic}
                onChange={handleTopicChange}
                placeholder="e.g., JavaScript, History, Science..."
                className="w-full px-4 py-3 rounded-xl  border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-200"
              />
            </div>

            <div>
              <label htmlFor="questionCount" className="block text-white font-medium mb-2">
                Number of Questions
              </label>
              <input
                id="topic"
                type="text"
                value={config.questionCount}
                onChange={handleQuestionCountChange}
                placeholder="e.g., JavaScript, History, Science..."
                className="w-full px-4 py-3 rounded-xl  border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-200"
              />
            </div>

            <button
              onClick={handleGenerateQuiz}
              disabled={!config.topic.trim()}
              className="w-full bg-white text-purple-600 font-bold py-4 px-6 rounded-xl hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2"
            >
              <Play className="w-5 h-5" />
              <span>Generate Quiz</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizMaker;