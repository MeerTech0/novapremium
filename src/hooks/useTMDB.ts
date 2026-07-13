import { useState, useEffect, useCallback } from 'react';
import { tmdb } from '@/lib/tmdb';

export function useTrendingMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await tmdb.getTrendingMovies('week');
        setMovies(response.results);
      } catch (err) {
        setError('Failed to fetch trending movies');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { movies, loading, error };
}

export function useTrendingTV() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await tmdb.getTrendingTV('week');
        setShows(response.results);
      } catch (err) {
        setError('Failed to fetch trending TV shows');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { shows, loading, error };
}

export function usePopularMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await tmdb.getPopularMovies();
        setMovies(response.results);
      } catch (err) {
        setError('Failed to fetch popular movies');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { movies, loading, error };
}

export function usePopularTV() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await tmdb.getPopularTV();
        setShows(response.results);
      } catch (err) {
        setError('Failed to fetch popular TV shows');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { shows, loading, error };
}

export function useTopRatedMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await tmdb.getTopRatedMovies();
        setMovies(response.results);
      } catch (err) {
        setError('Failed to fetch top rated movies');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { movies, loading, error };
}

export function useTopRatedTV() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await tmdb.getTopRatedTV();
        setShows(response.results);
      } catch (err) {
        setError('Failed to fetch top rated TV shows');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { shows, loading, error };
}

export function useUpcomingMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await tmdb.getUpcomingMovies();
        setMovies(response.results);
      } catch (err) {
        setError('Failed to fetch upcoming movies');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { movies, loading, error };
}

export function useMovieDetails(id: number | null) {
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await tmdb.getMovieDetails(id);
        setMovie(response);
      } catch (err) {
        setError('Failed to fetch movie details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { movie, loading, error };
}

export function useTVDetails(id: number | null) {
  const [show, setShow] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await tmdb.getTVDetails(id);
        setShow(response);
      } catch (err) {
        setError('Failed to fetch TV show details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { show, loading, error };
}

export function useSearch(query: string, searchType: 'multi' | 'movie' | 'tv' = 'multi') {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async () => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      const response = await tmdb.search(query, 1, searchType);
      setResults(response.results);
    } catch (err) {
      setError('Failed to search');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [query, searchType]);

  useEffect(() => {
    const timer = setTimeout(() => {
      search();
    }, 300);

    return () => clearTimeout(timer);
  }, [query, search]);

  return { results, loading, error };
}
