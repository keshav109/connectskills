import React from 'react';
import { X, CheckCircle, AlertTriangle, User, MapPin, Phone, Briefcase } from 'lucide-react';

interface WorkerApprovalModalProps {
  isOpen: boolean;
  worker: any;
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export default function WorkerApprovalModal({ isOpen, worker, onClose, onApprove, onReject }: WorkerApprovalModalProps) {
  if (!isOpen || !worker) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden my-8 border border-gray-200 animate-fade-in-up">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-xl font-bold text-gray-900">Review Application</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-900 p-2 rounded-full hover:bg-gray-200 transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold">
              {worker.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{worker.name}</h3>
              <p className="text-sm text-gray-500">{worker.type} • Submitted: {worker.submitted}</p>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
              <Phone className="text-gray-400" size={18} />
              <div>
                <p className="text-xs text-gray-500">Phone Number</p>
                <p className="text-sm font-medium text-gray-900">{worker.phone}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
              <Briefcase className="text-gray-400" size={18} />
              <div>
                <p className="text-xs text-gray-500">Primary Skills</p>
                <p className="text-sm font-medium text-gray-900">{worker.skills}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
              <MapPin className="text-gray-400" size={18} />
              <div>
                <p className="text-xs text-gray-500">Location</p>
                <p className="text-sm font-medium text-gray-900">{worker.location}</p>
              </div>
            </div>

            <div className={`flex items-center gap-3 p-4 rounded-lg border ${worker.faceVerified ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              {worker.faceVerified ? (
                <CheckCircle className="text-green-600" size={24} />
              ) : (
                <AlertTriangle className="text-red-600" size={24} />
              )}
              <div>
                <p className={`text-sm font-bold ${worker.faceVerified ? 'text-green-800' : 'text-red-800'}`}>
                  {worker.faceVerified ? 'Face Verification Passed' : 'Face Verification Failed'}
                </p>
                <p className={`text-xs ${worker.faceVerified ? 'text-green-600' : 'text-red-600'}`}>
                  {worker.faceVerified ? 'Biometric match confirmed with ID.' : 'Could not verify identity. Manual review needed.'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => { onReject(worker.id); onClose(); }}
              className="flex-1 py-3 px-4 bg-white border border-red-200 text-red-600 hover:bg-red-50 font-bold rounded-xl transition-colors"
            >
              Reject
            </button>
            <button 
              onClick={() => { onApprove(worker.id); onClose(); }}
              className="flex-1 py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-md transition-colors"
            >
              Approve Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
