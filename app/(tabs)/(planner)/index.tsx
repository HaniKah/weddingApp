import {useEffect, useState} from 'react';
import {CountryCode, PlacesDto, SearchFilter} from '@/types/open-api';
import {Stack, useRouter} from 'expo-router';
import AppView from '@/components/appComponents/AppView';
import {useApi} from '@/utils/api';
import SearchHeader from '@/components/SearchHeader';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import PlaceItem from '@/components/items/PlaceItem';
import {useLocationContext} from '@/contexts/location-context';
import LocationAccessDenied from '@/components/errors/LocationAccessDenied';
import {REFRESH_DELAY} from '@/constants/general';
import {Theme} from '@/styles/Theme';
import {IconSymbol} from '@/components/symbols/IconSymbol';
import AppSafeAreaView from '@/components/appComponents/AppSafeAreaView';


import {useTranslation} from 'react-i18next';
import {showSnackbar} from "@/components/Snackbar";
import {isAxiosError} from "axios";
import {NestError} from "@/types/errors";

function EmptyPlaceholder() {
    const {t} = useTranslation();
    return (
        <View style={styles.emptyPlaceHolderContainer}>
            <IconSymbol color={Theme.colors.gray.S300} name="magnifyingglass" size={35}/>
            <Text style={styles.emptyPlaceholderTitle}>
                {t('planner.noVendorsFound')}
            </Text>
            <Text style={styles.emptyPlaceholderText}>
                {t('planner.tryDifferentSearch')}
            </Text>
        </View>

    );
}


export default function Index() {

    const API = useApi().api;


    const [isLoading, setLoading] = useState<boolean>(false);
    const [isRefreshing, setRefreshing] = useState<boolean>(false);


    const [filters, setFilters] = useState<SearchFilter>({price: "0"})

    const [places, setPlaces] = useState<PlacesDto[]>([]);

    const [searchText, setSearchText] = useState<string>();
    const [debouncedSearchText, setDebouncedSearchText] = useState<string>();

    const [pagination, setPagination] = useState<number>(0);
    const {errorMsg, isoCountry} = useLocationContext();

    const router = useRouter();

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchText(searchText);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [searchText]);


    function isCountryViable(country: string | null | undefined): boolean {
        if (!country) return false;
        return (country in CountryCode);
    }

    const getPlaces: (offset: number) => Promise<PlacesDto[]> = async (offset) => {
        if (!isoCountry) return [];
        if (!isCountryViable(isoCountry)) {
            router.dismissTo('/pick-location');
            return [];
        }

        let data: PlacesDto[] = [];
        try {
            const resp = await API.plannerControllerGetPlaces({
                search: debouncedSearchText,
                filters: {
                    category: filters?.category,
                    city: filters?.city,
                    price: filters?.price,
                },
                offset: offset,
                countryCode: isoCountry as CountryCode,
            });
            data = resp.data.places;
            // console.log(data)
        } catch (err) {
            if (isAxiosError<NestError>(err))
                showSnackbar("Error loading places" + err?.response?.data.message, "error");
            console.error(err);
        } finally {
        }
        return data;
    }


    const getInitialPlaces = async () => {
        setPagination(0);
        setLoading(true);
        const resp = await getPlaces(0);
        setPlaces(resp);
        setLoading(false);
    }

    useEffect(() => {
        const fetchThem = async () => {
            await getInitialPlaces();
        }
        fetchThem();
    }, [filters?.category, debouncedSearchText, isoCountry]);


    async function handleEndReached() {
        if (places.length === 0) return;
        const resp = await getPlaces(pagination + 1);
        setPlaces((prev) => [...prev, ...resp]);
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


    return (
        <>
            <Stack.Screen options={{headerShown: false}}/>
            <AppSafeAreaView>
                <AppView>
                    {isoCountry ? <FlatList
                            ListHeaderComponent={
                                <SearchHeader
                                    filters={filters}
                                    setFilters={setFilters}
                                    searchText={searchText}
                                    setSearchText={setSearchText}
                                    onShowResult={getInitialPlaces}
                                />}
                            refreshing={isRefreshing}
                            onRefresh={handleRefresh}
                            data={places}
                            renderItem={PlaceItem}
                            scrollEventThrottle={100}
                            onEndReached={handleEndReached}
                            keyExtractor={(item, index) => index.toString()}
                            ListEmptyComponent={
                                <EmptyPlaceholder/>
                            }
                        /> :

                        <LocationAccessDenied errorMsg={errorMsg}/>
                    }
                </AppView>
            </AppSafeAreaView>


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

