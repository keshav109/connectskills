import React, { useState } from 'react';
import { IndianRupee, TrendingUp, Calendar, Download, CreditCard, Wallet } from 'lucide-react';

const Earnings: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('this-month');

  const earningsData = {
    totalEarnings: 12450,
    thisMonth: 2340,
    lastMonth: 1890,
    pendingPayments: 450,
    availableBalance: 1890
  };

  const recentTransactions = [
    {
      id: '1',
      jobTitle: 'Kitchen Sink Repair',
      customer: 'Sarah Johnson',
      amount: 175,
      date: '2024-02-12',
      status: 'completed',
      type: 'payment'
    },
    {
      id: '2',
      jobTitle: 'Bathroom Installation',
      customer: 'Michael Chen',
      amount: 450,
      date: '2024-02-10',
      status: 'pending',
      type: 'payment'
    },
    {
      id: '3',
      jobTitle: 'Withdrawal to Bank',
      customer: 'Bank Transfer',
      amount: -800,
      date: '2024-02-08',
      status: 'completed',
      type: 'withdrawal'
    },
    {
      id: '4',
      jobTitle: 'Toilet Repair',
      customer: 'Emma Davis',
      amount: 120,
      date: '2024-02-05',
      status: 'completed',
      type: 'payment'
    }
  ];

  const monthlyEarnings = [
    { month: 'Jan', earnings: 1890 },
    { month: 'Feb', earnings: 2340 },
    { month: 'Mar', earnings: 0 },
    { month: 'Apr', earnings: 0 },
    { month: 'May', earnings: 0 },
    { month: 'Jun', earnings: 0 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Earnings</h2>
        <div className="flex items-center gap-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="this-week">This Week</option>
            <option value="this-month">This Month</option>
            <option value="last-month">Last Month</option>
            <option value="this-year">This Year</option>
          </select>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Earnings Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Earnings</p>
              <p className="text-3xl font-bold text-gray-900">₹{earningsData.totalEarnings.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <IndianRupee size={24} className="text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp size={16} className="text-green-500 mr-1" />
            <span className="text-green-600">+12% from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-3xl font-bold text-blue-600">₹{earningsData.thisMonth.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Calendar size={24} className="text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-600">vs ₹{earningsData.lastMonth} last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-3xl font-bold text-yellow-600">₹{earningsData.pendingPayments}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <CreditCard size={24} className="text-yellow-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-600">2 jobs pending payment</span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Available</p>
              <p className="text-3xl font-bold text-purple-600">₹{earningsData.availableBalance}</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <Wallet size={24} className="text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <button className="text-purple-600 font-medium text-sm hover:text-purple-700">
              Withdraw →
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Earnings</h3>
          <div className="space-y-4">
            {monthlyEarnings.map((month) => (
              <div key={month.month} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600 w-12">{month.month}</span>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `₹{(month.earnings / 3000) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-900 w-16 text-right">
                  ₹{month.earnings.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Wallet size={20} className="text-green-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900">Withdraw Earnings</p>
                  <p className="text-sm text-gray-600">₹{earningsData.availableBalance} available</p>
                </div>
              </div>
              <span className="text-green-600">→</span>
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <CreditCard size={20} className="text-blue-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900">Payment Methods</p>
                  <p className="text-sm text-gray-600">Manage bank accounts</p>
                </div>
              </div>
              <span className="text-blue-600">→</span>
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Download size={20} className="text-purple-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900">Tax Documents</p>
                  <p className="text-sm text-gray-600">Download 1099 forms</p>
                </div>
              </div>
              <span className="text-purple-600">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
            View All
          </button>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ₹{
                    transaction.type === 'payment' ? 'bg-green-100' : 'bg-blue-100'
                  }`}>
                    {transaction.type === 'payment' ? (
                      <IndianRupee size={20} className="text-green-600" />
                    ) : (
                      <CreditCard size={20} className="text-blue-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{transaction.jobTitle}</p>
                    <p className="text-sm text-gray-600">{transaction.customer}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className={`font-medium ₹{
                    transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount)}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ₹{getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(transaction.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Earnings;