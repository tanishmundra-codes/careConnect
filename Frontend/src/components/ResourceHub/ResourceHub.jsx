import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Play, Download, BookOpen, Headphones, 
  Video, FileText, Search, Filter, Heart,
  Clock, Star, Eye, Volume2
} from 'lucide-react';
import ResourceViewer from './Resourceview'; 

const ResourceHub = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [viewingResource, setViewingResource] = useState(null);

  // Function to handle clicks on resource cards
  const handleResourceClick = (resource) => {
    // If the resource is an 'article' and has an 'articleUrl' property,
    // open it in a new browser tab.
    if (resource.type === 'article' && resource.articleUrl) {
      window.open(resource.articleUrl, '_blank', 'noopener,noreferrer');
    } 
    // Otherwise (for videos, audio, exercises, or articles with 'content'),
    // open the ResourceViewer modal.
    else {
      setViewingResource(resource);
    }
  };

  const categories = [
    { id: 'all', label: 'All Resources', icon: BookOpen },
    { id: 'videos', label: 'Videos', icon: Video },
    { id: 'articles', label: 'Articles', icon: FileText },
    { id: 'exercises', label: 'Exercises', icon: Heart }
  ];

  const languages = [
    { id: 'english', label: 'English' },
    { id: 'hindi', label: 'हिंदी (Hindi)' },
  ];

  const resources = [
    {
      id: 1,
      title: 'Understanding Depression',
      type: 'video',
      category: 'videos',
      duration: '7:18',
      language: 'english',
      rating: 4.8,
      views: 2847,
      description: 'Learn about depression symptoms, triggers, and effective coping strategies.',
      thumbnail: 'https://images.pexels.com/photos/236151/pexels-photo-236151.jpeg?auto=compress&cs=tinysrgb&w=600',
      videoUrl: 'https://www.youtube.com/embed/z-IR48Mb3W0', // Corrected to embed URL
      tags: ['depression', 'coping', 'mental health']
    },
    {
      id: 2,
      title: 'Trauma And Addiction',
      type: 'video',
      category: 'videos',
      duration: '15:00',
      language: 'english',
      rating: 4.9,
      views: 1923,
      description: 'Guided audio session to help you relax your body and mind through progressive muscle relaxation.',
      thumbnail: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=600',
      videoUrl: 'https://www.youtube.com/embed/343ORgL3kIc', // Corrected to embed URL
      tags: ['relaxation', 'stress relief', 'meditation']
    },
    {
      id: 3,
      title: 'Panic disorder',
      type: 'video',
      category: 'videos',
      duration: '8 min',
      language: 'english',
      rating: 4.7,
      views: 3421,
      description: 'Panic disorder - panic attacks, causes, symptoms, diagnosis, treatment & pathology',
      thumbnail: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=600',
      videoUrl: 'https://www.youtube.com/embed/YxELZyA2bJs', // Corrected to embed URL
      tags: ['academic stress', 'time management', 'productivity']
    },
    {
      id: 4,
      title: 'Dealing with Anxiety',
      type: 'video',
      category: 'videos',
      duration: '10:45',
      language: 'hindi',
      rating: 4.6,
      views: 1567,
      description: 'हिंदी में चिंता के लक्षणों को समझना और उससे निपटने के तरीके सीखना।',
      thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=600',
      videoUrl: 'https://www.youtube.com/embed/uRufJh56y0E', // Corrected to embed URL
      tags: ['चिंता', 'मानसिक स्वास्थ्य', 'तनाव']
    },
    {
      id: 5,
      title: 'Breathing Exercises for Panic Attacks',
      type: 'article', // This will now open in the modal with its 'content'
      category: 'exercises',
      duration: '5 min',
      language: 'english',
      rating: 4.9,
      views: 2156,
      description: 'Quick and effective breathing techniques to manage panic attacks and acute anxiety. Opens in modal.',
      thumbnail: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=600',
      content: `<h1>Box Breathing Technique</h1><p>This is a simple and powerful technique to calm your nervous system.</p><ol><li>Inhale for 4 seconds.</li><li>Hold your breath for 4 seconds.</li><li>Exhale for 4 seconds.</li><li>Hold for 4 seconds.</li></ol><p>Repeat for 1-2 minutes.</p>`,
      articleUrl:'https://www.lung.org/lung-health-diseases/wellness/breathing-exercises',
      tags: ['breathing', 'panic attacks', 'emergency techniques']
    },
    {
      id: 6,
      title: 'Sleep Hygiene (External Article)',
      type: 'article',
      category: 'articles',
      duration: '6 min read',
      language: 'english',
      rating: 4.8,
      views: 2834,
      description: 'How proper sleep habits can significantly improve your mental health and academic performance. Opens in a new tab.',
      thumbnail: 'https://images.pexels.com/photos/3771069/pexels-photo-3771069.jpeg?auto=compress&cs=tinysrgb&w=600',
      articleUrl: 'https://www.sleepfoundation.org/sleep-hygiene', // This article will open an external link
      tags: ['sleep', 'mental health', 'wellness']
    },
    {
      id: 7,
      title: 'Signs of Depression',
      type: 'video',
      category: 'videos',
      duration: '2 min',
      language: 'english',
      rating: 4.7,
      views: 1789,
      description: 'Recognizing signs of Depression in students.',
      thumbnail: 'https://images.pexels.com/photos/3760790/pexels-photo-3760790.jpeg?auto=compress&cs=tinysrgb&w=600',
      videoUrl: 'https://www.youtube.com/embed/S8ZJgDC5onE', // Corrected to embed URL (YouTube Short)
      tags: ['signs', 'depression', 'focus']
    },
    {
      id: 8,
      title: 'How Stress Affects Mind and Body',
      type: 'video',
      category: 'videos',
      duration: '5 min',
      language: 'english',
      rating: 4.8,
      views: 2234,
      description: 'Affects of stress on Mind and Body and your well being.',
      thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600',
      videoUrl: 'https://www.youtube.com/embed/CZTc8_FwHGM', // Corrected to embed URL
      tags: ['resilience', 'emotional health', 'personal growth']
    },
    {
      id: 9,
      title: 'Coping Mechanisms',
      type: 'article',
      category: 'articles',
      duration: '4 min read',
      language: 'english',
      rating: 4.5,
      views: 1200,
      description: 'Identifying Your Healthy Coping Mechanisms: Unhealthy Coping Skills | Self Care | TogetherWell',
      thumbnail: 'https://images.pexels.com/photos/4050302/pexels-photo-4050302.jpeg?auto=compress&cs=tinysrgb&w=600',
      content: `<h1>Introduction to Mindfulness</h1><p>Mindfulness is the practice of purposely bringing one's attention to experiences occurring in the present moment without judgment.</p><h2>How to Practice:</h2><p>Start with short, guided meditations. Pay attention to your breath, bodily sensations, and the sounds around you.</p><p>Regular practice can reduce stress, improve focus, and enhance overall well-being.</p>`,
      articleUrl:'https://www.togetherwell.org/videos/identifying-your-healthy-coping-mechanisms-unhealthy-coping-skills-self-care-togetherwell',
      tags: ['mindfulness', 'meditation', 'basics']
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
    <div className={`min-h-screen bg-gray-50 ${viewingResource ? 'overflow-hidden' : ''}`}>
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
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-6">
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

            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                      {/* Apply handleResourceClick to the video play button overlay as well */}
                      {(resource.type === 'video' || (resource.type === 'exercise' && resource.videoUrl)) && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button 
                            onClick={() => handleResourceClick(resource)}
                            className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-3 transition-all transform hover:scale-110"
                          >
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
                        {/* Main action button also uses handleResourceClick */}
                        <button 
                          onClick={() => handleResourceClick(resource)}
                          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                        >
                          {resource.type === 'video' || (resource.type === 'exercise' && resource.videoUrl) ? <Play className="h-4 w-4" /> : // If exercise has video, show play icon
                           resource.type === 'audio' ? <Volume2 className="h-4 w-4" /> : 
                           <Eye className="h-4 w-4" />}
                          <span>
                            {resource.type === 'video' || (resource.type === 'exercise' && resource.videoUrl) ? 'Watch' : // If exercise has video, show watch text
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
      
      {/* ResourceViewer Modal */}
      <ResourceViewer 
        resource={viewingResource} 
        onClose={() => setViewingResource(null)} 
      />
    </div>
  );
};

export default ResourceHub;