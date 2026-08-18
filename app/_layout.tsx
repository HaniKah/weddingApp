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
import {OTAUpdateScreen} from '@/components/update/OTAUpdateScreen';
import {StyleSheet, Text, View} from 'react-native';
import AppButton from "@/components/appComponents/AppButton";

export default function RootLayout() {

    SplashScreen.preventAutoHideAsync();

    const [loaded, error] = useFonts({
        'Aboreto-Regular': require('../assets/fonts/Aboreto-Regular.ttf'),
        'SendFlowers-Regular': require('../assets/fonts/SendFlowers-Regular.ttf'),
        'Poppins-Black': require('../assets/fonts/poppins/Poppins-Black.ttf'),
        "Cairo-Black": require('../assets/fonts/cairo/Cairo-Black.ttf'),
    });

    const snackbarRef = useRef<SnackbarRef>(null);

    useEffect(() => {
        registerSnackBar(snackbarRef);
    }, []);

    const {
        loading: configLoading,
        error: configError,
        isUpdateRequired,
        isOtaUpdating,
        otaProgress,
        config,
        retry,
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
                <AppButton onPress={retry}>
                    Retry
                </AppButton>
            </View>
        );
    }

    if (isUpdateRequired && config) {
        return <ForceUpdateScreen storeUrls={config.storeUrls}/>;
    }


    return (
        <SafeAreaProvider>
            <GestureHandlerRootView>
                <AuthProvider>
                    <LocationProvider>
                        <Stack screenOptions={{headerShown: false}}>
                            <Stack.Screen name="(tabs)"/>
                            <Stack.Screen name="pick-location"/>
                            <Stack.Screen name="+not-found"/>
                            <Stack.Screen name="complete-oauth"/>
                        </Stack>
                    </LocationProvider>
                    <StatusBar style="dark"/>
                    <Snackbar ref={snackbarRef}/>
                </AuthProvider>
            </GestureHandlerRootView>
        </SafeAreaProvider>


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


});
