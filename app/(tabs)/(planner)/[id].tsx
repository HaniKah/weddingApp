import {ActivityIndicator, Animated, StyleSheet, Text, View} from "react-native";
import {useEffect, useState} from "react";
import {useLocalSearchParams} from "expo-router";
import {Api, PlaceDetailsDto} from "@/types/open-api";
import AppButton from "@/components/appComponents/AppButton";
import {ButtonType} from "@/styles/Button";
import AppCondition from "@/components/appComponents/AppCondition";
import PlaceInfo from "@/components/wizard/PlaceInfo";
import ScrollView = Animated.ScrollView;


const {api} = new Api({baseURL: process.env.EXPO_PUBLIC_API_URL, withCredentials: true})
export default function PlaceId() {
    const {id} = useLocalSearchParams<{ id: string }>();

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [placeDetails, setPlaceDetails] = useState<PlaceDetailsDto>()
    const [notes, setNotes] = useState<string>()
    const [cost, setCost] = useState<number>()
    const [trigger, setTrigger] = useState<boolean>(false)
    // const [photoUri, setPhotoUri] = useState<PhotosDto>()
    // const [photosOrder, setPhotosOrder] = useState<string[]>([])

    useEffect(() => {
        const getPlaceDetails = async () => {
            try {
                const response = await api.plannerControllerGetPlaceById({placeId: Number(id)})
                setPlaceDetails(response.data)
                // setPhotosOrder(response.data?.photos?.map((p) => p.photoRef))
            } catch (err) {
                console.error(err)
            } finally {
                setIsLoading(false)
            }
        }
        getPlaceDetails()
    }, [id, trigger]);

    async function pickPlace() {
        await updatePlaceDetails(placeDetails?.favourite, true)
        // i want to use getPlaceDetails here again
        setTrigger(!trigger)
    }

    async function saveForLater() {
        await updatePlaceDetails(true, placeDetails?.picked)
        setTrigger(!trigger)
    }

    async function updatePlaceDetails(favourite?: boolean, picked?: boolean) {
        if (!placeDetails) return
        try {
            setIsLoading(true)
            await api.plannerControllerUpdatePlaceDetails({
                placeId: Number(id),
                cost: cost || placeDetails.cost,
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
                {/*<Image source={{uri: photoUri?.uri}} style={{height: 400}}/>*/}
                <View style={{height: 400}}></View>
                <View style={styles.infosContainer}>

                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{placeDetails?.name}</Text>
                        <Text>{placeDetails?.cost}</Text>
                    </View>


                    <AppCondition condition={placeDetails?.address}>
                        <PlaceInfo iconName="location.circle" info={placeDetails?.address}/>
                    </AppCondition>


                    <AppCondition condition={placeDetails.phoneNumber}>
                        <PlaceInfo iconName='phone.circle' info={placeDetails?.phoneNumber}/>
                    </AppCondition>

                    <AppCondition condition={placeDetails.website}>
                        <PlaceInfo iconName='globe' info={placeDetails?.website}/>
                    </AppCondition>


                    <AppCondition condition={placeDetails?.facebook}>
                        <PlaceInfo iconName='globe' info={placeDetails?.facebook}/>
                    </AppCondition>

                    <AppCondition condition={placeDetails?.instagram}>
                        <PlaceInfo iconName='globe' info={placeDetails?.instagram}/>
                    </AppCondition>

                    <AppCondition condition={placeDetails?.instagram}>
                        <PlaceInfo iconName='globe' info={placeDetails?.tiktok}/>
                    </AppCondition>


                    <View style={styles.saveForLaterContainer}>
                        <AppButton onPress={saveForLater} buttonType={ButtonType.PLAIN}>
                            save for later
                        </AppButton>
                    </View>

                    <AppButton buttonType={placeDetails.picked ? ButtonType.INACTIVE : ButtonType.PRIMARY}
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


    saveForLaterContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
        marginTop: 30

    },
})