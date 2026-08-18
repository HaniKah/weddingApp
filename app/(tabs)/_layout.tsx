import {Tabs} from 'expo-router';
import {IconSymbol} from '@/components/symbols/IconSymbol';
import React from 'react';
import {Theme} from '@/styles/Theme';
import {useTranslation} from 'react-i18next';

export default function TabsLayout() {
    const {t} = useTranslation();

    return (
        <>
            <Tabs screenOptions={{
                tabBarActiveTintColor: Theme.colors.primary,
                tabBarInactiveTintColor: Theme.colors.secondary,
                headerShown: false,

            }}>
                <Tabs.Screen name="(planner)" options={{
                    title: t('tabs.planner'),
                    tabBarIcon: ({color}) => <IconSymbol size={28} name="house" color={color}/>,
                }}/>

                <Tabs.Screen name="checklist"
                             options={{
                                 title: t('tabs.checklist'),
                                 tabBarIcon: ({color}) => <IconSymbol size={28} name="checklist"
                                                                      color={color}/>,
                             }}/>

                <Tabs.Screen name="profile"
                             options={{
                                 title: t('tabs.profile'),
                                 tabBarIcon: ({color}) => <IconSymbol size={24} name="person" color={color}/>,
                             }}/>


            </Tabs>
        </>
    );
}
