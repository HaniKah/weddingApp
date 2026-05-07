import { useCallback, useEffect, useState } from 'react';
import { useApi } from '@/utils/api';
import { PlaceDetailsDto } from '@/types/open-api';
import { FlatList } from 'react-native';
import AppView from '@/components/appComponents/AppView';
import { Stack } from 'expo-router';
import { Theme } from '@/styles/Theme';
import FavoriteItem from '@/components/items/FavoriteItem';
import { useFavoritesStore } from '@/utils/favoritesStore';

export default function Favorites() {
  const [favoritePlaces, setFavoritePlaces] = useState<PlaceDetailsDto[]>([]);
  const [isLoading, setLoading] = useState(false);
  const { api } = useApi();
  const { favorites } = useFavoritesStore();

  const getFavoritesData = useCallback(async () => {
    if (favorites.length === 0) {
      setFavoritePlaces([]);
      return;
    }

    try {
      setLoading(true);
      const results = await Promise.all(
        favorites.map((id) => api.plannerControllerGetPlaceById({ placeId: id })),
      );
      setFavoritePlaces(results.map((res) => res.data));
    } catch (err) {
      console.error('Error fetching favorites:', err);
    } finally {
      setLoading(false);
    }
  }, [favorites, api]);

  useEffect(() => {
    getFavoritesData();
  }, [getFavoritesData]);

  return (
    <>
      <Stack.Screen
        options={{
          headerBackButtonDisplayMode: 'minimal',
          contentStyle: { backgroundColor: Theme.colors.background },
          headerTitle: 'Favorites',
        }}
      />
      <AppView withPadding>
        <FlatList
          data={favoritePlaces}
          renderItem={({ item }) => <FavoriteItem data={item} />}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          refreshing={isLoading}
          onRefresh={getFavoritesData}
        />
      </AppView>
    </>
  );
}
