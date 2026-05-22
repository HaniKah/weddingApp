import {useCallback, useEffect, useState} from 'react';
import {useApi} from '@/utils/api';
import {FavoritePlaceDto} from '@/types/open-api';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import AppView from '@/components/appComponents/AppView';
import {Stack} from 'expo-router';
import {Theme} from '@/styles/Theme';
import FavoriteItem from '@/components/items/FavoriteItem';
import {useFavoritesStore} from '@/utils/favoritesStore';
import {CommonStyles} from '@/styles/Common';
import AppButton from '@/components/appComponents/AppButton';
import {ButtonSize, ButtonType} from '@/styles/Button';

import {useTranslation} from 'react-i18next';


export default function Favorites() {
    const [favoritePlaces, setFavoritePlaces] = useState<FavoritePlaceDto[]>([]);
    const [notFoundFavorites, setNotFoundFavorites] = useState<number[]>([]);
    const [isLoading, setLoading] = useState(false);
    const {api} = useApi();
    const {favorites, toggleFavorite} = useFavoritesStore();
    const {t} = useTranslation();

    const getFavoritesData = useCallback(async () => {
        if (favorites.length === 0) {
            return;
        }
        try {
            setLoading(true);
            const result = await Promise.all(favorites.map(async (i) => {
                return await api.plannerControllerGetFavorites({id: i});

            }));
            const [found, notFound] = result.reduce<[FavoritePlaceDto[], number[]]>(
                ([found, notFound], cur) => {
                    if (cur.data.isFound) {
                        found.push(cur.data);
                    } else {
                        notFound.push(cur.data.id);
                    }

                    return [found, notFound];
                },
                [[], []],
            );

            setFavoritePlaces(found);
            setNotFoundFavorites(notFound);


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
            <Text style={CommonStyles.dataNotFound}>{t('profile.noFavoritesYet')}</Text>
        );
    }

    function clearNotFoundFavorites() {
        for (const f of notFoundFavorites) {
            toggleFavorite(f);
        }
        setNotFoundFavorites([]);
    }

    return (
        <>
            <Stack.Screen
                options={{
                    headerBackButtonDisplayMode: 'minimal',
                    contentStyle: {backgroundColor: Theme.colors.background},
                    headerTitle: t('profile.favorites'),
                }}
            />
            <AppView withPadding>
                <FlatList
                    data={favoritePlaces}
                    renderItem={({item}) => <FavoriteItem data={item}/>}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    refreshing={isLoading}
                    onRefresh={getFavoritesData}
                    ListEmptyComponent={EmptyData}
                    contentContainerStyle={{gap: 10}}
                />

                {notFoundFavorites.length > 0 &&
                    <View style={styles.notFoundContainer}>
                        <Text
                            style={styles.notFound}>
                            {t('profile.favoritesNotAvailable', {count: notFoundFavorites.length})}
                        </Text>
                        <AppButton onPress={clearNotFoundFavorites} extraStylesTxt={{color: Theme.colors.secondary}}
                                   buttonType={ButtonType.PLAIN}
                                   buttonSize={ButtonSize.SM}>{t('common.clear')}</AppButton>
                    </View>
                }

            </AppView>
        </>
    );
}
const styles = StyleSheet.create({
    notFoundContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingBottom: 10,
    },
    notFound: {
        color: Theme.colors.gray.S500,
    },
});

