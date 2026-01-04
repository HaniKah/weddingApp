import {Tabs} from "expo-router";
import {IconSymbol} from "@/components/symbols/IconSymbol";
import React from "react";
import {Theme} from "@/styles/Theme";
import AppSafeAreaView from "@/components/appComponents/AppSafeAreaView";

export default function TabsLayout() {
    return (
        <>
            <AppSafeAreaView>
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
                                     tabBarIcon: ({color}) => <IconSymbol size={28} name="person.3.fill"
                                                                          color={color}/>,
                                 }}/>
                  
                    <Tabs.Screen name="profile"
                                 options={{
                                     title: 'profile',
                                     tabBarIcon: ({color}) => <IconSymbol size={28} name="person.fill" color={color}/>,
                                 }}/>

                </Tabs>
            </AppSafeAreaView>
        </>
    )
}
