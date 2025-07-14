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

  // Enhanced smooth scroll transforms for butterfly and logo
  const butterflyScale = useTransform(scrollY, [0, 800], [1, 0.2]);
  const butterflyY = useTransform(scrollY, [0, 800], [0, -600]);
  const butterflyOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  
  const logoScale = useTransform(scrollY, [0, 600], [1, 0.8]);
  const logoY = useTransform(scrollY, [0, 600], [0, -200]);
  const logoOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  
  const buttonsY = useTransform(scrollY, [0, 500], [0, -300]);
  const buttonsOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Navbar visibility based on scroll - appears when butterfly moves up
  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setNavbarVisible(latest > 400);
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
      {/* Enhanced Professional 3D Background */}
      <div className="fixed inset-0 z-0">
        {/* Base gradient with depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black">
          
          {/* Professional geometric patterns */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full"
                 style={{
                   backgroundImage: `
                     radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%),
                     radial-gradient(circle at 75% 75%, rgba(209,169,128,0.1) 0%, transparent 50%),
                     linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.02) 50%, transparent 60%)
                   `,
                   backgroundSize: '400px 400px, 600px 600px, 200px 200px'
                 }}
            />
          </div>

          {/* Animated light rays */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                'radial-gradient(ellipse 80% 50% at 50% 20%, rgba(209,169,128,0.15) 0%, transparent 60%)',
                'radial-gradient(ellipse 60% 40% at 60% 30%, rgba(209,169,128,0.1) 0%, transparent 60%)',
                'radial-gradient(ellipse 80% 50% at 40% 20%, rgba(209,169,128,0.15) 0%, transparent 60%)'
              ]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Professional floating particles */}
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 6,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Subtle mesh gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
        </div>
      </div>

      {/* Navigation - appears when butterfly moves up */}
      <Navbar 
        onSearchOpen={() => setIsSearchOpen(true)}
        onCartOpen={() => {}}
        isVisible={navbarVisible}
      />

      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col items-center justify-center z-10">
        {/* Professional Moth Butterfly - Based on your image */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            y: butterflyY,
            scale: butterflyScale,
            opacity: butterflyOpacity,
          }}
        >
          <motion.svg
            width="1200"
            height="800"
            viewBox="0 0 1200 800"
            className="opacity-90"
            animate={{
              rotateY: [0, 0.5, 0, -0.5, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Professional Moth Body */}
            <motion.ellipse
              cx="600"
              cy="400"
              rx="8"
              ry="120"
              fill="url(#mothBodyGradient)"
              animate={{
                ry: [120, 125, 120],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Body segments for realism */}
            <ellipse cx="600" cy="340" rx="6" ry="12" fill="rgba(180, 180, 180, 0.9)" />
            <ellipse cx="600" cy="370" rx="7" ry="15" fill="rgba(160, 160, 160, 0.8)" />
            <ellipse cx="600" cy="420" rx="6" ry="12" fill="rgba(140, 140, 140, 0.7)" />
            <ellipse cx="600" cy="450" rx="5" ry="10" fill="rgba(120, 120, 120, 0.6)" />
            
            {/* Left Upper Wing - Moth style with realistic patterns */}
            <motion.path
              d="M600 360 Q400 220 180 280 Q80 320 100 400 Q120 480 220 520 Q380 560 520 500 Q580 460 600 420"
              fill="url(#mothWingGradient1)"
              stroke="rgba(100, 100, 100, 0.8)"
              strokeWidth="1.5"
              animate={{
                d: [
                  "M600 360 Q400 220 180 280 Q80 320 100 400 Q120 480 220 520 Q380 560 520 500 Q580 460 600 420",
                  "M600 360 Q395 215 175 275 Q75 315 95 395 Q115 475 215 515 Q375 555 515 495 Q575 455 600 420",
                  "M600 360 Q400 220 180 280 Q80 320 100 400 Q120 480 220 520 Q380 560 520 500 Q580 460 600 420"
                ]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Right Upper Wing - Moth style */}
            <motion.path
              d="M600 360 Q800 220 1020 280 Q1120 320 1100 400 Q1080 480 980 520 Q820 560 680 500 Q620 460 600 420"
              fill="url(#mothWingGradient1)"
              stroke="rgba(100, 100, 100, 0.8)"
              strokeWidth="1.5"
              animate={{
                d: [
                  "M600 360 Q800 220 1020 280 Q1120 320 1100 400 Q1080 480 980 520 Q820 560 680 500 Q620 460 600 420",
                  "M600 360 Q805 215 1025 275 Q1125 315 1105 395 Q1085 475 985 515 Q825 555 685 495 Q625 455 600 420",
                  "M600 360 Q800 220 1020 280 Q1120 320 1100 400 Q1080 480 980 520 Q820 560 680 500 Q620 460 600 420"
                ]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3
              }}
            />
            
            {/* Left Lower Wing - Moth hindwing with tails */}
            <motion.path
              d="M600 420 Q500 540 380 580 Q260 620 240 680 Q250 720 300 710 Q380 690 480 660 Q560 620 600 580"
              fill="url(#mothWingGradient2)"
              stroke="rgba(100, 100, 100, 0.6)"
              strokeWidth="1.5"
              animate={{
                d: [
                  "M600 420 Q500 540 380 580 Q260 620 240 680 Q250 720 300 710 Q380 690 480 660 Q560 620 600 580",
                  "M600 420 Q495 535 375 575 Q255 615 235 675 Q245 715 295 705 Q375 685 475 655 Q555 615 600 580",
                  "M600 420 Q500 540 380 580 Q260 620 240 680 Q250 720 300 710 Q380 690 480 660 Q560 620 600 580"
                ]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.6
              }}
            />
            
            {/* Right Lower Wing - Moth hindwing with tails */}
            <motion.path
              d="M600 420 Q700 540 820 580 Q940 620 960 680 Q950 720 900 710 Q820 690 720 660 Q640 620 600 580"
              fill="url(#mothWingGradient2)"
              stroke="rgba(100, 100, 100, 0.6)"
              strokeWidth="1.5"
              animate={{
                d: [
                  "M600 420 Q700 540 820 580 Q940 620 960 680 Q950 720 900 710 Q820 690 720 660 Q640 620 600 580",
                  "M600 420 Q705 535 825 575 Q945 615 965 675 Q955 715 905 705 Q825 685 725 655 Q645 615 600 580",
                  "M600 420 Q700 540 820 580 Q940 620 960 680 Q950 720 900 710 Q820 690 720 660 Q640 620 600 580"
                ]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.9
              }}
            />

            {/* Moth wing patterns and details */}
            <motion.g
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{
                repeat: Infinity,
                duration: 8,
                ease: "easeInOut"
              }}
            >
              {/* Wing veins - more prominent for moth */}
              <path d="M600 360 Q500 340 400 360" stroke="rgba(80, 80, 80, 0.8)" strokeWidth="2" fill="none" />
              <path d="M580 380 Q480 370 380 390" stroke="rgba(80, 80, 80, 0.6)" strokeWidth="1.5" fill="none" />
              <path d="M600 360 Q700 340 800 360" stroke="rgba(80, 80, 80, 0.8)" strokeWidth="2" fill="none" />
              <path d="M620 380 Q720 370 820 390" stroke="rgba(80, 80, 80, 0.6)" strokeWidth="1.5" fill="none" />
              
              {/* Moth eye spots */}
              <circle cx="420" cy="380" r="25" fill="rgba(60, 60, 60, 0.6)" />
              <circle cx="420" cy="380" r="15" fill="rgba(40, 40, 40, 0.8)" />
              <circle cx="425" cy="375" r="5" fill="rgba(200, 200, 200, 0.9)" />
              
              <circle cx="780" cy="380" r="25" fill="rgba(60, 60, 60, 0.6)" />
              <circle cx="780" cy="380" r="15" fill="rgba(40, 40, 40, 0.8)" />
              <circle cx="775" cy="375" r="5" fill="rgba(200, 200, 200, 0.9)" />
            </motion.g>
            
            {/* Moth antennae - feathery */}
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
              <path d="M590 320 Q585 300 580 280 Q578 270 575 260" stroke="rgba(120, 120, 120, 0.9)" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M610 320 Q615 300 620 280 Q622 270 625 260" stroke="rgba(120, 120, 120, 0.9)" strokeWidth="3" fill="none" strokeLinecap="round" />
              
              {/* Feathery antenna details */}
              <path d="M575 270 Q570 268 565 266" stroke="rgba(100, 100, 100, 0.7)" strokeWidth="1" fill="none" />
              <path d="M578 275 Q573 273 568 271" stroke="rgba(100, 100, 100, 0.7)" strokeWidth="1" fill="none" />
              <path d="M625 270 Q630 268 635 266" stroke="rgba(100, 100, 100, 0.7)" strokeWidth="1" fill="none" />
              <path d="M622 275 Q627 273 632 271" stroke="rgba(100, 100, 100, 0.7)" strokeWidth="1" fill="none" />
            </motion.g>

            {/* Gradients for Professional Moth */}
            <defs>
              <radialGradient id="mothBodyGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(160, 160, 160, 0.9)" />
                <stop offset="50%" stopColor="rgba(120, 120, 120, 0.8)" />
                <stop offset="100%" stopColor="rgba(80, 80, 80, 0.7)" />
              </radialGradient>
              
              <radialGradient id="mothWingGradient1" cx="40%" cy="50%" r="60%">
                <stop offset="0%" stopColor="rgba(220, 220, 220, 0.8)" />
                <stop offset="30%" stopColor="rgba(180, 180, 180, 0.7)" />
                <stop offset="60%" stopColor="rgba(140, 140, 140, 0.5)" />
                <stop offset="100%" stopColor="rgba(100, 100, 100, 0.3)" />
              </radialGradient>
              
              <radialGradient id="mothWingGradient2" cx="50%" cy="60%" r="50%">
                <stop offset="0%" stopColor="rgba(200, 200, 200, 0.7)" />
                <stop offset="50%" stopColor="rgba(160, 160, 160, 0.5)" />
                <stop offset="100%" stopColor="rgba(120, 120, 120, 0.3)" />
              </radialGradient>
            </defs>
          </motion.svg>
        </motion.div>

        {/* Logo - Positioned in the center of the butterfly */}
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
            className="h-32 sm:h-40 lg:h-48 w-auto"
            style={{
              filter: 'drop-shadow(0 0 30px rgba(255, 255, 255, 0.9))',
            }}
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-lg sm:text-xl text-gray-300 mb-16 text-center max-w-md z-20"
          style={{ opacity: logoOpacity }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 0.5 }}
        >
          Fashion Meets Technology
        </motion.p>

        {/* Action Buttons - Moved further below */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 z-30 mt-20"
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
          className="text-sm text-gray-400 mt-16 text-center max-w-lg px-4 z-20"
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
                    { label: 'About Us', href: '/quick-links#about-us' },
                    { label: 'Privacy Policy', href: '/quick-links#privacy-policy' },
                    { label: 'Returns & Exchanges', href: '/quick-links#returns' },
                    { label: 'Contact Us', href: '/quick-links#contact' },
                    { label: 'Write a Review', href: '/reviews' }
                  ].map((link) => (
                    <li key={link.label}>
                      <motion.button 
                        onClick={() => navigate(link.href)}
                        className="text-gray-300 hover:text-white text-sm sm:text-base transition-colors text-left"
                        whileHover={{ x: 5 }}
                      >
                        {link.label}
                      </motion.button>
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