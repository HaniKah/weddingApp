import {useEffect, useState} from 'react';
import {useApi} from '@/utils/api';
import {FavouritePlacesDto} from '@/types/open-api';
import {FlatList} from 'react-native';
import AppView from '@/components/appComponents/AppView';
import {Stack} from 'expo-router';
import {Theme} from "@/styles/Theme";
import FavoriteItem from "@/components/items/FavoriteItem";

export default function Favorites() {
    const [favorites, setFavorites] = useState<FavouritePlacesDto[]>([]);
    const [isLoading, setLoading] = useState(false);
    const {api} = useApi();


    useEffect(() => {
        const getFavorites = async () => {
            try {
                setLoading(true);
                const resp = await api.plannerControllerGetFavorites()
                setFavorites(resp.data.result);
            } catch (err) {

            } finally {
                setLoading(false);
            }

        };

        getFavorites();
    }, []);


    return (
        <>
            <Stack.Screen options={{
                headerBackButtonDisplayMode: 'minimal',
                contentStyle: {backgroundColor: Theme.colors.background},
                headerTitle: "Favorites"
            }}/>
            <AppView withPadding>
                <FlatList
                    data={favorites}
                    renderItem={({item}) => <FavoriteItem data={item}/>}
                    keyExtractor={item => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    refreshing={isLoading}
                    onRefresh={() => {
                        const getFavorites = async () => {
                            try {
                                setLoading(true);
                                const resp = await api.plannerControllerGetFavorites()
                                setFavorites(resp.data.result);
                            } catch (err) {

                            } finally {
                                setLoading(false);
                            }
                        };
                        getFavorites();
                    }}
                />
            </AppView>
        </>
    );
}