import {Tabs} from "expo-router";
import {IconSymbol} from "@/components/symbols/IconSymbol";
import React from "react";
import {Theme} from "@/styles/Theme";
import AppSafeAreaView from "@/components/appComponents/AppSafeAreaView";

export default function SwitchTabsLayout() {
    return (
        <>
            <AppSafeAreaView>
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

                    <Tabs.Screen name="profile"
                                 options={{
                                     title: 'Profile',
                                     tabBarIcon: ({color}) => <IconSymbol size={28} name="person.fill" color={color}/>,
                                 }}/>

                </Tabs>
            </AppSafeAreaView>

        </>
    )
}