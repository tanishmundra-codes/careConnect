import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Users, MessageCircle, Plus, Heart, 
  Clock, Eye, MessageSquare, ThumbsUp, Shield,
  Search, Filter, User, Send, MoreVertical
} from 'lucide-react';

const PeerSupport = () => {
  const [selectedTab, setSelectedTab] = useState('discussions');
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('general');

  const categories = [
    { id: 'general', label: 'General Support', color: 'bg-blue-100 text-blue-800' },
    { id: 'anxiety', label: 'Anxiety & Stress', color: 'bg-red-100 text-red-800' },
    { id: 'depression', label: 'Depression', color: 'bg-purple-100 text-purple-800' },
    { id: 'academic', label: 'Academic Pressure', color: 'bg-orange-100 text-orange-800' },
    { id: 'relationships', label: 'Relationships', color: 'bg-pink-100 text-pink-800' },
    { id: 'lifestyle', label: 'Lifestyle & Wellness', color: 'bg-green-100 text-green-800' }
  ];

  const discussions = [
    {
      id: 1,
      title: 'Dealing with exam anxiety - what works for you?',
      author: 'Anonymous Student',
      category: 'anxiety',
      content: 'I\'ve been struggling with severe anxiety before exams. My heart races, I can\'t sleep, and I feel like I\'m going to fail even when I\'ve studied. Has anyone found techniques that actually help?',
      timestamp: '2 hours ago',
      replies: 12,
      likes: 8,
      views: 45,
      isAnonymous: true,
      tags: ['exam anxiety', 'coping strategies', 'stress management']
    },
    {
      id: 2,
      title: 'Feeling isolated in college - anyone else?',
      author: 'Anonymous Student',
      category: 'general',
      content: 'I\'m in my second year but still feel like I don\'t belong here. Everyone seems to have their friend groups already formed. It\'s affecting my motivation to attend classes.',
      timestamp: '5 hours ago',
      replies: 18,
      likes: 15,
      views: 67,
      isAnonymous: true,
      tags: ['loneliness', 'social connection', 'college life']
    },
    {
      id: 3,
      title: 'Healthy study habits that changed my life',
      author: 'Anonymous Student',
      category: 'academic',
      content: 'After struggling for months, I finally found a study routine that works. Sharing what helped me in case it helps others dealing with academic stress.',
      timestamp: '1 day ago',
      replies: 24,
      likes: 32,
      views: 89,
      isAnonymous: true,
      tags: ['study tips', 'productivity', 'success story']
    },
    {
      id: 4,
      title: 'Managing depression while keeping up with coursework',
      author: 'Anonymous Student',
      category: 'depression',
      content: 'Some days I can barely get out of bed, but I still need to attend classes and submit assignments. How do you balance mental health recovery with academic responsibilities?',
      timestamp: '1 day ago',
      replies: 16,
      likes: 22,
      views: 78,
      isAnonymous: true,
      tags: ['depression', 'academic balance', 'self care']
    }
  ];

  const supportGroups = [
    {
      id: 1,
      name: 'Anxiety Support Circle',
      description: 'A safe space to share experiences and coping strategies for anxiety',
      members: 45,
      category: 'anxiety',
      moderator: 'Trained Peer Volunteer',
      meetingTime: 'Wednesdays 7:00 PM',
      isActive: true
    },
    {
      id: 2,
      name: 'Academic Stress Management',
      description: 'Tips and support for managing academic pressure and perfectionism',
      members: 38,
      category: 'academic',
      moderator: 'Trained Peer Volunteer',
      meetingTime: 'Fridays 6:00 PM',
      isActive: true
    },
    {
      id: 3,
      name: 'Mindfulness & Wellness',
      description: 'Exploring mindfulness practices and healthy lifestyle habits together',
      members: 29,
      category: 'lifestyle',
      moderator: 'Trained Peer Volunteer',
      meetingTime: 'Sundays 5:00 PM',
      isActive: true
    }
  ];

  const getCategoryColor = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.color : 'bg-gray-100 text-gray-800';
  };

  const handleNewPost = () => {
    if (newPostTitle.trim() && newPostContent.trim()) {
      // In a real app, this would submit to the backend
      setShowNewPost(false);
      setNewPostTitle('');
      setNewPostContent('');
      // Show success message
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <Link to="/student" className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Peer Support Community</h1>
                <p className="text-sm text-gray-600">Connect with fellow students in a safe, moderated environment</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Community Guidelines Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-800">Community Guidelines</h3>
              <p className="text-sm text-blue-700 mt-1">
                This is a safe, anonymous space moderated by trained peer volunteers. Be respectful, supportive, and remember that everyone's experience is valid.
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'discussions', label: 'Discussions', icon: MessageCircle },
                { id: 'groups', label: 'Support Groups', icon: Users }
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

          {/* Tab Content */}
          <div className="p-6">
            {selectedTab === 'discussions' && (
              <div>
                {/* Discussion Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search discussions..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">All Categories</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={() => setShowNewPost(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>New Discussion</span>
                  </button>
                </div>

                {/* New Post Modal */}
                {showNewPost && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Start a New Discussion</h3>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                            <select
                              value={selectedCategory}
                              onChange={(e) => setSelectedCategory(e.target.value)}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                  {category.label}
                                </option>
                              ))}
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                            <input
                              type="text"
                              value={newPostTitle}
                              onChange={(e) => setNewPostTitle(e.target.value)}
                              placeholder="What would you like to discuss?"
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
                            <textarea
                              value={newPostContent}
                              onChange={(e) => setNewPostContent(e.target.value)}
                              placeholder="Share your thoughts, experiences, or questions. Remember, this is a safe and supportive space."
                              rows="6"
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                            <p className="text-sm text-yellow-800">
                              <strong>Note:</strong> Your post will be anonymous. All discussions are moderated by trained peer volunteers to ensure a safe environment.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex justify-end space-x-3 mt-6">
                          <button
                            onClick={() => setShowNewPost(false)}
                            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleNewPost}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            Post Discussion
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Discussions List */}
                <div className="space-y-4">
                  {discussions.map((discussion) => (
                    <div key={discussion.id} className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(discussion.category)}`}>
                              {categories.find(c => c.id === discussion.category)?.label}
                            </span>
                            <span className="text-sm text-gray-500">{discussion.timestamp}</span>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{discussion.title}</h3>
                          <p className="text-gray-700 mb-3">{discussion.content}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-3">
                            {discussion.tags.map((tag, index) => (
                              <span key={index} className="text-xs bg-white text-gray-600 px-2 py-1 rounded border">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <MessageSquare className="h-4 w-4" />
                            <span>{discussion.replies} replies</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{discussion.likes} helpful</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>{discussion.views} views</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors">
                            <Heart className="h-4 w-4" />
                            <span className="text-sm">Support</span>
                          </button>
                          <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 transition-colors">
                            <MessageCircle className="h-4 w-4" />
                            <span className="text-sm">Reply</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'groups' && (
              <div>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Support Groups</h3>
                  <p className="text-gray-600">Join moderated support groups for ongoing peer connection and guidance.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {supportGroups.map((group) => (
                    <div key={group.id} className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-2">{group.name}</h4>
                          <p className="text-gray-700 text-sm mb-3">{group.description}</p>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(group.category)}`}>
                            {categories.find(c => c.id === group.category)?.label}
                          </span>
                        </div>
                        <div className={`w-3 h-3 rounded-full ${group.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                      </div>
                      
                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4" />
                          <span>{group.members} members</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4" />
                          <span>Moderated by {group.moderator}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>{group.meetingTime}</span>
                        </div>
                      </div>
                      
                      <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                        Join Group
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeerSupport;