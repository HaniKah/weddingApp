import '@/utils/i18n';
import {useFonts} from 'expo-font';
import {SplashScreen, Stack} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import 'react-native-reanimated';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useEffect, useRef} from 'react';
import {AuthProvider} from '@/contexts/auth-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {LocationProvider} from '@/contexts/location-context';
import {registerSnackBar, Snackbar, SnackbarRef} from '@/components/Snackbar';
import {useAppUpdate} from '@/hooks/useAppUpdate';
import {ForceUpdateScreen} from '@/components/update/ForceUpdateScreen';
import {OptionalUpdateBanner} from '@/components/update/OptionalUpdateBanner';
import {OTAUpdateScreen} from '@/components/update/OTAUpdateScreen';
import {Linking, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default function RootLayout() {

    SplashScreen.preventAutoHideAsync();

    const [loaded, error] = useFonts({
        'Aboreto-Regular': require('../assets/fonts/Aboreto-Regular.ttf'),
        'SendFlowers-Regular': require('../assets/fonts/SendFlowers-Regular.ttf'),
    });

    const snackbarRef = useRef<SnackbarRef>(null);

    // Wire up the global ref as early as possible
    registerSnackBar(snackbarRef);

    const {
        loading: configLoading,
        error: configError,
        isUpdateRequired,
        isUpdateAvailable,
        isOtaUpdating,
        otaProgress,
        config,
        retry,
        dismissOptionalUpdate,
    } = useAppUpdate();

    useEffect(() => {
        if (loaded || error) {
            // Keep splash screen visible until config is loaded or if update is required
            if (!configLoading && !isUpdateRequired && !isOtaUpdating) {
                SplashScreen.hideAsync();
            }
        }
    }, [loaded, error, configLoading, isUpdateRequired, isOtaUpdating]);


    if (!loaded) {
        // Async font loading only occurs in development.
        return null;
    }

    if (isOtaUpdating) {
        return <OTAUpdateScreen progress={otaProgress}/>;
    }

    if (configLoading) {
        return null; // Keep showing splash
    }

    if (configError) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{configError}</Text>
                <TouchableOpacity onPress={retry} style={styles.retryButton}>
                    <Text style={styles.retryText}>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (isUpdateRequired && config) {
        return <ForceUpdateScreen storeUrls={config.storeUrls}/>;
    }


    return (
        <AuthProvider>
            <SafeAreaProvider>
                <GestureHandlerRootView>
                    <LocationProvider>
                        {isUpdateAvailable && config && (
                            <OptionalUpdateBanner
                                onDismiss={dismissOptionalUpdate}
                                onUpdate={() => {
                                    const url = Platform.OS === 'ios' ? config.storeUrls.ios : config.storeUrls.android;
                                    Linking.openURL(url);
                                }}
                            />
                        )}
                        <Stack screenOptions={{headerShown: false}}>
                            <Stack.Screen name="(tabs)"/>
                            <Stack.Screen name="pick-location"/>
                            <Stack.Screen name="+not-found"/>
                        </Stack>
                    </LocationProvider>
                    <StatusBar style="dark"/>
                    <Snackbar ref={snackbarRef}/>
                </GestureHandlerRootView>
            </SafeAreaProvider>
        </AuthProvider>


    );

}

const styles = StyleSheet.create({
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        marginBottom: 20,
    },
    retryButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    retryText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
