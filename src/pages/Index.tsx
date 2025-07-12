'use client';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, ShoppingBag, Shield, Zap, Clock, TrendingUp, Mail, Phone, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import SearchOverlay from '@/components/SearchOverlay';
import ChatWidget from '@/components/ChatWidget';
import ProductModal from '@/components/ProductModal';
import AddToCartToast from '@/components/AddToCartToast';
import ButterflyHero from '@/components/ButterflyHero';
import CustomerReviews from '@/components/CustomerReviews';
import LiveBackground from '@/components/LiveBackground';
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

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load wishlist
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  // Categories (only 3 as requested)
  const categories = [
    { 
      name: "T-Shirts", 
      image: "Raritone Collection/Bold vibe Oversize Tshirt.jpg", 
      count: "15 Items", 
      category: "Tops" 
    },
    { 
      name: "Hoodies", 
      image: "Raritone Collection/Hoddie1(F).jpg", 
      count: "8 Items", 
      category: "Outerwear" 
    },
    { 
      name: "Premium", 
      image: "Raritone Collection/Kiss me again.jpeg", 
      count: "12 Items", 
      category: "Premium" 
    }
  ];

  // Navigate to catalog with category filter
  const handleCategoryClick = (category: string) => {
    navigate(`/catalog?category=${encodeURIComponent(category)}`);
  };

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

  const handleButterflyComplete = () => {
    setNavbarVisible(true);
  };

  return (
    <div className="min-h-screen text-white relative full-bleed">
      {/* Enhanced Live Animated Cosmic Background */}
      <LiveBackground />

      {/* Navigation */}
      <Navbar 
        onSearchOpen={() => setIsSearchOpen(true)}
        onCartOpen={() => {}}
      />

      {/* ENHANCED HERO SECTION WITH IMPROVED BUTTERFLY */}
      <div className="relative min-h-screen overflow-hidden flex items-center justify-center">
        {/* Butterfly Hero Animation */}
        <div className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
          <ButterflyHero onAnimationComplete={handleButterflyComplete} />
        </div>
        
        {/* Enhanced dark gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" style={{ zIndex: 2 }} />

        {/* Hero Content - Moved Below Butterfly */}
        <motion.div 
          className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-8" 
          style={{ zIndex: 3, marginTop: '20vh' }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.5 }}
        >
          <div className="p-8 sm:p-12 lg:p-16">
            <motion.h1 
              className="hero-title mb-8 text-shadow-strong"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 2 }}
            >
              AI-Powered Fashion
            </motion.h1>

            <motion.p 
              className="hero-subtitle font-light mb-16 opacity-90 max-w-2xl mx-auto text-shadow-strong" 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 2.3 }}
            >
              Experience the future of fashion with our revolutionary AI body scanning technology. 
              Perfect fit, every time.
            </motion.p>

            {/* Enhanced CTA BUTTONS with New Design */}
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 2.6 }}
            >
              <motion.button
                className="universal-btn font-medium flex items-center space-x-3 justify-center w-full max-w-xs sm:min-w-[220px] px-8 py-4 text-base"
                onClick={() => navigate('/scan')}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Camera size={isMobile ? 18 : 20} />
                <span>Start Body Scan</span>
              </motion.button>
              
              <motion.button
                className="universal-btn-secondary font-medium flex items-center space-x-3 justify-center w-full max-w-xs sm:min-w-[220px] px-8 py-4 text-base"
                onClick={() => navigate('/catalog')}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingBag size={isMobile ? 18 : 20} />
                <span>Browse Collection</span>
              </motion.button>
            </motion.div>

            {/* Enhanced Privacy Notice */}
            <motion.p 
              className="max-w-md mx-auto leading-relaxed text-sm px-4 opacity-80 glass-morphism rounded-lg p-4 text-shadow-strong"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 3 }}
            >
              Your privacy is protected. Camera data is processed locally and never stored.
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* AI BODY SCAN BENEFITS SECTION */}
      <motion.section 
        className="py-16 sm:py-24 luxury-gradient relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12 sm:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="hero-title mb-6 flex items-center justify-center text-shadow-strong">
              <Shield className="mr-4" size={isMobile ? 28 : 40} color="var(--soft-tan)" />
              AI Body Scan Benefits
            </h2>
            <p className="hero-subtitle max-w-3xl mx-auto px-4 text-shadow-strong">
              Revolutionary technology that ensures perfect fit every time with complete privacy and precision.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                icon: Shield,
                title: "100% Private",
                description: "Body data never stored or sent online. All processing happens locally on your device for complete privacy."
              },
              {
                icon: Zap,
                title: "99% Accurate",
                description: "AI scanning ensures near-perfect micro-fit. Our technology provides the most accurate measurements possible."
              },
              {
                icon: Clock,
                title: "30 Second Scan",
                description: "Fast scan with only a smartphone camera. Get your perfect measurements in half a minute."
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="feature-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <feature.icon size={56} color="var(--soft-tan)" className="mx-auto mb-6" />
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* SHOP BY CATEGORY SECTION */}
      <motion.section 
        className="py-16 sm:py-24"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12 sm:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="hero-title mb-6 flex items-center justify-center text-shadow-strong">
              <TrendingUp className="mr-4" size={isMobile ? 28 : 40} color="var(--soft-tan)" />
              Shop by Category
            </h2>
            <p className="hero-subtitle max-w-3xl mx-auto px-4 text-shadow-strong">
              Explore our curated collection of premium fashion categories, each designed with AI-powered precision.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                className="group cursor-pointer"
                onClick={() => handleCategoryClick(category.category)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="category-card">
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-semibold mb-1 text-white text-lg sm:text-xl luxury-heading text-shadow-strong">
                        {category.name}
                      </h3>
                      <p className="text-white/80 text-sm luxury-body text-shadow-strong">
                        {category.count}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CUSTOMER REVIEWS SECTION */}
      <CustomerReviews />

      {/* ENHANCED FOOTER SECTION */}
      <footer className="luxury-footer py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="luxury-card rounded-2xl p-8 sm:p-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Brand Section */}
              <div className="lg:col-span-2" id="about">
                <motion.img
                  src="/IMG-20250305-WA0003 (1)-Photoroom.png"
                  alt="RARITONE"
                  className="h-16 sm:h-20 w-auto mb-6"
                  whileHover={{ scale: 1.05 }}
                />
                <p className="text-[var(--olive-green)] max-w-md leading-relaxed text-sm sm:text-base luxury-body">
                  Revolutionizing fashion with AI-powered body scanning technology. 
                  Experience perfect fit and personalized style recommendations across India.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-6 text-base sm:text-lg luxury-heading">Quick Links</h3>
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
                        className="text-[var(--text-primary)] hover:text-[var(--olive-green)] text-sm sm:text-base transition-colors luxury-body"
                        whileHover={{ x: 5 }}
                      >
                        {link.label}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Info */}
              <div id="contact">
                <h3 className="font-semibold text-[var(--text-primary)] mb-6 text-base sm:text-lg luxury-heading">Contact</h3>
                <div className="space-y-4">
                  {[
                    { icon: Mail, text: 'hello@raritone.in' },
                    { icon: Phone, text: '+91 98765 43210' },
                    { icon: MapPin, text: 'Mumbai, India' }
                  ].map((contact, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-center space-x-3"
                      whileHover={{ x: 5 }}
                    >
                      <contact.icon size={16} className="text-[var(--olive-green)]" />
                      <span className="text-[var(--text-primary)] text-sm sm:text-base luxury-body">
                        {contact.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Privacy and Returns Sections */}
            <div className="section-divider border-t mt-12 pt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div id="privacy">
                  <h3 className="font-semibold text-[var(--text-primary)] mb-4 luxury-heading">Privacy Policy</h3>
                  <p className="text-[var(--olive-green)] text-sm leading-relaxed luxury-body">
                    Your privacy is our priority. We use advanced encryption and never store your body scan data. 
                    All measurements are processed locally on your device for complete security.
                  </p>
                </div>
                <div id="returns">
                  <h3 className="font-semibold text-[var(--text-primary)] mb-4 luxury-heading">Returns & Exchanges</h3>
                  <p className="text-[var(--olive-green)] text-sm leading-relaxed luxury-body">
                    30-day hassle-free returns. Free size exchanges. If our AI recommendation doesn't fit perfectly, 
                    we'll make it right with no questions asked.
                  </p>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-[var(--olive-green)] text-xs sm:text-sm luxury-body">
                  © 2025 RARITONE. All rights reserved. | Powered by AI Fashion Technology | Made in India
                </p>
              </div>
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