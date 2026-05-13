import React, { useState } from 'react';
import { Camera, MapPin, Phone, Mail, Star, Edit, Save, X, Scan } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { mockWorkers, mockCustomers } from '../../utils/mockData';
import FaceRecognitionModal from './FaceRecognitionModal';

const Profile: React.FC = () => {
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showFaceAuth, setShowFaceAuth] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    location: '',
    bio: '',
    skills: [] as string[],
    hourlyRate: 0,
    yearsExperience: 0
  });

  // Get user details based on role
  const getUserDetails = () => {
    if (currentUser?.role === 'worker') {
      return mockWorkers.find(w => w.id === currentUser.id);
    } else if (currentUser?.role === 'customer') {
      return mockCustomers.find(c => c.id === currentUser.id);
    }
    return null;
  };

  const userDetails = getUserDetails();

  React.useEffect(() => {
    if (userDetails) {
      setFormData({
        name: userDetails.name,
        email: userDetails.email,
        phone: userDetails.phone,
        location: 'location' in userDetails ? userDetails.location : '',
        bio: 'bio' in userDetails ? userDetails.bio : '',
        skills: 'skills' in userDetails ? userDetails.skills : [],
        hourlyRate: 'hourlyRate' in userDetails ? userDetails.hourlyRate : 0,
        yearsExperience: 'yearsExperience' in userDetails ? userDetails.yearsExperience : 0
      });
    }
  }, [userDetails]);

  const handleSave = () => {
    // Mock save functionality
    console.log('Saving profile:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset form data
    if (userDetails) {
      setFormData({
        name: userDetails.name,
        email: userDetails.email,
        phone: userDetails.phone,
        location: 'location' in userDetails ? userDetails.location : '',
        bio: 'bio' in userDetails ? userDetails.bio : '',
        skills: 'skills' in userDetails ? userDetails.skills : [],
        hourlyRate: 'hourlyRate' in userDetails ? userDetails.hourlyRate : 0,
        yearsExperience: 'yearsExperience' in userDetails ? userDetails.yearsExperience : 0
      });
    }
    setIsEditing(false);
  };

  const addSkill = (skill: string) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Edit size={16} />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Save size={16} />
              Save
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <X size={16} />
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="text-center">
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-3xl font-bold text-blue-600">
                  {formData.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <Camera size={16} />
                </button>
              )}
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-1">{formData.name}</h3>
            <p className="text-gray-600 capitalize mb-4">{currentUser?.role}</p>
            
            {currentUser?.role === 'worker' && userDetails && 'rating' in userDetails && (
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      className={star <= userDetails.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {userDetails.rating} ({userDetails.completedJobs} jobs)
                </span>
              </div>
            )}

            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <Mail size={16} />
                <span>{formData.email}</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <Phone size={16} />
                <span>{formData.phone}</span>
              </div>
              {formData.location && (
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <MapPin size={16} />
                  <span>{formData.location}</span>
                </div>
              )}
            </div>

            {currentUser?.role === 'worker' && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <button
                  onClick={() => setShowFaceAuth(true)}
                  className="w-full flex items-center justify-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2.5 rounded-xl hover:bg-indigo-100 transition-colors font-medium border border-indigo-200"
                >
                  <Scan size={18} />
                  Verify Identity
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{formData.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{formData.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{formData.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="City, State"
                  />
                ) : (
                  <p className="text-gray-900">{formData.location || 'Not specified'}</p>
                )}
              </div>
            </div>

            {currentUser?.role === 'worker' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hourly Rate</label>
                  {isEditing ? (
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                      <input
                        type="number"
                        value={formData.hourlyRate}
                        onChange={(e) => setFormData(prev => ({ ...prev, hourlyRate: parseInt(e.target.value) || 0 }))}
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                  ) : (
                    <p className="text-gray-900">{formData.hourlyRate} Rupees/hr</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={formData.yearsExperience}
                      onChange={(e) => setFormData(prev => ({ ...prev, yearsExperience: parseInt(e.target.value) || 0 }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0"
                    />
                  ) : (
                    <p className="text-gray-900">{formData.yearsExperience} years</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Bio */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {currentUser?.role === 'worker' ? 'Professional Bio' : 'About Me'}
            </h3>
            {isEditing ? (
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={currentUser?.role === 'worker' 
                  ? "Describe your experience, specialties, and what makes you unique..."
                  : "Tell us a bit about yourself..."
                }
              />
            ) : (
              <p className="text-gray-700 leading-relaxed">
                {formData.bio || `No ${currentUser?.role === 'worker' ? 'bio' : 'description'} provided yet.`}
              </p>
            )}
          </div>

          {/* Skills (Worker only) */}
          {currentUser?.role === 'worker' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills & Expertise</h3>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {formData.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                    {isEditing && (
                      <button
                        onClick={() => removeSkill(skill)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </span>
                ))}
              </div>

              {isEditing && (
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add a skill..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addSkill((e.target as HTMLInputElement).value);
                        (e.target as HTMLInputElement).value = '';
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      const input = document.querySelector('input[placeholder="Add a skill..."]') as HTMLInputElement;
                      if (input) {
                        addSkill(input.value);
                        input.value = '';
                      }
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <FaceRecognitionModal 
        isOpen={showFaceAuth} 
        onClose={() => setShowFaceAuth(false)} 
      />
    </div>
  );
};

export default Profile;