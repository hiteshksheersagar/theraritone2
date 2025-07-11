import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const CustomerReviews: React.FC = () => {
  const reviews = [
    {
      id: 1,
      name: "Priya Sharma",
      rating: 5,
      comment: "The AI body scan is incredible! Perfect fit every time. Revolutionary technology.",
      avatar: "PS",
      location: "Mumbai"
    },
    {
      id: 2,
      name: "Arjun Patel",
      rating: 5,
      comment: "Amazing quality and the virtual try-on saved me so much time. Love the experience!",
      avatar: "AP",
      location: "Delhi"
    },
    {
      id: 3,
      name: "Sneha Reddy",
      rating: 5,
      comment: "Love the personalized recommendations. Best fashion app I've ever used!",
      avatar: "SR",
      location: "Bangalore"
    },
    {
      id: 4,
      name: "Vikram Singh",
      rating: 5,
      comment: "Revolutionary technology. Never buying clothes without this again. Absolutely perfect!",
      avatar: "VS",
      location: "Pune"
    },
    {
      id: 5,
      name: "Ananya Gupta",
      rating: 5,
      comment: "The luxury feel and perfect fit recommendations are unmatched. Premium experience!",
      avatar: "AG",
      location: "Chennai"
    },
    {
      id: 6,
      name: "Rohit Kumar",
      rating: 5,
      comment: "Fast delivery, perfect sizing, and beautiful quality. RARITONE exceeded expectations!",
      avatar: "RK",
      location: "Hyderabad"
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
            <Star className="mr-4" size={40} color="var(--primary-accent)" />
            What Our Customers Say
          </h2>
          <p className="hero-subtitle max-w-3xl mx-auto px-4">
            Join thousands of satisfied customers who love our AI-powered fashion experience. 
            Real reviews from real people across India.
          </p>
        </motion.div>
      </div>

      {/* Infinite Scrolling Reviews */}
      <div className="relative">
        <motion.div 
          className="flex space-x-6"
          animate={{
            x: [0, -100 * reviews.length]
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
          style={{ width: `${(reviews.length * 2) * 100}%` }}
        >
          {/* Duplicate reviews for seamless loop */}
          {[...reviews, ...reviews].map((review, index) => (
            <motion.div
              key={`${review.id}-${index}`}
              className="flex-shrink-0 w-80 mx-3"
              whileHover={{ 
                scale: 1.05,
                y: -10
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="luxury-card p-6 h-full card-hover">
                <div className="flex items-center mb-4">
                  <motion.div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-black font-semibold mr-4"
                    style={{ background: 'var(--primary-accent)' }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {review.avatar}
                  </motion.div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-[var(--text-primary)] text-lg">
                      {review.name}
                    </h4>
                    <p className="text-[var(--secondary-accent)] text-sm">
                      {review.location}
                    </p>
                    <div className="flex mt-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <Star 
                            size={16} 
                            fill="var(--primary-accent)" 
                            color="var(--primary-accent)" 
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
                <motion.p 
                  className="text-[var(--secondary-accent)] italic leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  "{review.comment}"
                </motion.p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Gradient Overlays for Seamless Effect */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
    </section>
  );
};

export default CustomerReviews;