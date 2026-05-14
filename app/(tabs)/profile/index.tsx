import {useAuth} from '@/contexts/auth-context';
import {useLocationContext} from '@/contexts/location-context';
import AppView from '@/components/appComponents/AppView';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import AppButton from '@/components/appComponents/AppButton';
import {ButtonType} from '@/styles/Button';
import {Theme} from '@/styles/Theme';
import MenuItem from '@/components/items/MenuItem';
import {Stack, useRouter} from 'expo-router';
import {IconSymbol} from '@/components/symbols/IconSymbol';
import {COUNTRIES} from '@/constants/countries';
import AppSafeAreaView from '@/components/appComponents/AppSafeAreaView';

import {useAuthStore} from '@/utils/authStore';
import SignIn from '@/components/screens/sign-in';

export default function Index() {
    const {signOut, deleteUser} = useAuth();
    const {isoCountry} = useLocationContext();
    const {isLoggedIn} = useAuthStore();
    const router = useRouter();

    function deleteAccount() {
        Alert.alert('Delete account', 'Are you sure you want to delete your account? All related data for this account will be deleted as well.', [{
            text: 'Cancel', style: 'default',
        }, {
            text: 'Delete',
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
        Alert.alert('Logout', 'Are you sure you want to logout ?', [{
            text: 'Cancel', style: 'default',
        }, {
            text: 'Log out', style: 'destructive',
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
                            <Text style={styles.name}>Welcome back</Text>
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
                                <Text style={styles.sectionTitle}>Personal</Text>
                                <MenuItem
                                    icon="heart"
                                    label="My Favorites"
                                    onPress={() => router.push('/(tabs)/profile/favorites')}
                                />
                            </View>

                            {/* BUSINESS */}
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Business</Text>
                                <MenuItem
                                    icon="briefcase"
                                    label="My Listings"
                                    onPress={() => router.push('/(tabs)/profile/listing')}
                                />
                            </View>

                            {/* ACCOUNT */}
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Account</Text>
                                <View style={styles.menuItemContainer}>
                                    <MenuItem icon={"mappin.and.ellipse"} label={"Change my location"}
                                              onPress={() => router.dismissTo("/pick-location")}/>
                                    <MenuItem
                                        icon="exclamationmark.square"
                                        label="Delete my account"
                                        onPress={deleteAccount}
                                    />
                                </View>

                            </View>

                        </View>

                        <AppButton extraStylesBtn={{marginTop: 20}} fullWidth destructive buttonType={ButtonType.PLAIN}
                                   buttonSize="MD" onPress={logOut}>
                            Logout
                        </AppButton>
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
        gap: 15
    }

});