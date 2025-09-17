import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '/Users/vivek/Desktop/project 3/Frontend/src/context/AuthContext.jsx';
import { 
  Brain, Calendar, Users, FileText, MessageSquare, 
  LogOut, Bell, TrendingUp, Clock, AlertTriangle,
  CheckCircle, User, Phone, Video
} from 'lucide-react';

const CounselorDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('appointments');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const todayAppointments = [
    {
      id: 1,
      student: 'Anonymous Student #1247',
      time: '10:00 AM',
      type: 'Initial Consultation',
      status: 'confirmed',
      priority: 'medium',
      notes: 'First-time visit, anxiety concerns'
    },
    {
      id: 2,
      student: 'Anonymous Student #0892',
      time: '2:00 PM',
      type: 'Follow-up Session',
      status: 'confirmed',
      priority: 'high',
      notes: 'Depression screening follow-up'
    },
    {
      id: 3,
      student: 'Anonymous Student #1456',
      time: '4:00 PM',
      type: 'Crisis Intervention',
      status: 'urgent',
      priority: 'urgent',
      notes: 'Referred by AI chat system'
    }
  ];

  const pendingRequests = [
    {
      id: 1,
      student: 'Anonymous Student #2341',
      requestedTime: 'Tomorrow 3:00 PM',
      reason: 'Academic stress and anxiety',
      priority: 'medium',
      submitted: '2 hours ago'
    },
    {
      id: 2,
      student: 'Anonymous Student #1789',
      requestedTime: 'Friday 11:00 AM',
      reason: 'Relationship issues',
      priority: 'low',
      submitted: '5 hours ago'
    }
  ];

  const recentAlerts = [
    {
      id: 1,
      type: 'high-risk',
      message: 'Student #1456 flagged by AI system for crisis intervention',
      time: '30 minutes ago',
      action: 'Schedule immediate session'
    },
    {
      id: 2,
      type: 'assessment',
      message: 'Student #0892 completed PHQ-9 with concerning scores',
      time: '2 hours ago',
      action: 'Review assessment results'
    }
  ];

  const stats = [
    { label: 'Today\'s Sessions', value: '3', icon: Calendar, color: 'text-blue-600' },
    { label: 'Pending Requests', value: '7', icon: Clock, color: 'text-orange-600' },
    { label: 'Active Cases', value: '24', icon: Users, color: 'text-green-600' },
    { label: 'Crisis Alerts', value: '1', icon: AlertTriangle, color: 'text-red-600' }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
                <span className="text-gray-600">Counselor Dashboard</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Bell className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-600">Licensed Counselor</p>
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
            Good morning, Dr. {user?.name?.split(' ')[1]} 👋
          </h1>
          <p className="text-gray-600">You have 3 sessions scheduled today and 1 urgent alert requiring attention.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-gray-50`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Crisis Alerts */}
        {recentAlerts.some(alert => alert.type === 'high-risk') && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-6 w-6 text-red-600 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-red-800 mb-2">Crisis Alert</h3>
                {recentAlerts.filter(alert => alert.type === 'high-risk').map((alert) => (
                  <div key={alert.id} className="bg-white rounded-lg p-4 mb-2">
                    <p className="text-red-800 font-medium">{alert.message}</p>
                    <p className="text-red-600 text-sm mt-1">{alert.time}</p>
                    <button className="mt-2 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                      {alert.action}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tab Navigation */}
            <div className="bg-white rounded-xl shadow-sm mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'appointments', label: 'Today\'s Appointments', icon: Calendar },
                    { id: 'requests', label: 'Pending Requests', icon: Clock },
                    { id: 'cases', label: 'Active Cases', icon: FileText }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedTab(tab.id)}
                      className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                        selectedTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <tab.icon className="h-4 w-4" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {selectedTab === 'appointments' && (
                  <div className="space-y-4">
                    {todayAppointments.map((appointment) => (
                      <div key={appointment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-semibold text-gray-900">{appointment.student}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(appointment.priority)}`}>
                                {appointment.priority}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                                {appointment.status}
                              </span>
                            </div>
                            <p className="text-gray-600 text-sm mb-2">{appointment.type} • {appointment.time}</p>
                            <p className="text-gray-700 text-sm">{appointment.notes}</p>
                          </div>
                          <div className="flex space-x-2">
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              <Video className="h-4 w-4" />
                            </button>
                            <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                              <Phone className="h-4 w-4" />
                            </button>
                            <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                              <MessageSquare className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {selectedTab === 'requests' && (
                  <div className="space-y-4">
                    {pendingRequests.map((request) => (
                      <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-semibold text-gray-900">{request.student}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                                {request.priority}
                              </span>
                            </div>
                            <p className="text-gray-600 text-sm mb-2">Requested: {request.requestedTime}</p>
                            <p className="text-gray-700 text-sm mb-2">{request.reason}</p>
                            <p className="text-gray-500 text-xs">Submitted {request.submitted}</p>
                          </div>
                          <div className="flex space-x-2">
                            <button className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                              Approve
                            </button>
                            <button className="bg-gray-600 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors">
                              Reschedule
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {selectedTab === 'cases' && (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Active cases management coming soon...</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white p-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Emergency Session
                </button>
                <button className="w-full bg-green-600 text-white p-3 rounded-lg font-medium hover:bg-green-700 transition-colors">
                  Block Time Slot
                </button>
                <button className="w-full bg-purple-600 text-white p-3 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                  View Resources
                </button>
              </div>
            </div>

            {/* Recent Alerts */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Recent Alerts</h3>
              <div className="space-y-3">
                {recentAlerts.map((alert) => (
                  <div key={alert.id} className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-900 font-medium">{alert.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Today's Schedule */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Today's Schedule</h3>
              <div className="space-y-3">
                {todayAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{appointment.time}</p>
                      <p className="text-xs text-gray-600">{appointment.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounselorDashboard;