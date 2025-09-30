import {Tabs} from "expo-router";
import {IconSymbol} from "@/components/ui/IconSymbol";
import React from "react";
import {Theme} from "@/styles/Theme";

export default function TabsLayout() {
    return (
        <>
            <Tabs screenOptions={{
                tabBarActiveTintColor: Theme.colors.primary,
                tabBarInactiveTintColor: Theme.colors.primaryInactive,
                headerShown: false
            }}>
                <Tabs.Screen name="(planner)" options={{
                    title: 'Planner',
                    tabBarIcon: ({color}) => <IconSymbol size={28} name="house.fill" color={color}/>,
                }}/>
                <Tabs.Screen name="guests"
                             options={{
                                 title: 'Guests',
                                 tabBarIcon: ({color}) => <IconSymbol size={28} name="person.3.fill" color={color}/>,
                             }}/>
                <Tabs.Screen name="notes"
                             options={{
                                 title: 'Notes',
                                 tabBarIcon: ({color}) => <IconSymbol size={28} name="heart.text.clipboard.fill"
                                                                      color={color}/>,
                             }}/>
                <Tabs.Screen name="settings"
                             options={{
                                 title: 'Settings',
                                 tabBarIcon: ({color}) => <IconSymbol size={28} name="gearshape.fill" color={color}/>,
                             }}/>

            </Tabs>
        </>
    )
}