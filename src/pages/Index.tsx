import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, ShoppingBag } from 'lucide-react';
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
  const logoScale = useScroll(scrollY, [0, 500], [1, 0.4]);
  const logoY = useTransform(scrollY, [0, 500], [0, -250]);
  const logoOpacity = useTransform(scrollY, [0, 400, 500], [1, 0.8, 0]);
  const butterflyScale = useTransform(scrollY, [0, 600], [1, 0.2]);
  const butterflyY = useTransform(scrollY, [0, 600], [0, -400]);
  const butterflyOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const buttonsY = useTransform(scrollY, [0, 400], [0, -200]);
  const buttonsOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Navbar visibility based on scroll
  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setNavbarVisible(latest > 500);
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

  const categories = [
    {
      id: 'tops',
      name: 'Tops',
      image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400',
      count: '120+ Items'
    },
    {
      id: 'bottoms',
      name: 'Bottoms',
      image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=400',
      count: '85+ Items'
    },
    {
      id: 'outerwear',
      name: 'Outerwear',
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
      count: '65+ Items'
    },
    {
      id: 'dresses',
      name: 'Dresses',
      image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400',
      count: '95+ Items'
    }
  ];

  const reviews = [
    {
      id: 1,
      name: "Priya Sharma",
      rating: 5,
      comment: "The body scan is incredible! Perfect fit every time. Revolutionary technology that changed how I shop.",
      avatar: "PS",
      location: "Mumbai"
    },
    {
      id: 2,
      name: "Arjun Patel",
      rating: 5,
      comment: "Amazing quality and the virtual try-on saved me so much time. Love the luxury experience!",
      avatar: "AP",
      location: "Delhi"
    },
    {
      id: 3,
      name: "Sneha Reddy",
      rating: 5,
      comment: "Love the personalized recommendations. Best fashion app I've ever used! The suggestions are spot-on.",
      avatar: "SR",
      location: "Bangalore"
    },
    {
      id: 4,
      name: "Vikram Singh",
      rating: 5,
      comment: "Revolutionary technology. Never buying clothes without this again. Perfect fit every time!",
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
        {/* Enhanced Realistic Butterfly - Much Larger */}
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
            height="900"
            viewBox="0 0 1200 900"
            className="opacity-60"
            animate={{
              rotateY: [0, 2, 0, -2, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Enhanced Butterfly Body */}
            <motion.ellipse
              cx="600"
              cy="450"
              rx="8"
              ry="120"
              fill="#8B4513"
              animate={{
                ry: [120, 125, 120],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Body Segments */}
            <ellipse cx="600" cy="380" rx="6" ry="12" fill="#A0522D" />
            <ellipse cx="600" cy="420" rx="7" ry="15" fill="#8B4513" />
            <ellipse cx="600" cy="480" rx="6" ry="12" fill="#654321" />
            
            {/* Left Upper Wing - Much More Realistic */}
            <motion.path
              d="M600 400 Q400 250 200 300 Q80 350 100 450 Q120 550 250 580 Q400 600 550 560 Q580 520 600 480"
              fill="url(#realisticWingGradient1)"
              stroke="#654321"
              strokeWidth="1"
              animate={{
                d: [
                  "M600 400 Q400 250 200 300 Q80 350 100 450 Q120 550 250 580 Q400 600 550 560 Q580 520 600 480",
                  "M600 400 Q395 245 195 295 Q75 345 95 445 Q115 545 245 575 Q395 595 545 555 Q575 515 600 480",
                  "M600 400 Q400 250 200 300 Q80 350 100 450 Q120 550 250 580 Q400 600 550 560 Q580 520 600 480"
                ]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Right Upper Wing */}
            <motion.path
              d="M600 400 Q800 250 1000 300 Q1120 350 1100 450 Q1080 550 950 580 Q800 600 650 560 Q620 520 600 480"
              fill="url(#realisticWingGradient1)"
              stroke="#654321"
              strokeWidth="1"
              animate={{
                d: [
                  "M600 400 Q800 250 1000 300 Q1120 350 1100 450 Q1080 550 950 580 Q800 600 650 560 Q620 520 600 480",
                  "M600 400 Q805 245 1005 295 Q1125 345 1105 445 Q1085 545 955 575 Q805 595 655 555 Q625 515 600 480",
                  "M600 400 Q800 250 1000 300 Q1120 350 1100 450 Q1080 550 950 580 Q800 600 650 560 Q620 520 600 480"
                ]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3
              }}
            />
            
            {/* Left Lower Wing */}
            <motion.path
              d="M600 480 Q500 580 400 620 Q300 660 280 720 Q290 780 350 770 Q420 750 500 720 Q560 680 600 620"
              fill="url(#realisticWingGradient2)"
              stroke="#654321"
              strokeWidth="1"
              animate={{
                d: [
                  "M600 480 Q500 580 400 620 Q300 660 280 720 Q290 780 350 770 Q420 750 500 720 Q560 680 600 620",
                  "M600 480 Q495 575 395 615 Q295 655 275 715 Q285 775 345 765 Q415 745 495 715 Q555 675 600 620",
                  "M600 480 Q500 580 400 620 Q300 660 280 720 Q290 780 350 770 Q420 750 500 720 Q560 680 600 620"
                ]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.6
              }}
            />
            
            {/* Right Lower Wing */}
            <motion.path
              d="M600 480 Q700 580 800 620 Q900 660 920 720 Q910 780 850 770 Q780 750 700 720 Q640 680 600 620"
              fill="url(#realisticWingGradient2)"
              stroke="#654321"
              strokeWidth="1"
              animate={{
                d: [
                  "M600 480 Q700 580 800 620 Q900 660 920 720 Q910 780 850 770 Q780 750 700 720 Q640 680 600 620",
                  "M600 480 Q705 575 805 615 Q905 655 925 715 Q915 775 855 765 Q785 745 705 715 Q645 675 600 620",
                  "M600 480 Q700 580 800 620 Q900 660 920 720 Q910 780 850 770 Q780 750 700 720 Q640 680 600 620"
                ]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.9
              }}
            />

            {/* Wing Patterns and Details */}
            <motion.g
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{
                repeat: Infinity,
                duration: 8,
                ease: "easeInOut"
              }}
            >
              {/* Wing veins */}
              <path d="M600 400 Q500 380 400 400" stroke="#654321" strokeWidth="1" fill="none" />
              <path d="M580 420 Q480 400 380 420" stroke="#654321" strokeWidth="1" fill="none" />
              <path d="M600 400 Q700 380 800 400" stroke="#654321" strokeWidth="1" fill="none" />
              <path d="M620 420 Q720 400 820 420" stroke="#654321" strokeWidth="1" fill="none" />
              
              {/* Wing spots */}
              <circle cx="450" cy="420" r="15" fill="rgba(139, 69, 19, 0.6)" />
              <circle cx="750" cy="420" r="15" fill="rgba(139, 69, 19, 0.6)" />
              <circle cx="450" cy="420" r="8" fill="rgba(160, 82, 45, 0.8)" />
              <circle cx="750" cy="420" r="8" fill="rgba(160, 82, 45, 0.8)" />
            </motion.g>
            
            {/* Antennae */}
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
              <path d="M590 360 Q585 340 580 320 Q578 310 575 300" stroke="#8B4513" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M610 360 Q615 340 620 320 Q622 310 625 300" stroke="#8B4513" strokeWidth="3" fill="none" strokeLinecap="round" />
              <ellipse cx="575" cy="298" rx="3" ry="6" fill="#8B4513" />
              <ellipse cx="625" cy="298" rx="3" ry="6" fill="#8B4513" />
            </motion.g>

            {/* Gradients */}
            <defs>
              <radialGradient id="realisticWingGradient1" cx="40%" cy="50%" r="60%">
                <stop offset="0%" stopColor="rgba(222, 184, 135, 0.9)" />
                <stop offset="30%" stopColor="rgba(205, 133, 63, 0.8)" />
                <stop offset="60%" stopColor="rgba(160, 82, 45, 0.6)" />
                <stop offset="100%" stopColor="rgba(139, 69, 19, 0.4)" />
              </radialGradient>
              <radialGradient id="realisticWingGradient2" cx="50%" cy="60%" r="50%">
                <stop offset="0%" stopColor="rgba(160, 82, 45, 0.8)" />
                <stop offset="50%" stopColor="rgba(139, 69, 19, 0.6)" />
                <stop offset="100%" stopColor="rgba(101, 67, 33, 0.4)" />
              </radialGradient>
            </defs>
          </motion.svg>
        </motion.div>

        {/* Logo - Overlapping the Butterfly */}
        <motion.div
          className="mb-16 z-30 relative"
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
            className="h-40 sm:h-48 lg:h-56 w-auto"
            style={{
              filter: 'drop-shadow(0 0 40px rgba(209, 169, 128, 0.8))',
            }}
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-xl sm:text-2xl text-gray-400 mb-16 text-center max-w-md z-20"
          style={{ opacity: logoOpacity }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 0.5 }}
        >
          Fashion Meets Technology
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 z-30"
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
            {/* Duplicate reviews for seamless infinite scroll */}
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
                        <span key={i} className="text-amber-400">★</span>
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

      {/* Shop by Category Section */}
      <div className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Shop by Category</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Discover our curated collections designed for every style and occasion.
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