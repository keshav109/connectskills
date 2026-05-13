import React, { useState } from 'react';
import { Eye, MessageSquare, Star, Clock, CheckCircle, XCircle, Calendar, DollarSign } from 'lucide-react';
import { mockJobs } from '../../utils/mockData';

const MyJobs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'open' | 'in-progress' | 'completed' | 'cancelled'>('all');

  const customerJobs = mockJobs.filter(job => job.customerId === '1');

  const filteredJobs = customerJobs.filter(job => {
    if (activeTab === 'all') return true;
    return job.status === activeTab;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <Eye size={16} />;
      case 'in-progress': return <Clock size={16} />;
      case 'completed': return <CheckCircle size={16} />;
      case 'cancelled': return <XCircle size={16} />;
      default: return <Eye size={16} />;
    }
  };

  const tabs = [
    { id: 'all', label: 'All Jobs', count: customerJobs.length },
    { id: 'open', label: 'Open', count: customerJobs.filter(j => j.status === 'open').length },
    { id: 'in-progress', label: 'In Progress', count: customerJobs.filter(j => j.status === 'in-progress').length },
    { id: 'completed', label: 'Completed', count: customerJobs.filter(j => j.status === 'completed').length },
    { id: 'cancelled', label: 'Cancelled', count: customerJobs.filter(j => j.status === 'cancelled').length }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">My Jobs</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Post New Job
        </button>
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
          {filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600">
                {activeTab === 'all' 
                  ? "You haven't posted any jobs yet." 
                  : `No ${activeTab.replace('-', ' ')} jobs found.`}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div key={job.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                          {getStatusIcon(job.status)}
                          {job.status.replace('-', ' ')}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>
                      
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <DollarSign size={16} />
                          <span className="font-medium">${job.budget}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={16} />
                          <span>Due: {new Date(job.deadline).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye size={16} />
                          <span>{job.bids.length} bids</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 ml-6">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                        View Details
                      </button>
                      <button className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                        <MessageSquare size={16} />
                        Messages
                      </button>
                      {job.status === 'completed' && (
                        <button className="flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg hover:bg-yellow-200 transition-colors text-sm">
                          <Star size={16} />
                          Rate Worker
                        </button>
                      )}
                    </div>
                  </div>

                  {job.workerId && (
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 font-medium">
                            {job.workerName?.split(' ').map(n => n[0]).join('') || 'W'}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{job.workerName || 'Worker Assigned'}</p>
                          <p className="text-sm text-gray-500">Skilled Professional</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-yellow-500">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} size={16} className="fill-current" />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">4.8</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyJobs;