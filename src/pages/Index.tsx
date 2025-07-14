import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, ShoppingBag, Star } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from '@/components/Navbar';
import SearchOverlay from '@/components/SearchOverlay';
import ChatWidget from '@/components/ChatWidget';
import ProductModal from '@/components/ProductModal';
import AddToCartToast from '@/components/AddToCartToast';
import { useToast } from '@/components/ToastContainer';
import { useAuth } from '@/contexts/AuthContext';
import { addToCart } from '@/lib/user';

const Index = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCartToast, setShowCartToast] = useState(false);
  const [cartToastItem, setCartToastItem] = useState(null);
  const [navbarVisible, setNavbarVisible] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { user, refreshCart, addToLocalCart } = useAuth();
  const { scrollY } = useScroll();

  // Enhanced smooth scroll transforms
  const logoScale = useTransform(scrollY, [0, 600], [1, 0.6]);
  const logoY = useTransform(scrollY, [0, 600], [0, -300]);
  const logoOpacity = useTransform(scrollY, [0, 500, 600], [1, 0.8, 0]);
  const butterflyScale = useTransform(scrollY, [0, 800], [1, 0.3]);
  const butterflyY = useTransform(scrollY, [0, 800], [0, -500]);
  const butterflyOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const buttonsY = useTransform(scrollY, [0, 500], [0, -250]);
  const buttonsOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Navbar visibility based on scroll
  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setNavbarVisible(latest > 700);
    });
    return unsubscribe;
  }, [scrollY]);

  // Handle add to cart from modal
  const handleAddToCart = async (product: any, quantity: number, size?: string, color?: string) => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      size,
      imageURL: product.image
    };

    if (user) {
      try {
        await addToCart(user.uid, cartItem);
        await refreshCart();
      } catch (error) {
        console.error('Error adding to cart:', error);
        showToast({
          type: 'error',
          title: 'Error',
          message: 'Failed to add item to cart. Please try again.'
        });
        return;
      }
    } else {
      addToLocalCart(cartItem);
    }

    setCartToastItem(cartItem);
    setShowCartToast(true);
  };

  // Raritone Collection Categories
  const categories = [
    {
      id: 'tops',
      name: 'Oversized T-Shirts',
      image: '/Raritone Collection/Bold vibe Oversize Tshirt.jpg',
      count: '15+ Designs'
    },
    {
      id: 'hoodies',
      name: 'Premium Hoodies',
      image: '/Raritone Collection/Hoddie1(F).jpg',
      count: '8+ Styles'
    },
    {
      id: 'graphics',
      name: 'Graphic Tees',
      image: '/Raritone Collection/Kiss me again.jpeg',
      count: '12+ Prints'
    },
    {
      id: 'minimal',
      name: 'Minimal Collection',
      image: '/Raritone Collection/Minimal look Oversize Tshirt.jpg',
      count: '10+ Items'
    }
  ];

  const reviews = [
    {
      id: 1,
      name: "Priya Sharma",
      rating: 5,
      comment: "The quality is incredible! Perfect fit every time. Love the premium feel and unique designs.",
      avatar: "PS",
      location: "Mumbai"
    },
    {
      id: 2,
      name: "Arjun Patel",
      rating: 5,
      comment: "Amazing quality and the designs are so unique. Love the luxury experience and attention to detail!",
      avatar: "AP",
      location: "Delhi"
    },
    {
      id: 3,
      name: "Sneha Reddy",
      rating: 5,
      comment: "Love the style and comfort. Best fashion brand I've discovered! The fit is perfect.",
      avatar: "SR",
      location: "Bangalore"
    },
    {
      id: 4,
      name: "Vikram Singh",
      rating: 5,
      comment: "Premium quality clothing. Never buying from anywhere else again. Absolutely perfect!",
      avatar: "VS",
      location: "Pune"
    },
    {
      id: 5,
      name: "Ananya Gupta",
      rating: 5,
      comment: "The luxury feel and perfect fit are unmatched. Premium experience that exceeds expectations!",
      avatar: "AG",
      location: "Chennai"
    },
    {
      id: 6,
      name: "Rohit Kumar",
      rating: 5,
      comment: "Fast delivery, perfect sizing, and beautiful quality. RARITONE exceeded all expectations!",
      avatar: "RK",
      location: "Hyderabad"
    }
  ];

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Enhanced 3D Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800">
          {/* Enhanced 3D Spheres */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-15"
            style={{
              background: 'radial-gradient(circle, rgba(209,169,128,0.4) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
            animate={{
              scale: [1, 1.3, 1],
              x: [0, 80, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-12"
            style={{
              background: 'radial-gradient(circle, rgba(116,136,115,0.5) 0%, transparent 70%)',
              filter: 'blur(70px)',
            }}
            animate={{
              scale: [1, 0.7, 1],
              x: [0, -60, 0],
              y: [0, 60, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
          />
          
          {/* Enhanced Floating Particles */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-amber-400 rounded-full opacity-70"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -150, 0],
                opacity: [0.7, 1, 0.7],
                scale: [1, 2, 1],
              }}
              transition={{
                duration: 8 + Math.random() * 6,
                repeat: Infinity,
                delay: Math.random() * 8,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <Navbar 
        onSearchOpen={() => setIsSearchOpen(true)}
        onCartOpen={() => {}}
        isVisible={navbarVisible}
      />

      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col items-center justify-center z-10">
        {/* Enhanced White Butterfly with Grey Essence - Much Larger */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            y: butterflyY,
            scale: butterflyScale,
            opacity: butterflyOpacity,
          }}
        >
          <motion.svg
            width="1400"
            height="1000"
            viewBox="0 0 1400 1000"
            className="opacity-80"
            animate={{
              rotateY: [0, 1, 0, -1, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Enhanced White Butterfly Body with Grey Essence */}
            <motion.ellipse
              cx="700"
              cy="500"
              rx="10"
              ry="140"
              fill="url(#butterflyBodyGradient)"
              animate={{
                ry: [140, 145, 140],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Body Segments */}
            <ellipse cx="700" cy="420" rx="8" ry="15" fill="rgba(200, 200, 200, 0.9)" />
            <ellipse cx="700" cy="460" rx="9" ry="18" fill="rgba(180, 180, 180, 0.8)" />
            <ellipse cx="700" cy="520" rx="8" ry="15" fill="rgba(160, 160, 160, 0.7)" />
            <ellipse cx="700" cy="560" rx="7" ry="12" fill="rgba(140, 140, 140, 0.6)" />
            
            {/* Left Upper Wing - White with Grey Essence */}
            <motion.path
              d="M700 450 Q450 280 220 330 Q80 380 100 480 Q120 580 250 620 Q450 650 600 600 Q650 560 700 520"
              fill="url(#whiteWingGradient1)"
              stroke="rgba(120, 120, 120, 0.6)"
              strokeWidth="1.5"
              animate={{
                d: [
                  "M700 450 Q450 280 220 330 Q80 380 100 480 Q120 580 250 620 Q450 650 600 600 Q650 560 700 520",
                  "M700 450 Q445 275 215 325 Q75 375 95 475 Q115 575 245 615 Q445 645 595 595 Q645 555 700 520",
                  "M700 450 Q450 280 220 330 Q80 380 100 480 Q120 580 250 620 Q450 650 600 600 Q650 560 700 520"
                ]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Right Upper Wing - White with Grey Essence */}
            <motion.path
              d="M700 450 Q950 280 1180 330 Q1320 380 1300 480 Q1280 580 1150 620 Q950 650 800 600 Q750 560 700 520"
              fill="url(#whiteWingGradient1)"
              stroke="rgba(120, 120, 120, 0.6)"
              strokeWidth="1.5"
              animate={{
                d: [
                  "M700 450 Q950 280 1180 330 Q1320 380 1300 480 Q1280 580 1150 620 Q950 650 800 600 Q750 560 700 520",
                  "M700 450 Q955 275 1185 325 Q1325 375 1305 475 Q1285 575 1155 615 Q955 645 805 595 Q755 555 700 520",
                  "M700 450 Q950 280 1180 330 Q1320 380 1300 480 Q1280 580 1150 620 Q950 650 800 600 Q750 560 700 520"
                ]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3
              }}
            />
            
            {/* Left Lower Wing - White with Grey Essence */}
            <motion.path
              d="M700 520 Q580 640 450 680 Q320 720 300 780 Q310 840 370 830 Q450 810 550 780 Q620 740 700 680"
              fill="url(#whiteWingGradient2)"
              stroke="rgba(120, 120, 120, 0.5)"
              strokeWidth="1.5"
              animate={{
                d: [
                  "M700 520 Q580 640 450 680 Q320 720 300 780 Q310 840 370 830 Q450 810 550 780 Q620 740 700 680",
                  "M700 520 Q575 635 445 675 Q315 715 295 775 Q305 835 365 825 Q445 805 545 775 Q615 735 700 680",
                  "M700 520 Q580 640 450 680 Q320 720 300 780 Q310 840 370 830 Q450 810 550 780 Q620 740 700 680"
                ]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.6
              }}
            />
            
            {/* Right Lower Wing - White with Grey Essence */}
            <motion.path
              d="M700 520 Q820 640 950 680 Q1080 720 1100 780 Q1090 840 1030 830 Q950 810 850 780 Q780 740 700 680"
              fill="url(#whiteWingGradient2)"
              stroke="rgba(120, 120, 120, 0.5)"
              strokeWidth="1.5"
              animate={{
                d: [
                  "M700 520 Q820 640 950 680 Q1080 720 1100 780 Q1090 840 1030 830 Q950 810 850 780 Q780 740 700 680",
                  "M700 520 Q825 635 955 675 Q1085 715 1105 775 Q1095 835 1035 825 Q955 805 855 775 Q785 735 700 680",
                  "M700 520 Q820 640 950 680 Q1080 720 1100 780 Q1090 840 1030 830 Q950 810 850 780 Q780 740 700 680"
                ]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.9
              }}
            />

            {/* Wing Patterns and Details - Grey Essence */}
            <motion.g
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{
                repeat: Infinity,
                duration: 8,
                ease: "easeInOut"
              }}
            >
              {/* Wing veins */}
              <path d="M700 450 Q580 420 460 440" stroke="rgba(120, 120, 120, 0.6)" strokeWidth="1.5" fill="none" />
              <path d="M680 470 Q560 450 440 470" stroke="rgba(120, 120, 120, 0.5)" strokeWidth="1.5" fill="none" />
              <path d="M700 450 Q820 420 940 440" stroke="rgba(120, 120, 120, 0.6)" strokeWidth="1.5" fill="none" />
              <path d="M720 470 Q840 450 960 470" stroke="rgba(120, 120, 120, 0.5)" strokeWidth="1.5" fill="none" />
              
              {/* Wing spots - Grey essence */}
              <circle cx="500" cy="470" r="18" fill="rgba(160, 160, 160, 0.4)" />
              <circle cx="900" cy="470" r="18" fill="rgba(160, 160, 160, 0.4)" />
              <circle cx="500" cy="470" r="10" fill="rgba(120, 120, 120, 0.6)" />
              <circle cx="900" cy="470" r="10" fill="rgba(120, 120, 120, 0.6)" />
            </motion.g>
            
            {/* Antennae - Grey */}
            <motion.g
              animate={{ 
                rotate: [0, 2, -2, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 8,
                ease: "easeInOut"
              }}
            >
              <path d="M690 400 Q685 380 680 360 Q678 350 675 340" stroke="rgba(120, 120, 120, 0.9)" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M710 400 Q715 380 720 360 Q722 350 725 340" stroke="rgba(120, 120, 120, 0.9)" strokeWidth="3" fill="none" strokeLinecap="round" />
              <ellipse cx="675" cy="338" rx="3" ry="6" fill="rgba(100, 100, 100, 0.9)" />
              <ellipse cx="725" cy="338" rx="3" ry="6" fill="rgba(100, 100, 100, 0.9)" />
            </motion.g>

            {/* Gradients for White Butterfly with Grey Essence */}
            <defs>
              <radialGradient id="butterflyBodyGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(220, 220, 220, 0.9)" />
                <stop offset="50%" stopColor="rgba(180, 180, 180, 0.8)" />
                <stop offset="100%" stopColor="rgba(140, 140, 140, 0.7)" />
              </radialGradient>
              
              <radialGradient id="whiteWingGradient1" cx="40%" cy="50%" r="60%">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.9)" />
                <stop offset="30%" stopColor="rgba(240, 240, 240, 0.8)" />
                <stop offset="60%" stopColor="rgba(200, 200, 200, 0.6)" />
                <stop offset="100%" stopColor="rgba(160, 160, 160, 0.4)" />
              </radialGradient>
              
              <radialGradient id="whiteWingGradient2" cx="50%" cy="60%" r="50%">
                <stop offset="0%" stopColor="rgba(250, 250, 250, 0.8)" />
                <stop offset="50%" stopColor="rgba(220, 220, 220, 0.6)" />
                <stop offset="100%" stopColor="rgba(180, 180, 180, 0.4)" />
              </radialGradient>
            </defs>
          </motion.svg>
        </motion.div>

        {/* Logo - Overlapping the Butterfly */}
        <motion.div
          className="mb-8 z-30 relative"
          style={{
            scale: logoScale,
            y: logoY,
            opacity: logoOpacity,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <img
            src="/Raritone.png"
            alt="RARITONE"
            className="h-48 sm:h-56 lg:h-64 w-auto"
            style={{
              filter: 'drop-shadow(0 0 40px rgba(255, 255, 255, 0.8))',
            }}
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-xl sm:text-2xl text-gray-400 mb-20 text-center max-w-md z-20"
          style={{ opacity: logoOpacity }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 0.5 }}
        >
          Fashion Meets Technology
        </motion.p>

        {/* Action Buttons - Moved Below */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 z-30 mt-16"
          style={{
            y: buttonsY,
            opacity: buttonsOpacity,
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 1 }}
        >
          <motion.button
            className="flex items-center space-x-3 bg-amber-600 hover:bg-amber-700 text-black font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
            onClick={() => navigate('/scan')}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Camera size={20} />
            <span>Start Body Scan</span>
          </motion.button>
          
          <motion.button
            className="flex items-center space-x-3 border-2 border-gray-600 hover:border-amber-600 text-white hover:text-amber-600 font-semibold px-8 py-4 rounded-full transition-all duration-300"
            onClick={() => navigate('/catalog')}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingBag size={20} />
            <span>Browse Collection</span>
          </motion.button>
        </motion.div>

        {/* Privacy Notice */}
        <motion.p
          className="text-sm text-gray-500 mt-12 text-center max-w-lg px-4 z-20"
          style={{ opacity: buttonsOpacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.5 }}
        >
          This site uses webcam access to enable body scanning. Your camera data is never stored or shared.
        </motion.p>
      </div>

      {/* Shop by Category Section */}
      <div className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Shop by Category</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Discover our exclusive Raritone collections designed for every style and occasion.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <motion.div
                key={category.id}
                className="group cursor-pointer"
                onClick={() => navigate(`/catalog?category=${category.id}`)}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative overflow-hidden rounded-xl bg-gray-800 border border-gray-700">
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-semibold text-white mb-1">{category.name}</h3>
                    <p className="text-gray-300 text-sm">{category.count}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Brand Models Section */}
      <div className="relative z-10 py-20 bg-gradient-to-r from-gray-900 via-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Wear the Difference</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Experience premium fashion that speaks to your style. Our collections are designed for those who appreciate quality and uniqueness.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Model wearing Raritone collection"
                className="w-full h-[600px] object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-3xl font-bold text-white mb-4">Premium Quality</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Every piece in our collection is crafted with meticulous attention to detail, 
                  using only the finest materials to ensure comfort, durability, and style.
                </p>
              </div>
              
              <div>
                <h3 className="text-3xl font-bold text-white mb-4">Unique Designs</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Our exclusive designs are created to make you stand out. From bold graphics 
                  to minimalist aesthetics, find your perfect style expression.
                </p>
              </div>
              
              <motion.button
                className="bg-amber-600 hover:bg-amber-700 text-black font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={() => navigate('/catalog')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Collection
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Moving Customer Reviews - Infinite Scroll */}
      <div className="relative z-10 py-16 overflow-hidden">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">What Our Customers Say</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join thousands of satisfied customers who love our premium fashion experience.
          </p>
        </div>
        
        <div className="relative">
          <div className="flex animate-scroll-left space-x-6">
            {/* Triple the reviews for seamless infinite scroll */}
            {[...reviews, ...reviews, ...reviews].map((review, index) => (
              <div
                key={`${review.id}-${index}`}
                className="flex-shrink-0 w-80 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
              >
                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center text-black font-bold mr-4">
                    {review.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{review.name}</h4>
                    <p className="text-gray-400 text-sm">{review.location}</p>
                    <div className="flex mt-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={16} className="text-amber-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">"{review.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-12 sm:py-20 bg-gray-900/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="rounded-2xl p-8 sm:p-12 bg-gray-800/80 backdrop-blur-sm border border-gray-700"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Brand Section */}
              <div className="lg:col-span-2">
                <motion.img
                  src="/Raritone.png"
                  alt="RARITONE"
                  className="h-16 sm:h-20 w-auto mb-6"
                  whileHover={{ scale: 1.05 }}
                />
                <p className="text-gray-300 max-w-md leading-relaxed text-sm sm:text-base">
                  Premium fashion collection with exceptional quality and style. 
                  Experience luxury fashion with personalized service across India.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="font-semibold text-white mb-6 text-base sm:text-lg">Quick Links</h3>
                <ul className="space-y-3">
                  {[
                    { label: 'About Us', href: '#about' },
                    { label: 'Privacy Policy', href: '#privacy' },
                    { label: 'Returns & Exchanges', href: '#returns' },
                    { label: 'Contact Us', href: '#contact' }
                  ].map((link) => (
                    <li key={link.label}>
                      <motion.a 
                        href={link.href} 
                        className="text-gray-300 hover:text-white text-sm sm:text-base transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        {link.label}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="font-semibold text-white mb-6 text-base sm:text-lg">Contact</h3>
                <div className="space-y-4">
                  <p className="text-gray-300 text-sm sm:text-base">hello@raritone.in</p>
                  <p className="text-gray-300 text-sm sm:text-base">+91 98765 43210</p>
                  <p className="text-gray-300 text-sm sm:text-base">Mumbai, India</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-600 mt-12 pt-8 text-center">
              <p className="text-gray-400 text-xs sm:text-sm">
                © 2025 RARITONE. All rights reserved. | Premium Fashion Collection | Made in India
              </p>
            </div>
          </motion.div>
        </div>
      </footer>

      {/* Search Overlay */}
      <SearchOverlay 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
        onAddToCart={handleAddToCart}
        onAddToWishlist={() => {}}
      />

      {/* Add to Cart Toast */}
      <AddToCartToast
        isOpen={showCartToast}
        onClose={() => setShowCartToast(false)}
        item={cartToastItem}
        onViewCart={() => {
          setShowCartToast(false);
          navigate('/cart');
        }}
        onCheckout={() => {
          setShowCartToast(false);
          navigate('/cart');
        }}
      />

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
};

export default Index;