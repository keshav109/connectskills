import React, { useState } from 'react';
import { Search, Filter, Eye, MoreVertical, Calendar, IndianRupee, MapPin, User } from 'lucide-react';
import { mockJobs } from '../../utils/mockData';

const ManageJobs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'open' | 'in-progress' | 'completed' | 'cancelled'>('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [allJobs, setAllJobs] = useState<any[]>([]);
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);

  React.useEffect(() => {
    const localJobsStr = localStorage.getItem('customerRecentJobs');
    if (localJobsStr) {
      const parsedJobs = JSON.parse(localJobsStr).map((job: any) => ({
        ...job,
        flagged: Math.random() > 0.9,
        disputeCount: Math.floor(Math.random() * 3),
        createdAt: job.createdAt || job.deadline || new Date().toISOString(),
        category: job.category || 'Services',
        location: job.location || 'Remote'
      }));
      setAllJobs(parsedJobs);
    } else {
      setAllJobs(mockJobs.map(job => ({
        ...job,
        flagged: Math.random() > 0.9,
        disputeCount: Math.floor(Math.random() * 3)
      })));
    }
  }, []);

  const filteredJobs = allJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || job.status === selectedStatus;
    const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
    return matchesSearch && matchesStatus && matchesCategory;
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

  const categories = ['All Categories', 'Plumbing', 'Electrical', 'Carpentry', 'HVAC', 'Painting'];

  const stats = [
    { label: 'Total Jobs', value: allJobs.length, color: 'blue' },
    { label: 'Active', value: allJobs.filter(j => j.status === 'open' || j.status === 'in-progress').length, color: 'green' },
    { label: 'Completed', value: allJobs.filter(j => j.status === 'completed').length, color: 'purple' },
    { label: 'Flagged', value: allJobs.filter(j => j.flagged).length, color: 'red' }
  ];

  const handleJobAction = (jobId: string, action: string) => {
    if (action === 'view') {
      const job = allJobs.find(j => j.id === jobId);
      if (job) {
        alert(`Job Details:\n\nTitle: ${job.title}\nDescription: ${job.description}\nBudget: ₹${job.budget}\nStatus: ${job.status}\nCustomer: ${job.customerName}`);
      }
      return;
    }

    let updatedJobs = [...allJobs];

    if (action === 'delete') {
      updatedJobs = updatedJobs.filter(j => j.id !== jobId);
    } else if (action === 'cancel') {
      updatedJobs = updatedJobs.map(j => j.id === jobId ? { ...j, status: 'cancelled' } : j);
    } else if (action === 'toggle-flag') {
      updatedJobs = updatedJobs.map(j => j.id === jobId ? { ...j, flagged: !j.flagged } : j);
    }

    setAllJobs(updatedJobs);
    localStorage.setItem('customerRecentJobs', JSON.stringify(updatedJobs));
    setActiveDropdownId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Manage Jobs</h2>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">{filteredJobs.length} jobs</span>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Export Data
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const colorClasses = {
            blue: 'bg-blue-50 text-blue-600 border-blue-100',
            green: 'bg-green-50 text-green-600 border-green-100',
            purple: 'bg-purple-50 text-purple-600 border-purple-100',
            red: 'bg-red-50 text-red-600 border-red-100'
          };

          return (
            <div key={stat.label} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg border flex items-center justify-center ${colorClasses[stat.color]}`}>
                  <Eye size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as any)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category === 'All Categories' ? 'all' : category}>
                {category}
              </option>
            ))}
          </select>

          <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter size={16} />
            More Filters
          </button>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-6">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div key={job.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                          {job.status.replace('-', ' ')}
                        </span>
                        {job.flagged && (
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                            Flagged
                          </span>
                        )}
                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                          {job.category}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>
                      
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <IndianRupee size={16} />
                          <span className="font-medium">₹{job.budget}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin size={16} />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={16} />
                          <span>Due: {job.deadline ? new Date(job.deadline).toLocaleDateString() : 'Flexible'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye size={16} />
                          <span>{Array.isArray(job.bids) ? job.bids.length : (job.bids || 0)} bids</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 ml-6">
                      <button
                        onClick={() => handleJobAction(job.id, 'view')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        View Details
                      </button>
                      <div className="relative">
                        <button 
                          onClick={() => setActiveDropdownId(activeDropdownId === job.id ? null : job.id)}
                          className="flex items-center gap-2 border border-gray-300 text-gray-700 w-full px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                        >
                          <MoreVertical size={16} />
                          Actions
                        </button>
                        
                        {activeDropdownId === job.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-10 animate-fade-in-up">
                            {job.status !== 'cancelled' && (
                              <button
                                onClick={() => handleJobAction(job.id, 'cancel')}
                                className="w-full px-4 py-2 text-left text-sm text-yellow-600 hover:bg-yellow-50 flex items-center gap-2"
                              >
                                Cancel Job
                              </button>
                            )}
                            <button
                              onClick={() => handleJobAction(job.id, 'toggle-flag')}
                              className="w-full px-4 py-2 text-left text-sm text-orange-600 hover:bg-orange-50 flex items-center gap-2"
                            >
                              {job.flagged ? 'Unflag Job' : 'Flag Job'}
                            </button>
                            <div className="h-px bg-gray-100 my-1 mx-2"></div>
                            <button
                              onClick={() => handleJobAction(job.id, 'delete')}
                              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                            >
                              Delete Job
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User size={16} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{job.customerName}</p>
                        <p className="text-sm text-gray-500">Customer</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        Posted: {new Date(job.createdAt).toLocaleDateString()}
                      </p>
                      {job.disputeCount > 0 && (
                        <p className="text-sm text-red-600">
                          {job.disputeCount} dispute{job.disputeCount > 1 ? 's' : ''}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageJobs;