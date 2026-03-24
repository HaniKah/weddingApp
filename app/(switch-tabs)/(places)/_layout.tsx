import { Stack } from "expo-router";
import { Theme } from "@/styles/Theme";

export default function PlacesLayout() {
    return (
        <Stack screenOptions={{
            headerStyle: { backgroundColor: Theme.colors.background },
            contentStyle: { backgroundColor: Theme.colors.background },
            headerBackButtonDisplayMode: "minimal"
        }} />
    )
}