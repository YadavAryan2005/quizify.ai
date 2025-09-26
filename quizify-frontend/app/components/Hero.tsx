import React from "react";
import { ArrowRight, Zap, Target, Clock } from "lucide-react";
import { useLogin } from "../context/LoginContext";


const Hero = () => {
  const {authRoute} =useLogin();
  return (
    <section
      id="home"
      className="pt-16 min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4 mr-2" />
              AI-Powered Quiz Generation
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Create Amazing
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent block">
                Quizzes Instantly
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Transform any topic into engaging quizzes with our AI-powered
              platform. Perfect for educators, students, and curious minds who
              love to learn.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button onClick={()=>authRoute("/Quiz")} className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2 font-semibold text-lg">
                  <span>Start Creating</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl hover:border-purple-300 hover:text-purple-600 transition-all duration-200 font-semibold text-lg">
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-1">
                  10K+
                </div>
                <div className="text-gray-600 text-sm">Quizzes Created</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  50K+
                </div>
                <div className="text-gray-600 text-sm">Happy Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-1">
                  99%
                </div>
                <div className="text-gray-600 text-sm">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Right Content - Interactive Preview */}
          <div className="relative">
            <div className="bg-white rounded-3xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Target className="w-6 h-6 text-purple-600" />
                  <span className="font-semibold text-gray-800">
                    JavaScript Quiz
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>5 min</span>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                What is the correct way to declare a variable in JavaScript?
              </h3>

              <div className="space-y-3">
                {[
                  "var x = 5;",
                  "variable x = 5;",
                  "v x = 5;",
                  "declare x = 5;",
                ].map((option, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      index === 0
                        ? "border-purple-300 bg-purple-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <span className="font-medium text-gray-700">{option}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-between items-center">
                <div className="text-sm text-gray-500">Question 1 of 10</div>
                <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="w-3 h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-pink-400 rounded-full opacity-20 animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
