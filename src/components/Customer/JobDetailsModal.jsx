import React from 'react';
import { X, MapPin, Calendar, Clock, Users } from 'lucide-react';

const mockBids = [
  { id: 'b1', workerName: 'Rahul Verma', rating: 4.8, bidAmount: 250, coverLetter: 'I have 5 years of experience in this field and can complete the job today.' },
  { id: 'b2', workerName: 'Amit Singh', rating: 4.5, bidAmount: 200, coverLetter: 'Professional service guaranteed. Available immediately.' }
];

export default function JobDetailsModal({ isOpen, onClose, job, onAcceptBid }) {
  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden my-8 border border-gray-200 animate-fade-in-up">
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Job Details</h2>
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
                  {job.status.toUpperCase()}
                </span>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Budget</p>
                <p className="text-2xl font-bold text-blue-600">₹{job.budget}</p>
              </div>
            </div>

            <p className="text-gray-600 mb-6">
              {job.description || "Looking for an experienced professional to handle this task with high quality and efficiency. Please check the details and submit your bid."}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 text-gray-600">
                <div className="p-2 bg-gray-100 rounded-lg"><Calendar size={18} /></div>
                <div>
                  <p className="text-xs text-gray-500">Deadline</p>
                  <p className="text-sm font-medium">{job.deadline}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <div className="p-2 bg-gray-100 rounded-lg"><MapPin size={18} /></div>
                <div>
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="text-sm font-medium">Remote / On-site</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <div className="p-2 bg-gray-100 rounded-lg"><Users size={18} /></div>
                <div>
                  <p className="text-xs text-gray-500">Total Bids</p>
                  <p className="text-sm font-medium">{job.bids} Received</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <div className="p-2 bg-gray-100 rounded-lg"><Clock size={18} /></div>
                <div>
                  <p className="text-xs text-gray-500">Posted</p>
                  <p className="text-sm font-medium">Recently</p>
                </div>
              </div>
            </div>

            <h4 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Recent Bids</h4>
            <div className="space-y-4">
              {job.bids > 0 ? (
                (job.bidDetails || mockBids).map(bid => (
                  <div key={bid.id} className="p-4 border border-gray-100 rounded-xl bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h5 className="font-semibold text-gray-900">{bid.workerName}</h5>
                        <p className="text-sm text-yellow-600 flex items-center gap-1">★ {bid.rating}</p>
                      </div>
                      <div className="text-right text-green-700 font-bold">₹{bid.bidAmount}</div>
                    </div>
                    <p className="text-sm text-gray-600 italic">"{bid.coverLetter}"</p>
                    <div className="mt-3 flex gap-2">
                      <button 
                        onClick={() => onAcceptBid(job.id, bid.id)}
                        className="px-4 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Accept Bid
                      </button>
                      <button 
                        onClick={() => {
                          onClose();
                          window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'messages' } }));
                        }}
                        className="px-4 py-1.5 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Message
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                  <p className="text-gray-500 text-sm">No bids received yet. Wait for workers to apply!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
