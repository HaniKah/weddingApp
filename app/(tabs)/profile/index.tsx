import {useAuth} from '@/contexts/auth-context';
import {useLocationContext} from '@/contexts/location-context';
import AppView from '@/components/appComponents/AppView';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Theme} from '@/styles/Theme';
import MenuItem from '@/components/items/MenuItem';
import {Stack, useRouter} from 'expo-router';
import {IconSymbol} from '@/components/symbols/IconSymbol';
import {COUNTRIES} from '@/constants/countries';
import AppSafeAreaView from '@/components/appComponents/AppSafeAreaView';

import {useAuthStore} from '@/utils/authStore';
import SignIn from '@/components/screens/sign-in';

import {useTranslation} from 'react-i18next';
import LineSeparator from "@/components/LineSeparator";


export default function Index() {
    const {signOut, deleteUser} = useAuth();
    const {isoCountry} = useLocationContext();
    const {isLoggedIn} = useAuthStore();
    const router = useRouter();
    const {t} = useTranslation();

    function deleteAccount() {
        Alert.alert(t('profile.deleteAccountTitle'), t('profile.deleteAccountMessage'), [{
            text: t('common.cancel'), style: 'default',
        }, {
            text: t('profile.delete'),
            onPress: () => deleteUser(),
            style: 'destructive',
        }]);
    }

    if (!isLoggedIn) {
        return (
            <>
                <Stack.Screen options={{headerShown: false, contentStyle: {backgroundColor: Theme.colors.background}}}/>
                <SignIn/>
            </>
        );
    }

    function logOut() {
        Alert.alert(t('profile.logoutTitle'), t('profile.logoutMessage'), [{
            text: t('common.cancel'), style: 'default',
        }, {
            text: t('profile.logout'), style: 'destructive',
            onPress: () => signOut(),
        },
        ]);
    }


    return (
        <>
            <Stack.Screen options={{headerShown: false, contentStyle: {backgroundColor: Theme.colors.background}}}/>
            <AppSafeAreaView>
                <ScrollView style={styles.container}>
                    <AppView withPadding>

                        <View style={styles.info}>
                            <Text style={styles.name}>{t('profile.welcomeBack')}</Text>
                            <View style={styles.location}>
                                <IconSymbol name="location" size={14} color={Theme.colors.secondary}/>
                                {isoCountry &&
                                    <Text style={styles.address}>{COUNTRIES.get(isoCountry)?.countryName}</Text>
                                }
                            </View>
                        </View>


                        <View style={styles.sectionContainer}>


                            {/* PERSONAL */}
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>{t('profile.personal')}</Text>
                                <View style={styles.menuItemContainer}>
                                    <MenuItem
                                        icon="heart"
                                        label={t('profile.myFavorites')}
                                        onPress={() => router.push('/(tabs)/profile/favorites')}
                                    />
                                </View>

                            </View>

                            {/* BUSINESS */}
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>{t('profile.business')}</Text>
                                <View style={styles.menuItemContainer}>
                                    <MenuItem
                                        icon="briefcase"
                                        label={t('profile.myListings')}
                                        onPress={() => router.push('/(tabs)/profile/listing')}
                                    />
                                </View>
                            </View>

                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>{t('profile.settings')}</Text>
                                <View style={styles.menuItemContainer}>
                                    <MenuItem icon={"mappin.and.ellipse"} label={t('profile.changeLocation')}
                                              onPress={() => router.dismissTo("/pick-location")}/>
                                </View>

                            </View>


                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>{t('profile.account')}</Text>
                                <View style={styles.menuItemContainer}>
                                    <MenuItem
                                        icon="exclamationmark.square"
                                        label={t('profile.deleteAccount')}
                                        onPress={deleteAccount}
                                    />
                                    <LineSeparator/>
                                    <MenuItem icon={"rectangle.portrait.and.arrow.right"} label={t("profile.logout")}
                                              onPress={logOut}/>
                                </View>

                            </View>

                        </View>
                    </AppView>
                </ScrollView>
            </AppSafeAreaView>
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: Theme.sizes.xl,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    location: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
    },
    address: {
        color: Theme.colors.secondary,
        textAlign: 'center',
    },
    guestContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    guestTitle: {
        fontSize: Theme.sizes.lg,
        fontWeight: 'bold',
        color: Theme.colors.primary,
        marginTop: 20,
        textAlign: 'center',
    },
    guestSubtitle: {
        fontSize: Theme.sizes.md,
        color: Theme.colors.secondary,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 20,
    },

    sectionContainer: {
        marginTop: 30,
    },
    section: {marginBottom: 20},

    sectionTitle: {
        fontSize: 12,
        color: Theme.colors.secondary,
        textTransform: 'uppercase',
        letterSpacing: 0.8,
        marginBottom: 8,
        paddingHorizontal: 4,
    },
    menuItemContainer: {
        backgroundColor: Theme.colors.white,
        boxShadow: Theme.shadow.md,
        borderRadius: Theme.radius.lg,
        overflow: "hidden"

    }

});