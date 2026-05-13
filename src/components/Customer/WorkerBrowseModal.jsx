import React from 'react';
import { X, Star, MapPin, Search } from 'lucide-react';

const mockWorkers = [
  { id: 'w1', name: 'Ramesh Kumar', category: 'Plumbing', rating: 4.8, jobsCompleted: 142, hourlyRate: 250, location: 'Mumbai, MH', skills: ['Pipe Fitting', 'Leak Repair'] },
  { id: 'w2', name: 'Suresh Electrician', category: 'Electrical', rating: 4.9, jobsCompleted: 89, hourlyRate: 300, location: 'Delhi, DL', skills: ['Wiring', 'Appliance Repair'] },
  { id: 'w3', name: 'Anita Cleaning Services', category: 'Cleaning', rating: 4.6, jobsCompleted: 230, hourlyRate: 150, location: 'Bangalore, KA', skills: ['Deep Cleaning', 'Sanitization'] },
  { id: 'w4', name: 'Manoj Carpenter', category: 'Carpentry', rating: 4.7, jobsCompleted: 110, hourlyRate: 400, location: 'Pune, MH', skills: ['Furniture assembly', 'Woodwork'] },
  { id: 'w5', name: 'Vikram Painters', category: 'Painting', rating: 4.5, jobsCompleted: 67, hourlyRate: 350, location: 'Chennai, TN', skills: ['Interior', 'Exterior'] },
  { id: 'w6', name: 'Priya Tutors', category: 'Education', rating: 5.0, jobsCompleted: 45, hourlyRate: 500, location: 'Remote', skills: ['Maths', 'Science'] }
];

export default function WorkerBrowseModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm overflow-y-auto">
      <div className="bg-gray-50 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden my-8 border border-gray-200 animate-fade-in-up flex flex-col h-[85vh]">
        <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Browse Workers</h2>
            <p className="text-sm text-gray-500">Find the perfect professional for your task</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 bg-white border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by skill, category, or name..." 
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockWorkers.map(worker => (
              <div key={worker.id} className="bg-white p-5 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex gap-3">
                    <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
                      {worker.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{worker.name}</h3>
                      <p className="text-sm text-gray-500">{worker.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end text-yellow-500 gap-1 text-sm font-bold">
                      <Star size={14} fill="currentColor" />
                      {worker.rating}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{worker.jobsCompleted} jobs</p>
                  </div>
                </div>
                
                <div className="flex gap-2 mb-4 flex-wrap">
                  {worker.skills.map(skill => (
                    <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md font-medium">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <MapPin size={14} />
                    {worker.location}
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-gray-900">₹{worker.hourlyRate}</span>
                    <span className="text-sm text-gray-500">/hr</span>
                  </div>
                </div>

                <button className="w-full mt-4 py-2.5 bg-gray-50 hover:bg-blue-600 hover:text-white text-gray-700 font-medium rounded-lg transition-colors border border-gray-200 hover:border-blue-600">
                  Invite to Job
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
