import {useLocationContext} from "@/contexts/location-context";
import {COUNTRIES} from "@/constants/countries";
import {router, Stack} from "expo-router";
import {Theme} from "@/styles/Theme";
import AppView from "@/components/appComponents/AppView";
import {FlatList, StyleSheet, Text, View} from "react-native";
import CountryItem from "@/components/items/CountryItem";
import {CountryCode} from "@/types/open-api";
import {useLocationStore} from "@/utils/locationStore";

import {useTranslation} from "react-i18next";
import AppSafeAreaView from "@/components/appComponents/AppSafeAreaView";


export default function PickLocation() {
    const {setIsoCountry, setErrorMsg} = useLocationContext();
    const {t} = useTranslation();

    const countriesList = Array.from(COUNTRIES.values());
    const {setLocation} = useLocationStore()

    const handleCountrySelect = async (countryCode: CountryCode) => {
        try {
            await setLocation(countryCode)
            setIsoCountry(countryCode);

        } catch (err) {
            console.error(err);
        }
        router.dismissTo("/(tabs)/(planner)");
    };

    return (
        <>
            <Stack.Screen options={{
                headerShown: false,
                contentStyle: {backgroundColor: Theme.colors.background},

            }}/>
            <AppSafeAreaView>
                <AppView withPadding>
                    <View style={styles.header}>
                        <Text style={styles.title}>{t('location.pickTitle')}</Text>
                        <Text style={styles.subtitle}>{t('location.pickSubtitle')}</Text>
                    </View>
                    <FlatList
                        data={countriesList}
                        renderItem={({item}) => (
                            <CountryItem
                                country={item}
                                onPress={handleCountrySelect}
                            />
                        )}
                        keyExtractor={(item) => item.countryCode}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.listContent}
                    />
                </AppView>
            </AppSafeAreaView>
        </>
    );
}
const styles = StyleSheet.create({
    appView: {
        backgroundColor: Theme.colors.background,
    },
    header: {
        marginBottom: 20,
    },
    title: {
        fontSize: Theme.sizes.xl,
        fontWeight: 'bold',
        color: Theme.colors.primary,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: Theme.sizes.sm,
        color: Theme.colors.secondary,
        lineHeight: 20,
    },
    listContent: {
        paddingBottom: 20,
    },
});