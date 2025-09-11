import {ActivityIndicator, Image, Text, View} from "react-native";
import {Api, PhotosDto, PlaceDetailsDto} from "@/types/open-api";
import {useEffect, useState} from "react";
import {useLocalSearchParams} from "expo-router";

// const key = "AIzaSyAKqIgtmbkopCIEfv4l6DZ77ip8ijZZick"
const ref = "places/ChIJ51i9R_pfGxUR7vY7QzR16FA/photos/AciIO2fiRVp7wYjFjV2H2PVQD88830v1trjyS2vhOz0Ho9MEFRJKtOvzGsXfV-08377RY7kJcRF9hazfj0H7YVjtPlPKUgBgeSEzR0g60iR76Mn_6B8HiW5PsmsihYPb1FqNqV0nJaPdAofoDwk78zTseLcAYfQoyXwYfh87ccBUjyx2qJK1jtqD-zBmNKmwJ6ahdVy3W9_cwFynGhEhA1rtMLpfWkz3AWe7c99pnL6UPZdDN7brT7r8SMuJi8uSEtEvUCbM5EpGpPhtcuJJ6DFEQrsfffNKp1KMK2dztixNh_If6w"
// const photoUri = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${ref}&key=${key}`

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
            <View>
                <Image source={{uri: photoUri?.uri}} style={{width: 200, height: 200}}/>
                <Text>{placeDetails?.placeId}</Text>
                <Text>{placeDetails?.name}</Text>
                <Text>{placeDetails?.name}</Text>
                <Text>{placeDetails?.internationalPhoneNumber}</Text>
                <Text>{placeDetails?.nationalPhoneNumber}</Text>
                <Text>{placeDetails?.rating}</Text>
            </View>

        )
    } else {
        return (
            <View>
                <ActivityIndicator size="large"/>
            </View>
        )
    }
}