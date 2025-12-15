import {Stack, useLocalSearchParams} from "expo-router";
import Gallery from "@/components/Gallery";

export default function Images() {
    const {id} = useLocalSearchParams<{ id: string }>();

    return (
        <>
            <Stack.Screen options={{title: "images"}}/>
            <Gallery placeId={Number(id)}/>
        </>
    )

}
