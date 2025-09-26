import React from 'react';
import { Edit3, Cpu, Play, BarChart3 } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: Edit3,
      title: 'Enter Your Topic',
      description: 'Simply type in any subject or topic you want to create a quiz about.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Cpu,
      title: 'AI Generates Questions',
      description: 'Our advanced AI creates relevant, engaging questions tailored to your topic.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Play,
      title: 'Take the Quiz',
      description: 'Interactive quiz interface with progress tracking and immediate feedback.',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: BarChart3,
      title: 'Review Results',
      description: 'Get detailed results with explanations to enhance your learning experience.',
      color: 'from-pink-500 to-pink-600'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Creating engaging quizzes has never been easier. Follow these simple steps to get started.
          </p>
        </div>

        <div className="relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-200 via-blue-200 to-pink-200 transform -translate-y-1/2"></div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${step.color} rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                  
                  {/* Step Number */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-sm font-bold text-gray-700 z-20">
                    {index + 1}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors duration-300">
                  {step.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Demo Section */}
        <div className="mt-20 bg-white rounded-3xl shadow-xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                See It in Action
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                Watch how easy it is to create a professional quiz in under 30 seconds. 
                No technical skills required – just your creativity and curiosity.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Type your topic</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Choose question count</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Click generate</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Start learning!</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                    <div className="h-8 bg-gradient-to-r from-purple-200 to-blue-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full opacity-20 animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;