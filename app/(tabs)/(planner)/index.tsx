import { useEffect, useState } from 'react';
import { Categories, CountryCode, PlacesDto } from '@/types/open-api';
import { Stack } from 'expo-router';
import AppView from '@/components/appComponents/AppView';
import { useApi } from '@/utils/api';
import SearchHeader from '@/components/SearchHeader';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import PlaceItem from '@/components/items/PlaceItem';
import { useLocationContext } from '@/contexts/location-context';
import LocationAccessDenied from '@/components/errors/LocationAccessDenied';
import { REFRESH_DELAY } from '@/constants/general';
import { Theme } from '@/styles/Theme';
import { IconSymbol } from '@/components/symbols/IconSymbol';


export default function Index() {

  const API = useApi().api;


  const [isLoading, setLoading] = useState<boolean>(false);
  const [isRefreshing, setRefreshing] = useState<boolean>(false);


  const [activeCategory, setActiveCategory] = useState<Categories | undefined>(Categories.Host);


  const [places, setPlaces] = useState<PlacesDto[]>([]);

  const [searchText, setSearchText] = useState<string>();
  const [debouncedSearchText, setDebouncedSearchText] = useState<string>();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchText]);

  const [pagination, setPagination] = useState<number>(0);

  const { errorMsg, isoCountry } = useLocationContext();


  function isCountryViable(country: string | null | undefined): boolean {
    if (!country) return false;
    return (country in CountryCode);
  }

  const getPlaces: (offset: number) => Promise<PlacesDto[]> = async (offset) => {

    if (!isoCountry) return [];
    if (!isCountryViable(isoCountry)) return [];

    let data: PlacesDto[] = [];
    try {
      const resp = await API.plannerControllerGetPlaces({
        search: debouncedSearchText,
        category: activeCategory,
        offset: offset,
        countryCode: isoCountry as CountryCode,
      });
      data = resp.data.places;
      // console.log(data)
    } catch (err) {
      console.log(err);
    }
    return data;
  };


  useEffect(() => {
    const fetch = async () => {
      setPagination(0);
      const resp = await getPlaces(0);
      setPlaces(resp);
    };
    fetch();

  }, [activeCategory, debouncedSearchText, isoCountry]);


  useEffect(() => {
    if (pagination === 0) return;
    const fetch = async () => {
      const resp = await getPlaces(pagination);
      setPlaces((prev) => [...prev, ...resp]);
    };
    fetch();

  }, [pagination]);


  async function handleEndReached() {
    if (places.length === 0) return;
    setPagination(prev => prev + 1);
  }

  function handleRefresh() {
    setRefreshing(true);
    setPagination(0);
    setTimeout(async () => {
      const resp = await getPlaces(0);
      setPlaces(resp);
      setRefreshing(false);
    }, REFRESH_DELAY);
  }

  function EmptyPlaceholder() {
    return (
      <View style={styles.emptyPlaceHolderContainer}>
        <IconSymbol color={Theme.colors.gray.S300} name="magnifyingglass" size={35} />
        <Text style={styles.emptyPlaceholderTitle}>
          No vendors found
        </Text>
        <Text style={styles.emptyPlaceholderText}>
          Try different search or category
        </Text>
      </View>

    );
  }


  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <AppView withPadding isLoading={isLoading}>
        {isoCountry ? <FlatList
            ListHeaderComponent={
              <SearchHeader
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                searchText={searchText}
                setSearchText={setSearchText}
              />}
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            data={places}
            renderItem={PlaceItem}
            scrollEventThrottle={100}
            onEndReached={handleEndReached}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={
              <EmptyPlaceholder />
            }
          /> :

          <LocationAccessDenied errorMsg={errorMsg} />
        }
      </AppView>


    </>
  );
}
const styles = StyleSheet.create({
  emptyPlaceHolderContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  emptyPlaceholderTitle: {
    textAlign: 'center',
    marginTop: 20,
    color: Theme.colors.gray.S700,
    fontWeight: 'bold',
  },
  emptyPlaceholderText: {
    textAlign: 'center',
    marginTop: 5,
    color: Theme.colors.gray.S500,
  },
});

