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
import {registerSnackBar, Snackbar, SnackbarRef} from "@/components/Snackbar";

export default function RootLayout() {

    SplashScreen.preventAutoHideAsync();

    const [loaded, error] = useFonts({
        'Aboreto-Regular': require('../assets/fonts/Aboreto-Regular.ttf'),
        'SendFlowers-Regular': require('../assets/fonts/SendFlowers-Regular.ttf'),
    });

    const snackbarRef = useRef<SnackbarRef>(null);

    // Wire up the global ref as early as possible
    registerSnackBar(snackbarRef);

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);


    if (!loaded) {
        // Async font loading only occurs in development.
        return null;
    }


    return (
        <AuthProvider>
            <SafeAreaProvider>
                <GestureHandlerRootView>
                    <LocationProvider>
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
