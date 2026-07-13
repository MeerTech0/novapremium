'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MovieCard from './MovieCard';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface ContentSectionProps {
  title: string;
  items: any[];
  loading?: boolean;
  mediaType?: 'movie' | 'tv';
}

const ContentSection = ({
  title,
  items,
  loading = false,
  mediaType = 'movie',
}: ContentSectionProps) => {
  const [scrollPos, setScrollPos] = useState(0);
  const [showArrows, setShowArrows] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById(`scroll-${title}`);
    if (!container) return;

    const scrollAmount = 350;
    const newPos = direction === 'left' ? scrollPos - scrollAmount : scrollPos + scrollAmount;
    container.scrollTo({ left: newPos, behavior: 'smooth' });
    setScrollPos(newPos);
  };

  if (loading) {
    return (
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-6 px-4 sm:px-6 lg:px-8">{title}</h2>
        <div className="flex gap-4 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-48 h-72 rounded-lg bg-gradient-to-b from-nova-500 from-10% to-dark-700 skeleton"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="w-full py-8"
    >
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold gradient-text">{title}</h2>
          <a href="#" className="text-nova-500 hover:text-nova-400 text-sm font-semibold">
            View All →
          </a>
        </div>

        {/* Scrollable Container */}
        <div
          className="relative group"
          onMouseEnter={() => setShowArrows(true)}
          onMouseLeave={() => setShowArrows(false)}
        >
          {/* Left Arrow */}
          {showArrows && scrollPos > 0 && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-glass hover:bg-nova-500 hover:bg-opacity-30 transition-all"
            >
              <FiChevronLeft className="w-6 h-6" />
            </motion.button>
          )}

          {/* Content */}
          <div
            id={`scroll-${title}`}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{
              scrollBehavior: 'smooth',
              overflowY: 'hidden',
              paddingBottom: '8px',
            }}
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.id || idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-48 md:w-56"
              >
                <MovieCard item={item} mediaType={mediaType} />
              </motion.div>
            ))}
          </div>

          {/* Right Arrow */}
          {showArrows && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-glass hover:bg-nova-500 hover:bg-opacity-30 transition-all"
            >
              <FiChevronRight className="w-6 h-6" />
            </motion.button>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default ContentSection;
