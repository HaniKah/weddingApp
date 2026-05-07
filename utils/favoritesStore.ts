import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FavoritesState {
  favorites: number[]; // Array of placeIds
  toggleFavorite: (placeId: number) => void;
  isFavorite: (placeId: number) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (placeId) => {
        const { favorites } = get();
        if (favorites.includes(placeId)) {
          set({ favorites: favorites.filter((id) => id !== placeId) });
        } else {
          set({ favorites: [...favorites, placeId] });
        }
      },
      isFavorite: (placeId) => {
        return get().favorites.includes(placeId);
      },
    }),
    {
      name: 'favorites-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
