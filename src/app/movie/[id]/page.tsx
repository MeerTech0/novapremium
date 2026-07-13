'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiPlay, FiBookmark, FiHeart, FiShare2 } from 'react-icons/fi';
import { useMovieDetails } from '@/hooks/useTMDB';
import { tmdb } from '@/lib/tmdb';
import Link from 'next/link';
import { useStore } from '@/store/useStore';
import Navbar from '@/components/Navbar';
import ContentSection from '@/components/ContentSection';

interface MovieDetailsPageProps {
  params: {
    id: string;
  };
}

const MovieDetailsPage = ({ params }: MovieDetailsPageProps) => {
  const movieId = parseInt(params.id);
  const { movie, loading, error } = useMovieDetails(movieId);
  const { isInWatchlist, addToWatchlist, removeFromWatchlist, isInFavorites, addToFavorites, removeFromFavorites } = useStore();

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

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-dark-900 flex flex-col items-center justify-center">
        <Navbar />
        <div className="text-center pt-20">
          <h1 className="text-4xl font-bold mb-4">Movie Not Found</h1>
          <p className="text-nova-300 mb-8">The movie you're looking for doesn't exist.</p>
          <Link href="/">
            <button className="btn-primary">Back to Home</button>
          </Link>
        </div>
      </div>
    );
  }

  const backdropUrl = tmdb.getBackdropUrl(movie.backdrop_path, 'w1920_and_h800_multi_faces');
  const posterUrl = tmdb.getPosterUrl(movie.poster_path, 'w342');
  const inWatchlist = isInWatchlist(movie.id);
  const inFavorites = isInFavorites(movie.id);
  const director = movie.credits?.crew?.find((c) => c.job === 'Director');
  const writers = movie.credits?.crew?.filter((c) => c.job === 'Writer').slice(0, 2);
  const mainCast = movie.credits?.cast?.slice(0, 6);
  const trailer = movie.videos?.results?.find((v) => v.type === 'Trailer' && v.site === 'YouTube');

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-900 to-dark-800">
      <Navbar />

      {/* Hero Section */}
      <div className="relative w-full h-screen pt-20 overflow-hidden mt-20">
        <Image
          src={backdropUrl}
          alt={movie.title}
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
                alt={movie.title}
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
                <h1 className="text-5xl md:text-7xl font-bold mb-2">{movie.title}</h1>
                {movie.tagline && (
                  <p className="text-xl text-nova-400 italic mb-4">"{movie.tagline}"</p>
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
                  {movie.vote_average?.toFixed(1)} / 10
                </span>
                <span className="w-1 h-1 bg-nova-500 rounded-full" />
                <span>{new Date(movie.release_date).getFullYear()}</span>
                <span className="w-1 h-1 bg-nova-500 rounded-full" />
                <span>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span>
                <span className="w-1 h-1 bg-nova-500 rounded-full" />
                <span>{movie.original_language?.toUpperCase()}</span>
              </motion.div>

              {/* Genres */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-2 mb-6"
              >
                {movie.genres?.map((genre) => (
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
                {movie.overview}
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
                  <motion.a
                    href={`https://www.youtube.com/watch?v=${trailer.key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-secondary gap-2 inline-flex items-center"
                  >
                    <FiPlay className="w-5 h-5" />
                    Watch Trailer
                  </motion.a>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (inWatchlist) removeFromWatchlist(movie.id);
                    else addToWatchlist(movie.id);
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
                    if (inFavorites) removeFromFavorites(movie.id);
                    else addToFavorites(movie.id);
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

            {/* Crew */}
            {(director || writers) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h3 className="text-2xl font-bold mb-6">Crew</h3>
                <div className="space-y-4">
                  {director && (
                    <div className="glass rounded-lg p-4">
                      <p className="text-nova-500 font-semibold text-sm">Director</p>
                      <p className="text-lg font-bold">{director.name}</p>
                    </div>
                  )}
                  {writers && writers.length > 0 && (
                    <div className="glass rounded-lg p-4">
                      <p className="text-nova-500 font-semibold text-sm">Writers</p>
                      <p className="text-lg font-bold">{writers.map((w) => w.name).join(', ')}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column */}
          <div>
            {/* Streaming Providers */}
            {movie.watch_providers?.results?.US && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass rounded-lg p-6 mb-6"
              >
                <h4 className="font-bold mb-4">Where to Watch</h4>
                <p className="text-nova-400 text-sm mb-4">Available on:</p>
                {movie.watch_providers.results.US.flatrate && (
                  <div>
                    <p className="text-xs text-nova-500 mb-2">Streaming</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {movie.watch_providers.results.US.flatrate.map((provider) => (
                        <Image
                          key={provider.provider_id}
                          src={tmdb.getProfileUrl(provider.logo_path, 'w92')}
                          alt={provider.provider_name}
                          width={40}
                          height={40}
                          className="rounded"
                          title={provider.provider_name}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Production Info */}
            {movie.production_companies && movie.production_companies.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass rounded-lg p-6"
              >
                <h4 className="font-bold mb-4">Production</h4>
                <div className="space-y-2">
                  {movie.production_companies.map((company) => (
                    <p key={company.id} className="text-nova-300 text-sm">
                      {company.name}
                    </p>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      {movie.recommendations && movie.recommendations.results && movie.recommendations.results.length > 0 && (
        <div className="py-12">
          <ContentSection
            title="Similar Movies"
            items={movie.recommendations.results}
            mediaType="movie"
          />
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;
