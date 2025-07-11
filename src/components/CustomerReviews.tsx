import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const CustomerReviews: React.FC = () => {
  const reviews = [
    {
      id: 1,
      name: "Priya Sharma",
      rating: 5,
      comment: "The AI body scan is incredible! Perfect fit every time. Revolutionary technology that changed how I shop.",
      avatar: "PS",
      location: "Mumbai"
    },
    {
      id: 2,
      name: "Arjun Patel",
      rating: 5,
      comment: "Amazing quality and the virtual try-on saved me so much time. Love the luxury experience and attention to detail!",
      avatar: "AP",
      location: "Delhi"
    },
    {
      id: 3,
      name: "Sneha Reddy",
      rating: 5,
      comment: "Love the personalized recommendations. Best fashion app I've ever used! The AI suggestions are spot-on.",
      avatar: "SR",
      location: "Bangalore"
    },
    {
      id: 4,
      name: "Vikram Singh",
      rating: 5,
      comment: "Revolutionary technology. Never buying clothes without this again. Absolutely perfect fit every single time!",
      avatar: "VS",
      location: "Pune"
    },
    {
      id: 5,
      name: "Ananya Gupta",
      rating: 5,
      comment: "The luxury feel and perfect fit recommendations are unmatched. Premium experience that exceeds expectations!",
      avatar: "AG",
      location: "Chennai"
    },
    {
      id: 6,
      name: "Rohit Kumar",
      rating: 5,
      comment: "Fast delivery, perfect sizing, and beautiful quality. RARITONE exceeded all my expectations and more!",
      avatar: "RK",
      location: "Hyderabad"
    },
    {
      id: 7,
      name: "Kavya Nair",
      rating: 5,
      comment: "The body scan technology is mind-blowing. Finally found clothes that fit perfectly without trying them on!",
      avatar: "KN",
      location: "Kochi"
    },
    {
      id: 8,
      name: "Aditya Joshi",
      rating: 5,
      comment: "Luxury fashion meets cutting-edge technology. The AI recommendations are incredibly accurate and helpful.",
      avatar: "AJ",
      location: "Jaipur"
    }
  ];

  return (
    <section className="py-16 sm:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="hero-title mb-6 flex items-center justify-center">
            <Star className="mr-4" size={40} color="var(--soft-tan)" />
            What Our Customers Say
          </h2>
          <p className="hero-subtitle max-w-3xl mx-auto px-4">
            Join thousands of satisfied customers who love our AI-powered fashion experience. 
            Real reviews from real people across India.
          </p>
        </motion.div>
      </div>

      {/* Infinite Scrolling Reviews Carousel */}
      <div className="reviews-carousel">
        <div className="reviews-track">
          {/* Duplicate reviews for seamless infinite loop */}
          {[...reviews, ...reviews].map((review, index) => (
            <motion.div
              key={`${review.id}-${index}`}
              className="review-card"
              whileHover={{ 
                scale: 1.05,
                y: -10
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start mb-4">
                <div 
                  className="review-avatar"
                  style={{
                    background: index % 2 === 0 ? 'var(--soft-tan)' : 'var(--olive-green)',
                    color: index % 2 === 0 ? 'var(--secondary-button)' : 'var(--light-off-white)'
                  }}
                >
                  {review.avatar}
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="font-semibold text-lg luxury-body" style={{ color: 'var(--text-primary)' }}>
                    {review.name}
                  </h4>
                  <p className="text-sm luxury-body" style={{ color: 'var(--olive-green)' }}>
                    {review.location}
                  </p>
                  <div className="flex mt-2 review-stars">
                    {[...Array(review.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Star 
                          size={16} 
                          fill="var(--soft-tan)" 
                          color="var(--soft-tan)" 
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
              <motion.p 
                className="review-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                "{review.comment}"
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Gradient Overlays for Seamless Effect */}
      <div className="absolute left-0 top-0 bottom-0 w-32 pointer-events-none z-10" 
           style={{ background: 'linear-gradient(to right, var(--main-bg), transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-32 pointer-events-none z-10" 
           style={{ background: 'linear-gradient(to left, var(--main-bg), transparent)' }} />
    </section>
  );
};

export default CustomerReviews;