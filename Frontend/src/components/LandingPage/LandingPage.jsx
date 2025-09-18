import React from 'react';
import { Brain, Users, Shield, MessageCircle, Calendar, BookOpen, BarChart3, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from "react-router-dom";

const LandingPage = () => {
  const features = [
    {
      icon: MessageCircle,
      title: 'AI-Guided First Aid Support',
      description: 'Interactive chatbot offering immediate coping strategies and professional referrals when needed.',
      color: 'bg-blue-500'
    },
    {
      icon: Calendar,
      title: 'Confidential Booking System',
      description: 'Secure appointment scheduling with on-campus counselors and mental health helplines.',
      color: 'bg-green-500'
    },
    {
      icon: BookOpen,
      title: 'Psychoeducational Resources',
      description: 'Videos, audio guides, and wellness materials available in regional languages.',
      color: 'bg-purple-500'
    },
    {
      icon: Users,
      title: 'Peer Support Platform',
      description: 'Moderated peer-to-peer support forums with trained student volunteers.',
      color: 'bg-orange-500'
    },
    {
      icon: BarChart3,
      title: 'Admin Analytics Dashboard',
      description: 'Anonymous data insights for authorities to recognize trends and plan interventions.',
      color: 'bg-red-500'
    },
    {
      icon: Shield,
      title: 'Complete Privacy & Security',
      description: 'End-to-end encryption and anonymous data handling to ensure student confidentiality.',
      color: 'bg-indigo-500'
    }
  ];

  const stats = [
    { number: '70%', label: 'of students report high stress levels' },
    { number: '40%', label: 'experience anxiety disorders' },
    { number: '25%', label: 'show signs of depression' },
    { number: '60%', label: 'never seek professional help' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  CareConnect
                </h1>
                <p className="text-sm text-gray-600">Digital Mental Health Platform</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Link
                to="/login"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Mental Health Support
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Reimagined for Students
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              A comprehensive digital platform providing stigma-free psychological intervention, 
              early detection tools, and culturally-aware mental health support for college students.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-blue-500 hover:text-blue-600 transition-all duration-200"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">The Mental Health Crisis in Higher Education</h2>
            <p className="text-lg text-gray-600">Understanding the scope of the problem we're addressing</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Comprehensive Mental Health Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform addresses every aspect of student mental health with culturally-aware, 
              technology-driven interventions.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className={`${feature.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose CareConnect?</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Unlike generic mental health apps, we provide culturally-aware, institution-specific solutions.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              'Regional language support',
              'Institution-specific customization',
              'Offline support integration',
              'Real-time analytics for administrators',
              'Stigma-free anonymous access',
              'Evidence-based interventions'
            ].map((benefit, index) => (
              <div key={index} className="flex items-center text-white">
                <CheckCircle className="h-6 w-6 mr-3 text-green-300" />
                <span className="text-lg">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Mental Health Support?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of students, counselors, and administrators already using CareConnect.
          </p>
          
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">CareConnect</span>
              </div>
              <p className="text-gray-400">
                Empowering students with accessible, culturally-aware mental health support.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li>For Students</li>
                <li>For Counselors</li>
                <li>For Administrators</li>
                <li>Resources</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Contact Us</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Emergency</h3>
              <p className="text-gray-400 mb-2">Crisis Helpline:</p>
              <p className="text-white font-semibold">1-800-CRISIS</p>
              <p className="text-sm text-gray-400 mt-2">Available 24/7</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CareConnect. All rights reserved. Built for student wellbeing.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
