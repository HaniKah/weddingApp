import {Tabs} from "expo-router";
import {IconSymbol} from "@/components/ui/IconSymbol";
import React from "react";
import {Theme} from "@/styles/Theme";

export default function TabsLayout() {
    return (
        <>
            <Tabs screenOptions={{
                tabBarActiveTintColor: Theme.colors.primary,
                tabBarInactiveTintColor: Theme.colors.primaryInactive
            }}>
                <Tabs.Screen name="(planner)" options={{
                    headerShown: false,
                    title: 'Planner',
                    tabBarIcon: ({color}) => <IconSymbol size={28} name="house.fill" color={color}/>,
                }}/>
                <Tabs.Screen name="guests"
                             options={{
                                 headerShown: false,
                                 title: 'Guests',
                                 tabBarIcon: ({color}) => <IconSymbol size={28} name="person.3.fill" color={color}/>,
                             }}/>
                <Tabs.Screen name="notes"
                             options={{
                                 headerShown: false,
                                 title: 'Notes',
                                 tabBarIcon: ({color}) => <IconSymbol size={28} name="heart.text.clipboard.fill"
                                                                      color={color}/>,
                             }}/>
                <Tabs.Screen name="settings"
                             options={{
                                 headerShown: false,
                                 title: 'Settings',
                                 tabBarIcon: ({color}) => <IconSymbol size={28} name="gearshape.fill" color={color}/>,
                             }}/>

            </Tabs>
        </>
    )
}