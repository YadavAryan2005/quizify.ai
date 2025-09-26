"use client"
import React, { useState } from 'react';
import { Brain, Menu, X, Sparkles } from 'lucide-react';
import { useLogin } from '../context/LoginContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {authRoute}=useLogin();
  

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Brain className="w-8 h-8 text-purple-600" />
              <Sparkles className="w-4 h-4 text-yellow-500 absolute -top-1 -right-1" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Quizify.ai
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200">
              Home
            </a>
            <a href="#features" className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200">
              How it Works
            </a>
            <a href="#testimonials" className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200">
              Testimonials
            </a>
            <button onClick={()=>authRoute("/Quiz")} className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105">
              Get Started
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-purple-600 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200/50">
            <div className="flex flex-col space-y-4">
              <a href="#home" className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200">
                Home
              </a>
              <a href="#features" className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200">
                How it Works
              </a>
              <a href="#testimonials" className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200">
                Testimonials
              </a>
              <button onClick={()=>authRoute("/Quiz")} className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-200 w-full">
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;