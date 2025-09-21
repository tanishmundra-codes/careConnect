import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Calendar, Clock, User, Phone, Video, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const BookingSystem = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedCounselor, setSelectedCounselor] = useState('');
  const [sessionType, setSessionType] = useState('in-person');
  const [reason, setReason] = useState('');
  const [urgency, setUrgency] = useState('routine');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [counselors, setCounselors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    const fetchCounselors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/counselors');
        setCounselors(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load counselors. Please try again.');
        setLoading(false);
      }
    };
    fetchCounselors();
  }, []);

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const reasons = [
    'Anxiety and stress management',
    'Depression and mood concerns',
    'Academic pressure and performance',
    'Relationship and social issues',
    'Sleep and lifestyle concerns',
    'Trauma and past experiences',
    'Identity and self-esteem',
    'Other (please specify)'
  ];

  const handleBooking = async (e) => {
    e.preventDefault();
    
    if (!user) {
        alert("You must be logged in to book a session.");
        return;
    }

    try {
      const response = await axios.post("/api/meetings", {
        studentId: user._id,
        counselorId: selectedCounselor,
        topic: reason,
        date: `${selectedDate} ${selectedTime}`,
        sessionType,
        urgency
      }, {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
      });
    
      console.log("Booking saved:", response.data);
      setShowConfirmation(true);
    } catch (error) {
      console.error("Error booking session:", error);
      alert("Failed to book session. Please try again.");
    }
  };

  const getUrgencyColor = (level) => {
    switch (level) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-300';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'routine': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  if (loading) {
    return <p className="text-center mt-8">Loading counselors...</p>;
  }

  if (error) {
    return <p className="text-center mt-8 text-red-500">{error}</p>;
  }

  if (showConfirmation) {
    const selectedCounselorData = counselors.find(c => c._id === selectedCounselor);
    
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking Confirmed!</h2>
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-3">Appointment Details:</h3>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Counselor:</span> {selectedCounselorData?.name}</p>
              <p><span className="font-medium">Date:</span> {selectedDate}</p>
              <p><span className="font-medium">Time:</span> {selectedTime}</p>
              <p><span className="font-medium">Type:</span> {sessionType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
              <p><span className="font-medium">Priority:</span> {urgency.charAt(0).toUpperCase() + urgency.slice(1)}</p>
            </div>
          </div>
          <p className="text-gray-600 mb-6">
            You'll receive a confirmation email shortly with session details and preparation materials.
          </p>
          <div className="space-y-3">
            <Link
              to="/student"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-block"
            >
              Return to Dashboard
            </Link>
            <button
              onClick={() => setShowConfirmation(false)}
              className="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Book Another Session
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <Link to="/student" className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Book Counseling Session</h1>
                <p className="text-sm text-gray-600">Schedule a confidential session with our licensed counselors</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-red-800">Need Immediate Help?</h3>
              <p className="text-sm text-red-700 mt-1">
                If you're experiencing a mental health crisis, please call our 24/7 crisis line: <strong>1-800-CRISIS</strong>
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleBooking} className="space-y-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">How urgent is your need for support?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { value: 'routine', label: 'Routine', desc: 'General support and maintenance' },
                { value: 'high', label: 'High Priority', desc: 'Significant distress or concern' },
                { value: 'urgent', label: 'Urgent', desc: 'Immediate support needed' }
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setUrgency(option.value)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    urgency === option.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`inline-block px-2 py-1 rounded text-xs font-medium mb-2 ${getUrgencyColor(option.value)}`}>
                    {option.label}
                  </div>
                  <p className="text-sm text-gray-600">{option.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Choose Your Counselor</h2>
            <div className="grid gap-4">
              {loading ? (
                <p>Loading counselors...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : counselors.length === 0 ? (
                <p>No counselors available at the moment.</p>
              ) : (
                counselors.map((counselor) => (
                  <button
                    key={counselor._id}
                    type="button"
                    onClick={() => setSelectedCounselor(counselor._id)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      selectedCounselor === counselor._id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <img
                        src={counselor.image}
                        alt={counselor.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{counselor.name}</h3>
                        <p className="text-sm text-blue-600 mb-1">{counselor.specialization}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>{counselor.experience} experience</span>
                          <span>⭐ {counselor.rating}</span>
                          <span className="text-green-600">{counselor.availability}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Session Type</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { value: 'in-person', label: 'In-Person', icon: User, desc: 'Face-to-face at campus counseling center' },
                { value: 'video-call', label: 'Video Call', icon: Video, desc: 'Secure video session from anywhere' },
                { value: 'phone-call', label: 'Phone Call', icon: Phone, desc: 'Voice-only session for privacy' }
              ].map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setSessionType(type.value)}
                  className={`p-4 rounded-lg border-2 text-center transition-all ${
                    sessionType === type.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <type.icon className="h-8 w-8 mx-auto mb-2 text-gray-600" />
                  <h3 className="font-medium text-gray-900 mb-1">{type.label}</h3>
                  <p className="text-xs text-gray-600">{type.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Date</h2>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Time</h2>
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`p-2 rounded-lg border text-sm transition-all ${
                      selectedTime === time
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">What would you like to discuss?</h2>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
              required
            >
              <option value="">Select a topic...</option>
              {reasons.map((reasonOption) => (
                <option key={reasonOption} value={reasonOption}>
                  {reasonOption}
                </option>
              ))}
            </select>
            <textarea
              placeholder="Optional: Share any additional details that might help your counselor prepare for the session..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="3"
            />
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <button
              type="submit"
              disabled={!selectedDate || !selectedTime || !selectedCounselor || !reason}
              className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Book Session
            </button>
            <p className="text-sm text-gray-600 mt-3 text-center">
              Your booking is confidential and secure. You can cancel or reschedule up to 24 hours before your session.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingSystem;