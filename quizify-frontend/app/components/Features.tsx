import React from 'react';
import { Brain, Zap, Target, Users, Clock, Trophy } from 'lucide-react';
import { useLogin } from '../context/LoginContext';

const Features: React.FC = () => {
  const {authRoute}=useLogin();
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Generation',
      description: 'Our advanced AI creates relevant, challenging questions on any topic you choose.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Zap,
      title: 'Instant Creation',
      description: 'Generate complete quizzes in seconds. No more hours of manual question writing.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Target,
      title: 'Customizable Difficulty',
      description: 'Choose the number of questions and difficulty level to match your needs.',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: Users,
      title: 'Perfect for Everyone',
      description: 'Ideal for teachers, students, trainers, and anyone who loves learning.',
      color: 'from-pink-500 to-pink-600'
    },
    {
      icon: Clock,
      title: 'Time Tracking',
      description: 'Built-in timer and progress tracking to keep learners engaged and motivated.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Trophy,
      title: 'Detailed Results',
      description: 'Comprehensive feedback with explanations to enhance the learning experience.',
      color: 'from-yellow-500 to-yellow-600'
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Better Learning</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to create, share, and track engaging quizzes that make learning fun and effective.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Learning?</h3>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of educators and learners who are already creating amazing quizzes with Quizify.ai
            </p>
            <button onClick={()=>authRoute("/Quiz")} className="bg-white text-purple-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 font-semibold text-lg">
              Start Your Free Trial
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;