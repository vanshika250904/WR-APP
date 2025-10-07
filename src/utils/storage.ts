
import { UserProfile, WellnessTip } from '../types';

const PROFILE_KEY = 'wellness_profile';
const FAVORITES_KEY = 'wellness_favorites';

export const storage = {
  saveProfile: (profile: UserProfile): void => {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  },

  getProfile: (): UserProfile | null => {
    const data = localStorage.getItem(PROFILE_KEY);
    return data ? JSON.parse(data) : null;
  },

  saveFavorites: (favorites: WellnessTip[]): void => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  },

  getFavorites: (): WellnessTip[] => {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  },

  addFavorite: (tip: WellnessTip): void => {
    const favorites = storage.getFavorites();
    if (!favorites.find(f => f.id === tip.id)) {
      favorites.push(tip);
      storage.saveFavorites(favorites);
    }
  },

  removeFavorite: (tipId: string): void => {
    const favorites = storage.getFavorites();
    storage.saveFavorites(favorites.filter(f => f.id !== tipId));
  },

  isFavorite: (tipId: string): boolean => {
    const favorites = storage.getFavorites();
    return favorites.some(f => f.id === tipId);
  }
};
