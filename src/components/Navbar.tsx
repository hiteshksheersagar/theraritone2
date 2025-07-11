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
}

const Navbar: React.FC<NavbarProps> = memo(({ onSearchOpen, onCartOpen, pageTitle, showBackButton = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, cart, logout } = useAuth();

  // Only enable scroll animations on homepage
  const isHomepage = location.pathname === '/';

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Navbar visibility based on scroll
  useEffect(() => {
    if (!isHomepage) {
      setIsVisible(true);
      return;
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY > 300); // Show after butterfly animation
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomepage]);

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
      {/* LUXURY NAVBAR */}
      <AnimatePresence>
        {(isVisible || !isHomepage) && (
          <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ 
              duration: 0.6, 
              ease: [0.25, 0.46, 0.45, 0.94] 
            }}
            className="fixed top-0 left-0 right-0 z-50 h-16 luxury-navbar"
            data-menu-container
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
              <div className="flex items-center justify-between h-full">
                {/* Left - Back Button or Menu */}
                <div className="flex items-center w-24 sm:w-32">
                  {showBackButton ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleBackClick}
                      className="flex items-center space-x-2 px-4 text-white hover:text-[var(--primary-accent)] transition-colors p-2 rounded-lg min-h-[40px] min-w-[40px]"
                    >
                      <ArrowLeft size={20} color="var(--secondary-accent)" />
                      {!isMobile && <span className="text-sm font-medium text-white">Back</span>}
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleMenuClick}
                      className="flex items-center space-x-2 px-4 text-white hover:text-[var(--primary-accent)] transition-colors relative p-2 rounded-lg min-h-[40px] min-w-[40px]"
                    >
                      {/* Hamburger to Cross Animation */}
                      <div className="relative w-5 h-5 flex flex-col justify-center items-center">
                        <motion.span
                          className="absolute w-4 h-0.5 bg-[var(--secondary-accent)] rounded-full"
                          animate={{
                            rotate: isMenuOpen ? 45 : 0,
                            y: isMenuOpen ? 0 : -4
                          }}
                          transition={{ duration: 0.3 }}
                        />
                        <motion.span
                          className="absolute w-4 h-0.5 bg-[var(--secondary-accent)] rounded-full"
                          animate={{
                            opacity: isMenuOpen ? 0 : 1
                          }}
                          transition={{ duration: 0.3 }}
                        />
                        <motion.span
                          className="absolute w-4 h-0.5 bg-[var(--secondary-accent)] rounded-full"
                          animate={{
                            rotate: isMenuOpen ? -45 : 0,
                            y: isMenuOpen ? 0 : 4
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      
                      {!isMobile && (
                        <span className="text-sm font-medium text-white">
                          {isMenuOpen ? 'Close' : 'Menu'}
                        </span>
                      )}
                    </motion.button>
                  )}
                </div>

                {/* Center - Logo or Page Title with Morph Effect */}
                <div className="flex-1 flex justify-center items-center relative">
                  {pageTitle ? (
                    <motion.div 
                      className="navbar-title-container relative cursor-pointer flex items-center justify-center h-16 w-full max-w-xs"
                      onClick={handleTitleClick}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.h1 
                        className="navbar-title font-light text-white text-lg sm:text-xl"
                        whileHover={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                      >
                        {pageTitle}
                      </motion.h1>
                      <motion.img
                        src="/IMG-20250305-WA0003-removebg-preview.png"
                        alt="RARITONE"
                        className="navbar-logo absolute"
                        style={{
                          height: isMobile ? '48px' : '64px',
                          width: 'auto',
                          maxWidth: isMobile ? '200px' : '300px',
                          objectFit: 'contain'
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  ) : (
                    <motion.img
                      src="/IMG-20250305-WA0003-removebg-preview.png"
                      alt="RARITONE"
                      className="cursor-pointer transition-all duration-300 luxury-float"
                      onClick={handleLogoClick}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        height: isMobile ? '48px' : '64px',
                        width: 'auto',
                        maxWidth: isMobile ? '200px' : '300px',
                        objectFit: 'contain'
                      }}
                    />
                  )}
                </div>

                {/* Right - Action Buttons */}
                <div className="flex items-center space-x-1 sm:space-x-2 w-24 sm:w-32 justify-end">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onSearchOpen}
                    className="text-[var(--secondary-accent)] hover:text-[var(--primary-accent)] transition-colors px-4 p-2 rounded-lg min-h-[40px] min-w-[40px] flex items-center justify-center"
                  >
                    <Search size={20} />
                  </motion.button>
                  
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => navigate('/wishlist')}
                    className="relative text-[var(--secondary-accent)] hover:text-[var(--primary-accent)] transition-colors px-4 p-2 rounded-lg min-h-[40px] min-w-[40px] flex items-center justify-center"
                  >
                    <Heart size={20} />
                    {wishlistCount > 0 && (
                      <motion.span 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 bg-[var(--error-color)] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center"
                      >
                        {wishlistCount}
                      </motion.span>
                    )}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => navigate('/cart')}
                    className="relative text-[var(--secondary-accent)] hover:text-[var(--primary-accent)] transition-colors px-4 p-2 rounded-lg min-h-[40px] min-w-[40px] flex items-center justify-center"
                  >
                    <ShoppingBag size={20} />
                    {cartItemsCount > 0 && (
                      <motion.span 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 bg-[var(--primary-accent)] text-black text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium"
                      >
                        {cartItemsCount}
                      </motion.span>
                    )}
                  </motion.button>
                  
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleProfileClick}
                    className="text-[var(--secondary-accent)] hover:text-[var(--primary-accent)] transition-colors px-4 p-2 rounded-lg min-h-[40px] min-w-[40px] flex items-center justify-center"
                  >
                    <User size={20} />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Menu Dropdown */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="dropdown-menu border-t-0 rounded-t-none"
                >
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                    <div className="flex justify-center gap-4 sm:gap-8 flex-wrap">
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
                            className="dropdown-item w-full text-center flex flex-col items-center px-3 py-4 sm:px-4 sm:py-6 space-y-2 sm:space-y-3 rounded-xl"
                          >
                            <item.icon size={22} color="var(--secondary-accent)" />
                            <span className="font-medium text-xs sm:text-sm text-white">{item.label}</span>
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

      {/* Profile Sidebar */}
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
              <div className="p-4 sm:p-6 h-full flex flex-col">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl sm:text-2xl font-light text-[var(--text-primary)]">
                    Profile
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsProfileOpen(false)}
                    className="text-[var(--text-primary)] hover:text-[var(--primary-accent)] transition-colors p-2 rounded-lg min-h-[40px] min-w-[40px] flex items-center justify-center"
                  >
                    <X size={22} />
                  </motion.button>
                </div>

                <div className="mb-8">
                  <div className="flex items-center space-x-3 sm:space-x-4 mb-6">
                    <div className="luxury-card rounded-full flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14">
                      {user?.photoURL ? (
                        <img src={user.photoURL} alt="Profile" className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <User size={22} className="text-[var(--text-primary)]" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-[var(--text-primary)] text-base sm:text-lg">
                        {user.displayName || 'User'}
                      </h3>
                      <p className="text-[var(--secondary-accent)] text-sm sm:text-base">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 flex-1">
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
                      className="w-full text-left text-[var(--text-primary)] luxury-card rounded-xl transition-all duration-200 hover:bg-[var(--primary-accent)] hover:bg-opacity-10 px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base"
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
                    className="w-full text-left text-[var(--error-color)] hover:bg-red-900/20 border border-[var(--error-color)] rounded-xl transition-all duration-200 px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base"
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