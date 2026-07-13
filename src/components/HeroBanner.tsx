'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlay, FiBookmark, FiInfo } from 'react-icons/fi';
import { useTrendingMovies } from '@/hooks/useTMDB';
import { tmdb } from '@/lib/tmdb';

const HeroBanner = () => {
  const { movies, loading } = useTrendingMovies();
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay || movies.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % movies.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [autoPlay, movies.length]);

  if (loading || movies.length === 0) {
    return (
      <div className="relative w-full h-screen bg-gradient-to-b from-dark-900 to-dark-800 animate-pulse" />
    );
  }

  const movie = movies[current];
  const backdropUrl = tmdb.getBackdropUrl(movie.backdrop_path, 'w1920_and_h800_multi_faces');

  return (
    <div
      className="relative w-full h-screen pt-20 overflow-hidden"
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => setAutoPlay(true)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src={backdropUrl}
            alt={movie.title}
            fill
            className="object-cover"
            priority
            onError={(e) => {
              e.currentTarget.src = '/placeholder-backdrop.jpg';
            }}
          />
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-dark-900 via-transparent to-dark-900" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="relative z-10 h-full flex items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-2xl">
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-5xl md:text-7xl font-bold mb-4 leading-tight"
          >
            {movie.title}
          </motion.h1>

          {/* Meta Info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-4 mb-6 text-sm md:text-base"
          >
            <span className="flex items-center gap-2">
              <span className="text-nova-500 font-bold">★</span>
              {movie.vote_average?.toFixed(1)}
            </span>
            <span className="w-1 h-1 bg-nova-500 rounded-full" />
            <span>{new Date(movie.release_date).getFullYear()}</span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-lg md:text-xl text-nova-300 mb-8 line-clamp-3"
          >
            {movie.overview}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary gap-2"
            >
              <FiPlay className="w-5 h-5" />
              Watch Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary gap-2"
            >
              <FiInfo className="w-5 h-5" />
              More Info
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-ghost gap-2"
            >
              <FiBookmark className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex gap-2"
      >
        {movies.slice(0, 5).map((_, idx) => (
          <motion.button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === current ? 'bg-nova-500 w-8' : 'bg-nova-300 bg-opacity-50'
            }`}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default HeroBanner;
