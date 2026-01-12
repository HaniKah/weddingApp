import {Link, Stack, useLocalSearchParams} from "expo-router";
import {Theme} from "@/styles/Theme";
import {Image, Linking, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import AppIf from "@/components/appComponents/AppIf";
import PlaceInfo from "@/components/PlaceInfo";
import {useApi} from "@/utils/api";
import {useEffect, useState} from "react";
import {VendorPlaceDetailsDto} from "@/types/open-api";
import Website from "@/assets/icons/social-media/website.svg"
import Facebook from "@/assets/icons/social-media/facebook.svg"
import Instagram from "@/assets/icons/social-media/instagram.svg"
import Tiktok from "@/assets/icons/social-media/tiktok.svg"

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

                <Link asChild href={{
                    pathname: "/(switch-tabs)/(places)/[id]/images", params: {id: id}
                }}>
                    <Pressable style={styles.imageContainer}>
                        <Image height={300} style={styles.image} source={{uri: placeDetails?.mainPhoto}}/>
                    </Pressable>
                </Link>

                <View style={styles.infosContainer}>

                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{placeDetails?.name}</Text>
                        <Text style={styles.country}>{placeDetails?.countryName}</Text>
                    </View>

                    <View>
                        <AppIf value={placeDetails?.streetName}>
                            <PlaceInfo iconName="location.circle" info={placeDetails?.streetName}/>
                        </AppIf>

                        <AppIf value={placeDetails?.phoneNumber}>
                            <PlaceInfo iconName='phone.circle' info={placeDetails?.phoneNumber}/>
                        </AppIf>
                    </View>

                    <View style={{flex: 1}}>
                        <Text>
                            {placeDetails?.description}
                        </Text>
                    </View>


                    <View style={styles.socialMediaContainer}>
                        <AppIf value={placeDetails?.website}>
                            <Pressable onPress={() => Linking.openURL(placeDetails?.website as string)}>
                                <Website width={40} height={40} color={Theme.colors.gray.S300}/>
                            </Pressable>
                        </AppIf>

                        <AppIf value={placeDetails?.facebook}>
                            <Pressable onPress={() => Linking.openURL(placeDetails?.facebook as string)}>
                                <Facebook width={40} height={40} color={Theme.colors.gray.S300}/>
                            </Pressable>
                        </AppIf>

                        <AppIf value={placeDetails?.instagram}>
                            <Pressable onPress={() => Linking.openURL(placeDetails?.instagram as string)}>
                                <Instagram width={40} height={40} color={Theme.colors.gray.S300}/>
                            </Pressable>
                        </AppIf>

                        <AppIf value={placeDetails?.tiktok}>
                            <Pressable onPress={() => Linking.openURL(placeDetails?.tiktok as string)}>
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
        marginBottom: 20,
    },
    title: {
        fontSize: Theme.sizes.lg,
        fontWeight: "bold",
        flexShrink: 1,
        marginBottom: 5
    },
    country: {
        fontSize: Theme.sizes.md,
        color: Theme.colors.gray.S500
    },


    socialMediaContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: 20,
    },


})