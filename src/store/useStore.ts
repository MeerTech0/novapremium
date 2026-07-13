import { create } from 'zustand';
import { User, Notification, ContinueWatching, WatchHistory } from '@/types';

interface StoreState {
  // User
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;

  // Watchlist
  watchlist: number[];
  addToWatchlist: (id: number) => void;
  removeFromWatchlist: (id: number) => void;
  isInWatchlist: (id: number) => boolean;

  // Favorites
  favorites: number[];
  addToFavorites: (id: number) => void;
  removeFromFavorites: (id: number) => void;
  isInFavorites: (id: number) => boolean;

  // Continue Watching
  continueWatching: ContinueWatching[];
  addToContinueWatching: (item: ContinueWatching) => void;
  updateContinueWatching: (id: number, progress: number) => void;

  // Watch History
  watchHistory: WatchHistory[];
  addToWatchHistory: (item: WatchHistory) => void;

  // Notifications
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;

  // UI State
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
}

export const useStore = create<StoreState>((set, get) => ({
  // User
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  logout: () => set({ user: null, isAuthenticated: false }),

  // Watchlist
  watchlist: [],
  addToWatchlist: (id) =>
    set((state) => ({
      watchlist: state.watchlist.includes(id) ? state.watchlist : [...state.watchlist, id],
    })),
  removeFromWatchlist: (id) =>
    set((state) => ({
      watchlist: state.watchlist.filter((item) => item !== id),
    })),
  isInWatchlist: (id) => get().watchlist.includes(id),

  // Favorites
  favorites: [],
  addToFavorites: (id) =>
    set((state) => ({
      favorites: state.favorites.includes(id) ? state.favorites : [...state.favorites, id],
    })),
  removeFromFavorites: (id) =>
    set((state) => ({
      favorites: state.favorites.filter((item) => item !== id),
    })),
  isInFavorites: (id) => get().favorites.includes(id),

  // Continue Watching
  continueWatching: [],
  addToContinueWatching: (item) =>
    set((state) => ({
      continueWatching: [
        item,
        ...state.continueWatching.filter((i) => i.id !== item.id),
      ],
    })),
  updateContinueWatching: (id, progress) =>
    set((state) => ({
      continueWatching: state.continueWatching.map((item) =>
        item.id === id ? { ...item, progress } : item
      ),
    })),

  // Watch History
  watchHistory: [],
  addToWatchHistory: (item) =>
    set((state) => ({
      watchHistory: [item, ...state.watchHistory],
    })),

  // Notifications
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        {
          ...notification,
          id: Math.random().toString(36).substr(2, 9),
          timestamp: new Date(),
        },
        ...state.notifications,
      ],
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),

  // UI State
  sidebarOpen: false,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  searchOpen: false,
  setSearchOpen: (open) => set({ searchOpen: open }),
}));
