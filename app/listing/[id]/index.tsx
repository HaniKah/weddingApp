import {Image, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {useCallback, useEffect, useState} from "react";
import {Link, Stack, useLocalSearchParams} from "expo-router";
import {Categories, PlaceDetailsDto} from "@/types/open-api";
import AppButton from "@/components/appComponents/AppButton";
import {ButtonType} from "@/styles/Button";
import AppIf from "@/components/appComponents/AppIf";
import {Theme} from "@/styles/Theme";
import {useApi} from "@/utils/api";
import {IconButton} from "@/components/symbols/IconButton";
import {COUNTRIES} from "@/constants/countries";
import LocationTag from "@/components/LocationTag";
import IconCategory from "../../../components/symbols/IconCategory";
import AppView from "@/components/appComponents/AppView";


export default function PlaceId() {
    const API = useApi().api
    const {id} = useLocalSearchParams<{ id: string }>();
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [placeDetails, setPlaceDetails] = useState<PlaceDetailsDto>()


    const params = useLocalSearchParams<{ id: string, step: Categories }>()

    const getPlaceDetails = useCallback(async () => {
        try {
            const response = await API.plannerControllerGetPlaceById({placeId: Number(id)})
            setPlaceDetails(response.data)
            // setPhotosOrder(response.data?.photos?.map((p) => p.photoRef))
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }, [id])

    useEffect(() => {
        getPlaceDetails()
    }, [getPlaceDetails]);


    async function togglePicked() {
        if (!placeDetails) return
        try {
            setIsLoading(true)
            await API.plannerControllerTogglePickedPlaceFilter({
                placeId: placeDetails?.id,
                picked: !placeDetails.picked,
                category: placeDetails.category
            })
            await getPlaceDetails()
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }


    async function toggleFavorites() {
        if (!placeDetails) return
        try {
            setIsLoading(false)
            await API.plannerControllerToggleFavoritePlaceFilter({
                placeId: placeDetails?.id,
                favorite: !placeDetails?.favourite
            })
            await getPlaceDetails()
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <>

            <Stack.Screen
                options={{
                    title: placeDetails?.name,
                    headerShown: true,
                    headerBackButtonDisplayMode: "minimal",
                    headerStyle: {backgroundColor: Theme.colors.background},
                    contentStyle: {backgroundColor: Theme.colors.background},
                }}
            />
            <AppView isLoading={!placeDetails && isLoading}>

                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator
                >
                    <Link
                        push
                        asChild
                        href={{
                            pathname: "/listing/[id]/images",
                            params: {id: params.id, step: params.step},
                        }}
                    >
                        {placeDetails?.mainPhoto ?
                            <Pressable style={styles.imageContainer}>
                                <Image style={styles.image} source={{uri: placeDetails.mainPhoto}}/>
                            </Pressable> :
                            <View style={styles.imagePlaceHolder}>
                                <View style={styles.iconWrapper}>
                                    <IconCategory height={25} fill={Theme.colors.primary}
                                                  category={placeDetails?.category}/>
                                </View>
                            </View>
                        }

                    </Link>

                    <View style={styles.infosContainer}>

                        <View style={styles.infoHeaderContainer}>
                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>{placeDetails?.name}</Text>
                                {placeDetails?.favourite ?
                                    <IconButton onPress={toggleFavorites} removeBackground name="heart.fill"/> :
                                    <IconButton onPress={toggleFavorites} removeBackground name="heart"/>}
                            </View>
                            <LocationTag location={placeDetails?.city}/>
                            <View style={styles.priceContainer}>
                                <Text
                                    style={styles.price}>{placeDetails?.minPrice === placeDetails?.maxPrice ? placeDetails?.minPrice : placeDetails?.minPrice + " - " + placeDetails?.maxPrice}</Text>
                                <Text
                                    style={styles.currency}>{COUNTRIES.get(placeDetails?.countryCode)?.currency} / {placeDetails?.priceType}</Text>
                            </View>
                        </View>

                        <AppIf value={placeDetails?.description}>
                            <View style={styles.descriptionContainer}>
                                <Text style={styles.description}>{placeDetails?.description}</Text>
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
        backgroundColor: Theme.colors.iconBackground,
        borderTopWidth: 1,
        borderTopColor: Theme.colors.border,

    },
    infosContainer: {
        padding: 20,
    },
    imageContainer: {
        height: 300,
    },
    imagePlaceHolder: {
        height: '100%',
        backgroundColor: Theme.colors.iconBackground,

    },
    iconWrapper: {
        marginVertical: "auto",
        opacity: .70
    },
    image: {
        resizeMode: "cover",
        height: "100%"
    },
    infoHeaderContainer: {
        display: "flex",
        gap: 5,
    },
    titleContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    title: {
        fontSize: Theme.sizes.xl,
        flexShrink: 1,
        fontWeight: "bold"
    },

    priceContainer: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        gap: 10,
        marginTop: 5
    },
    price: {
        fontSize: Theme.sizes.md,
        color: Theme.colors.primary,
        fontWeight: "bold",

    },
    currency: {
        color: Theme.colors.secondary
    },
    descriptionContainer: {
        marginTop: 20,
    },
    description: {
        fontSize: Theme.sizes.md,
    },
    contactInfoContainer: {
        marginTop: 20
    },

    pickedText: {
        textDecorationLine: "underline",
        marginBottom: 20
    },

})