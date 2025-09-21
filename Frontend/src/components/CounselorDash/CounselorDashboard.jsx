import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import {
  Brain,
  Calendar,
  MessageSquare,
  LogOut,
  Bell,
  Clock,
  Video,
  Phone,
  CheckCircle,
  XCircle,
} from "lucide-react";

const CounselorDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("requests");
  
  const [pendingRequests, setPendingRequests] = useState([]);
  const [confirmedAppointments, setConfirmedAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ❗ Add a console log to check the user object and component render
  console.log("Counselor Dashboard rendered. User:", user);

  const fetchBookings = async () => {
    console.log("Attempting to fetch bookings...");
    if (!user || !user.token) {
      setError("You are not logged in.");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const res = await axios.get("/api/meetings/my", config);
      const data = res.data;

      setPendingRequests(data.filter((b) => b.status === "Pending"));
      setConfirmedAppointments(data.filter((b) => b.status === "Approved"));
      setLoading(false);
      console.log("Bookings fetched successfully:", data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError("Failed to fetch booking requests.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user]);

  const handleStatusUpdate = async (bookingId, status) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.put(`/api/meetings/status/${bookingId}`, { status }, config);
      alert(`Booking status updated to: ${status}`);
      fetchBookings();
    } catch (err) {
      console.error("Failed to update booking status:", err);
      alert("Failed to update status. Please try again.");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "urgent": return "bg-red-100 text-red-800 border-red-200";
      case "high": return "bg-orange-100 text-orange-800 border-orange-200";
      case "routine": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved": return "bg-green-100 text-green-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) return <p className="text-center mt-8 text-gray-500">Loading bookings...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">
                  CareConnect
                </span>
              </Link>
              <div className="hidden md:block">
                <span className="text-gray-600">Counselor Dashboard</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Bell className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {pendingRequests.length}
                </span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.name}
                  </p>
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Good morning, Dr. {user?.name?.split(" ")[1] || "Counselor"} 👋
          </h1>
          <p className="text-gray-600">
            You have {confirmedAppointments.length} confirmed sessions today.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: "appointments", label: "Confirmed Appointments", icon: Calendar },
                    { id: "requests", label: `Pending Requests (${pendingRequests.length})`, icon: Clock },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedTab(tab.id)}
                      className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                        selectedTab === tab.id
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      <tab.icon className="h-4 w-4" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {selectedTab === "appointments" && (
                  <div className="space-y-4">
                    {confirmedAppointments.length === 0 ? (
                      <p className="text-gray-500">No confirmed appointments today.</p>
                    ) : (
                      confirmedAppointments.map((appointment) => (
                        <div
                          key={appointment._id}
                          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="font-semibold text-gray-900">
                                  Student: {appointment.studentId?.email || 'N/A'}
                                </h3>
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                    appointment.status
                                  )}`}
                                >
                                  {appointment.status}
                                </span>
                              </div>
                              <p className="text-gray-600 text-sm mb-2">
                                {appointment.sessionType} • {new Date(appointment.date).toLocaleDateString()}
                              </p>
                              <p className="text-gray-700 text-sm">
                                {appointment.topic}
                              </p>
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
                      ))
                    )}
                  </div>
                )}

                {selectedTab === "requests" && (
                  <div className="space-y-4">
                    {pendingRequests.length === 0 ? (
                      <p className="text-gray-500">No pending requests at this time.</p>
                    ) : (
                      pendingRequests.map((request) => (
                        <div
                          key={request._id}
                          className="border border-gray-200 rounded-lg p-4"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="font-semibold text-gray-900">
                                  Student: {request.studentId?.email || 'N/A'}
                                </h3>
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                                    request.urgency
                                  )}`}
                                >
                                  {request.urgency}
                                </span>
                              </div>
                              <p className="text-gray-600 text-sm mb-2">
                                Requested: {new Date(request.date).toLocaleDateString()}
                              </p>
                              <p className="text-gray-700 text-sm mb-2">
                                {request.topic}
                              </p>
                            </div>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleStatusUpdate(request._id, "Approved")}
                                className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                              >
                                <CheckCircle className="h-4 w-4" /> Approve
                              </button>
                              <button
                                onClick={() => handleStatusUpdate(request._id, "Rejected")}
                                className="flex items-center space-x-1 px-3 py-1 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                              >
                                <XCircle className="h-4 w-4" /> Reject
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Recent Alerts</h3>
              <p className="text-gray-600 text-sm">No new alerts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounselorDashboard;