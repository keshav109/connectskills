import React, { useState } from 'react';
import { Search, Filter, AlertTriangle, MessageCircle, CheckCircle, Clock } from 'lucide-react';

const mockDisputes = [
  { id: 'D-1847', jobTitle: 'Kitchen Sink Repair', customer: 'Ramesh Singh', worker: 'Muzahid Hussain', status: 'pending', amount: 350, date: '2026-05-13', reason: 'Worker did not complete the job satisfactorily.' },
  { id: 'D-1848', jobTitle: 'Electrical Wiring', customer: 'Suresh Kumar', worker: 'Avinash Kumar', status: 'resolved', amount: 800, date: '2026-05-12', reason: 'Overcharged for materials.' },
  { id: 'D-1849', jobTitle: 'House Painting', customer: 'Anita Gupta', worker: 'Vikram Painters', status: 'investigating', amount: 4500, date: '2026-05-11', reason: 'Paint quality is not as promised.' }
];

const ManageDisputes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDisputes = mockDisputes.filter(d => d.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) || d.id.toLowerCase().includes(searchTerm.toLowerCase()));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'investigating': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Manage Disputes</h2>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">{filteredDisputes.length} disputes</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search by Job ID or Title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter size={16} />
            Filter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-6">
          <div className="space-y-4">
            {filteredDisputes.map(dispute => (
              <div key={dispute.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-bold text-gray-900">{dispute.id}</span>
                      <h3 className="text-lg font-semibold text-gray-900">{dispute.jobTitle}</h3>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(dispute.status)}`}>
                        {dispute.status.charAt(0).toUpperCase() + dispute.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2"><strong>Reason:</strong> {dispute.reason}</p>
                    <div className="text-sm text-gray-500 flex gap-4">
                      <span><strong>Customer:</strong> {dispute.customer}</span>
                      <span><strong>Worker:</strong> {dispute.worker}</span>
                      <span><strong>Amount in Dispute:</strong> ₹{dispute.amount}</span>
                      <span><strong>Date:</strong> {dispute.date}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      Review Dispute
                    </button>
                    <button className="flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      <MessageCircle size={16} />
                      Contact Parties
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {filteredDisputes.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <AlertTriangle size={32} className="mx-auto mb-4 text-gray-400" />
                <p>No disputes found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageDisputes;
