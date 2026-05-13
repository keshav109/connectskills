import React, { useState } from 'react';
import { Clock, CheckCircle, XCircle, DollarSign, Calendar, MessageSquare } from 'lucide-react';
import { mockBids, mockJobs } from '../../utils/mockData';

const MyBids: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all');

  const workerBids = mockBids.filter(bid => bid.workerId === '1');

  const filteredBids = workerBids.filter(bid => {
    if (activeTab === 'all') return true;
    return bid.status === activeTab;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock size={16} />;
      case 'accepted': return <CheckCircle size={16} />;
      case 'rejected': return <XCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const getJobDetails = (jobId: string) => {
    return mockJobs.find(job => job.id === jobId);
  };

  const tabs = [
    { id: 'all', label: 'All Bids', count: workerBids.length },
    { id: 'pending', label: 'Pending', count: workerBids.filter(b => b.status === 'pending').length },
    { id: 'accepted', label: 'Accepted', count: workerBids.filter(b => b.status === 'accepted').length },
    { id: 'rejected', label: 'Rejected', count: workerBids.filter(b => b.status === 'rejected').length }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">My Bids</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Browse Jobs
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Bids</p>
              <p className="text-3xl font-bold text-gray-900">{workerBids.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <DollarSign size={24} className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-3xl font-bold text-yellow-600">{workerBids.filter(b => b.status === 'pending').length}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <Clock size={24} className="text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Accepted</p>
              <p className="text-3xl font-bold text-green-600">{workerBids.filter(b => b.status === 'accepted').length}</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <CheckCircle size={24} className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-3xl font-bold text-purple-600">
                {workerBids.length > 0 ? Math.round((workerBids.filter(b => b.status === 'accepted').length / workerBids.length) * 100) : 0}%
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <CheckCircle size={24} className="text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {filteredBids.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No bids found</h3>
              <p className="text-gray-600">
                {activeTab === 'all' 
                  ? "You haven't placed any bids yet." 
                  : `No ${activeTab} bids found.`}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBids.map((bid) => {
                const job = getJobDetails(bid.jobId);
                return (
                  <div key={bid.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{job?.title}</h3>
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(bid.status)}`}>
                            {getStatusIcon(bid.status)}
                            {bid.status}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 mb-4">{bid.message}</p>
                        
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <DollarSign size={16} />
                            <span className="font-medium">Your Bid: ${bid.price}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={16} />
                            <span>Duration: {bid.estimatedDuration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar size={16} />
                            <span>Submitted: {new Date(bid.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 ml-6">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                          View Job
                        </button>
                        {bid.status === 'pending' && (
                          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                            Edit Bid
                          </button>
                        )}
                        {bid.status === 'accepted' && (
                          <button className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-lg hover:bg-green-200 transition-colors text-sm">
                            <MessageSquare size={16} />
                            Message Client
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-medium">
                            {job?.customerName.split(' ').map(n => n[0]).join('') || 'C'}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{job?.customerName}</p>
                          <p className="text-sm text-gray-500">Customer</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Job Budget: ${job?.budget}</p>
                        <p className="text-xs text-gray-500">{job?.location}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBids;