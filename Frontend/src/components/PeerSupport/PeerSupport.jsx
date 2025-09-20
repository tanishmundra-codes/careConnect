import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
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
  const [discussions, setDiscussions] = useState([]);
  const [supportGroups, setSupportGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // New state variables for reply functionality
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [newReplyContent, setNewReplyContent] = useState('');

  const categories = [
    { id: 'general', label: 'General Support', color: 'bg-blue-100 text-blue-800' },
    { id: 'anxiety', label: 'Anxiety & Stress', color: 'bg-red-100 text-red-800' },
    { id: 'depression', label: 'Depression', color: 'bg-purple-100 text-purple-800' },
    { id: 'academic', label: 'Academic Pressure', color: 'bg-orange-100 text-orange-800' },
    { id: 'relationships', label: 'Relationships', color: 'bg-pink-100 text-pink-800' },
    { id: 'lifestyle', label: 'Lifestyle & Wellness', color: 'bg-green-100 text-green-800' }
  ];

  const fetchDiscussions = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/discussions');
      setDiscussions(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching discussions:', err);
      setError('Failed to load discussions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchSupportGroups = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/groups');
      setSupportGroups(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching support groups:', err);
      setError('Failed to load support groups. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedTab === 'discussions') {
      fetchDiscussions();
    } else {
      fetchSupportGroups();
    }
  }, [selectedTab]);

  const getCategoryColor = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.color : 'bg-gray-100 text-gray-800';
  };

  const handleNewPost = async () => {
    if (newPostTitle.trim() && newPostContent.trim()) {
      try {
        const newPost = {
          title: newPostTitle,
          content: newPostContent,
          category: selectedCategory,
        };
        await axios.post('http://localhost:5000/api/discussions', newPost);
        setShowNewPost(false);
        setNewPostTitle('');
        setNewPostContent('');
        fetchDiscussions();
      } catch (err) {
        console.error('Error creating new post:', err);
      }
    }
  };

  const handleLike = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/discussions/${id}/like`);
      fetchDiscussions();
    } catch (err) {
      console.error('Error liking discussion:', err);
    }
  };

  const handleReplyClick = (discussion) => {
    setSelectedDiscussion(discussion);
    setShowReplyModal(true);
  };

  const handleReplySubmission = async () => {
    if (newReplyContent.trim() && selectedDiscussion) {
      try {
        await axios.post(`http://localhost:5000/api/discussions/${selectedDiscussion._id}/replies`, {
          content: newReplyContent,
          author: 'Anonymous Student',
        });
        setShowReplyModal(false);
        setNewReplyContent('');
        setSelectedDiscussion(null);
        fetchDiscussions(); // Re-fetch to see the new reply
      } catch (err) {
        console.error('Error submitting reply:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
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

          <div className="p-6">
            {selectedTab === 'discussions' && (
              <div>
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

                {showReplyModal && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Reply to Discussion: "{selectedDiscussion?.title}"</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Your Reply</label>
                            <textarea
                              value={newReplyContent}
                              onChange={(e) => setNewReplyContent(e.target.value)}
                              placeholder="Share your thoughts or support."
                              rows="4"
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                            <p className="text-sm text-yellow-800">
                              <strong>Note:</strong> Your reply will be anonymous.
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-end space-x-3 mt-6">
                          <button
                            onClick={() => {
                              setShowReplyModal(false);
                              setNewReplyContent('');
                              setSelectedDiscussion(null);
                            }}
                            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleReplySubmission}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            Post Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  {discussions.map((discussion) => (
                    <div key={discussion._id} className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(discussion.category)}`}>
                              {categories.find(c => c.id === discussion.category)?.label}
                            </span>
                            <span className="text-sm text-gray-500">{new Date(discussion.createdAt).toLocaleDateString()}</span>
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

                          {/* Display Replies */}
                          {discussion.replies?.length > 0 && (
                            <div className="mt-4 border-t border-gray-200 pt-4">
                              <h4 className="font-semibold text-gray-800 mb-2">Replies:</h4>
                              {discussion.replies.map((reply, index) => (
                                <div key={index} className="bg-gray-100 p-3 rounded-lg text-sm text-gray-800 mb-2">
                                  <p>{reply.content}</p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    - {reply.author} on {new Date(reply.createdAt).toLocaleDateString()}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <MessageSquare className="h-4 w-4" />
                            <span>{discussion.replies?.length || 0} replies</span>
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
                          <button
                            onClick={() => handleLike(discussion._id)}
                            className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            <Heart className="h-4 w-4" />
                            <span className="text-sm">Support</span>
                          </button>
                          <button
                            onClick={() => handleReplyClick(discussion)}
                            className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 transition-colors"
                          >
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
                    <div key={group._id} className="bg-gray-50 rounded-lg p-6">
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