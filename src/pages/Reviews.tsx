import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Send, ArrowLeft, Heart, ThumbsUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ToastContainer';
import Navbar from '@/components/Navbar';

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  helpful: number;
  avatar: string;
}

const Reviews = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewData, setReviewData] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    title: '',
    comment: ''
  });

  // Mock existing reviews
  const existingReviews: Review[] = [
    {
      id: '1',
      name: 'Priya Sharma',
      rating: 5,
      comment: 'Absolutely love the quality and fit! The AI body scan was incredibly accurate. Best online shopping experience ever.',
      date: '2025-01-15',
      verified: true,
      helpful: 24,
      avatar: 'PS'
    },
    {
      id: '2',
      name: 'Arjun Patel',
      rating: 5,
      comment: 'Premium quality clothing with perfect sizing. The delivery was super fast and packaging was excellent.',
      date: '2025-01-12',
      verified: true,
      helpful: 18,
      avatar: 'AP'
    },
    {
      id: '3',
      name: 'Sneha Reddy',
      rating: 4,
      comment: 'Great collection and unique designs. The virtual try-on feature is amazing. Highly recommended!',
      date: '2025-01-10',
      verified: false,
      helpful: 12,
      avatar: 'SR'
    },
    {
      id: '4',
      name: 'Vikram Singh',
      rating: 5,
      comment: 'Outstanding customer service and product quality. The AI recommendations were spot on!',
      date: '2025-01-08',
      verified: true,
      helpful: 31,
      avatar: 'VS'
    }
  ];

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      showToast({
        type: 'warning',
        title: 'Rating Required',
        message: 'Please select a star rating before submitting your review.'
      });
      return;
    }

    if (!reviewData.comment.trim()) {
      showToast({
        type: 'warning',
        title: 'Review Required',
        message: 'Please write a review comment before submitting.'
      });
      return;
    }

    // Simulate review submission
    showToast({
      type: 'success',
      title: 'Review Submitted!',
      message: 'Thank you for your review. It will be published after moderation.'
    });

    // Reset form
    setRating(0);
    setReviewData({
      name: user?.displayName || '',
      email: user?.email || '',
      title: '',
      comment: ''
    });
  };

  const averageRating = existingReviews.reduce((sum, review) => sum + review.rating, 0) / existingReviews.length;
  const ratingDistribution = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: existingReviews.filter(review => review.rating === star).length,
    percentage: (existingReviews.filter(review => review.rating === star).length / existingReviews.length) * 100
  }));

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        onSearchOpen={() => {}}
        onCartOpen={() => {}}
        pageTitle="Customer Reviews"
        showBackButton={true}
      />

      <div className="pt-16 max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-gray-900 mb-4">Customer Reviews</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Share your experience with RARITONE and help other customers make informed decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Review Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Overall Rating</h2>
                
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    {averageRating.toFixed(1)}
                  </div>
                  <div className="flex justify-center mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={24}
                        className={`${
                          star <= Math.round(averageRating)
                            ? 'text-amber-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600">Based on {existingReviews.length} reviews</p>
                </div>

                {/* Rating Distribution */}
                <div className="space-y-2">
                  {ratingDistribution.map(({ star, count, percentage }) => (
                    <div key={star} className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 w-8">{star}★</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-amber-400 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 w-8">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Reviews List and Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Write Review Form */}
              <div className="bg-white border rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Write a Review</h2>
                
                <form onSubmit={handleSubmitReview} className="space-y-6">
                  {/* Star Rating */}
                  <div>
                    <Label className="text-gray-900 mb-2 block">Your Rating</Label>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoveredRating(star)}
                          onMouseLeave={() => setHoveredRating(0)}
                          className="focus:outline-none"
                        >
                          <Star
                            size={32}
                            className={`transition-colors ${
                              star <= (hoveredRating || rating)
                                ? 'text-amber-400 fill-current'
                                : 'text-gray-300 hover:text-amber-200'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name and Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-gray-900">Name</Label>
                      <Input
                        id="name"
                        type="text"
                        value={reviewData.name}
                        onChange={(e) => setReviewData({...reviewData, name: e.target.value})}
                        required
                        className="mt-1 border-gray-300 focus:border-black focus:ring-black"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-gray-900">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={reviewData.email}
                        onChange={(e) => setReviewData({...reviewData, email: e.target.value})}
                        required
                        className="mt-1 border-gray-300 focus:border-black focus:ring-black"
                      />
                    </div>
                  </div>

                  {/* Review Title */}
                  <div>
                    <Label htmlFor="title" className="text-gray-900">Review Title (Optional)</Label>
                    <Input
                      id="title"
                      type="text"
                      value={reviewData.title}
                      onChange={(e) => setReviewData({...reviewData, title: e.target.value})}
                      placeholder="Summarize your experience"
                      className="mt-1 border-gray-300 focus:border-black focus:ring-black"
                    />
                  </div>

                  {/* Review Comment */}
                  <div>
                    <Label htmlFor="comment" className="text-gray-900">Your Review</Label>
                    <textarea
                      id="comment"
                      value={reviewData.comment}
                      onChange={(e) => setReviewData({...reviewData, comment: e.target.value})}
                      required
                      rows={4}
                      placeholder="Share your experience with RARITONE..."
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-black text-white hover:bg-gray-800 flex items-center justify-center space-x-2"
                  >
                    <Send size={18} />
                    <span>Submit Review</span>
                  </Button>
                </form>
              </div>

              {/* Existing Reviews */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Customer Reviews</h2>
                
                {existingReviews.map((review, index) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white border rounded-lg p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-semibold text-gray-700">
                          {review.avatar}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold text-gray-900">{review.name}</h4>
                            {review.verified && (
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                Verified Purchase
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  size={16}
                                  className={`${
                                    star <= review.rating
                                      ? 'text-amber-400 fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed mb-4">{review.comment}</p>
                    
                    <div className="flex items-center justify-between">
                      <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors">
                        <ThumbsUp size={16} />
                        <span className="text-sm">Helpful ({review.helpful})</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Reviews;