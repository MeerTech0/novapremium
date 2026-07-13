'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import MovieCard from '@/components/MovieCard';
import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';
import { FiBookmark, FiHeart } from 'react-icons/fi';

const MyListPage = () => {
  const { watchlist, favorites } = useStore();
  const [activeTab, setActiveTab] = useState<'watchlist' | 'favorites'>('watchlist');
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data - in production, fetch from API using IDs
  useEffect(() => {
    setLoading(false);
    // Items would be fetched based on watchlist/favorites IDs
    setItems([]);
  }, [activeTab, watchlist, favorites]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900">
      <Navbar />
      
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full"
      >
        <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-8">📚 My List</h1>
        
        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          {(['watchlist', 'favorites'] as const).map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              whileHover={{ scale: 1.05 }}
              className={`px-6 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                activeTab === tab
                  ? 'bg-nova-500 text-dark-900'
                  : 'bg-glass text-nova-300 hover:text-nova-200'
              }`}
            >
              {tab === 'watchlist' ? (
                <><FiBookmark /> Watchlist ({watchlist.length})</>
              ) : (
                <><FiHeart /> Favorites ({favorites.length})</>
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Content */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full pb-12">
        {(activeTab === 'watchlist' ? watchlist.length : favorites.length) === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-nova-300 text-xl mb-4">
              {activeTab === 'watchlist' ? 'No items in your watchlist yet' : 'No favorites yet'}
            </p>
            <a href="/" className="btn-primary inline-block">
              Explore Content
            </a>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <MovieCard item={item} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListPage;
