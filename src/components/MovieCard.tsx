'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiPlay, FiBookmark, FiHeart } from 'react-icons/fi';
import { tmdb } from '@/lib/tmdb';
import { Movie, TVShow } from '@/types';
import { useStore } from '@/store/useStore';

interface MovieCardProps {
  item: Movie | TVShow;
  mediaType?: 'movie' | 'tv';
}

const MovieCard = ({ item, mediaType = 'movie' }: MovieCardProps) => {
  const { isInWatchlist, addToWatchlist, removeFromWatchlist, isInFavorites, addToFavorites, removeFromFavorites } = useStore();
  const inWatchlist = isInWatchlist(item.id);
  const inFavorites = isInFavorites(item.id);

  const title = 'title' in item ? item.title : item.name;
  const posterUrl = tmdb.getPosterUrl(item.poster_path, 'w342');
  const href = mediaType === 'movie' ? `/movie/${item.id}` : `/tv/${item.id}`;

  return (
    <Link href={href}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        viewport={{ once: true, margin: '-50px' }}
        className="group relative rounded-lg overflow-hidden hover-lift"
      >
        {/* Image Container */}
        <div className="relative w-full aspect-[2/3] overflow-hidden rounded-lg bg-dark-700">
          <Image
            src={posterUrl}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              e.currentTarget.src = '/placeholder-poster.jpg';
            }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Card Info */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-bold text-nova-500">★</span>
            <span className="text-sm font-semibold">{item.vote_average?.toFixed(1)}</span>
          </div>

          {/* Title */}
          <h3 className="text-base font-bold line-clamp-2 mb-2">{title}</h3>

          {/* Description */}
          <p className="text-xs text-nova-300 line-clamp-2 mb-4">{item.overview}</p>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 flex items-center justify-center gap-2 btn-primary text-sm py-2"
            >
              <FiPlay className="w-4 h-4" />
              Play
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                if (inWatchlist) removeFromWatchlist(item.id);
                else addToWatchlist(item.id);
              }}
              className={`p-2 rounded-lg transition-colors ${
                inWatchlist
                  ? 'bg-nova-500 text-dark-900'
                  : 'bg-glass text-nova-300 hover:text-nova-200'
              }`}
            >
              <FiBookmark className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                if (inFavorites) removeFromFavorites(item.id);
                else addToFavorites(item.id);
              }}
              className={`p-2 rounded-lg transition-colors ${
                inFavorites
                  ? 'bg-red-500 text-white'
                  : 'bg-glass text-nova-300 hover:text-nova-200'
              }`}
            >
              <FiHeart className={inFavorites ? 'fill-current' : ''} className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-glass px-2 py-1 rounded-lg text-xs font-bold text-nova-500">
          {item.vote_average?.toFixed(1)}
        </div>
      </motion.div>
    </Link>
  );
};

export default MovieCard;
