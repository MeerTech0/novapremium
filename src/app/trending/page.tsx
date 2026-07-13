'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ContentSection from '@/components/ContentSection';
import { useTrendingMovies, useTrendingTV } from '@/hooks/useTMDB';
import { motion } from 'framer-motion';

const TrendingPage = () => {
  const { movies: trendingMovies, loading: moviesLoading } = useTrendingMovies();
  const { shows: trendingShows, loading: showsLoading } = useTrendingTV();
  const [activeTab, setActiveTab] = useState<'all' | 'movies' | 'tv'>('all');

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900">
      <Navbar />
      
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full"
      >
        <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-4">🔥 Trending Now</h1>
        <p className="text-nova-300 text-lg mb-8">Discover what's hot right now on NovaPremium</p>
        
        {/* Tabs */}
        <div className="flex gap-4">
          {(['all', 'movies', 'tv'] as const).map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              whileHover={{ scale: 1.05 }}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                activeTab === tab
                  ? 'bg-nova-500 text-dark-900'
                  : 'bg-glass text-nova-300 hover:text-nova-200'
              }`}
            >
              {tab === 'all' ? 'All' : tab === 'movies' ? 'Movies' : 'TV Shows'}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Content */}
      <div className="space-y-12 pb-12">
        {(activeTab === 'all' || activeTab === 'movies') && (
          <ContentSection
            title="Trending Movies"
            items={trendingMovies}
            loading={moviesLoading}
            mediaType="movie"
          />
        )}
        {(activeTab === 'all' || activeTab === 'tv') && (
          <ContentSection
            title="Trending TV Shows"
            items={trendingShows}
            loading={showsLoading}
            mediaType="tv"
          />
        )}
      </div>
    </div>
  );
};

export default TrendingPage;
