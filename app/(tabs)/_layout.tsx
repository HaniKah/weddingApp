import {Tabs} from 'expo-router';
import {IconSymbol} from '@/components/symbols/IconSymbol';
import React from 'react';
import {Theme} from '@/styles/Theme';

export default function TabsLayout() {
    return (
        <>
            <Tabs screenOptions={{
                tabBarActiveTintColor: Theme.colors.primary,
                tabBarInactiveTintColor: Theme.colors.secondary,
                headerShown: false,

            }}>
                <Tabs.Screen name="(planner)" options={{
                    title: 'Planner',
                    tabBarIcon: ({color}) => <IconSymbol size={28} name="house" color={color}/>,
                }}/>

                <Tabs.Screen name="checklist"
                             options={{
                                 title: 'Checklist',
                                 tabBarIcon: ({color}) => <IconSymbol size={28} name="checklist"
                                                                      color={color}/>,
                             }}/>

                <Tabs.Screen name="guests"
                             options={{
                                 href: null,
                                 title: 'Guestlist',
                                 tabBarIcon: ({color}) => <IconSymbol size={28} name="person.3"
                                                                      color={color}/>,

                             }}/>

                <Tabs.Screen name="profile"
                             options={{
                                 title: 'profile',
                                 tabBarIcon: ({color}) => <IconSymbol size={24} name="person" color={color}/>,
                             }}/>


            </Tabs>
        </>
    );
}
