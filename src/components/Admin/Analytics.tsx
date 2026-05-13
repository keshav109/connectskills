import React, { useState } from 'react';
import { TrendingUp, Users, Briefcase, IndianRupee, Calendar, Download, BarChart3 } from 'lucide-react';

const Analytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('last-30-days');

  const metrics = [
    { label: 'Total Revenue', value: '₹45,230', change: '+23%', trend: 'up', icon: IndianRupee },
    { label: 'Active Users', value: '2,847', change: '+12%', trend: 'up', icon: Users },
    { label: 'Jobs Completed', value: '1,234', change: '+8%', trend: 'up', icon: Briefcase },
    { label: 'Platform Fee', value: '₹4,523', change: '+15%', trend: 'up', icon: TrendingUp }
  ];

  const chartData = [
    { month: 'Jan', revenue: 28000, users: 2100, jobs: 890 },
    { month: 'Feb', revenue: 32000, users: 2300, jobs: 1020 },
    { month: 'Mar', revenue: 35000, users: 2500, jobs: 1150 },
    { month: 'Apr', revenue: 38000, users: 2650, jobs: 1280 },
    { month: 'May', revenue: 42000, users: 2750, jobs: 1350 },
    { month: 'Jun', revenue: 45230, users: 2847, jobs: 1234 }
  ];

  const topCategories = [
    { name: 'Plumbing', jobs: 456, revenue: 12500, percentage: 35 },
    { name: 'Electrical', jobs: 324, revenue: 9800, percentage: 28 },
    { name: 'Carpentry', jobs: 289, revenue: 8200, percentage: 22 },
    { name: 'HVAC', jobs: 165, revenue: 5100, percentage: 15 }
  ];

  const topWorkers = [
    { name: 'Muzahid Hussain', jobs: 156, rating: 4.8, earnings: 12450 },
    { name: 'Avinash Kumar Thakur', jobs: 203, rating: 4.9, earnings: 15600 },
    { name: 'Himanshu Kumar', jobs: 89, rating: 4.7, earnings: 8900 }
  ];

  const recentActivity = [
    { type: 'job_completed', message: 'Kitchen Sink Repair completed by Muzahid Hussain', time: '2 hours ago' },
    { type: 'user_registered', message: 'New worker Avinash Kumar Thakur registered', time: '4 hours ago' },
    { type: 'payment_processed', message: 'Payment of ₹350 processed', time: '6 hours ago' },
    { type: 'dispute_resolved', message: 'Dispute #1847 resolved', time: '1 day ago' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
        <div className="flex items-center gap-4">
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
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.label} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Icon size={24} className="text-blue-600" />
                </div>
                <span className="text-green-600 text-sm font-medium">{metric.change}</span>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{metric.value}</p>
                <p className="text-sm font-medium text-gray-600">{metric.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
            <BarChart3 size={20} className="text-gray-600" />
          </div>
          <div className="space-y-4">
            {chartData.map((data) => (
              <div key={data.month} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600 w-12">{data.month}</span>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${(data.revenue / 50000) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-900 w-20 text-right">
                  ₹{(data.revenue / 1000).toFixed(0)}k
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* User Growth */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">User Growth</h3>
            <Users size={20} className="text-gray-600" />
          </div>
          <div className="space-y-4">
            {chartData.map((data) => (
              <div key={data.month} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600 w-12">{data.month}</span>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-green-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${(data.users / 3000) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-900 w-16 text-right">
                  {(data.users / 1000).toFixed(1)}k
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Categories */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Service Categories</h3>
          <div className="space-y-4">
            {topCategories.map((category) => (
              <div key={category.name} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{category.name}</span>
                    <span className="text-sm text-gray-600">{category.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
                    <span>{category.jobs} jobs</span>
                    <span>₹{category.revenue.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Workers */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Performing Workers</h3>
          <div className="space-y-4">
            {topWorkers.map((worker, index) => (
              <div key={worker.name} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-medium">#{index + 1}</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{worker.name}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{worker.jobs} jobs</span>
                    <span>★ {worker.rating}</span>
                    <span>₹{worker.earnings.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Platform Activity</h3>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar size={16} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900">{activity.message}</p>
                <p className="text-sm text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;