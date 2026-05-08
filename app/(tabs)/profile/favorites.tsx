import { useCallback, useEffect, useState } from 'react';
import { useApi } from '@/utils/api';
import { PlaceDetailsDto } from '@/types/open-api';
import { FlatList, StyleSheet, Text } from 'react-native';
import AppView from '@/components/appComponents/AppView';
import { Stack } from 'expo-router';
import { Theme } from '@/styles/Theme';
import FavoriteItem from '@/components/items/FavoriteItem';
import { useFavoritesStore } from '@/utils/favoritesStore';
import { CommonStyles } from '@/styles/Common';

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
        />
      </AppView>
    </>
  );
}
const styles = StyleSheet.create({
  emptyDataText: {
    fontSize: Theme.sizes.md,
    marginVertical: 'auto',
    textAlign: 'center',
    color: Theme.colors.secondary,
    fontStyle: 'italic',
  },
});
