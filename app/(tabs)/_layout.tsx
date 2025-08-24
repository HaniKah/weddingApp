import {Tabs} from "expo-router";

export default function TabsLayout() {
    return (<>
        <Tabs>
            <Tabs.Screen name="index" options={{headerShown: false, title: 'Planner'}}/>
            <Tabs.Screen name="guests" options={{headerShown: false, title: 'Guests'}}/>
            <Tabs.Screen name="notes" options={{headerShown: false, title: 'Notes'}}/>
            <Tabs.Screen name="settings" options={{headerShown: false, title: 'Settings'}}/>
        </Tabs>
    </>)
}