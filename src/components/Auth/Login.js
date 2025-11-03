import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { GraduationCap, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = login(email, password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  const quickLogin = (userEmail, userPassword) => {
    setEmail(userEmail);
    setPassword(userPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg p-4">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8">
        {/* Left Side - Branding */}
        <div className="text-white flex flex-col justify-center space-y-6">
          <div className="flex items-center space-x-3">
            <GraduationCap size={48} />
            <h1 className="text-5xl font-bold">EduLeague</h1>
          </div>
          <p className="text-xl opacity-90">
            Comprehensive Learning Platform for KL University B.Tech Students
          </p>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                💻
              </div>
              <div>
                <h3 className="font-semibold">Coding Practice Hub</h3>
                <p className="text-sm opacity-80">50+ problems with collaborative rooms</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                📚
              </div>
              <div>
                <h3 className="font-semibold">5 Skill Tracks</h3>
                <p className="text-sm opacity-80">DSA, CP, SQL, Frontend, Backend</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                🏆
              </div>
              <div>
                <h3 className="font-semibold">Gamification & Leaderboards</h3>
                <p className="text-sm opacity-80">Earn XP, badges, and compete</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Welcome Back!</h2>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="your.email@kluniversity.in"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 text-lg disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-6">
            <p className="text-sm text-gray-600 mb-3">Quick Login (Demo):</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => quickLogin('karthikeya@kluniversity.in', 'password123')}
                className="px-3 py-2 text-sm border-2 border-yellow-400 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition font-semibold"
              >
                🏆 Student: Karthikeya
              </button>
              <button
                onClick={() => quickLogin('vasi@kluniversity.in', 'password123')}
                className="px-3 py-2 text-sm border border-purple-300 rounded-lg hover:bg-purple-50 transition"
              >
                Student: Vasi
              </button>
              <button
                onClick={() => quickLogin('sahith@kluniversity.in', 'password123')}
                className="px-3 py-2 text-sm border border-purple-300 rounded-lg hover:bg-purple-50 transition"
              >
                Student: Sahith
              </button>
              <button
                onClick={() => quickLogin('rajesh.kumar@kluniversity.in', 'teacher123')}
                className="px-3 py-2 text-sm border border-green-300 rounded-lg hover:bg-green-50 transition"
              >
                Teacher: Dr. Rajesh Kumar
              </button>
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>© 2024 EduLeague - KL University</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
