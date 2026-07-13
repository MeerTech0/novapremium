'use client';

import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import HeroBanner from '@/components/HeroBanner';
import ContentSection from '@/components/ContentSection';
import { useTrendingMovies, useTrendingTV, usePopularMovies, usePopularTV, useTopRatedMovies, useTopRatedTV, useUpcomingMovies } from '@/hooks/useTMDB';
import { motion } from 'framer-motion';

const HomePage = () => {
  const { movies: trendingMovies, loading: trendingMoviesLoading } = useTrendingMovies();
  const { shows: trendingShows, loading: trendingShowsLoading } = useTrendingTV();
  const { movies: popularMovies, loading: popularMoviesLoading } = usePopularMovies();
  const { shows: popularShows, loading: popularShowsLoading } = usePopularTV();
  const { movies: topRatedMovies, loading: topRatedMoviesLoading } = useTopRatedMovies();
  const { shows: topRatedShows, loading: topRatedShowsLoading } = useTopRatedTV();
  const { movies: upcomingMovies, loading: upcomingMoviesLoading } = useUpcomingMovies();

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900">
      <Navbar />
      <HeroBanner />

      {/* Content Sections */}
      <div className="space-y-12 py-12">
        <Suspense fallback={<div className="h-96 skeleton" />}>
          <ContentSection
            title="🔥 Trending Movies"
            items={trendingMovies}
            loading={trendingMoviesLoading}
            mediaType="movie"
          />
        </Suspense>

        <Suspense fallback={<div className="h-96 skeleton" />}>
          <ContentSection
            title="📺 Trending TV Shows"
            items={trendingShows}
            loading={trendingShowsLoading}
            mediaType="tv"
          />
        </Suspense>

        <Suspense fallback={<div className="h-96 skeleton" />}>
          <ContentSection
            title="⭐ Popular Movies"
            items={popularMovies}
            loading={popularMoviesLoading}
            mediaType="movie"
          />
        </Suspense>

        <Suspense fallback={<div className="h-96 skeleton" />}>
          <ContentSection
            title="📺 Popular TV Shows"
            items={popularShows}
            loading={popularShowsLoading}
            mediaType="tv"
          />
        </Suspense>

        <Suspense fallback={<div className="h-96 skeleton" />}>
          <ContentSection
            title="🏆 Top Rated Movies"
            items={topRatedMovies}
            loading={topRatedMoviesLoading}
            mediaType="movie"
          />
        </Suspense>

        <Suspense fallback={<div className="h-96 skeleton" />}>
          <ContentSection
            title="🏆 Top Rated TV Shows"
            items={topRatedShows}
            loading={topRatedShowsLoading}
            mediaType="tv"
          />
        </Suspense>

        <Suspense fallback={<div className="h-96 skeleton" />}>
          <ContentSection
            title="🎬 Upcoming Movies"
            items={upcomingMovies}
            loading={upcomingMoviesLoading}
            mediaType="movie"
          />
        </Suspense>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="border-t border-nova-500 border-opacity-20 py-12 mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold gradient-text mb-4">🎬 NovaPremium</h3>
              <p className="text-nova-300 text-sm">Experience the ultimate streaming platform with premium content and cinematic design.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-nova-300">
                <li><a href="#" className="hover:text-nova-100">Home</a></li>
                <li><a href="#" className="hover:text-nova-100">Movies</a></li>
                <li><a href="#" className="hover:text-nova-100">TV Shows</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-nova-300">
                <li><a href="#" className="hover:text-nova-100">Help Center</a></li>
                <li><a href="#" className="hover:text-nova-100">Contact</a></li>
                <li><a href="#" className="hover:text-nova-100">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-nova-300">
                <li><a href="#" className="hover:text-nova-100">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-nova-100">Terms of Service</a></li>
                <li><a href="#" className="hover:text-nova-100">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-nova-500 border-opacity-20 pt-8 text-center text-nova-400 text-sm">
            <p>&copy; 2026 NovaPremium. All rights reserved. Built with ❤️ for the ultimate streaming experience.</p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default HomePage;
