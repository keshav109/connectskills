import React, { useState } from 'react';
import { Clock, CheckCircle, MessageSquare, Calendar, DollarSign, MapPin, Phone } from 'lucide-react';

const ActiveJobs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
  const [allJobs, setAllJobs] = useState<any[]>([]);

  React.useEffect(() => {
    const localJobsStr = localStorage.getItem('customerRecentJobs');
    if (localJobsStr) {
      setAllJobs(JSON.parse(localJobsStr));
    } else {
      setAllJobs([
        {
          id: '1',
          title: 'Kitchen Sink Repair',
          description: 'Fix leaking kitchen faucet and replace worn gaskets',
          customerName: 'Sarah Johnson',
          customerPhone: '+1-555-0123',
          location: 'Manhattan, NY',
          budget: 175,
          createdAt: '2024-02-12',
          deadline: '2024-02-15',
          status: 'in-progress',
          progress: 60
        }
      ]);
    }
  }, []);

  const activeJobs = allJobs.filter(job => job.status === 'in-progress' || job.status === 'open');
  const completedJobs = allJobs.filter(job => job.status === 'completed');

  const currentJobs = activeTab === 'active' ? activeJobs : completedJobs;

  const updateProgress = (jobId: string, newProgress: number) => {
    const updated = allJobs.map(j => j.id === jobId ? { ...j, progress: newProgress } : j);
    setAllJobs(updated);
    localStorage.setItem('customerRecentJobs', JSON.stringify(updated));
  };

  const markComplete = (jobId: string) => {
    const updated = allJobs.map(j => j.id === jobId ? { ...j, status: 'completed', completedDate: new Date().toISOString() } : j);
    setAllJobs(updated);
    localStorage.setItem('customerRecentJobs', JSON.stringify(updated));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Active Jobs</h2>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            {activeJobs.length} active • {completedJobs.length} completed
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Jobs</p>
              <p className="text-3xl font-bold text-blue-600">{activeJobs.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Clock size={24} className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-3xl font-bold text-green-600">{completedJobs.length + activeJobs.length}</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <CheckCircle size={24} className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Rating</p>
              <p className="text-3xl font-bold text-yellow-600">4.8</p>
            </div>
            <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <CheckCircle size={24} className="text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('active')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'active'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Active ({activeJobs.length})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'completed'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Completed ({completedJobs.length})
            </button>
          </nav>
        </div>

        <div className="p-6">
          {currentJobs.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No {activeTab} jobs</h3>
              <p className="text-gray-600">
                {activeTab === 'active' 
                  ? "You don't have any active jobs at the moment." 
                  : "No completed jobs to show."}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {currentJobs.map((job) => (
                <div key={job.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                      <p className="text-gray-600 mb-4">{job.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <DollarSign size={16} />
                          <span>Agreed Price: <strong>₹{job.budget || job.agreedPrice}</strong></span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin size={16} />
                          <span>{job.location || 'Remote'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar size={16} />
                          <span>
                            {activeTab === 'active' 
                              ? `Due: ${job.deadline ? new Date(job.deadline).toLocaleDateString() : 'Flexible'}`
                              : `Completed: ${job.completedDate ? new Date(job.completedDate).toLocaleDateString() : 'N/A'}`
                            }
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone size={16} />
                          <span>{job.customerPhone || '+1-555-0123'}</span>
                        </div>
                      </div>

                      {activeTab === 'active' && 'progress' in job && (
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">Progress</span>
                            <span className="text-sm text-gray-600">{job.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                              style={{ width: `${job.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {activeTab === 'completed' && 'rating' in job && (
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg
                                key={star}
                                className={`w-5 h-5 ${star <= job.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                viewBox="0 0 20 20"
                              >
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">"{job.review}"</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2 ml-6">
                      <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                        <MessageSquare size={16} />
                        Message
                      </button>
                      
                      {activeTab === 'active' && (
                        <>
                          <button 
                            onClick={() => updateProgress(job.id, Math.min(100, (job as any).progress + 20))}
                            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                          >
                            Update Progress
                          </button>
                          {(job as any).progress >= 100 && (
                            <button 
                              onClick={() => markComplete(job.id)}
                              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                            >
                              Mark Complete
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-medium">
                          {(job.customerName || job.customer || 'Customer').split(' ').map((n: string) => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{job.customerName || job.customer || 'Unknown Customer'}</p>
                        <p className="text-sm text-gray-500">Customer</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        {activeTab === 'active' 
                          ? `Started: ${job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'Recently'}`
                          : `Duration: ${job.completedDate && job.createdAt ? Math.ceil((new Date(job.completedDate).getTime() - new Date(job.createdAt).getTime()) / (1000 * 60 * 60 * 24)) : 0} days`
                        }
                      </p>
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

export default ActiveJobs;