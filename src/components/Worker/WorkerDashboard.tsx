import React, { useState, useEffect } from 'react';
import { Briefcase, Eye, Clock, CheckCircle, IndianRupee, Star } from 'lucide-react';
import { jobApi } from '../../utils/api.js';
import WorkerJobDetailsModal from './WorkerJobDetailsModal';

const WorkerDashboard: React.FC = () => {
  const [availableJobs, setAvailableJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedJob, setSelectedJob] = useState<any>(null);

  useEffect(() => {
    fetchAvailableJobs();
    // Poll for new jobs every 5 seconds
    const interval = setInterval(fetchAvailableJobs, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchAvailableJobs = async () => {
    try {
      let jobsToShow = [];
      const localJobsStr = localStorage.getItem('customerRecentJobs');
      if (localJobsStr) {
        jobsToShow = JSON.parse(localJobsStr);
      } else {
        jobsToShow = [
          {
            id: '1',
            title: 'Kitchen Sink Repair',
            category: 'Plumbing',
            budget: 200,
            location: 'Delhi',
            posted: '2 hours ago',
            bids: 5
          },
          {
            id: '2',
            title: 'Bathroom Tile Installation',
            category: 'Plumbing',
            budget: 800,
            location: 'Mumbai',
            posted: '5 hours ago',
            bids: 3
          }
        ];
      }
      setAvailableJobs(jobsToShow);
      setLoading(false);
    } catch (err: any) {
      console.error('Error fetching jobs:', err);
      setError('Failed to load jobs');
      setLoading(false);
    }
  };

  const handlePlaceBid = (jobId: string, bidDetails: any) => {
    const updatedJobs = availableJobs.map(job => {
      if (job.id === jobId) {
        const bidsList = job.bidDetails || [];
        return {
          ...job,
          bids: (job.bids || 0) + 1,
          bidDetails: [...bidsList, bidDetails]
        };
      }
      return job;
    });
    setAvailableJobs(updatedJobs);
    localStorage.setItem('customerRecentJobs', JSON.stringify(updatedJobs));
    setSelectedJob(null);
    alert('Bid placed successfully!');
  };

  const stats = [
    { label: 'Active Bids', value: '8', icon: Eye, color: 'blue' },
    { label: 'Jobs Won', value: '156', icon: CheckCircle, color: 'green' },
    { label: 'In Progress', value: '3', icon: Clock, color: 'yellow' },
    { label: 'Total Earned', value: '₹12,450', icon: IndianRupee, color: 'purple' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back, Muzahid!</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 mb-1">Your Rating</p>
            <div className="flex items-center gap-2">
              <Star size={20} className="fill-yellow-400 text-yellow-400" />
              <span className="text-2xl font-bold">4.8</span>
              <span className="text-green-100">(156 reviews)</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-green-100 mb-1">Availability</p>
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Available
            </span>
          </div>
        </div>
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
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg border flex items-center justify-center ${colorClasses[stat.color]}`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Available Jobs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Tasks Available</h3>
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
            View All Jobs
          </button>
        </div>
        <div className="p-6">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
              {error}
            </div>
          )}
          {loading ? (
            <div className="text-center py-8 text-gray-500">
              <p>Loading available tasks...</p>
            </div>
          ) : availableJobs.length > 0 ? (
            <div className="space-y-4">
              {availableJobs.map((job, index) => (
                <div key={job.id || index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-200 hover:bg-blue-50/50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{job.title}</h4>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mt-2">
                        <span className="bg-gray-100 px-2 py-1 rounded text-xs font-medium">{job.workType || job.category || 'Services'}</span>
                        {job.workerRating && <span>⭐ {job.workerRating} rating required</span>}
                        {job.yearsOfExperience && <span>📅 {job.yearsOfExperience}+ years exp.</span>}
                        {job.jobUrgency && <span>⚡ {job.jobUrgency}</span>}
                      </div>
                      {job.description && (
                        <p className="text-gray-600 mt-2 text-sm">{job.description}</p>
                      )}
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-sm text-gray-500">
                        {job.posted || 'Just posted'}
                      </p>
                      {job.bids && <p className="text-sm text-gray-600">{job.bids} bids</p>}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setSelectedJob(job)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      Place Bid
                    </button>
                    <button 
                      onClick={() => setSelectedJob(job)}
                      className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No tasks available at the moment. Check back soon!</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
            <Eye size={24} className="text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Browse Jobs</h3>
          <p className="text-gray-600 text-sm mb-4">Find new projects that match your skills and availability</p>
          <button className="text-blue-600 font-medium text-sm hover:text-blue-700">
            Browse Now →
          </button>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-4">
            <Briefcase size={24} className="text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">My Bids</h3>
          <p className="text-gray-600 text-sm mb-4">Track your submitted bids and manage responses</p>
          <button className="text-green-600 font-medium text-sm hover:text-green-700">
            View Bids →
          </button>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mb-4">
            <IndianRupee size={24} className="text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Earnings</h3>
          <p className="text-gray-600 text-sm mb-4">View your payment history and manage payouts</p>
          <button className="text-purple-600 font-medium text-sm hover:text-purple-700">
            View Earnings →
          </button>
        </div>
      </div>

      <WorkerJobDetailsModal 
        isOpen={!!selectedJob} 
        job={selectedJob} 
        onClose={() => setSelectedJob(null)} 
        onPlaceBid={handlePlaceBid} 
      />
    </div>
  );
};

export default WorkerDashboard;