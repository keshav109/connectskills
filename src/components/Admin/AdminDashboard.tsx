import React, { useState } from 'react';
import { Users, Briefcase, IndianRupee, TrendingUp, AlertTriangle, CheckCircle, X as CloseIcon } from 'lucide-react';
import WorkerApprovalModal from './WorkerApprovalModal';
import ManageUsers from './ManageUsers';
import ManageJobs from './ManageJobs';
import Analytics from './Analytics';
import ManageDisputes from './ManageDisputes';

const AdminDashboard: React.FC = () => {
  const stats = [
    { label: 'Total Users', value: '2,847', icon: Users, color: 'blue', change: '+12%' },
    { label: 'Active Jobs', value: '156', icon: Briefcase, color: 'green', change: '+8%' },
    { label: 'Revenue', value: '₹45,230', icon: IndianRupee, color: 'purple', change: '+23%' },
    { label: 'Platform Fee', value: '₹4,523', icon: TrendingUp, color: 'yellow', change: '+15%' }
  ];

  const recentActivity = [
    { type: 'user', message: 'New worker registered: Muzahid Hussain', time: '2 hours ago', status: 'pending' },
    { type: 'job', message: 'Job completed: Kitchen Sink Repair', time: '4 hours ago', status: 'success' },
    { type: 'dispute', message: 'Dispute raised on Job #1847', time: '6 hours ago', status: 'warning' },
    { type: 'payment', message: 'Payment processed: ₹350', time: '1 day ago', status: 'success' }
  ];

  const initialApprovals = [
    { id: '1', name: 'Avinash Kumar Thakur', type: 'Worker Verification', submitted: '2024-02-10', faceVerified: true, phone: '+91 9876543210', skills: 'Plumbing', location: 'Delhi' },
    { id: '2', name: 'Rahul Yadav', type: 'Profile Update', submitted: '2024-02-09', faceVerified: false, phone: '+91 8765432109', skills: 'Electrical', location: 'Mumbai' },
    { id: '3', name: 'Jatin Bhojwani', type: 'Worker Verification', submitted: '2024-02-08', faceVerified: true, phone: '+91 7654321098', skills: 'Cleaning', location: 'Pune' }
  ];

  const [approvals, setApprovals] = useState(initialApprovals);
  const [selectedApproval, setSelectedApproval] = useState<any>(null);
  const [activeView, setActiveView] = useState<'dashboard' | 'users' | 'jobs' | 'analytics' | 'disputes'>('dashboard');

  const handleApprove = (id: string) => {
    setApprovals(approvals.filter(a => a.id !== id));
  };

  const handleReject = (id: string) => {
    setApprovals(approvals.filter(a => a.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Admin Dashboard</h2>
        <p className="text-purple-100">Welcome back! Here's what's happening on SkillConnect today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: 'bg-blue-50 text-blue-600 border-blue-100',
            yellow: 'bg-yellow-50 text-yellow-600 border-yellow-100',
            green: 'bg-green-50 text-green-600 border-green-100',
            purple: 'bg-purple-50 text-purple-600 border-purple-100'
          };

          return (
            <div key={stat.label} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg border flex items-center justify-center ${colorClasses[stat.color]}`}>
                  <Icon size={24} />
                </div>
                <span className="text-green-600 text-sm font-medium">{stat.change}</span>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.status === 'success' 
                      ? 'bg-green-100 text-green-600' 
                      : activity.status === 'warning'
                      ? 'bg-yellow-100 text-yellow-600'
                      : 'bg-blue-100 text-blue-600'
                  }`}>
                    {activity.status === 'success' ? (
                      <CheckCircle size={16} />
                    ) : activity.status === 'warning' ? (
                      <AlertTriangle size={16} />
                    ) : (
                      <Users size={16} />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Pending Approvals</h3>
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
              {approvals.length} pending
            </span>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {approvals.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">No pending approvals.</p>
              ) : approvals.map((item) => (
                <div 
                  key={item.id} 
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200"
                  onClick={() => setSelectedApproval(item)}
                >
                  <div>
                    <h4 className="font-medium text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-600">{item.type}</p>
                    <p className="text-xs text-gray-500 mt-1">Submitted: {item.submitted}</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleApprove(item.id); }}
                      className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleReject(item.id); }}
                      className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700 transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 text-center">
          <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Users size={24} className="text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Manage Users</h3>
          <p className="text-gray-600 text-sm mb-4">View and manage all platform users</p>
          <button onClick={() => setActiveView('users')} className="text-blue-600 font-medium text-sm hover:text-blue-700">
            View Users →
          </button>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 text-center">
          <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Briefcase size={24} className="text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Monitor Jobs</h3>
          <p className="text-gray-600 text-sm mb-4">Track all platform activities and jobs</p>
          <button onClick={() => setActiveView('jobs')} className="text-green-600 font-medium text-sm hover:text-green-700">
            View Jobs →
          </button>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 text-center">
          <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mx-auto mb-4">
            <TrendingUp size={24} className="text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Analytics</h3>
          <p className="text-gray-600 text-sm mb-4">View detailed platform analytics</p>
          <button onClick={() => setActiveView('analytics')} className="text-purple-600 font-medium text-sm hover:text-purple-700">
            View Analytics →
          </button>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 text-center">
          <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center mx-auto mb-4">
            <AlertTriangle size={24} className="text-yellow-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Handle Disputes</h3>
          <p className="text-gray-600 text-sm mb-4">Manage and resolve user disputes</p>
          <button onClick={() => setActiveView('disputes')} className="text-yellow-600 font-medium text-sm hover:text-yellow-700">
            View Disputes →
          </button>
        </div>
      </div>
      <WorkerApprovalModal 
        isOpen={!!selectedApproval} 
        worker={selectedApproval} 
        onClose={() => setSelectedApproval(null)} 
        onApprove={handleApprove} 
        onReject={handleReject} 
      />
      
      {activeView !== 'dashboard' && (
        <div className="fixed inset-0 z-[100] bg-gray-50 flex flex-col h-screen overflow-hidden animate-fade-in-up">
          <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">
              {activeView === 'users' && 'Manage Users'}
              {activeView === 'jobs' && 'Monitor Jobs'}
              {activeView === 'analytics' && 'Analytics'}
              {activeView === 'disputes' && 'Handle Disputes'}
            </h2>
            <button onClick={() => setActiveView('dashboard')} className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
              <CloseIcon size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              {activeView === 'users' && <ManageUsers />}
              {activeView === 'jobs' && <ManageJobs />}
              {activeView === 'analytics' && <Analytics />}
              {activeView === 'disputes' && <ManageDisputes />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;