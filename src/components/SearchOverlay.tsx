'use client';

import React, { useState, useEffect } from 'react';
import { X, Search, TrendingUp, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { searchProducts, getLatestProducts, Product } from '@/lib/product';
import { useAuth } from '@/contexts/AuthContext';
import { addRecentSearch } from '@/lib/user';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const { user } = useAuth();

  const trendingSearches = ['luxury shirts', 'designer jeans', 'evening wear', 'casual tops', 'accessories'];
  const categories = ['All', 'Tops', 'Bottoms', 'Outerwear', 'Dresses', 'Accessories'];

  useEffect(() => {
    if (isOpen) {
      loadSuggestedProducts();
      loadRecentSearches();
      setTimeout(() => {
        const input = document.getElementById('search-input');
        if (input) input.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const debounceTimer = setTimeout(() => {
        handleSearch(searchQuery);
      }, 300);

      return () => clearTimeout(debounceTimer);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, selectedCategory]);

  const loadSuggestedProducts = async () => {
    try {
      const products = await getLatestProducts(8);
      setSuggestedProducts(products);
    } catch (error) {
      console.error('Error loading suggested products:', error);
      // Mock data for demo
      setSuggestedProducts([
        {
          id: '1',
          name: 'Premium Cotton T-Shirt',
          price: 1999,
          imageURL: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
          category: 'Tops',
          description: 'Luxury cotton t-shirt',
          stock: 10,
          tags: ['cotton', 'premium', 'casual'],
          createdAt: new Date()
        },
        {
          id: '2',
          name: 'Designer Jeans',
          price: 3999,
          imageURL: 'https://images.unsplash.com/photo-1542272604-787c3835535d',
          category: 'Bottoms',
          description: 'Premium designer jeans',
          stock: 5,
          tags: ['jeans', 'designer', 'denim'],
          createdAt: new Date()
        }
      ]);
    }
  };

  const loadRecentSearches = () => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const results = await searchProducts(query);
      let filteredResults = results;
      
      if (selectedCategory && selectedCategory !== 'All') {
        filteredResults = results.filter(product => product.category === selectedCategory);
      }
      
      setSearchResults(filteredResults);
      
      // Add to recent searches
      const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
      
      if (user) {
        await addRecentSearch(user.uid, query);
      }
    } catch (error) {
      console.error('Search error:', error);
      // Mock search results for demo
      setSearchResults(suggestedProducts.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      ));
    } finally {
      setIsLoading(false);
    }
  };

  const handleProductClick = (product: Product) => {
    window.location.href = `/product/${product.id}`;
  };

  const handleTrendingClick = (term: string) => {
    setSearchQuery(term);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 luxury-navbar"
      >
        <div className="min-h-screen">
          {/* Header */}
          <motion.div 
            className="border-b border-[var(--border-color)] p-6 luxury-card rounded-b-2xl"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="max-w-4xl mx-auto flex items-center justify-between">
              <div className="flex-1 mr-8">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--secondary-accent)]" size={20} />
                  <input
                    id="search-input"
                    type="text"
                    placeholder="Search for products, brands, or styles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 text-lg border border-[var(--border-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-accent)] rounded-xl luxury-input"
                  />
                </div>
              </div>
              
              <motion.button
                onClick={onClose}
                className="p-3 hover:bg-[var(--primary-accent)] hover:bg-opacity-20 rounded-full text-[var(--text-primary)] transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={24} />
              </motion.button>
            </div>

            {/* Category Filters */}
            <div className="max-w-4xl mx-auto mt-4">
              <div className="flex items-center space-x-2 overflow-x-auto">
                <Filter size={16} className="text-[var(--secondary-accent)] flex-shrink-0" />
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setSelectedCategory(category === 'All' ? '' : category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex-shrink-0 ${
                      (selectedCategory === category) || (selectedCategory === '' && category === 'All')
                        ? 'bg-[var(--primary-accent)] text-black'
                        : 'bg-transparent border border-[var(--border-color)] text-[var(--text-primary)] hover:bg-[var(--primary-accent)] hover:bg-opacity-20'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <div className="max-w-4xl mx-auto p-6">
            {/* Loading */}
            {isLoading && (
              <motion.div 
                className="flex justify-center py-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary-accent)]"></div>
              </motion.div>
            )}

            {/* Search Results */}
            <AnimatePresence>
              {searchResults.length > 0 && !isLoading && (
                <motion.div 
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <h3 className="text-lg font-medium mb-6 text-[var(--text-primary)]">
                    Search Results ({searchResults.length})
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {searchResults.map((product, index) => (
                      <motion.div
                        key={product.id}
                        className="cursor-pointer group"
                        onClick={() => handleProductClick(product)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                      >
                        <div className="aspect-square relative mb-3 overflow-hidden rounded-xl border border-[var(--border-color)] luxury-card">
                          <img
                            src={product.imageURL}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h4 className="font-medium text-sm text-[var(--text-primary)] mb-1">{product.name}</h4>
                        <p className="text-[var(--secondary-accent)] text-sm">₹{product.price}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Trending Searches */}
            {!searchQuery && (
              <motion.div 
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-lg font-medium mb-6 text-[var(--text-primary)] flex items-center">
                  <TrendingUp className="mr-2" size={20} />
                  Trending Searches
                </h3>
                <div className="flex flex-wrap gap-3">
                  {trendingSearches.map((search, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleTrendingClick(search)}
                      className="px-4 py-2 border border-[var(--border-color)] hover:bg-[var(--primary-accent)] hover:bg-opacity-20 rounded-full text-sm text-[var(--text-primary)] transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {search}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Recent Searches */}
            {recentSearches.length > 0 && !searchQuery && (
              <motion.div 
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-lg font-medium mb-6 text-[var(--text-primary)]">Recent Searches</h3>
                <div className="flex flex-wrap gap-3">
                  {recentSearches.map((search, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setSearchQuery(search)}
                      className="px-4 py-2 border border-[var(--border-color)] hover:bg-[var(--primary-accent)] hover:bg-opacity-20 rounded-full text-sm text-[var(--text-primary)] transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {search}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* New This Season */}
            {suggestedProducts.length > 0 && !searchQuery && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-lg font-medium mb-6 text-[var(--text-primary)]">New This Season</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {suggestedProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      className="cursor-pointer group"
                      onClick={() => handleProductClick(product)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <div className="aspect-square relative mb-3 overflow-hidden rounded-xl border border-[var(--border-color)] luxury-card">
                        <img
                          src={product.imageURL}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h4 className="font-medium text-sm text-[var(--text-primary)] mb-1">{product.name}</h4>
                      <p className="text-[var(--secondary-accent)] text-sm">₹{product.price}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* No Results */}
            {searchQuery && searchResults.length === 0 && !isLoading && (
              <motion.div 
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-[var(--secondary-accent)] text-lg mb-4">No products found for "{searchQuery}"</p>
                <p className="text-[var(--secondary-accent)] text-sm">Try adjusting your search or browse our categories</p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchOverlay;