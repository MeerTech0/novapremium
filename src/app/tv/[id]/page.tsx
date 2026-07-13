'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiPlay, FiBookmark, FiHeart, FiShare2 } from 'react-icons/fi';
import { useTVDetails } from '@/hooks/useTMDB';
import { tmdb } from '@/lib/tmdb';
import Link from 'next/link';
import { useStore } from '@/store/useStore';
import Navbar from '@/components/Navbar';
import ContentSection from '@/components/ContentSection';

interface TVDetailsPageProps {
  params: {
    id: string;
  };
}

const TVDetailsPage = ({ params }: TVDetailsPageProps) => {
  const tvId = parseInt(params.id);
  const { show, loading, error } = useTVDetails(tvId);
  const { isInWatchlist, addToWatchlist, removeFromWatchlist, isInFavorites, addToFavorites, removeFromFavorites } = useStore();
  const [showTrailer, setShowTrailer] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nova-500 mx-auto mb-4"></div>
          <p className="text-nova-300">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !show) {
    return (
      <div className="min-h-screen bg-dark-900 flex flex-col items-center justify-center">
        <Navbar />
        <div className="text-center pt-20">
          <h1 className="text-4xl font-bold mb-4">TV Show Not Found</h1>
          <p className="text-nova-300 mb-8">The TV show you're looking for doesn't exist.</p>
          <Link href="/">
            <button className="btn-primary">Back to Home</button>
          </Link>
        </div>
      </div>
    );
  }

  const backdropUrl = tmdb.getBackdropUrl(show.backdrop_path, 'w1920_and_h800_multi_faces');
  const posterUrl = tmdb.getPosterUrl(show.poster_path, 'w342');
  const inWatchlist = isInWatchlist(show.id);
  const inFavorites = isInFavorites(show.id);
  const director = show.credits?.crew?.find((c) => c.job === 'Director');
  const mainCast = show.credits?.cast?.slice(0, 6);
  const trailer = show.videos?.results?.find((v) => v.type === 'Trailer' && v.site === 'YouTube');

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-900 to-dark-800">
      <Navbar />

      {/* Hero Section */}
      <div className="relative w-full h-screen pt-20 overflow-hidden mt-20">
        <Image
          src={backdropUrl}
          alt={show.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900 via-dark-900 via-80% to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 h-full flex items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {/* Poster */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="hidden md:flex justify-center"
            >
              <Image
                src={posterUrl}
                alt={show.name}
                width={250}
                height={375}
                className="rounded-lg shadow-soft-lg"
              />
            </motion.div>

            {/* Info */}
            <div className="md:col-span-2 flex flex-col justify-center">
              {/* Back Button */}
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05, x: -5 }}
                  className="flex items-center gap-2 text-nova-300 hover:text-nova-100 mb-6 w-fit"
                >
                  <FiArrowLeft /> Back
                </motion.button>
              </Link>

              {/* Title & Tagline */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h1 className="text-5xl md:text-7xl font-bold mb-2">{show.name}</h1>
                {show.tagline && (
                  <p className="text-xl text-nova-400 italic mb-4">"{show.tagline}"</p>
                )}
              </motion.div>

              {/* Meta Info */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap items-center gap-4 mb-6 text-sm md:text-base"
              >
                <span className="flex items-center gap-2 bg-nova-500 bg-opacity-20 px-3 py-1 rounded-full">
                  <span className="text-nova-500 font-bold">⭐</span>
                  {show.vote_average?.toFixed(1)} / 10
                </span>
                <span className="w-1 h-1 bg-nova-500 rounded-full" />
                <span>{show.number_of_seasons} Seasons</span>
                <span className="w-1 h-1 bg-nova-500 rounded-full" />
                <span>{show.number_of_episodes} Episodes</span>
              </motion.div>

              {/* Genres */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-2 mb-6"
              >
                {show.genres?.map((genre) => (
                  <span key={genre.id} className="bg-glass px-3 py-1 rounded-lg text-sm text-nova-300">
                    {genre.name}
                  </span>
                ))}
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-lg text-nova-300 mb-8 leading-relaxed max-w-2xl"
              >
                {show.overview}
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
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
                {trailer && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowTrailer(true)}
                    className="btn-secondary gap-2"
                  >
                    <FiPlay className="w-5 h-5" />
                    Watch Trailer
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (inWatchlist) removeFromWatchlist(show.id);
                    else addToWatchlist(show.id);
                  }}
                  className={`px-6 py-3 rounded-lg font-semibold gap-2 flex items-center transition-colors ${
                    inWatchlist
                      ? 'bg-nova-500 text-dark-900'
                      : 'bg-glass text-nova-300 hover:text-nova-200'
                  }`}
                >
                  <FiBookmark className="w-5 h-5" />
                  {inWatchlist ? 'Saved' : 'Save'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (inFavorites) removeFromFavorites(show.id);
                    else addToFavorites(show.id);
                  }}
                  className={`px-6 py-3 rounded-lg font-semibold gap-2 flex items-center transition-colors ${
                    inFavorites
                      ? 'bg-red-500 text-white'
                      : 'bg-glass text-nova-300 hover:text-nova-200'
                  }`}
                >
                  <FiHeart className={inFavorites ? 'fill-current' : ''} className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-ghost gap-2"
                >
                  <FiShare2 className="w-5 h-5" />
                  Share
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Details Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="md:col-span-2">
            {/* Cast */}
            {mainCast && mainCast.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h3 className="text-2xl font-bold mb-6">Cast</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {mainCast.map((actor) => (
                    <motion.div
                      key={actor.id}
                      whileHover={{ y: -5 }}
                      className="glass rounded-lg p-4 text-center"
                    >
                      {actor.profile_path && (
                        <Image
                          src={tmdb.getProfileUrl(actor.profile_path, 'w185')}
                          alt={actor.name}
                          width={150}
                          height={225}
                          className="rounded-lg mb-3 w-full h-auto"
                        />
                      )}
                      <p className="font-semibold text-sm">{actor.name}</p>
                      <p className="text-nova-400 text-xs">{actor.character}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Seasons */}
            {show.seasons && show.seasons.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h3 className="text-2xl font-bold mb-6">Seasons</h3>
                <div className="space-y-4">
                  {show.seasons.map((season) => (
                    <motion.div
                      key={season.id}
                      whileHover={{ x: 5 }}
                      className="glass rounded-lg p-4 flex items-start gap-4"
                    >
                      {season.poster_path && (
                        <Image
                          src={tmdb.getPosterUrl(season.poster_path, 'w92')}
                          alt={season.name}
                          width={60}
                          height={90}
                          className="rounded"
                        />
                      )}
                      <div>
                        <p className="font-bold text-lg">{season.name}</p>
                        <p className="text-nova-400 text-sm">Episodes: {season.episode_count}</p>
                        <p className="text-nova-300 text-sm mt-2 line-clamp-2">{season.overview}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column */}
          <div>
            {/* Networks */}
            {show.networks && show.networks.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass rounded-lg p-6 mb-6"
              >
                <h4 className="font-bold mb-4">Networks</h4>
                <div className="space-y-2">
                  {show.networks.map((network) => (
                    <p key={network.id} className="text-nova-300 text-sm">
                      {network.name}
                    </p>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass rounded-lg p-6"
            >
              <h4 className="font-bold mb-4">Information</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-nova-500 text-xs font-semibold">Status</p>
                  <p className="text-nova-300">{show.status}</p>
                </div>
                <div>
                  <p className="text-nova-500 text-xs font-semibold">First Air Date</p>
                  <p className="text-nova-300">{new Date(show.first_air_date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-nova-500 text-xs font-semibold">Total Seasons</p>
                  <p className="text-nova-300">{show.number_of_seasons}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      {show.recommendations && show.recommendations.results && show.recommendations.results.length > 0 && (
        <div className="py-12">
          <ContentSection
            title="Similar Shows"
            items={show.recommendations.results}
            mediaType="tv"
          />
        </div>
      )}
    </div>
  );
};

export default TVDetailsPage;
