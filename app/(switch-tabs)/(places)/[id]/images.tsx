import Gallery from "@/components/Gallery";
import {useLocalSearchParams} from "expo-router";

export default function VendorImages() {
    const {id} = useLocalSearchParams<{ id: string }>();

    return (
        <>
            <Gallery placeId={id}/>
        </>
    )
}