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
                <Tabs.Screen name="(places)" options={{
                    title: 'Places',
                    tabBarIcon: ({color}) => <IconSymbol size={28} name="house.fill" color={color}/>,
                }}/>
                <Tabs.Screen name="promotion"
                             options={{
                                 title: 'promotions',
                                 tabBarIcon: ({color}) => <IconSymbol size={28}
                                                                      name="chart.line.uptrend.xyaxis"
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