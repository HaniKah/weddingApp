import {Stack, useLocalSearchParams} from "expo-router";
import {Theme} from "@/styles/Theme";
import {ActivityIndicator, Image, Linking, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import AppIf from "@/components/appComponents/AppIf";
import PlaceInfo from "@/components/wizards/plannerWizard/PlaceInfo";
import {useApi} from "@/utils/api";
import {useEffect, useState} from "react";
import {VendorPlaceDetailsDto, VendorPlacePhoto} from "@/types/open-api";
import Website from "@/assets/icons/social-media/website.svg"
import Facebook from "@/assets/icons/social-media/facebook.svg"
import Instagram from "@/assets/icons/social-media/instagram.svg"
import Tiktok from "@/assets/icons/social-media/tiktok.svg"

export default function Place() {
    const API = useApi()
    const {id} = useLocalSearchParams<{ id: string }>()
    const [placeDetails, setPlaceDetails] = useState<VendorPlaceDetailsDto>()
    const [photos, setPhotos] = useState<VendorPlacePhoto[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const getPlaceDetails = async () => {
            try {
                setIsLoading(true)
                const data = await API.placesControllerGetPlaceDetails({id: Number(id)})
                console.log(data.data)
                setPlaceDetails(data.data.place)
                setPhotos(data.data.photos)

            } catch (err) {
                console.error(err)
            } finally {
                setIsLoading(false)
            }
        }


        getPlaceDetails()
    }, [id]);

    if (isLoading) return <ActivityIndicator size="large"/>
    else
        return (
            <>
                <ScrollView>
                    <Stack.Screen
                        options={{
                            title: "details",
                            headerShown: true,
                            headerTintColor: Theme.colors.primary,
                        }}/>
                    <View style={styles.imageContainer}>
                        <Image height={300} style={styles.image} source={{uri: photos[0].uri}}/>
                    </View>
                    <View style={styles.infosContainer}>

                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{placeDetails?.placeInfo?.name}</Text>
                        </View>


                        <View>
                            <AppIf value={placeDetails?.location?.streetName}>
                                <PlaceInfo iconName="location.circle" info={placeDetails?.location?.streetName}/>
                            </AppIf>

                            <AppIf value={placeDetails?.placeInfo?.phoneNumber}>
                                <PlaceInfo iconName='phone.circle' info={placeDetails?.placeInfo?.phoneNumber}/>
                            </AppIf>
                        </View>

                        <View style={{flex: 1}}>
                            <Text>
                                {placeDetails?.description}
                            </Text>
                        </View>


                        <View style={styles.socialMediaContainer}>
                            <AppIf value={placeDetails?.placeInfo?.website}>
                                <Pressable onPress={() => Linking.openURL(placeDetails?.placeInfo?.website as string)}>
                                    <Website width={40} height={40} color={Theme.colors.gray.S300}/>
                                </Pressable>
                            </AppIf>

                            <AppIf value={placeDetails?.placeInfo?.facebook}>
                                <Pressable onPress={() => Linking.openURL(placeDetails?.placeInfo?.facebook as string)}>
                                    <Facebook width={40} height={40} color={Theme.colors.gray.S300}/>
                                </Pressable>
                            </AppIf>

                            <AppIf value={placeDetails?.placeInfo?.instagram}>
                                <Pressable
                                    onPress={() => Linking.openURL(placeDetails?.placeInfo?.instagram as string)}>
                                    <Instagram width={40} height={40} color={Theme.colors.gray.S300}/>
                                </Pressable>
                            </AppIf>

                            <AppIf value={placeDetails?.placeInfo?.tiktok}>
                                <Pressable onPress={() => Linking.openURL(placeDetails?.placeInfo?.tiktok as string)}>
                                    <Tiktok width={40} height={40} color={Theme.colors.gray.S300}/>
                                </Pressable>
                            </AppIf>

                        </View>
                    </View>

                </ScrollView>
            </>
        )
}
const styles = StyleSheet.create({

    imageContainer: {
        height: 300,
    },

    image: {
        backgroundSize: "cover",
        height: "100%"
    },

    infosContainer: {
        padding: 20,
        height: "80%",

        // display: "flex",
        // flexDirection: "column",
        // gap: 20
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


    socialMediaContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: 20,
    },


})