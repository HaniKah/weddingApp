import {Stack} from "expo-router";
import {Theme} from "@/styles/Theme";

export default function StepLayout() {
    return (
        <Stack screenOptions={{headerShown: false, headerStyle: {backgroundColor: Theme.colors.background}}}/>
    )
}