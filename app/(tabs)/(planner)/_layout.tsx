import {Stack} from "expo-router";

export default function PlannerLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{headerShown: false}}/>
            <Stack.Screen name="[id]" options={{headerShown: true}}/>
            <Stack.Screen name="checklist" options={{headerShown: true}}/>
        </Stack>
    )
}