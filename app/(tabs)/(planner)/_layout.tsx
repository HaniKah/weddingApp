import {Stack} from "expo-router";
import {Theme} from "@/styles/Theme";

export default function PlannerLayout() {
    return (
        <Stack screenOptions={{
            headerStyle: {backgroundColor: Theme.colors.background},
            contentStyle: {backgroundColor: Theme.colors.background}
        }}>
            <Stack.Screen name="index" options={{headerShown: false, title: 'Index'}}/>
            <Stack.Screen name="checklist"
                          options={{
                              title: 'Checklist',
                              headerShown: true,
                              headerTintColor: Theme.colors.primary,

                          }}/>

            {/*Screen [step]/index is defined inside the component*/}
            {/*Screen [step]/[id] is defined inside the component*/}

        </Stack>
    )
}