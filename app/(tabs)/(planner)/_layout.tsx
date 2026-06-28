import {Stack} from 'expo-router';
import {Theme} from '@/styles/Theme';

export default function PlannerLayout() {
    return (
        <Stack screenOptions={{
            headerStyle: {backgroundColor: Theme.colors.background},
            contentStyle: {backgroundColor: Theme.colors.background},
            statusBarStyle: "auto"

        }}>
            <Stack.Screen name="index" options={{headerShown: false, title: 'Index'}}/>


        </Stack>
    );
}