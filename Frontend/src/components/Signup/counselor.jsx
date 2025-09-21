import React, { useState } from "react";
import {
  Brain, Lock, Eye, EyeOff, Mail, Phone, Calendar, Building, User, Info, Briefcase
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const CounselorSignupPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    dateOfBirth: "",
    institution: "",
    password: "",
    confirmPassword: "",
    role: "counselor",
    name: "",
    specialization: "",
    experience: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    if (!formData.specialization.trim()) newErrors.specialization = "Specialization is required";
    if (!formData.experience.trim()) newErrors.experience = "Experience is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
    if (!formData.institution.trim()) newErrors.institution = "Institution is required";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    const postBody = {
      email: formData.email,
      phone: formData.phone,
      dateOfBirth: formData.dateOfBirth,
      institution: formData.institution,
      password: formData.password,
      role: formData.role,
      name: formData.name,
      specialization: formData.specialization,
      experience: formData.experience,
    };

    try {
      const res = await axios.post("/api/auth/counselor-signup", postBody);

      if (res.status !== 201) {
        throw new Error(res.data.message || "Signup failed");
      }

      alert(`✅ Counselor account created for ${res.data.email}`);
      navigate("/login");
    } catch (err) {
      alert(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center space-x-3 mb-6"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CareConnect
            </span>
          </button>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Counselor Signup
          </h2>
          <p className="text-gray-600">
            Create your professional profile to join our team
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Counselor Specific Fields */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.name ? "border-red-500" : "border-gray-300"}`} placeholder="e.g., Dr. Jane Doe" />
              </div>
              {errors.name && (<p className="mt-1 text-sm text-red-600">{errors.name}</p>)}
            </div>

            <div>
              <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
              <div className="relative">
                <Info className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input id="specialization" name="specialization" type="text" value={formData.specialization} onChange={handleChange} className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.specialization ? "border-red-500" : "border-gray-300"}`} placeholder="e.g., Anxiety & Stress" />
              </div>
              {errors.specialization && (<p className="mt-1 text-sm text-red-600">{errors.specialization}</p>)}
            </div>

            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input id="experience" name="experience" type="text" value={formData.experience} onChange={handleChange} className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.experience ? "border-red-500" : "border-gray-300"}`} placeholder="e.g., 5 years" />
              </div>
              {errors.experience && (<p className="mt-1 text-sm text-red-600">{errors.experience}</p>)}
            </div>
            
            {/* General User Fields */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.email ? "border-red-500" : "border-gray-300"}`} placeholder="Enter your email" />
              </div>
              {errors.email && (<p className="mt-1 text-sm text-red-600">{errors.email}</p>)}
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.phone ? "border-red-500" : "border-gray-300"}`} placeholder="Enter your phone number" />
              </div>
              {errors.phone && (<p className="mt-1 text-sm text-red-600">{errors.phone}</p>)}
            </div>

            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input id="dateOfBirth" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.dateOfBirth ? "border-red-500" : "border-gray-300"}`} />
              </div>
              {errors.dateOfBirth && (<p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>)}
            </div>

            <div>
              <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-2">Institution/Organization</label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input id="institution" name="institution" type="text" value={formData.institution} onChange={handleChange} className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.institution ? "border-red-500" : "border-gray-300"}`} placeholder="Enter your institution" />
              </div>
              {errors.institution && (<p className="mt-1 text-sm text-red-600">{errors.institution}</p>)}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input id="password" name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.password ? "border-red-500" : "border-gray-300"}`} placeholder="Create a password" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (<p className="mt-1 text-sm text-red-600">{errors.password}</p>)}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? "text" : "password"} value={formData.confirmPassword} onChange={handleChange} className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.confirmPassword ? "border-red-500" : "border-gray-300"}`} placeholder="Confirm your password" />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  {showConfirmPassword ? (<EyeOff className="h-5 w-5" />) : (<Eye className="h-5 w-5" />)}
                </button>
              </div>
              {errors.confirmPassword && (<p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>)}
            </div>

            <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50">
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-blue-600 hover:text-blue-800 font-medium underline"
              >
                Sign In
              </button>
            </p>
            <button onClick={() => navigate("/")} className="text-sm text-gray-600 hover:text-blue-600">
              ← Back to Home
            </button>
          </div>
        </div>

        <div className="text-center bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-800 font-medium">In Crisis? Need Immediate Help?</p>
          <p className="text-lg font-bold text-red-900">Call 1-800-CRISIS (24/7)</p>
        </div>
      </div>
    </div>
  );
};

export default CounselorSignupPage;