import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, ShoppingBag } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from '@/components/Navbar';
import SearchOverlay from '@/components/SearchOverlay';
import ChatWidget from '@/components/ChatWidget';
import ProductModal from '@/components/ProductModal';
import AddToCartToast from '@/components/AddToCartToast';
import CustomerReviews from '@/components/CustomerReviews';
import { useToast } from '@/components/ToastContainer';
import { useAuth } from '@/contexts/AuthContext';
import { addToCart } from '@/lib/user';

const Index = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [showCartToast, setShowCartToast] = useState(false);
  const [cartToastItem, setCartToastItem] = useState(null);
  const [navbarVisible, setNavbarVisible] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { user, refreshCart, addToLocalCart } = useAuth();
  const { scrollY } = useScroll();

  // Smooth scroll transforms for Gucci-style animation
  const logoScale = useTransform(scrollY, [0, 400], [1, 0.6]);
  const logoY = useTransform(scrollY, [0, 400], [0, -200]);
  const logoOpacity = useTransform(scrollY, [0, 300, 400], [1, 0.8, 0]);
  const butterflyY = useTransform(scrollY, [0, 600], [0, -300]);
  const butterflyScale = useTransform(scrollY, [0, 600], [1, 0.3]);
  const butterflyOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const buttonsY = useTransform(scrollY, [0, 400], [0, -150]);
  const buttonsOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Navbar visibility based on scroll
  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setNavbarVisible(latest > 400);
    });
    return unsubscribe;
  }, [scrollY]);

  // Load wishlist
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

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

  // Handle add to wishlist
  const handleAddToWishlist = (productId: string) => {
    const currentWishlist = [...wishlist];
    if (!currentWishlist.includes(productId)) {
      currentWishlist.push(productId);
      setWishlist(currentWishlist);
      localStorage.setItem('wishlist', JSON.stringify(currentWishlist));
      
      window.dispatchEvent(new Event('wishlistUpdated'));
      
      showToast({
        type: 'success',
        title: 'Added to Wishlist',
        message: 'Item has been saved to your wishlist!'
      });
    } else {
      const updatedWishlist = currentWishlist.filter(id => id !== productId);
      setWishlist(updatedWishlist);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      
      window.dispatchEvent(new Event('wishlistUpdated'));
      
      showToast({
        type: 'info',
        title: 'Removed from Wishlist',
        message: 'Item has been removed from your wishlist.'
      });
    }
  };

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* 3D Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800">
          {/* Animated 3D Spheres */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20"
            style={{
              background: 'radial-gradient(circle, rgba(209,169,128,0.3) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15"
            style={{
              background: 'radial-gradient(circle, rgba(116,136,115,0.4) 0%, transparent 70%)',
              filter: 'blur(50px)',
            }}
            animate={{
              scale: [1, 0.8, 1],
              x: [0, -40, 0],
              y: [0, 40, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
          
          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-amber-400 rounded-full opacity-60"
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
                delay: Math.random() * 5,
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
        {/* Realistic Butterfly Animation */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            y: butterflyY,
            scale: butterflyScale,
            opacity: butterflyOpacity,
          }}
        >
          <motion.svg
            width="400"
            height="300"
            viewBox="0 0 400 300"
            className="opacity-80"
            animate={{
              rotateY: [0, 5, 0, -5, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Butterfly Body */}
            <motion.ellipse
              cx="200"
              cy="150"
              rx="3"
              ry="60"
              fill="#8B4513"
              animate={{
                ry: [60, 62, 60],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Left Upper Wing */}
            <motion.path
              d="M200 120 Q150 80 100 90 Q60 100 65 130 Q70 160 100 170 Q140 175 180 165 Q195 150 200 135"
              fill="url(#wingGradient1)"
              stroke="#654321"
              strokeWidth="0.5"
              animate={{
                d: [
                  "M200 120 Q150 80 100 90 Q60 100 65 130 Q70 160 100 170 Q140 175 180 165 Q195 150 200 135",
                  "M200 120 Q145 75 95 85 Q55 95 60 125 Q65 155 95 165 Q135 170 175 160 Q190 145 200 135",
                  "M200 120 Q150 80 100 90 Q60 100 65 130 Q70 160 100 170 Q140 175 180 165 Q195 150 200 135"
                ]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Right Upper Wing */}
            <motion.path
              d="M200 120 Q250 80 300 90 Q340 100 335 130 Q330 160 300 170 Q260 175 220 165 Q205 150 200 135"
              fill="url(#wingGradient1)"
              stroke="#654321"
              strokeWidth="0.5"
              animate={{
                d: [
                  "M200 120 Q250 80 300 90 Q340 100 335 130 Q330 160 300 170 Q260 175 220 165 Q205 150 200 135",
                  "M200 120 Q255 75 305 85 Q345 95 340 125 Q335 155 305 165 Q265 170 225 160 Q210 145 200 135",
                  "M200 120 Q250 80 300 90 Q340 100 335 130 Q330 160 300 170 Q260 175 220 165 Q205 150 200 135"
                ]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2
              }}
            />
            
            {/* Left Lower Wing */}
            <motion.path
              d="M200 160 Q170 190 140 200 Q110 210 105 230 Q110 250 130 245 Q150 240 170 230 Q185 220 200 200"
              fill="url(#wingGradient2)"
              stroke="#654321"
              strokeWidth="0.5"
              animate={{
                d: [
                  "M200 160 Q170 190 140 200 Q110 210 105 230 Q110 250 130 245 Q150 240 170 230 Q185 220 200 200",
                  "M200 160 Q165 185 135 195 Q105 205 100 225 Q105 245 125 240 Q145 235 165 225 Q180 215 200 200",
                  "M200 160 Q170 190 140 200 Q110 210 105 230 Q110 250 130 245 Q150 240 170 230 Q185 220 200 200"
                ]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.4
              }}
            />
            
            {/* Right Lower Wing */}
            <motion.path
              d="M200 160 Q230 190 260 200 Q290 210 295 230 Q290 250 270 245 Q250 240 230 230 Q215 220 200 200"
              fill="url(#wingGradient2)"
              stroke="#654321"
              strokeWidth="0.5"
              animate={{
                d: [
                  "M200 160 Q230 190 260 200 Q290 210 295 230 Q290 250 270 245 Q250 240 230 230 Q215 220 200 200",
                  "M200 160 Q235 185 265 195 Q295 205 300 225 Q295 245 275 240 Q255 235 235 225 Q220 215 200 200",
                  "M200 160 Q230 190 260 200 Q290 210 295 230 Q290 250 270 245 Q250 240 230 230 Q215 220 200 200"
                ]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.6
              }}
            />
            
            {/* Wing Patterns */}
            <circle cx="150" cy="130" r="8" fill="rgba(255,255,255,0.3)" />
            <circle cx="250" cy="130" r="8" fill="rgba(255,255,255,0.3)" />
            <circle cx="150" cy="130" r="4" fill="rgba(139,69,19,0.6)" />
            <circle cx="250" cy="130" r="4" fill="rgba(139,69,19,0.6)" />
            
            {/* Antennae */}
            <motion.path
              d="M195 100 Q190 85 185 70"
              stroke="#654321"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              animate={{
                d: [
                  "M195 100 Q190 85 185 70",
                  "M195 100 Q188 83 183 68",
                  "M195 100 Q190 85 185 70"
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.path
              d="M205 100 Q210 85 215 70"
              stroke="#654321"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              animate={{
                d: [
                  "M205 100 Q210 85 215 70",
                  "M205 100 Q212 83 217 68",
                  "M205 100 Q210 85 215 70"
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
            
            {/* Antennae Tips */}
            <circle cx="185" cy="70" r="2" fill="#654321" />
            <circle cx="215" cy="70" r="2" fill="#654321" />
            
            {/* Gradients */}
            <defs>
              <radialGradient id="wingGradient1" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(222,184,135,0.8)" />
                <stop offset="50%" stopColor="rgba(205,133,63,0.6)" />
                <stop offset="100%" stopColor="rgba(139,69,19,0.4)" />
              </radialGradient>
              <radialGradient id="wingGradient2" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(160,82,45,0.7)" />
                <stop offset="50%" stopColor="rgba(139,69,19,0.5)" />
                <stop offset="100%" stopColor="rgba(101,67,33,0.3)" />
              </radialGradient>
            </defs>
          </motion.svg>
        </motion.div>

        {/* Logo */}
        <motion.div
          className="mb-16 z-20"
          style={{
            scale: logoScale,
            y: logoY,
            opacity: logoOpacity,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <img
            src="/Raritone.png"
            alt="RARITONE"
            className="h-32 sm:h-40 lg:h-48 w-auto"
            style={{
              filter: 'drop-shadow(0 0 30px rgba(209, 169, 128, 0.6))',
            }}
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-lg sm:text-xl text-gray-400 mb-16 text-center max-w-md"
          style={{ opacity: logoOpacity }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          Fashion Meets Technology
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 z-20"
          style={{
            y: buttonsY,
            opacity: buttonsOpacity,
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1 }}
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
          className="text-sm text-gray-500 mt-12 text-center max-w-lg px-4"
          style={{ opacity: buttonsOpacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.5 }}
        >
          This site uses webcam access to enable AI-powered try-ons. Your camera data is never stored or shared.
        </motion.p>
      </div>

      {/* Rest of the content */}
      <div className="relative z-10">
        <CustomerReviews />
        
        {/* Footer */}
        <footer className="py-12 sm:py-20 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="rounded-2xl p-8 sm:p-12 bg-gray-800"
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
                  <p className="text-gray-400 max-w-md leading-relaxed text-sm sm:text-base">
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
                          className="text-gray-400 hover:text-white text-sm sm:text-base transition-colors"
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
                    <p className="text-gray-400 text-sm sm:text-base">hello@raritone.in</p>
                    <p className="text-gray-400 text-sm sm:text-base">+91 98765 43210</p>
                    <p className="text-gray-400 text-sm sm:text-base">Mumbai, India</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-700 mt-12 pt-8 text-center">
                <p className="text-gray-500 text-xs sm:text-sm">
                  © 2025 RARITONE. All rights reserved. | Premium Fashion Collection | Made in India
                </p>
              </div>
            </motion.div>
          </div>
        </footer>
      </div>

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
        onAddToWishlist={handleAddToWishlist}
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