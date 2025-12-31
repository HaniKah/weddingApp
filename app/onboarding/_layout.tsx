import {Stack} from "expo-router";
import AppSafeAreaView from "@/components/appComponents/AppSafeAreaView";

export default function OnboardingLayout() {
    return (
        <AppSafeAreaView>
            <Stack screenOptions={{headerShown: false}}/>
        </AppSafeAreaView>
    )
}