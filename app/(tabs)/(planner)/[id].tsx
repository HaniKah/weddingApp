import {Text, View} from "react-native";
import {useLocalSearchParams} from "expo-router";
import {Api, PlaceDetailsDto} from "@/types/open-api";
import {useEffect, useState} from "react";

const {api} = new Api({baseURL: process.env.EXPO_PUBLIC_API_URL, withCredentials: true})
export default function PlaceId() {
    const {id} = useLocalSearchParams<{ id: string }>();
    const [placeDetails, setPlaceDetails] = useState<PlaceDetailsDto>()

    useEffect(() => {
        const fetchPlaceDetails = async () => {

            const response = await api.plannerControllerGetGooglePlaceById({placeId: id})
            setPlaceDetails(response.data)
            console.log("id :", id)
            console.log("response data in details:", response.data)

        }
        fetchPlaceDetails()
    }, [id]);


    return (
        <View>
            <Text>{placeDetails?.placeId}</Text>
            <Text>{placeDetails?.name}</Text>
            <Text>{placeDetails?.formattedAddress}</Text>
            <Text>{placeDetails?.internationalNumber}</Text>
            <Text>{placeDetails?.nationalNumber}</Text>
        </View>
    )
}