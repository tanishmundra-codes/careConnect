import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Send, ArrowLeft, Bot, User, AlertTriangle, Phone, Calendar } from 'lucide-react';

const AIChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm your AI mental health companion. I'm here to listen and provide support. How are you feeling today?",
      timestamp: new Date(),
      suggestions: ['I feel anxious', 'I\'m stressed about exams', 'I feel lonely', 'I\'m having trouble sleeping']
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [riskLevel, setRiskLevel] = useState('low');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const crisisKeywords = ['suicide', 'kill myself', 'end it all', 'hurt myself', 'die', 'hopeless'];
  const highRiskKeywords = ['depressed', 'panic', 'can\'t cope', 'overwhelmed', 'breakdown'];

  const assessRiskLevel = (message) => {
    const lowerMessage = message.toLowerCase();
    if (crisisKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return 'crisis';
    }
    if (highRiskKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return 'high';
    }
    return 'low';
  };

  const generateBotResponse = (userMessage) => {
    const risk = assessRiskLevel(userMessage);
    setRiskLevel(risk);

    if (risk === 'crisis') {
      return {
        content: "I'm very concerned about what you've shared. Your safety is the most important thing right now. Please reach out to a crisis counselor immediately. You don't have to go through this alone.",
        suggestions: [],
        actions: [
          { type: 'crisis', text: 'Call Crisis Hotline: 1-800-CRISIS', icon: Phone },
          { type: 'emergency', text: 'Schedule Emergency Session', icon: Calendar }
        ]
      };
    }

    if (risk === 'high') {
      return {
        content: "I can hear that you're going through a really difficult time. These feelings are valid, and it's important that you get proper support. Here are some immediate coping strategies, and I'd recommend speaking with a counselor.",
        suggestions: ['Tell me more about coping strategies', 'How can I book a counseling session?', 'What breathing exercises can help?'],
        actions: [
          { type: 'booking', text: 'Book Counseling Session', icon: Calendar }
        ]
      };
    }

    // Generate contextual responses based on keywords
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety')) {
      return {
        content: "Anxiety can feel overwhelming, but there are effective ways to manage it. Let's try a quick breathing exercise: breathe in for 4 counts, hold for 4, breathe out for 6. This activates your body's relaxation response.",
        suggestions: ['Try more breathing exercises', 'What causes my anxiety?', 'How can I manage anxiety long-term?', 'Tell me about mindfulness']
      };
    }

    if (lowerMessage.includes('stress') || lowerMessage.includes('exam')) {
      return {
        content: "Academic stress is very common. Breaking tasks into smaller, manageable pieces can help. Also, remember that your worth isn't defined by your grades. What specific aspect of your studies is causing the most stress?",
        suggestions: ['Time management tips', 'Study techniques for less stress', 'How to handle exam pressure', 'Dealing with perfectionism']
      };
    }

    if (lowerMessage.includes('lonely') || lowerMessage.includes('isolated')) {
      return {
        content: "Feeling lonely is a common human experience, especially in college. Connection is important for our wellbeing. Have you considered joining our peer support groups or campus activities?",
        suggestions: ['Tell me about peer support', 'How to make friends in college', 'Dealing with social anxiety', 'Campus activities for connection']
      };
    }

    if (lowerMessage.includes('sleep') || lowerMessage.includes('tired')) {
      return {
        content: "Sleep is crucial for mental health. Poor sleep can worsen anxiety and depression. Try establishing a consistent bedtime routine, avoiding screens before bed, and creating a calm sleep environment.",
        suggestions: ['Sleep hygiene tips', 'Relaxation techniques for sleep', 'What if I can\'t stop worrying at night?', 'Natural sleep aids']
      };
    }

    // Default supportive response
    return {
      content: "Thank you for sharing that with me. It takes courage to talk about how you're feeling. I'm here to support you. Can you tell me more about what's been on your mind lately?",
      suggestions: ['I need coping strategies', 'How can I feel better?', 'Tell me about mindfulness', 'I want to talk to someone']
    };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage);
      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        content: botResponse.content,
        timestamp: new Date(),
        suggestions: botResponse.suggestions || [],
        actions: botResponse.actions || []
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getRiskLevelColor = (level) => {
    switch (level) {
      case 'crisis': return 'bg-red-100 border-red-300 text-red-800';
      case 'high': return 'bg-orange-100 border-orange-300 text-orange-800';
      default: return 'bg-green-100 border-green-300 text-green-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <Link to="/student" className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">AI Mental Health Support</h1>
                  <p className="text-sm text-gray-600">Available 24/7 • Confidential & Secure</p>
                </div>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getRiskLevelColor(riskLevel)}`}>
              Risk Level: {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)}
            </div>
          </div>
        </div>
      </header>

      {/* Crisis Alert */}
      {riskLevel === 'crisis' && (
        <div className="bg-red-600 text-white p-4">
          <div className="max-w-4xl mx-auto flex items-center space-x-3">
            <AlertTriangle className="h-6 w-6" />
            <div>
              <p className="font-semibold">Crisis Support Available</p>
              <p className="text-sm">If you're in immediate danger, please call emergency services or the crisis hotline: 1-800-CRISIS</p>
            </div>
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex space-x-3 max-w-3xl ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === 'user' 
                    ? 'bg-blue-600' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-600'
                }`}>
                  {message.type === 'user' ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className="h-4 w-4 text-white" />
                  )}
                </div>
                <div className={`flex-1 ${message.type === 'user' ? 'text-right' : ''}`}>
                  <div className={`inline-block p-4 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white shadow-sm border border-gray-200'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  
                  {/* Action Buttons */}
                  {message.actions && message.actions.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {message.actions.map((action, index) => (
                        <button
                          key={index}
                          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                            action.type === 'crisis' 
                              ? 'bg-red-600 text-white hover:bg-red-700'
                              : action.type === 'emergency'
                              ? 'bg-orange-600 text-white hover:bg-orange-700'
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                        >
                          <action.icon className="h-4 w-4" />
                          <span>{action.text}</span>
                        </button>
                      ))}
                    </div>
                  )}
                  
                  {/* Suggestions */}
                  {message.suggestions && message.suggestions.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {message.suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex space-x-3 max-w-3xl">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-white shadow-sm border border-gray-200 rounded-2xl p-4">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex space-x-4">
            <div className="flex-1">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share what's on your mind... I'm here to listen and support you."
                className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="2"
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            This AI provides support but is not a replacement for professional help. In crisis situations, please contact emergency services.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIChat;