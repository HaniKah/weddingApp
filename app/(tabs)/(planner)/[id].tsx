import {ActivityIndicator, Animated, Image, Pressable, StyleSheet, Text, View} from "react-native";
import {Api, PhotosDto, PlaceDetailsDto} from "@/types/open-api";
import {useEffect, useState} from "react";
import {useLocalSearchParams} from "expo-router";
import IconRatingStar from "@/components/ui/IconRatingStar";
import {IconSymbol} from "@/components/ui/IconSymbol";
import {Theme} from "@/styles/Theme";
import {ButtonStyles} from "@/styles/Button";
import ScrollView = Animated.ScrollView;


const {api} = new Api({baseURL: process.env.EXPO_PUBLIC_API_URL, withCredentials: true})
export default function PlaceId() {
    const {id} = useLocalSearchParams<{ id: string }>();

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [placeDetails, setPlaceDetails] = useState<PlaceDetailsDto>()
    const [photoUri, setPhotoUri] = useState<PhotosDto>()
    const [photosOrder, setPhotosOrder] = useState<string[]>([])

    useEffect(() => {
        const getPlaceDetails = async () => {
            try {
                const response = await api.plannerControllerGetPlaceById({placeId: id})
                setPlaceDetails(response.data)
                setPhotosOrder(response.data?.photos?.map((p) => p.photoRef))
            } catch (err) {
                console.error(err)
            } finally {
                setIsLoading(false)
            }
        }
        getPlaceDetails()
    }, [id]);

    useEffect(() => {
        const getPhoto = async () => {
            try {
                const res = await api.plannerControllerGetPhotoByRef({photoRef: photosOrder[0]})
                setPhotoUri(res.data)
            } catch (err) {
                console.error(err)
            } finally {
                setIsLoading(false)
            }
        }
        getPhoto()
    }, [photosOrder]);


    //
    // function nextPhoto() {
    //     if (!photosOrder) return
    //     const index = currentPhotoIndex % photosOrder.length
    //     setCurrentPhotoIndex(index)
    // }
    if (!isLoading) {
        return (
            <ScrollView>
                <Image source={{uri: photoUri?.uri}} style={{height: 400}}/>
                <View style={styles.infosContainer}>

                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{placeDetails?.name}</Text>
                        <IconRatingStar rating={placeDetails?.rating}/>
                    </View>

                    <View style={styles.infoContainer}>
                        <IconSymbol name="location.circle" color={Theme.colors.black} size={Theme.sizes.iconSymbol}
                                    weight={'thin'}/>
                        <Text style={styles.info}>{placeDetails?.formattedAddress}</Text>
                    </View>

                    {
                        placeDetails?.internationalPhoneNumber &&
                        <View style={styles.infoContainer}>
                            <IconSymbol name="phone.circle" color={Theme.colors.black} size={Theme.sizes.iconSymbol}
                                        weight={'thin'}/>
                            <Text style={styles.info}>{placeDetails?.internationalPhoneNumber}</Text>
                        </View>
                    }

                    {
                        !placeDetails?.internationalPhoneNumber && placeDetails?.nationalPhoneNumber &&
                        <View style={styles.infoContainer}>
                            <Text style={styles.info}> {placeDetails?.nationalPhoneNumber}</Text>
                        </View>
                    }

                    {
                        placeDetails?.website &&
                        <View style={{backgroundColor: "red"}}>
                            <Text style={styles.info}>
                                {placeDetails?.website}
                            </Text>
                        </View>
                    }
                    <View style={styles.saveForLaterContainer}>
                        <Pressable style={styles.saveForLaterBtn}>
                            <Text style={styles.saveForLaterTxt}>save for later</Text>
                        </Pressable>
                    </View>

                    <Pressable style={[ButtonStyles.primaryBtn, styles.pickPlaceBtn]}>
                        <Text style={styles.pickBtnTxt}>Pick this place</Text>
                    </Pressable>

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
    infoContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        gap: 10,
    },
    info: {
        paddingHorizontal: 10,
        fontSize: 18,
        flexShrink: 1
    },
    pickPlaceBtn: {
        width: "100%",
        marginTop: 20,
    },
    pickBtnTxt: {
        color: Theme.colors.white,
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
    saveForLaterBtn: {
        width: 100,
    },
    saveForLaterTxt: {
        textAlign: "center",
        textDecorationLine: "underline",
        marginTop: 20,
        color: Theme.colors.primary,
    },
    saveForLaterContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

    }

})