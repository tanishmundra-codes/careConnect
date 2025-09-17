import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '/Users/vivek/Desktop/project 3/Frontend/src/context/AuthContext.jsx';
import { 
  Brain, BarChart3, Users, TrendingUp, AlertTriangle,
  LogOut, Bell, Calendar, FileText, Settings,
  Download, Filter, Eye, UserCheck, Clock
} from 'lucide-react';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('overview');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const overviewStats = [
    { label: 'Total Students', value: '2,847', change: '+12%', icon: Users, color: 'text-blue-600' },
    { label: 'Active Cases', value: '156', change: '+8%', icon: FileText, color: 'text-green-600' },
    { label: 'Crisis Interventions', value: '23', change: '-15%', icon: AlertTriangle, color: 'text-red-600' },
    { label: 'Counselor Utilization', value: '78%', change: '+5%', icon: UserCheck, color: 'text-purple-600' }
  ];

  const mentalHealthTrends = [
    { condition: 'Anxiety Disorders', percentage: 45, trend: 'up', count: 1281 },
    { condition: 'Depression', percentage: 32, trend: 'up', count: 911 },
    { condition: 'Academic Stress', percentage: 67, trend: 'up', count: 1907 },
    { condition: 'Sleep Disorders', percentage: 28, trend: 'stable', count: 797 },
    { condition: 'Social Isolation', percentage: 21, trend: 'down', count: 598 }
  ];

  const riskLevels = [
    { level: 'Low Risk', count: 2156, percentage: 76, color: 'bg-green-500' },
    { level: 'Moderate Risk', count: 534, percentage: 19, color: 'bg-yellow-500' },
    { level: 'High Risk', count: 134, percentage: 4, color: 'bg-orange-500' },
    { level: 'Crisis', count: 23, percentage: 1, color: 'bg-red-500' }
  ];

  const recentAlerts = [
    {
      id: 1,
      type: 'crisis',
      message: 'Student flagged for immediate intervention',
      timestamp: '15 minutes ago',
      status: 'active'
    },
    {
      id: 2,
      type: 'trend',
      message: 'Anxiety cases increased 15% this week',
      timestamp: '2 hours ago',
      status: 'monitoring'
    },
    {
      id: 3,
      type: 'resource',
      message: 'Counselor capacity at 85% - consider expansion',
      timestamp: '4 hours ago',
      status: 'planning'
    }
  ];

  const utilizationData = [
    { service: 'AI Chat Support', usage: 89, sessions: 1247 },
    { service: 'Counseling Appointments', usage: 67, sessions: 423 },
    { service: 'Resource Library', usage: 78, sessions: 892 },
    { service: 'Peer Support Forums', usage: 45, sessions: 234 },
    { service: 'Mental Health Assessments', usage: 56, sessions: 678 }
  ];

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return '↗️';
      case 'down': return '↘️';
      case 'stable': return '➡️';
      default: return '➡️';
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'crisis': return 'bg-red-50 border-red-200 text-red-800';
      case 'trend': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'resource': return 'bg-blue-50 border-blue-200 text-blue-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
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
                <span className="text-gray-600">Admin Dashboard</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Bell className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  5
                </span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-600">System Administrator</p>
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
            Mental Health Analytics Dashboard
          </h1>
          <p className="text-gray-600">Comprehensive insights into student mental health trends and system utilization.</p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
          <div className="flex items-center space-x-4">
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>
            <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              <Download className="h-4 w-4" />
              <span>Export Report</span>
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-600" />
            <span className="text-sm text-gray-600">Filter by department, risk level, or condition</span>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {overviewStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className={`text-sm mt-1 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`p-3 rounded-lg bg-gray-50`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Critical Alerts */}
        {recentAlerts.some(alert => alert.type === 'crisis') && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-6 w-6 text-red-600 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-red-800 mb-4">Critical Alerts Requiring Immediate Attention</h3>
                <div className="space-y-3">
                  {recentAlerts.filter(alert => alert.type === 'crisis').map((alert) => (
                    <div key={alert.id} className="bg-white rounded-lg p-4 flex items-center justify-between">
                      <div>
                        <p className="text-red-800 font-medium">{alert.message}</p>
                        <p className="text-red-600 text-sm">{alert.timestamp}</p>
                      </div>
                      <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                        Take Action
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Analytics */}
          <div className="lg:col-span-2 space-y-8">
            {/* Mental Health Trends */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Mental Health Condition Trends</h3>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View Details</button>
              </div>
              <div className="space-y-4">
                {mentalHealthTrends.map((condition, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">{condition.condition}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl">{getTrendIcon(condition.trend)}</span>
                          <span className="text-sm text-gray-600">{condition.count} students</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${condition.percentage}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-500">0%</span>
                        <span className="text-xs text-gray-500">{condition.percentage}%</span>
                        <span className="text-xs text-gray-500">100%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Utilization */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Service Utilization</h3>
              <div className="space-y-4">
                {utilizationData.map((service, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-gray-900">{service.service}</span>
                        <span className="text-sm text-gray-600">{service.sessions} sessions</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${service.usage}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500">{service.usage}% utilization</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Risk Level Distribution */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Risk Level Distribution</h3>
              <div className="space-y-3">
                {riskLevels.map((risk, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${risk.color}`}></div>
                      <span className="text-sm font-medium text-gray-900">{risk.level}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-gray-900">{risk.count}</span>
                      <span className="text-xs text-gray-500 ml-1">({risk.percentage}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent System Alerts */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">System Alerts</h3>
              <div className="space-y-3">
                {recentAlerts.map((alert) => (
                  <div key={alert.id} className={`p-3 rounded-lg border ${getAlertColor(alert.type)}`}>
                    <p className="text-sm font-medium">{alert.message}</p>
                    <p className="text-xs mt-1 opacity-75">{alert.timestamp}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white p-3 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm">
                  Generate Monthly Report
                </button>
                <button className="w-full bg-green-600 text-white p-3 rounded-lg font-medium hover:bg-green-700 transition-colors text-sm">
                  Schedule System Maintenance
                </button>
                <button className="w-full bg-purple-600 text-white p-3 rounded-lg font-medium hover:bg-purple-700 transition-colors text-sm">
                  Configure Alerts
                </button>
                <button className="w-full bg-gray-600 text-white p-3 rounded-lg font-medium hover:bg-gray-700 transition-colors text-sm">
                  Manage User Permissions
                </button>
              </div>
            </div>

            {/* System Health */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">System Health</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Server Uptime</span>
                  <span className="text-sm font-medium text-green-600">99.9%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Database Performance</span>
                  <span className="text-sm font-medium text-green-600">Optimal</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">AI System Status</span>
                  <span className="text-sm font-medium text-green-600">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Security Alerts</span>
                  <span className="text-sm font-medium text-gray-600">None</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;