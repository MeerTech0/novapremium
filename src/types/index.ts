// Movie and TV Show Types
export interface Movie {
  id: number;
  title: string;
  backdrop_path: string | null;
  poster_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  runtime?: number;
  genres?: Genre[];
  tagline?: string;
  budget?: number;
  revenue?: number;
  status?: string;
  original_language?: string;
  production_companies?: ProductionCompany[];
  credits?: Credits;
  videos?: Video[];
  watch_providers?: WatchProvider;
  recommendations?: ContentResponse;
}

export interface TVShow {
  id: number;
  name: string;
  backdrop_path: string | null;
  poster_path: string | null;
  overview: string;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  genres?: Genre[];
  tagline?: string;
  number_of_seasons?: number;
  number_of_episodes?: number;
  networks?: Network[];
  seasons?: Season[];
  credits?: Credits;
  videos?: Video[];
  watch_providers?: WatchProvider;
  recommendations?: ContentResponse;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface Network {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
}

export interface Credits {
  cast: Cast[];
  crew: Crew[];
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface Crew {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
}

export interface WatchProvider {
  results?: {
    [key: string]: {
      link: string;
      flatrate?: Provider[];
      rent?: Provider[];
      buy?: Provider[];
    };
  };
}

export interface Provider {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}

export interface ContentResponse {
  page: number;
  results: (Movie | TVShow)[];
  total_pages: number;
  total_results: number;
}

export interface SearchResult {
  id: number;
  name?: string;
  title?: string;
  media_type: 'movie' | 'tv' | 'person';
  backdrop_path?: string | null;
  poster_path?: string | null;
  profile_path?: string | null;
  overview?: string;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  watchlist: number[];
  favorites: number[];
  continue_watching: ContinueWatching[];
  watch_history: WatchHistory[];
}

export interface ContinueWatching {
  id: number;
  media_type: 'movie' | 'tv';
  watched_at: string;
  progress: number; // percentage
}

export interface WatchHistory {
  id: number;
  media_type: 'movie' | 'tv';
  watched_at: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
}
