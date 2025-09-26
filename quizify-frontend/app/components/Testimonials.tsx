import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'High School Teacher',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      content: 'Quizify.ai has revolutionized how I create assessments. What used to take hours now takes minutes, and my students love the interactive format!',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Corporate Trainer',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      content: 'The AI-generated questions are surprisingly accurate and relevant. It\'s become an essential tool for our employee training programs.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'University Student',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      content: 'I use Quizify.ai to test my knowledge before exams. The detailed explanations help me understand concepts I missed in class.',
      rating: 5
    },
    {
      name: 'David Thompson',
      role: 'Learning Specialist',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      content: 'The variety of question types and the ability to customize difficulty makes this perfect for differentiated learning approaches.',
      rating: 5
    },
    {
      name: 'Lisa Park',
      role: 'Homeschool Parent',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      content: 'As a homeschooling parent, this tool saves me so much time while ensuring my kids get quality educational content.',
      rating: 5
    },
    {
      name: 'James Wilson',
      role: 'Online Course Creator',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      content: 'The professional quality of the quizzes generated helps me create better course assessments that my students actually enjoy taking.',
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of educators, students, and professionals who trust Quizify.ai for their learning needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative group"
            >
              <Quote className="w-8 h-8 text-purple-300 mb-4 group-hover:text-purple-500 transition-colors duration-300" />
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                &quot;{testimonial.content}&quot;
              </p>
              
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <div className="flex items-center space-x-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              
              {/* Decorative element */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-white">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-purple-100">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1M+</div>
              <div className="text-purple-100">Quizzes Created</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10M+</div>
              <div className="text-purple-100">Questions Generated</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99%</div>
              <div className="text-purple-100">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;