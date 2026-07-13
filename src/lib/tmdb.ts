import axios, { AxiosInstance } from 'axios';
import { Movie, TVShow, ContentResponse, SearchResult, Video } from '@/types';

class TMDB {
  private api: AxiosInstance;
  private apiKey: string;
  private baseURL: string;
  private imageURL: string;

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY || '';
    this.baseURL = process.env.NEXT_PUBLIC_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
    this.imageURL = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL || 'https://image.tmdb.org/t/p';

    this.api = axios.create({
      baseURL: this.baseURL,
      params: {
        api_key: this.apiKey,
        language: 'en-US',
      },
    });
  }

  // Image URL Builders
  getPosterUrl(path: string | null, size: string = 'w500'): string {
    if (!path) return '/placeholder-poster.jpg';
    return `${this.imageURL}/${size}${path}`;
  }

  getBackdropUrl(path: string | null, size: string = 'w1280'): string {
    if (!path) return '/placeholder-backdrop.jpg';
    return `${this.imageURL}/${size}${path}`;
  }

  getProfileUrl(path: string | null, size: string = 'w185'): string {
    if (!path) return '/placeholder-profile.jpg';
    return `${this.imageURL}/${size}${path}`;
  }

  // Trending
  async getTrendingMovies(timeWindow: 'day' | 'week' = 'week', page: number = 1): Promise<ContentResponse> {
    const response = await this.api.get(`/trending/movie/${timeWindow}`, {
      params: { page },
    });
    return response.data;
  }

  async getTrendingTV(timeWindow: 'day' | 'week' = 'week', page: number = 1): Promise<ContentResponse> {
    const response = await this.api.get(`/trending/tv/${timeWindow}`, {
      params: { page },
    });
    return response.data;
  }

  // Popular
  async getPopularMovies(page: number = 1): Promise<ContentResponse> {
    const response = await this.api.get('/movie/popular', {
      params: { page },
    });
    return response.data;
  }

  async getPopularTV(page: number = 1): Promise<ContentResponse> {
    const response = await this.api.get('/tv/popular', {
      params: { page },
    });
    return response.data;
  }

  // Top Rated
  async getTopRatedMovies(page: number = 1): Promise<ContentResponse> {
    const response = await this.api.get('/movie/top_rated', {
      params: { page },
    });
    return response.data;
  }

  async getTopRatedTV(page: number = 1): Promise<ContentResponse> {
    const response = await this.api.get('/tv/top_rated', {
      params: { page },
    });
    return response.data;
  }

  // Upcoming & Now Playing
  async getUpcomingMovies(page: number = 1): Promise<ContentResponse> {
    const response = await this.api.get('/movie/upcoming', {
      params: { page },
    });
    return response.data;
  }

  async getNowPlayingMovies(page: number = 1): Promise<ContentResponse> {
    const response = await this.api.get('/movie/now_playing', {
      params: { page },
    });
    return response.data;
  }

  // Details
  async getMovieDetails(id: number): Promise<Movie> {
    const response = await this.api.get(`/movie/${id}`, {
      params: {
        append_to_response: 'credits,videos,watch/providers,recommendations',
      },
    });
    return response.data;
  }

  async getTVDetails(id: number): Promise<TVShow> {
    const response = await this.api.get(`/tv/${id}`, {
      params: {
        append_to_response: 'credits,videos,watch/providers,recommendations',
      },
    });
    return response.data;
  }

  // Credits
  async getMovieCredits(id: number) {
    const response = await this.api.get(`/movie/${id}/credits`);
    return response.data;
  }

  async getTVCredits(id: number) {
    const response = await this.api.get(`/tv/${id}/credits`);
    return response.data;
  }

  // Videos
  async getMovieVideos(id: number): Promise<{ results: Video[] }> {
    const response = await this.api.get(`/movie/${id}/videos`);
    return response.data;
  }

  async getTVVideos(id: number): Promise<{ results: Video[] }> {
    const response = await this.api.get(`/tv/${id}/videos`);
    return response.data;
  }

  // Search
  async search(query: string, page: number = 1, searchType: 'multi' | 'movie' | 'tv' = 'multi'): Promise<{ results: SearchResult[]; total_pages: number; total_results: number }> {
    const endpoint = `/search/${searchType}`;
    const response = await this.api.get(endpoint, {
      params: { query, page },
    });
    return response.data;
  }

  // Recommendations
  async getMovieRecommendations(id: number, page: number = 1): Promise<ContentResponse> {
    const response = await this.api.get(`/movie/${id}/recommendations`, {
      params: { page },
    });
    return response.data;
  }

  async getTVRecommendations(id: number, page: number = 1): Promise<ContentResponse> {
    const response = await this.api.get(`/tv/${id}/recommendations`, {
      params: { page },
    });
    return response.data;
  }

  // Genres
  async getMovieGenres() {
    const response = await this.api.get('/genre/movie/list');
    return response.data.genres;
  }

  async getTVGenres() {
    const response = await this.api.get('/genre/tv/list');
    return response.data.genres;
  }

  // Discover
  async discoverMovies(params: any = {}): Promise<ContentResponse> {
    const response = await this.api.get('/discover/movie', {
      params,
    });
    return response.data;
  }

  async discoverTV(params: any = {}): Promise<ContentResponse> {
    const response = await this.api.get('/discover/tv', {
      params,
    });
    return response.data;
  }
}

export const tmdb = new TMDB();
