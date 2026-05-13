import React, { useState } from 'react';
import { Plus, Briefcase, Clock, CheckCircle, DollarSign, IndianRupee, X } from 'lucide-react';
import { jobApi } from '../../utils/api.js';
import CalculatorModal from './CalculatorModal.jsx';
import JobDetailsModal from './JobDetailsModal.jsx';
import WorkerBrowseModal from './WorkerBrowseModal.jsx';

const CustomerDashboard = () => {
  const [showPostJobModal, setShowPostJobModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const initialJobs = [
    {
      id: '1',
      title: 'Kitchen Sink Repair',
      status: 'in-progress',
      bids: 5,
      budget: 200,
      deadline: '2026-02-15'
    },
    {
      id: '2',
      title: 'Living Room Lighting',
      status: 'open',
      bids: 3,
      budget: 300,
      deadline: '2026-02-20'
    }
  ];

  const [recentJobs, setRecentJobs] = useState(() => {
    const savedJobs = localStorage.getItem('customerRecentJobs');
    if (savedJobs) {
      try {
        return JSON.parse(savedJobs);
      } catch (e) {
        console.error('Error parsing recent jobs from local storage', e);
        return initialJobs;
      }
    }
    return initialJobs;
  });

  const baseJobsPosted = 10;
  const baseActiveJobs = 1;

  const [selectedJob, setSelectedJob] = useState(null);
  const [showWorkers, setShowWorkers] = useState(false);

  const stats = [
    { label: 'Jobs Posted', value: (baseJobsPosted + recentJobs.length).toString(), icon: Briefcase, color: 'blue' },
    { label: 'Active Jobs', value: (baseActiveJobs + recentJobs.filter(j => j.status === 'open' || j.status === 'in-progress').length).toString(), icon: Clock, color: 'yellow' },
    { label: 'Completed', value: '9', icon: CheckCircle, color: 'green' },
    { label: 'Total Spent', value: '₹3,500', icon: IndianRupee, color: 'purple' }
  ];

  const handleAcceptBid = (jobId, bidId) => {
    const updatedJobs = recentJobs.map(job => {
      if (job.id === jobId) {
        return { ...job, status: 'in-progress', acceptedBidId: bidId };
      }
      return job;
    });
    setRecentJobs(updatedJobs);
    localStorage.setItem('customerRecentJobs', JSON.stringify(updatedJobs));
    setSelectedJob(null);
    alert('Bid accepted successfully! Job is now in-progress.');
  };

  const handleAddJob = async (jobDetails) => {
    setLoading(true);
    try {
      const jobPayload = {
        workType: jobDetails.serviceType,
        workerRating: jobDetails.rating,
        yearsOfExperience: jobDetails.experience,
        jobUrgency: jobDetails.urgency,
        budget: jobDetails.budget,
        customerId: 'customer-1',
        customerName: 'keshav',
        title: `${jobDetails.serviceType.charAt(0).toUpperCase() + jobDetails.serviceType.slice(1)} Service - ${jobDetails.urgency.charAt(0).toUpperCase() + jobDetails.urgency.slice(1)} Urgency`,
        description: jobDetails.requirement 
          ? `${jobDetails.requirement} (Min ${jobDetails.rating} stars, ${jobDetails.experience}+ yrs exp. Urgency: ${jobDetails.urgency})`
          : `Looking for a ${jobDetails.serviceType} service with ${jobDetails.experience}+ years experience (min ${jobDetails.rating} stars). Estimated budget: ₹${jobDetails.budget}/hr. Urgency: ${jobDetails.urgency}`,
        category: 'Services',
        status: 'open'
      };

      const newJob = {
        id: Date.now().toString(),
        title: jobPayload.title,
        status: 'open',
        bids: 0,
        budget: jobPayload.budget,
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      };

      const updatedJobs = [newJob, ...recentJobs];
      setRecentJobs(updatedJobs);
      localStorage.setItem('customerRecentJobs', JSON.stringify(updatedJobs));

      try {
        await jobApi.createJob(jobPayload);
      } catch (apiError) {
        console.warn('API call failed, continuing with local storage', apiError);
      }

      setSuccessMessage('✓ Job posted successfully!');
      setTimeout(() => {
        setSuccessMessage('');
      }, 4000);
      
    } catch (error) {
      console.error('Error posting job:', error);
      setSuccessMessage(`Error: ${error.message || 'Failed to post job'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back, keshav!</h2>
        <p className="text-blue-100 mb-4">Ready to get your next project started?</p>
        <button 
          onClick={() => setShowPostJobModal(true)}
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center gap-2"
        >
          <Plus size={16} />
          Post New Job
        </button>
      </div>

      {successMessage && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg animate-fade-in-up">
          <p className="text-green-800 font-medium">{successMessage}</p>
        </div>
      )}

      {loading && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg animate-fade-in-up">
          <p className="text-blue-800 font-medium">Posting job...</p>
        </div>
      )}

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

      {/* Recent Jobs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Recent Jobs</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentJobs.map((job) => (
              <div key={job.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{job.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {job.bids} bids • Budget: ₹{job.budget} • Due: {job.deadline}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    job.status === 'open' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {job.status}
                  </span>
                  <button 
                    onClick={() => setSelectedJob(job)}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
            <Plus size={24} className="text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Post a Job</h3>
          <p className="text-gray-600 text-sm mb-4">Describe your project and get bids from skilled workers</p>
          <button 
            onClick={() => setShowPostJobModal(true)}
            className="text-blue-600 font-medium text-sm hover:text-blue-700"
          >
            Get Started →
          </button>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-4">
            <Briefcase size={24} className="text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Browse Workers</h3>
          <p className="text-gray-600 text-sm mb-4">Find and hire skilled professionals for your projects</p>
          <button 
            onClick={() => setShowWorkers(true)}
            className="text-green-600 font-medium text-sm hover:text-green-700"
          >
            Explore →
          </button>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mb-4">
            <Clock size={24} className="text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Track Progress</h3>
          <p className="text-gray-600 text-sm mb-4">Monitor your active projects and communicate with workers</p>
          <button className="text-purple-600 font-medium text-sm hover:text-purple-700">
            View Jobs →
          </button>
        </div>
      </div>

      {/* Post Job Modal (ML Calculator) */}
      <CalculatorModal 
        isOpen={showPostJobModal} 
        onClose={() => setShowPostJobModal(false)}
        onAddJob={handleAddJob}
      />

      {/* Job Details Modal */}
      <JobDetailsModal 
        isOpen={!!selectedJob}
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
        onAcceptBid={handleAcceptBid}
      />

      {/* Browse Workers Modal */}
      <WorkerBrowseModal 
        isOpen={showWorkers}
        onClose={() => setShowWorkers(false)}
      />
    </div>
  );
};

export default CustomerDashboard;