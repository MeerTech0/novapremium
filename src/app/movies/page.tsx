'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ContentSection from '@/components/ContentSection';
import { usePopularMovies } from '@/hooks/useTMDB';
import { motion } from 'framer-motion';

const MoviesPage = () => {
  const { movies, loading } = usePopularMovies();

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900">
      <Navbar />
      
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full"
      >
        <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-4">🎬 Movies</h1>
        <p className="text-nova-300 text-lg">Browse our extensive collection of movies</p>
      </motion.div>

      {/* Content */}
      <div className="space-y-12 pb-12">
        <ContentSection
          title="Popular Movies"
          items={movies}
          loading={loading}
          mediaType="movie"
        />
      </div>
    </div>
  );
};

export default MoviesPage;
