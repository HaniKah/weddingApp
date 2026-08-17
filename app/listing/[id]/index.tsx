import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {Link, router, Stack, useLocalSearchParams} from 'expo-router';
import {Categories, PlaceDetailsDto} from '@/types/open-api';
import AppButton from '@/components/appComponents/AppButton';
import {ButtonType} from '@/styles/Button';
import AppIf from '@/components/appComponents/AppIf';
import {Theme} from '@/styles/Theme';
import {useApi} from '@/utils/api';
import {useFavoritesStore} from '@/utils/favoritesStore';
import {IconButton} from '@/components/symbols/IconButton';
import LocationTag from '@/components/tags/LocationTag';
import IconCategory from '../../../components/symbols/IconCategory';
import AppView from '@/components/appComponents/AppView';
import PriceTag from '@/components/tags/PriceTag';
import ScrollableImages from "@/components/ScrollableImages";
import FeaturesTag from "@/components/tags/FeaturesTag";
import AppSafeAreaView from "@/components/appComponents/AppSafeAreaView";


export default function PlaceId() {
    const API = useApi().api;
    const id = Number(useLocalSearchParams<{ id: string }>().id);

    const {toggleFavorite, isFavorite} = useFavoritesStore();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const [placeDetails, setPlaceDetails] = useState<PlaceDetailsDto>();


    const params = useLocalSearchParams<{ id: string, step: Categories }>();

    const getPlaceDetails = useCallback(async () => {
        try {
            setIsLoading(true)
            const response = await API.plannerControllerGetPlaceById({placeId: Number(id)});
            setPlaceDetails(response.data);
            // setPhotosOrder(response.data?.photos?.map((p) => p.photoRef))
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [id]);

    useEffect(() => {
        getPlaceDetails();
    }, [getPlaceDetails]);


    // async function toggleFavorites() {
    //   if (!placeDetails) return;
    //   toggleFavorite(placeDetails.id);
    // }

    const isArabic = useMemo(() => {
        if (!placeDetails?.description) return
        return /[\u0600-\u06FF]/.test(placeDetails?.description);
    }, [placeDetails?.description])


    return (
        <>

            <Stack.Screen
                options={{
                    headerShown: true,
                    headerTransparent: true,      // header floats over content
                    headerTitle: '',
                    headerBackButtonDisplayMode: "minimal"
                }}
            />
            <AppSafeAreaView edges={["bottom"]}>


                <AppView isLoading={!placeDetails && isLoading}>

                    <ScrollView
                        contentInsetAdjustmentBehavior="never"
                        contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator
                        refreshControl={<RefreshControl progressViewOffset={50} refreshing={isRefreshing}
                                                        onRefresh={getPlaceDetails}/>}
                    >

                        {placeDetails?.heroMedia && placeDetails?.heroMedia?.length > 0 ?
                            <Link
                                push
                                href={{
                                    pathname: '/listing/[id]/images',
                                    params: {id: params.id, step: params.step},
                                }}
                            >
                                <ScrollableImages
                                    onPress={() => router.push({
                                        pathname: '/listing/[id]/images',
                                        params: {id: params.id, step: params.step},
                                    })} heroMedia={placeDetails.heroMedia}/>
                            </Link>
                            :

                            <View style={styles.imagePlaceHolder}>
                                <View style={styles.iconWrapper}>
                                    <IconCategory size={100} color={Theme.colors.secondary}
                                                  category={placeDetails?.category}/>
                                </View>
                            </View>
                        }


                        <View style={styles.infosContainer}>

                            <View style={styles.infoHeaderContainer}>
                                <View style={styles.titleContainer}>
                                    <Text style={styles.title}>{placeDetails?.name}</Text>
                                    {
                                        isFavorite(id) ?
                                            <IconButton onPress={() => toggleFavorite(id)} removeBackground
                                                        name="heart.fill"/> :
                                            <IconButton onPress={() => toggleFavorite(id)} removeBackground
                                                        name="heart"/>}
                                </View>
                                <LocationTag city={placeDetails?.city}/>
                                <AppIf value={placeDetails?.features}>
                                    <FeaturesTag features={placeDetails?.features}/>
                                </AppIf>

                                <PriceTag minPrice={placeDetails?.minPrice}
                                          maxPrice={placeDetails?.maxPrice}
                                          priceType={placeDetails?.priceType}
                                          countryCode={placeDetails?.countryCode}/>
                            </View>

                            <AppIf value={placeDetails?.description}>
                                <View style={styles.descriptionContainer}>
                                    <Text
                                        style={[styles.description, isArabic && styles.arabicText]}>{placeDetails?.description}</Text>
                                </View>
                            </AppIf>


                        </View>
                    </ScrollView>
                </AppView>

                <View style={styles.callForActionContainer}>
                    <Link asChild href={`tel:${placeDetails?.phoneNumber}`}>
                        <AppButton icon="phone" fullWidth buttonType={ButtonType.PRIMARY}>
                            Call Now
                        </AppButton>
                    </Link>
                </View>
            </AppSafeAreaView>
        </>
    );
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Theme.colors.background,
    },
    scroll: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 100, // enough space so content isn't hidden behind the bottom bar
    },
    callForActionContainer: {
        padding: 20,
        paddingBottom: 30,


    },
    infosContainer: {
        padding: 20,
    },
    imageContainer: {
        // height: 350,
        position: 'relative',
    },

    imagePlaceHolder: {
        height: 250,
        width: "100%",
        backgroundColor: Theme.colors.iconBackground,

    },

    iconWrapper: {
        margin: 'auto',
        opacity: .2,
    },
    image: {
        resizeMode: 'cover',
        height: '100%',
    },
    infoHeaderContainer: {
        display: 'flex',
        gap: 10,
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: Theme.sizes.xl,
        flexShrink: 1,
        fontWeight: 'bold',
    },

    priceContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
        marginTop: 5,
    },
    price: {
        fontSize: Theme.sizes.md,
        color: Theme.colors.primary,
        fontWeight: 'bold',
    },
    noPrice: {
        color: Theme.colors.secondary,
        marginTop: 5,
    },
    currency: {
        color: Theme.colors.secondary,
    },
    descriptionContainer: {
        marginTop: 20,

    },
    description: {
        fontSize: Theme.sizes.md,
    },
    contactInfoContainer: {
        marginTop: 20,
    },

    pickedText: {
        textDecorationLine: 'underline',
        marginBottom: 20,
    },
    arabicText: {
        textAlign: 'right',
    }

});