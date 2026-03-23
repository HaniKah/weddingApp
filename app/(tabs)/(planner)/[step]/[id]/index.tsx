import {ActivityIndicator, Animated, Image, Pressable, StyleSheet, Text, View} from "react-native";
import {useEffect, useState} from "react";
import {Link, Stack, useLocalSearchParams, usePathname, useRouter} from "expo-router";
import {PlaceDetailsDto, WeddingSteps} from "@/types/open-api";
import AppButton from "@/components/appComponents/AppButton";
import {ButtonType} from "@/styles/Button";
import AppIf from "@/components/appComponents/AppIf";
import PlaceInfo from "@/components/PlaceInfo";
import {Theme} from "@/styles/Theme";
import {useApi} from "@/utils/api";
import {IconButton} from "@/components/symbols/IconButton";
import ScrollView = Animated.ScrollView;


export default function PlaceId() {
    const API = useApi().api
    const {id} = useLocalSearchParams<{ id: string }>();
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [placeDetails, setPlaceDetails] = useState<PlaceDetailsDto>()
    const [notes, setNotes] = useState<string>()
    const [cost, setCost] = useState<number>()

    // const [photoUri, setPhotoUri] = useState<PhotosDto>()
    // const [photosOrder, setPhotosOrder] = useState<string[]>([])

    const router = useRouter()
    const path = usePathname()
    const params = useLocalSearchParams<{ id: string, step: WeddingSteps }>()

    useEffect(() => {
        const getPlaceDetails = async () => {
            try {
                const response = await API.plannerControllerGetPlaceById({placeId: Number(id)})
                setPlaceDetails(response.data)
                // setPhotosOrder(response.data?.photos?.map((p) => p.photoRef))
            } catch (err) {
                console.error(err)
            } finally {
                setIsLoading(false)
            }
        }
        getPlaceDetails()
    }, [id]);

    async function saveAsPicked() {
        await updatePlaceDetails(placeDetails?.favourite, true)

        router.replace("/")
    }

    async function toggleFaviourtes() {
        await updatePlaceDetails(true, placeDetails?.picked)

        router.replace("/")
    }

    async function updatePlaceDetails(favourite?: boolean, picked?: boolean) {
        if (!placeDetails) return
        try {
            setIsLoading(true)
            await API.plannerControllerUpdateOrCreatePlaceFilter({
                placeId: Number(id),
                picked: picked || placeDetails.picked,
                favorite: favourite || placeDetails.favourite,
            })
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    if (!isLoading && placeDetails) {
        return (
            <ScrollView>
                <Stack.Screen
                    options={{
                        title: placeDetails.name,
                        headerShown: true,
                        headerTintColor: Theme.colors.primary,
                    }}/>

                <Link asChild href={{
                    pathname: "/(tabs)/(planner)/[step]/[id]/images",
                    params: {id: params.id, step: params.step}
                }}>
                    <Pressable style={styles.imageContainer}>

                        <Image style={styles.image} source={{uri: placeDetails.mainPhoto}}/>
                    </Pressable>
                </Link>

                <View style={styles.infosContainer}>

                    <View style={styles.infoHeaderContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{placeDetails?.name}</Text>
                            {placeDetails.favourite ?
                                <IconButton removeBackground name="heart.fill"/> :
                                <IconButton removeBackground name="heart"/>}
                        </View>
                        <View style={styles.priceContainer}>
                            <Text
                                style={styles.price}>{placeDetails.minPrice === placeDetails.maxPrice ? placeDetails.minPrice : placeDetails.minPrice + " - " + placeDetails.maxPrice}</Text>
                            <Text style={styles.currency}>{placeDetails?.currency}</Text>
                        </View>
                    </View>


                    {/*<AppIf value={placeDetails?.address}>*/}
                    {/*    <PlaceInfo iconName="location.circle" info={placeDetails?.address}/>*/}
                    {/*</AppIf>*/}


                    <AppIf value={placeDetails.description}>
                        <View style={styles.descriptionContainer}>
                            <Text style={styles.description}>{placeDetails.description}</Text>
                        </View>
                    </AppIf>


                    <View style={styles.contactInfoContainer}>
                        <AppIf value={placeDetails.phoneNumber}>
                            <PlaceInfo iconName='phone.circle' info={placeDetails?.phoneNumber}/>
                        </AppIf>

                        <AppIf value={placeDetails.website}>
                            <PlaceInfo iconName='globe' info={placeDetails?.website}/>
                        </AppIf>


                        <AppIf value={placeDetails?.facebook}>
                            <PlaceInfo iconName='globe' info={placeDetails?.facebook}/>
                        </AppIf>

                        <AppIf value={placeDetails?.instagram}>
                            <PlaceInfo iconName='globe' info={placeDetails?.instagram}/>
                        </AppIf>

                        <AppIf value={placeDetails?.instagram}>
                            <PlaceInfo iconName='globe' info={placeDetails?.tiktok}/>
                        </AppIf>
                    </View>


                    <View style={styles.saveForLaterContainer}>
                        <AppButton fullWidth onPress={toggleFaviourtes} buttonType={ButtonType.PLAIN}>
                            save for later
                        </AppButton>
                    </View>

                    <AppButton inactive={placeDetails.picked} fullWidth buttonType={ButtonType.PRIMARY}
                               onPress={saveAsPicked}>
                        pick this place
                    </AppButton>

                </View>

            </ScrollView>

        )
    } else {
        return (
            <View>
                <ActivityIndicator size="large"/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    infosContainer: {
        padding: 20,
    },
    imageContainer: {
        height: 300,
    },
    image: {
        resizeMode: "cover",
        height: "100%"
    },
    infoHeaderContainer: {
        display: "flex",
        gap: 10,
    },
    titleContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    title: {
        fontSize: Theme.sizes.lg,
        flexShrink: 1
    },
    priceContainer: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        gap: 10
    },
    price: {
        fontSize: Theme.sizes.lg,
        fontWeight: "bold",
    },
    currency: {
        color: Theme.colors.gray.S500
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

    saveForLaterContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
        marginTop: 30

    },
})