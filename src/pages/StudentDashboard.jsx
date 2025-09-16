import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Brain, MessageCircle, Calendar, BookOpen, Users, 
  ClipboardList, LogOut, Bell, Heart, TrendingUp,
  Activity, Shield, Phone
} from 'lucide-react';

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [moodToday, setMoodToday] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const quickActions = [
    {
      title: 'AI Chat Support',
      description: 'Get immediate help and coping strategies',
      icon: MessageCircle,
      link: '/ai-chat',
      color: 'bg-blue-500',
      urgent: false
    },
    {
      title: 'Book Counseling',
      description: 'Schedule appointment with counselor',
      icon: Calendar,
      link: '/booking',
      color: 'bg-green-500',
      urgent: false
    },
    {
      title: 'Mental Health Assessment',
      description: 'Take PHQ-9, GAD-7 screening',
      icon: ClipboardList,
      link: '/assessment',
      color: 'bg-purple-500',
      urgent: true
    },
    {
      title: 'Resource Library',
      description: 'Videos, guides, relaxation audio',
      icon: BookOpen,
      link: '/resources',
      color: 'bg-orange-500',
      urgent: false
    },
    {
      title: 'Peer Support',
      description: 'Connect with fellow students',
      icon: Users,
      link: '/peer-support',
      color: 'bg-pink-500',
      urgent: false
    }
  ];

  const moodOptions = [
    { emoji: '😊', label: 'Great', value: 5, color: 'text-green-500' },
    { emoji: '🙂', label: 'Good', value: 4, color: 'text-blue-500' },
    { emoji: '😐', label: 'Okay', value: 3, color: 'text-yellow-500' },
    { emoji: '😔', label: 'Low', value: 2, color: 'text-orange-500' },
    { emoji: '😢', label: 'Struggling', value: 1, color: 'text-red-500' }
  ];

  const recentActivity = [
    { action: 'Completed daily mood check', time: '2 hours ago', icon: Heart },
    { action: 'Watched relaxation video', time: '1 day ago', icon: BookOpen },
    { action: 'Joined peer support discussion', time: '2 days ago', icon: Users },
    { action: 'Scheduled counseling session', time: '3 days ago', icon: Calendar }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">CareConnect</span>
              </Link>
              <div className="hidden md:block">
                <span className="text-gray-600">Student Dashboard</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Bell className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  2
                </span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-600">Student</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p className="text-gray-600">How are you feeling today? Your mental health journey matters.</p>
        </div>

        {/* Emergency Banner */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Phone className="h-6 w-6 text-red-600" />
              <div>
                <p className="font-medium text-red-800">Need immediate help?</p>
                <p className="text-sm text-red-600">Crisis support available 24/7</p>
              </div>
            </div>
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors">
              Call 1-800-CRISIS
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Mood Check */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Daily Mood Check</h2>
              <p className="text-gray-600 mb-6">How are you feeling right now?</p>
              <div className="grid grid-cols-5 gap-4">
                {moodOptions.map((mood) => (
                  <button
                    key={mood.value}
                    onClick={() => setMoodToday(mood.value)}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      moodToday === mood.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-3xl mb-2">{mood.emoji}</div>
                    <div className={`text-sm font-medium ${mood.color}`}>{mood.label}</div>
                  </button>
                ))}
              </div>
              {moodToday && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-blue-800">
                    Thanks for sharing! {moodToday <= 2 && "Would you like to talk to someone or try some coping strategies?"}
                  </p>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    to={action.link}
                    className="relative p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 group"
                  >
                    {action.urgent && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        Recommended
                      </span>
                    )}
                    <div className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                      <action.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
                Your Progress
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Weekly Check-ins</span>
                    <span>4/7</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '57%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Resources Accessed</span>
                    <span>12</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Peer Interactions</span>
                    <span>8</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Activity className="h-5 w-5 mr-2 text-blue-500" />
                Recent Activity
              </h3>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="bg-gray-100 p-2 rounded-lg">
                      <activity.icon className="h-4 w-4 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Privacy Notice */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-800">Your Privacy</h4>
                  <p className="text-sm text-green-700 mt-1">
                    All your data is encrypted and anonymous. We prioritize your confidentiality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;