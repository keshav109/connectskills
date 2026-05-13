import React, { useState } from 'react';
import { X, MapPin, Calendar, Clock, DollarSign, IndianRupee } from 'lucide-react';

export default function WorkerJobDetailsModal({ isOpen, onClose, job, onPlaceBid }) {
  const [bidAmount, setBidAmount] = useState('');
  const [coverLetter, setCoverLetter] = useState('');

  if (!isOpen || !job) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bidAmount) return;
    onPlaceBid(job.id, {
      id: Date.now().toString(),
      workerName: 'Muzahid Hussain', // Mock worker name
      rating: 4.8,
      bidAmount: Number(bidAmount),
      coverLetter: coverLetter || 'I am interested in this job.'
    });
    setBidAmount('');
    setCoverLetter('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden my-8 border border-gray-200 animate-fade-in-up">
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Job Details & Bidding</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 md:p-8 overflow-y-auto max-h-[calc(100vh-8rem)]">
          <div className="mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{job.title}</h3>
                <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                  job.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {job.status ? job.status.toUpperCase() : 'OPEN'}
                </span>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Estimated Budget</p>
                <p className="text-2xl font-bold text-blue-600">₹{job.budget}</p>
              </div>
            </div>

            <p className="text-gray-600 mb-6">
              {job.description || "Customer needs a professional to complete this task. Please submit a competitive bid."}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 text-gray-600">
                <div className="p-2 bg-gray-100 rounded-lg"><Calendar size={18} /></div>
                <div>
                  <p className="text-xs text-gray-500">Deadline</p>
                  <p className="text-sm font-medium">{job.deadline || 'Flexible'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <div className="p-2 bg-gray-100 rounded-lg"><MapPin size={18} /></div>
                <div>
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="text-sm font-medium">{job.location || 'Remote / On-site'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <div className="p-2 bg-gray-100 rounded-lg"><Clock size={18} /></div>
                <div>
                  <p className="text-xs text-gray-500">Posted</p>
                  <p className="text-sm font-medium">{job.posted || 'Recently'}</p>
                </div>
              </div>
            </div>

            <h4 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Submit Your Bid</h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Bid Amount (₹)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IndianRupee size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="number"
                    required
                    min="1"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter amount"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cover Letter / Message</label>
                <textarea
                  required
                  rows={3}
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Explain why you are the best fit for this job..."
                />
              </div>
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-all shadow-md shadow-blue-200"
                >
                  Place Bid
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
