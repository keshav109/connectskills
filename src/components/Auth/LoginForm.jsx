import React, { useState } from 'react';
import { Mail, Lock, UserCheck, AlertCircle, Users, Briefcase, Star } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const success = await login(email, password, role);
      if (!success) {
        setError('Invalid credentials or user not found');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20" style={{ background: "#FF9E0B !important" }}></div>
        <div className="relative z-10 text-center max-w-lg">
          <div className="mb-8">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
              <Briefcase size={40} className="text-white" />
            </div>
            <h1 className="text-5xl font-bold mb-4">SkillConnect</h1>
            <p className="text-xl text-blue-100 mb-8">Connect with skilled professionals for all your service needs</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Users size={24} />
              </div>
              <div className="text-left">
                <h3 className="font-semibold">Trusted Community</h3>
                <p className="text-blue-100 text-sm">Join thousands of verified professionals</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Star size={24} />
              </div>
              <div className="text-left">
                <h3 className="font-semibold">Quality Assured</h3>
                <p className="text-blue-100 text-sm">Rated and reviewed by real customers</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Briefcase size={24} />
              </div>
              <div className="text-left">
                <h3 className="font-semibold">Secure Payments</h3>
                <p className="text-blue-100 text-sm">Safe and secure payment processing</p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-white bg-opacity-10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-purple-400 bg-opacity-20 rounded-full blur-lg"></div>
        <div className="absolute top-1/2 right-20 w-16 h-16 bg-blue-300 bg-opacity-20 rounded-full blur-md"></div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="lg:hidden mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase size={32} className="text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold text-blue-600 mb-2">SkillConnect</h1>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
              <AlertCircle size={16} />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Account Type
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'customer', label: 'Customer' },
                  { value: 'worker', label: 'Worker' },
                  { value: 'admin', label: 'Admin' }
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setRole(option.value)}
                    className={`py-3 px-4 text-sm font-medium rounded-lg border-2 transition-all duration-200 ${role === option.value
                      ? 'bg-blue-600 border-blue-600 text-white shadow-lg transform scale-105'
                      : 'bg-white border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50'
                      }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <UserCheck size={20} />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-100">
            <p className="text-sm font-medium text-gray-700 mb-3">Demo Accounts:</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-600">Customer:</span>
                <span className="text-blue-600">keshav@gmail.com</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-600">Worker:</span>
                <span className="text-blue-600">muzahid@gmail.com</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-600">Admin:</span>
                <span className="text-blue-600">ramvijay@gmail.com</span>
              </div>
              <div className="pt-2 border-t border-gray-200 mt-3">
                <p className="text-gray-500 text-xs">Password: any value</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;