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
import ScrollView = Animated.ScrollView;


export default function PlaceId() {
    const API = useApi()
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

    async function pickPlace() {
        await updatePlaceDetails(placeDetails?.favourite, true)

        router.replace("/")
    }

    async function saveForLater() {
        await updatePlaceDetails(true, placeDetails?.picked)

        router.replace("/")
    }

    async function updatePlaceDetails(favourite?: boolean, picked?: boolean) {
        if (!placeDetails) return
        try {
            setIsLoading(true)
            await API.plannerControllerUpdatePlaceDetails({
                placeId: Number(id),
                picked: picked || placeDetails.picked,
                step: placeDetails.step,
                favorite: favourite || placeDetails.favourite,
                notes: notes || placeDetails.notes,
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

                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{placeDetails?.name}</Text>
                        <Text>{placeDetails.minPrice === placeDetails.maxPrice ? placeDetails.minPrice : placeDetails.minPrice + " - " + placeDetails.maxPrice}{placeDetails?.currency}</Text>
                    </View>


                    {/*<AppIf value={placeDetails?.address}>*/}
                    {/*    <PlaceInfo iconName="location.circle" info={placeDetails?.address}/>*/}
                    {/*</AppIf>*/}


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


                    <View style={styles.saveForLaterContainer}>
                        <AppButton fullWidth onPress={saveForLater} buttonType={ButtonType.PLAIN}>
                            save for later
                        </AppButton>
                    </View>

                    <AppButton inactive={placeDetails.picked} fullWidth buttonType={ButtonType.PRIMARY}
                               onPress={pickPlace}>
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
        padding: 20
    },
    titleContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        flexShrink: 1
    },
    imageContainer: {
        height: 400,
    },
    image: {
        backgroundSize: "cover",
        height: "100%"
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