import {Stack, useLocalSearchParams} from "expo-router";
import {Theme} from "@/styles/Theme";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import AppCondition from "@/components/appComponents/AppCondition";
import PlaceInfo from "@/components/wizards/plannerWizard/PlaceInfo";
import {useApi} from "@/utils/api";
import {useEffect, useState} from "react";
import {VendorPlaceDetailsDto} from "@/types/open-api";

export default function Place() {
    const API = useApi()
    const {id} = useLocalSearchParams<{ id: string }>()
    const [placeDetails, setPlaceDetails] = useState<VendorPlaceDetailsDto>()
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const getPlaceDetails = async () => {
            try {

                const data = await API.placesControllerGetPlaceDetails({id: Number(id)})
                setPlaceDetails(data.data)
            } catch (err) {
                console.error(err)
            } finally {
                setIsLoading(false)
            }
        }


        getPlaceDetails()
    }, [id]);


    return (
        <>
            <ScrollView>
                <Stack.Screen
                    options={{
                        title: "details",
                        headerShown: true,
                        headerTintColor: Theme.colors.primary,
                    }}/>

                <View style={styles.infosContainer}>

                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{placeDetails?.name}</Text>

                    </View>


                    <AppCondition condition={placeDetails?.streetName}>
                        <PlaceInfo iconName="location.circle" info={placeDetails?.streetName}/>
                    </AppCondition>


                    <AppCondition condition={placeDetails?.phoneNumber}>
                        <PlaceInfo iconName='phone.circle' info={placeDetails?.phoneNumber}/>
                    </AppCondition>

                    <AppCondition condition={placeDetails?.website}>
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


                </View>

            </ScrollView>
        </>
    )
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