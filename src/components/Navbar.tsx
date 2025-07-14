'use client';

import React, { useState, useEffect, memo } from 'react';
import { Search, ShoppingBag, User, Menu, X, Heart, ArrowLeft, Settings } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import LoginModal from '@/components/LoginModal';

interface NavbarProps {
  onSearchOpen: () => void;
  onCartOpen: () => void;
  pageTitle?: string;
  showBackButton?: boolean;
  isVisible?: boolean;
}

const Navbar: React.FC<NavbarProps> = memo(({ onSearchOpen, onCartOpen, pageTitle, showBackButton = false, isVisible = true }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, cart, logout } = useAuth();

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close menu when clicking outside or on route change
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen) {
        const target = event.target as Element;
        if (!target.closest('[data-menu-container]')) {
          setIsMenuOpen(false);
        }
      }
    };

    // Load wishlist count from localStorage
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlistCount(JSON.parse(savedWishlist).length);
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // Update wishlist count when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) {
        setWishlistCount(JSON.parse(savedWishlist).length);
      } else {
        setWishlistCount(0);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('wishlistUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('wishlistUpdated', handleStorageChange);
    };
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  }, [location.pathname]);

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleProfileClick = () => {
    if (isMenuOpen) setIsMenuOpen(false);
    if (user) {
      setIsProfileOpen(true);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleMenuClick = () => {
    if (isProfileOpen) setIsProfileOpen(false);
    setIsMenuOpen(!isMenuOpen);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleTitleClick = () => {
    navigate('/');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const menuItems = [
    { label: 'Shop', path: '/catalog', icon: ShoppingBag },
    { label: 'Body Scan', path: '/scan', icon: Search },
    { label: 'Settings', path: '/settings', icon: Settings }
  ];

  return (
    <>
      {/* ENHANCED LUXURY NAVBAR */}
      <AnimatePresence>
        {isVisible && (
          <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ 
              duration: 0.6, 
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="fixed top-0 left-0 right-0 z-50 h-20 luxury-navbar"
            data-menu-container
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
              <div className="flex items-center justify-between h-full">
                {/* Left - Back Button or Menu */}
                <div className="flex items-center w-32 sm:w-40">
                  {showBackButton ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleBackClick}
                      className="flex items-center space-x-2 px-4 text-white hover:text-[var(--soft-tan)] transition-colors p-3 rounded-lg min-h-[48px] min-w-[48px]"
                    >
                      <ArrowLeft size={24} color="var(--olive-green)" />
                      {!isMobile && <span className="text-sm font-medium text-white luxury-body">Back</span>}
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleMenuClick}
                      className="flex items-center space-x-2 px-4 text-white hover:text-[var(--soft-tan)] transition-colors relative p-3 rounded-lg min-h-[48px] min-w-[48px]"
                    >
                      {/* Enhanced Hamburger to Cross Animation */}
                      <div className="relative w-6 h-6 flex flex-col justify-center items-center">
                        <motion.span
                          className="absolute w-5 h-0.5 bg-[var(--olive-green)] rounded-full"
                          animate={{
                            rotate: isMenuOpen ? 45 : 0,
                            y: isMenuOpen ? 0 : -6
                          }}
                          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                        />
                        <motion.span
                          className="absolute w-5 h-0.5 bg-[var(--olive-green)] rounded-full"
                          animate={{
                            opacity: isMenuOpen ? 0 : 1
                          }}
                          transition={{ duration: 0.3 }}
                        />
                        <motion.span
                          className="absolute w-5 h-0.5 bg-[var(--olive-green)] rounded-full"
                          animate={{
                            rotate: isMenuOpen ? -45 : 0,
                            y: isMenuOpen ? 0 : 6
                          }}
                          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                        />
                      </div>
                      
                      {!isMobile && (
                        <span className="text-sm font-medium text-white luxury-body">
                          {isMenuOpen ? 'Close' : 'Menu'}
                        </span>
                      )}
                    </motion.button>
                  )}
                </div>

                {/* Center - Enhanced Logo or Page Title with Smooth Morph Effect */}
                <div className="flex-1 flex justify-center items-center relative">
                  {pageTitle ? (
                    <motion.div 
                      className="navbar-title-container relative cursor-pointer flex items-center justify-center h-20 w-full max-w-md"
                      onClick={handleTitleClick}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.h1 
                        className="navbar-title font-light text-white text-xl sm:text-2xl luxury-heading absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 1, scale: 1, y: 0 }}
                        whileHover={{ opacity: 0, scale: 0.8, y: -8 }}
                        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                      >
                        {pageTitle}
                      </motion.h1>
                      <motion.img
                        src="/Raritone.png"
                        alt="RARITONE"
                        className="navbar-logo absolute inset-0 pointer-events-none flex items-center justify-center"
                        style={{
                          height: isMobile ? '48px' : '64px',
                          width: 'auto',
                          maxWidth: isMobile ? '200px' : '280px',
                          objectFit: 'contain',
                          filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.8))'
                        }}
                        initial={{ opacity: 0, scale: 0.8, y: 8 }}
                        whileHover={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                      />
                    </motion.div>
                  ) : (
                    <motion.img
                      src="/Raritone.png"
                      alt="RARITONE"
                      className="cursor-pointer transition-all duration-300 luxury-float"
                      onClick={handleLogoClick}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      style={{
                        height: isMobile ? '56px' : '72px',
                        width: 'auto',
                        maxWidth: isMobile ? '240px' : '360px',
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.8))'
                      }}
                    />
                  )}
                </div>

                {/* Right - Enhanced Action Buttons with Better Spacing */}
                <div className="flex items-center space-x-2 sm:space-x-3 w-32 sm:w-40 justify-end">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onSearchOpen}
                    className="text-[var(--olive-green)] hover:text-[var(--soft-tan)] transition-colors p-3 rounded-lg min-h-[48px] min-w-[48px] flex items-center justify-center"
                  >
                    <Search size={24} />
                  </motion.button>
                  
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => navigate('/wishlist')}
                    className="relative text-[var(--olive-green)] hover:text-[var(--soft-tan)] transition-colors p-3 rounded-lg min-h-[48px] min-w-[48px] flex items-center justify-center"
                  >
                    <Heart size={24} />
                    {wishlistCount > 0 && (
                      <motion.span 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
                      >
                        {wishlistCount}
                      </motion.span>
                    )}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => navigate('/cart')}
                    className="relative text-[var(--olive-green)] hover:text-[var(--soft-tan)] transition-colors p-3 rounded-lg min-h-[48px] min-w-[48px] flex items-center justify-center"
                  >
                    <ShoppingBag size={24} />
                    {cartItemsCount > 0 && (
                      <motion.span 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 bg-[var(--soft-tan)] text-[var(--secondary-button)] text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
                      >
                        {cartItemsCount}
                      </motion.span>
                    )}
                  </motion.button>
                  
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleProfileClick}
                    className="text-[var(--olive-green)] hover:text-[var(--soft-tan)] transition-colors p-3 rounded-lg min-h-[48px] min-w-[48px] flex items-center justify-center"
                  >
                    <User size={24} />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Enhanced Menu Dropdown */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="dropdown-menu border-t-0 rounded-t-none max-w-xs mx-auto"
                >
                  <div className="px-2 sm:px-3 py-2 sm:py-3">
                    <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
                      {menuItems.map((item) => (
                        <motion.div 
                          key={item.label} 
                          className="transition-all duration-200"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <button
                            onClick={() => {
                              navigate(item.path);
                              setIsMenuOpen(false);
                            }}
                            className="menu-item w-full text-center flex flex-col items-center px-2 py-2 sm:px-3 sm:py-3 space-y-1 rounded-lg"
                          >
                            <item.icon size={16} color="var(--light-off-white)" />
                            <span className="font-medium text-xs text-white luxury-body">{item.label}</span>
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Enhanced Profile Sidebar */}
      <AnimatePresence>
        {isProfileOpen && user && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60"
              onClick={() => setIsProfileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed right-0 top-0 h-full z-50 w-full max-w-sm luxury-card rounded-l-xl"
            >
              <div className="p-6 sm:p-8 h-full flex flex-col">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl sm:text-3xl font-light text-[var(--text-primary)] luxury-heading">
                    Profile
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsProfileOpen(false)}
                    className="text-[var(--text-primary)] hover:text-[var(--olive-green)] transition-colors p-3 rounded-lg min-h-[48px] min-w-[48px] flex items-center justify-center"
                  >
                    <X size={24} />
                  </motion.button>
                </div>

                <div className="mb-8">
                  <div className="flex items-center space-x-4 sm:space-x-5 mb-6">
                    <div className="luxury-card rounded-full flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16">
                      {user?.photoURL ? (
                        <img src={user.photoURL} alt="Profile" className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <User size={24} className="text-[var(--text-primary)]" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-[var(--text-primary)] text-lg sm:text-xl luxury-body">
                        {user.displayName || 'User'}
                      </h3>
                      <p className="text-[var(--olive-green)] text-sm sm:text-base luxury-body">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 flex-1">
                  {[
                    { label: 'Profile Info', path: '/profile' },
                    { label: 'Order History', path: '/orders' },
                    { label: 'Saved Items', path: '/wishlist' },
                  ].map((action, index) => (
                    <motion.button
                      key={action.label}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        navigate(action.path);
                        setIsProfileOpen(false);
                      }}
                      className="w-full text-left text-[var(--text-primary)] luxury-card rounded-xl transition-all duration-200 hover:bg-[var(--soft-tan)] hover:bg-opacity-10 px-4 py-4 sm:px-5 sm:py-4 text-sm sm:text-base luxury-body"
                    >
                      {action.label}
                    </motion.button>
                  ))}
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      logout();
                      setIsProfileOpen(false);
                    }}
                    className="w-full text-left text-red-600 hover:bg-red-900/20 border border-red-600 rounded-xl transition-all duration-200 px-4 py-4 sm:px-5 sm:py-4 text-sm sm:text-base luxury-body"
                  >
                    Logout
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;