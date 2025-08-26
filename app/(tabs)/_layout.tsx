import {Tabs} from "expo-router";
import {IconSymbol} from "@/components/ui/IconSymbol";
import React from "react";
import {Theme} from "@/constants/Theme";

export default function TabsLayout() {
    return (<>
        <Tabs>
            <Tabs.Screen name="index" options={{
                headerShown: false,
                title: 'Planner',
                tabBarActiveTintColor: Theme.colors.primary,
                tabBarInactiveTintColor: Theme.colors.primaryInactive,
                tabBarIcon: ({color}) => <IconSymbol size={28} name="house.fill" color={color}/>,
            }}/>
            <Tabs.Screen name="guests"
                         options={{
                             headerShown: false,
                             title: 'Guests',
                             tabBarActiveTintColor: Theme.colors.primary,
                             tabBarInactiveTintColor: Theme.colors.primaryInactive,
                             tabBarIcon: ({color}) => <IconSymbol size={28} name="person.3.fill" color={color}/>,
                         }}/>
            <Tabs.Screen name="notes"
                         options={{
                             headerShown: false,
                             title: 'Notes',
                             tabBarActiveTintColor: Theme.colors.primary,
                             tabBarInactiveTintColor: Theme.colors.primaryInactive,
                             tabBarIcon: ({color}) => <IconSymbol size={28} name="heart.text.clipboard.fill"
                                                                  color={color}/>,
                         }}/>
            <Tabs.Screen name="settings"
                         options={{
                             headerShown: false,
                             title: 'Settings',
                             tabBarActiveTintColor: Theme.colors.primary,
                             tabBarInactiveTintColor: Theme.colors.primaryInactive,
                             tabBarIcon: ({color}) => <IconSymbol size={28} name="gearshape.fill" color={color}/>,
                         }}/>

        </Tabs>
    </>)
}