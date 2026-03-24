import { Stack, useLocalSearchParams } from "expo-router";
import Gallery from "@/components/Gallery";

export default function Images() {
    const { id } = useLocalSearchParams<{ id: string }>();

    return (
        <>
            <Stack.Screen options={{ title: "images", headerBackButtonDisplayMode: "minimal" }} />
            <Gallery placeId={Number(id)} />
        </>
    )

}
