'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import MovieCard from '@/components/MovieCard';
import { useSearch } from '@/hooks/useTMDB';
import { motion } from 'framer-motion';
import { FiSearch, FiX } from 'react-icons/fi';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'multi' | 'movie' | 'tv'>('multi');
  const { results, loading } = useSearch(searchQuery, searchType);

  const handleClear = () => {
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900">
      <Navbar />
      
      {/* Search Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full"
      >
        <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-8">🔍 Search</h1>
        
        {/* Search Input */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-nova-500" />
            <input
              type="text"
              placeholder="Search movies, TV shows, and more..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-3 rounded-lg bg-glass border border-nova-500 border-opacity-30 text-white placeholder-nova-400 focus:outline-none focus:border-nova-400 transition-colors"
            />
            {searchQuery && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={handleClear}
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
              >
                <FiX className="text-nova-500" />
              </motion.button>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-3 flex-wrap">
            {(['multi', 'movie', 'tv'] as const).map((type) => (
              <motion.button
                key={type}
                onClick={() => setSearchType(type)}
                whileHover={{ scale: 1.05 }}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  searchType === type
                    ? 'bg-nova-500 text-dark-900'
                    : 'bg-glass text-nova-300 hover:text-nova-200'
                }`}
              >
                {type === 'multi' ? 'All' : type === 'movie' ? 'Movies' : 'TV Shows'}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        {searchQuery && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-nova-300 mb-8"
          >
            Found {results.length} result{results.length !== 1 ? 's' : ''} for "{searchQuery}"
          </motion.p>
        )}
      </motion.div>

      {/* Results Grid */}
      {searchQuery && (
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full pb-12">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="w-full h-80 rounded-lg bg-gradient-to-b from-nova-500 from-10% to-dark-700 skeleton"
                />
              ))}
            </div>
          ) : results.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-nova-300 text-xl">No results found</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {results.map((item, idx) => (
                <motion.div
                  key={item.id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  viewport={{ once: true }}
                >
                  {(item.media_type === 'movie' || item.media_type === 'tv') && (
                    <MovieCard
                      item={item as any}
                      mediaType={item.media_type === 'tv' ? 'tv' : 'movie'}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
