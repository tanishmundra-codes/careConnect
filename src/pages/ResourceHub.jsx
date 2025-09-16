import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Play, Download, BookOpen, Headphones, 
  Video, FileText, Search, Filter, Heart, Brain,
  Clock, Star, Eye, Volume2
} from 'lucide-react';

const ResourceHub = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('english');

  const categories = [
    { id: 'all', label: 'All Resources', icon: BookOpen },
    { id: 'videos', label: 'Videos', icon: Video },
    { id: 'audio', label: 'Audio Guides', icon: Headphones },
    { id: 'articles', label: 'Articles', icon: FileText },
    { id: 'exercises', label: 'Exercises', icon: Heart }
  ];

  const languages = [
    { id: 'english', label: 'English' },
    { id: 'hindi', label: 'हिंदी (Hindi)' },
    { id: 'tamil', label: 'தமிழ் (Tamil)' },
    { id: 'bengali', label: 'বাংলা (Bengali)' },
    { id: 'marathi', label: 'मराठी (Marathi)' }
  ];

  const resources = [
    {
      id: 1,
      title: 'Understanding Anxiety: A Student\'s Guide',
      type: 'video',
      category: 'videos',
      duration: '12:30',
      language: 'english',
      rating: 4.8,
      views: 2847,
      description: 'Learn about anxiety symptoms, triggers, and effective coping strategies specifically for college students.',
      thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      tags: ['anxiety', 'coping', 'mental health']
    },
    {
      id: 2,
      title: 'Progressive Muscle Relaxation',
      type: 'audio',
      category: 'audio',
      duration: '15:00',
      language: 'english',
      rating: 4.9,
      views: 1923,
      description: 'Guided audio session to help you relax your body and mind through progressive muscle relaxation.',
      thumbnail: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      tags: ['relaxation', 'stress relief', 'meditation']
    },
    {
      id: 3,
      title: 'Managing Academic Stress',
      type: 'article',
      category: 'articles',
      duration: '8 min read',
      language: 'english',
      rating: 4.7,
      views: 3421,
      description: 'Practical strategies for handling academic pressure, time management, and maintaining work-life balance.',
      thumbnail: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      tags: ['academic stress', 'time management', 'productivity']
    },
    {
      id: 4,
      title: 'चिंता से निपटना (Dealing with Anxiety)',
      type: 'video',
      category: 'videos',
      duration: '10:45',
      language: 'hindi',
      rating: 4.6,
      views: 1567,
      description: 'हिंदी में चिंता के लक्षणों को समझना और उससे निपटने के तरीके सीखना।',
      thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      tags: ['चिंता', 'मानसिक स्वास्थ्य', 'तनाव']
    },
    {
      id: 5,
      title: 'Breathing Exercises for Panic Attacks',
      type: 'exercise',
      category: 'exercises',
      duration: '5 min',
      language: 'english',
      rating: 4.9,
      views: 2156,
      description: 'Quick and effective breathing techniques to manage panic attacks and acute anxiety.',
      thumbnail: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      tags: ['breathing', 'panic attacks', 'emergency techniques']
    },
    {
      id: 6,
      title: 'Sleep Hygiene for Better Mental Health',
      type: 'article',
      category: 'articles',
      duration: '6 min read',
      language: 'english',
      rating: 4.8,
      views: 2834,
      description: 'How proper sleep habits can significantly improve your mental health and academic performance.',
      thumbnail: 'https://images.pexels.com/photos/3771069/pexels-photo-3771069.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      tags: ['sleep', 'mental health', 'wellness']
    },
    {
      id: 7,
      title: 'Mindfulness Meditation for Students',
      type: 'audio',
      category: 'audio',
      duration: '20:00',
      language: 'english',
      rating: 4.7,
      views: 1789,
      description: 'Guided mindfulness meditation designed specifically for busy college students.',
      thumbnail: 'https://images.pexels.com/photos/3760790/pexels-photo-3760790.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      tags: ['mindfulness', 'meditation', 'focus']
    },
    {
      id: 8,
      title: 'Building Resilience in College',
      type: 'video',
      category: 'videos',
      duration: '18:22',
      language: 'english',
      rating: 4.8,
      views: 2234,
      description: 'Learn how to build emotional resilience and bounce back from setbacks during your college years.',
      thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      tags: ['resilience', 'emotional health', 'personal growth']
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesLanguage = selectedLanguage === 'all' || resource.language === selectedLanguage;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesLanguage && matchesSearch;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video': return Video;
      case 'audio': return Headphones;
      case 'article': return FileText;
      case 'exercise': return Heart;
      default: return BookOpen;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'video': return 'bg-red-100 text-red-800';
      case 'audio': return 'bg-green-100 text-green-800';
      case 'article': return 'bg-blue-100 text-blue-800';
      case 'exercise': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
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
                <h1 className="text-xl font-bold text-gray-900">Resource Library</h1>
                <p className="text-sm text-gray-600">Mental health resources in multiple languages</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-6">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources, topics, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Language Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Languages</option>
                {languages.map((lang) => (
                  <option key={lang.id} value={lang.id}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <category.icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{category.label}</span>
                  </button>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">Library Stats</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Total Resources</span>
                    <span className="font-medium">{resources.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Languages</span>
                    <span className="font-medium">{languages.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Categories</span>
                    <span className="font-medium">{categories.length - 1}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Resources Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                {filteredResources.length} Resources Found
              </h2>
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Sort by Popularity</option>
                <option>Sort by Rating</option>
                <option>Sort by Duration</option>
                <option>Sort by Date Added</option>
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {filteredResources.map((resource) => {
                const TypeIcon = getTypeIcon(resource.type);
                
                return (
                  <div key={resource.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative">
                      <img
                        src={resource.thumbnail}
                        alt={resource.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(resource.type)}`}>
                          <TypeIcon className="h-3 w-3 mr-1" />
                          {resource.type}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs font-medium">
                        {resource.duration}
                      </div>
                      {resource.type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-3 transition-all transform hover:scale-110">
                            <Play className="h-6 w-6 text-blue-600 ml-1" />
                          </button>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 text-lg leading-tight">
                          {resource.title}
                        </h3>
                        <div className="flex items-center space-x-1 text-sm text-gray-500 ml-2">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span>{resource.rating}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {resource.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>{resource.views.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{resource.duration}</span>
                          </div>
                        </div>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {languages.find(l => l.id === resource.language)?.label}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {resource.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex space-x-2">
                        <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                          {resource.type === 'video' ? <Play className="h-4 w-4" /> : 
                           resource.type === 'audio' ? <Volume2 className="h-4 w-4" /> : 
                           <Eye className="h-4 w-4" />}
                          <span>
                            {resource.type === 'video' ? 'Watch' : 
                             resource.type === 'audio' ? 'Listen' : 'Read'}
                          </span>
                        </button>
                        <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                          <Download className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredResources.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
                <p className="text-gray-600">Try adjusting your search terms or filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceHub;