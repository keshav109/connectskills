import React, { useState } from 'react';
import { Star, ThumbsUp, MessageSquare, Calendar, User } from 'lucide-react';

const Reviews: React.FC = () => {
  const [selectedRating, setSelectedRating] = useState<number | 'all'>('all');

  const reviews = [
    {
      id: '1',
      customer: 'Sarah Johnson',
      jobTitle: 'Kitchen Sink Repair',
      rating: 5,
      comment: 'Excellent work! Mike was professional, punctual, and fixed the issue perfectly. The sink works like new and he cleaned up after himself. Highly recommend!',
      date: '2024-02-11',
      helpful: 12,
      jobAmount: 175
    },
    {
      id: '2',
      customer: 'Michael Chen',
      jobTitle: 'Bathroom Pipe Installation',
      rating: 5,
      comment: 'Outstanding service! Very knowledgeable and explained everything clearly. The installation was done efficiently and looks great.',
      date: '2024-02-08',
      helpful: 8,
      jobAmount: 450
    },
    {
      id: '3',
      customer: 'Emma Davis',
      jobTitle: 'Toilet Repair',
      rating: 4,
      comment: 'Good work overall. Fixed the problem quickly, though communication could have been better. Would hire again.',
      date: '2024-02-05',
      helpful: 5,
      jobAmount: 120
    },
    {
      id: '4',
      customer: 'David Wilson',
      jobTitle: 'Faucet Replacement',
      rating: 5,
      comment: 'Perfect job! Mike arrived on time, worked efficiently, and the new faucet works perfectly. Very satisfied with the service.',
      date: '2024-01-28',
      helpful: 15,
      jobAmount: 200
    },
    {
      id: '5',
      customer: 'Lisa Brown',
      jobTitle: 'Pipe Leak Repair',
      rating: 4,
      comment: 'Solid work. Fixed the leak and provided good advice on maintenance. Price was fair and work was completed on schedule.',
      date: '2024-01-25',
      helpful: 7,
      jobAmount: 150
    }
  ];

  const filteredReviews = selectedRating === 'all' 
    ? reviews 
    : reviews.filter(review => review.rating === selectedRating);

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: (reviews.filter(r => r.rating === rating).length / reviews.length) * 100
  }));

  const renderStars = (rating: number, size: number = 16) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            className={star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Reviews & Ratings</h2>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="flex items-center gap-2">
              {renderStars(Math.round(averageRating), 20)}
              <span className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}</span>
            </div>
            <p className="text-sm text-gray-600">{reviews.length} reviews</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Rating Overview */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Rating Breakdown</h3>
          <div className="space-y-4">
            {ratingDistribution.map((item) => (
              <div key={item.rating} className="flex items-center gap-4">
                <div className="flex items-center gap-2 w-16">
                  <span className="text-sm font-medium">{item.rating}</span>
                  <Star size={14} className="text-yellow-400 fill-current" />
                </div>
                <div className="flex-1">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-sm text-gray-600 w-8">{item.count}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <h4 className="font-medium text-gray-900 mb-4">Filter by Rating</h4>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedRating('all')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  selectedRating === 'all' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
                }`}
              >
                All Reviews ({reviews.length})
              </button>
              {[5, 4, 3, 2, 1].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setSelectedRating(rating)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                    selectedRating === rating ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
                  }`}
                >
                  {renderStars(rating, 14)}
                  <span>({ratingDistribution.find(r => r.rating === rating)?.count || 0})</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredReviews.map((review) => (
            <div key={review.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{review.customer}</h4>
                    <p className="text-sm text-gray-600">{review.jobTitle}</p>
                  </div>
                </div>
                <div className="text-right">
                  {renderStars(review.rating)}
                  <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed">{review.comment}</p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                    <ThumbsUp size={16} />
                    <span className="text-sm">Helpful ({review.helpful})</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                    <MessageSquare size={16} />
                    <span className="text-sm">Reply</span>
                  </button>
                </div>
                <div className="text-sm text-gray-500">
                  Job Value: ${review.jobAmount}
                </div>
              </div>
            </div>
          ))}

          {filteredReviews.length === 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews found</h3>
              <p className="text-gray-600">
                {selectedRating === 'all' 
                  ? "You don't have any reviews yet." 
                  : `No ${selectedRating}-star reviews found.`}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Review Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 text-center">
          <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Star size={24} className="text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Average Rating</h3>
          <p className="text-3xl font-bold text-green-600">{averageRating.toFixed(1)}</p>
          <p className="text-sm text-gray-600">out of 5.0</p>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 text-center">
          <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-4">
            <MessageSquare size={24} className="text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Total Reviews</h3>
          <p className="text-3xl font-bold text-blue-600">{reviews.length}</p>
          <p className="text-sm text-gray-600">from customers</p>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 text-center">
          <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mx-auto mb-4">
            <ThumbsUp size={24} className="text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Recommendation Rate</h3>
          <p className="text-3xl font-bold text-purple-600">
            {Math.round((reviews.filter(r => r.rating >= 4).length / reviews.length) * 100)}%
          </p>
          <p className="text-sm text-gray-600">would recommend</p>
        </div>
      </div>
    </div>
  );
};

export default Reviews;