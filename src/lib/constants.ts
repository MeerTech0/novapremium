export const STREAMING_PROVIDERS = [
  { id: 'all', name: 'All Providers', logo: '🎬' },
  { id: 'netflix', name: 'Netflix', logo: '🔴' },
  { id: 'prime_video', name: 'Prime Video', logo: '📺' },
  { id: 'disney_plus', name: 'Disney+', logo: '🎠' },
  { id: 'apple_tv', name: 'Apple TV+', logo: '🍎' },
  { id: 'hbo_max', name: 'HBO Max', logo: '📺' },
  { id: 'hulu', name: 'Hulu', logo: '🎭' },
  { id: 'paramount_plus', name: 'Paramount+', logo: '⭐' },
  { id: 'peacock', name: 'Peacock', logo: '🦚' },
  { id: 'crunchyroll', name: 'Crunchyroll', logo: '🎌' },
];

export const CONTENT_CATEGORIES = [
  { id: 'all', name: 'All' },
  { id: 'trending', name: 'Trending' },
  { id: 'action', name: 'Action', genreId: 28 },
  { id: 'adventure', name: 'Adventure', genreId: 12 },
  { id: 'comedy', name: 'Comedy', genreId: 35 },
  { id: 'crime', name: 'Crime', genreId: 80 },
  { id: 'drama', name: 'Drama', genreId: 18 },
  { id: 'fantasy', name: 'Fantasy', genreId: 14 },
  { id: 'horror', name: 'Horror', genreId: 27 },
  { id: 'romance', name: 'Romance', genreId: 10749 },
  { id: 'scifi', name: 'Sci-Fi', genreId: 878 },
  { id: 'thriller', name: 'Thriller', genreId: 53 },
  { id: 'animation', name: 'Animation', genreId: 16 },
  { id: 'documentary', name: 'Documentary', genreId: 99 },
];

export const QUALITY_BADGES = [
  { label: '4K', color: 'bg-red-600' },
  { label: 'HD', color: 'bg-blue-600' },
  { label: 'SD', color: 'bg-gray-600' },
];

export const NAVIGATION_ITEMS = [
  { name: 'Home', href: '/' },
  { name: 'Movies', href: '/movies' },
  { name: 'TV Shows', href: '/shows' },
  { name: 'Trending', href: '/trending' },
  { name: 'Top Rated', href: '/top-rated' },
];

export const CONTENT_SECTIONS = [
  { id: 'trending_movies', title: 'Trending Movies', endpoint: 'trending_movies' },
  { id: 'trending_shows', title: 'Trending TV Shows', endpoint: 'trending_shows' },
  { id: 'popular_movies', title: 'Popular Movies', endpoint: 'popular_movies' },
  { id: 'popular_shows', title: 'Popular TV Shows', endpoint: 'popular_shows' },
  { id: 'top_rated_movies', title: 'Top Rated Movies', endpoint: 'top_rated_movies' },
  { id: 'top_rated_shows', title: 'Top Rated TV Shows', endpoint: 'top_rated_shows' },
  { id: 'upcoming', title: 'Upcoming Movies', endpoint: 'upcoming' },
  { id: 'recommendations', title: 'Recommended For You', endpoint: 'recommendations' },
];
