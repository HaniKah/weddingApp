import {Tabs} from "expo-router";
import {IconSymbol} from "@/components/symbols/IconSymbol";
import React from "react";
import {Theme} from "@/styles/Theme";

export default function SwitchTabsLayout() {
    return (
        <>
            <Tabs screenOptions={{
                tabBarActiveTintColor: Theme.colors.primary,
                tabBarInactiveTintColor: Theme.colors.primaryInactive,
                headerShown: false,
            }}>
                <Tabs.Screen name="index" options={{
                    title: 'Places',
                    tabBarIcon: ({color}) => <IconSymbol size={28} name="house.fill" color={color}/>,
                }}/>
                <Tabs.Screen name="ads"
                             options={{
                                 title: 'ads',
                                 tabBarIcon: ({color}) => <IconSymbol size={28} name="person.3.fill" color={color}/>,
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