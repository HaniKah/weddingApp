import { useCallback, useEffect, useState } from 'react';
import { useApi } from '@/utils/api';
import { FavoritePlaceDto } from '@/types/open-api';
import { FlatList, Text } from 'react-native';
import AppView from '@/components/appComponents/AppView';
import { Stack } from 'expo-router';
import { Theme } from '@/styles/Theme';
import FavoriteItem from '@/components/items/FavoriteItem';
import { useFavoritesStore } from '@/utils/favoritesStore';
import { CommonStyles } from '@/styles/Common';

export default function Favorites() {
  const [favoritePlaces, setFavoritePlaces] = useState<FavoritePlaceDto[]>([]);
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
      const res = await api.placesControllerGetFavorites({ favoriteIds: favorites });
      setFavoritePlaces(res.data.result);
    } catch (err) {
      console.error('Error fetching favorites:', err);
    } finally {
      setLoading(false);
    }
  }, [favorites]);

  useEffect(() => {
    getFavoritesData();
  }, [getFavoritesData]);

  function EmptyData() {
    return (
      <Text style={CommonStyles.dataNotFound}>You don&#39;t have favorites yet</Text>
    );
  }

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
          ListEmptyComponent={EmptyData}
          contentContainerStyle={{ gap: 10 }}
        />
      </AppView>
    </>
  );
}

