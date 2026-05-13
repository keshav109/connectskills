import React, { useState } from 'react';
import { Download, TrendingUp, Users, Briefcase, DollarSign, Eye, Clock, Star } from 'lucide-react';

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('last-30-days');

  // Mock data for analytics
  const stats = [
    { label: 'Total Users', value: '2,847', change: '+12%', icon: Users, color: 'bg-blue-500' },
    { label: 'Active Jobs', value: '156', change: '+8%', icon: Briefcase, color: 'bg-green-500' },
    { label: 'Total Revenue', value: '$45,230', change: '+15%', icon: DollarSign, color: 'bg-purple-500' },
    { label: 'Avg. Rating', value: '4.8', change: '+0.2', icon: Star, color: 'bg-yellow-500' }
  ];

  const recentActivity = [
    { action: 'New user registration', user: 'Rahul Dev', time: '2 minutes ago', type: 'user' },
    { action: 'Job completed', user: 'Keshav Raj', time: '15 minutes ago', type: 'job' },
    { action: 'Payment processed', user: 'Muzahid Hussain', time: '1 hour ago', type: 'payment' },
    { action: 'New job posted', user: 'Avinash Kumar Thakur', time: '2 hours ago', type: 'job' },
    { action: 'User verification', user: 'Himanshu Kumar', time: '3 hours ago', type: 'user' }
  ];

  const topCategories = [
    { name: 'Web Development', jobs: 45, percentage: 28 },
    { name: 'Graphic Design', jobs: 32, percentage: 20 },
    { name: 'Content Writing', jobs: 28, percentage: 18 },
    { name: 'Digital Marketing', jobs: 25, percentage: 16 },
    { name: 'Data Entry', jobs: 20, percentage: 12 },
    { name: 'Others', jobs: 10, percentage: 6 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="last-7-days">Last 7 Days</option>
          <option value="last-30-days">Last 30 Days</option>
          <option value="last-90-days">Last 90 Days</option>
          <option value="last-year">Last Year</option>
        </select>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Download size={16} />
          Export Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                  <TrendingUp size={14} />
                  {stat.change}
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="text-white" size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className={`p-2 rounded-full ${
                  activity.type === 'user' ? 'bg-blue-100 text-blue-600' :
                  activity.type === 'job' ? 'bg-green-100 text-green-600' :
                  'bg-purple-100 text-purple-600'
                }`}>
                  {activity.type === 'user' ? <Users size={16} /> :
                   activity.type === 'job' ? <Briefcase size={16} /> :
                   <DollarSign size={16} />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.user}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock size={12} />
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Categories */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Job Categories</h3>
          <div className="space-y-4">
            {topCategories.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">{category.name}</span>
                    <span className="text-sm text-gray-500">{category.jobs} jobs</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Chart Placeholder */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Performance Overview</h3>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Eye size={16} />
            Chart View
          </div>
        </div>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <TrendingUp size={48} className="text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Performance chart would be displayed here</p>
            <p className="text-sm text-gray-400">Integration with charting library needed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;