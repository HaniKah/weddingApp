import {useFonts} from 'expo-font';
import {SplashScreen, Stack} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import 'react-native-reanimated';
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {StyleSheet} from "react-native";
import {Theme} from "@/styles/Theme";
import {useEffect} from "react";
import {useAuthStore} from "@/utils/authStore";
import {AuthProvider} from "@/contexts/auth-context";


export default function RootLayout() {
    const {isLoggedIn, shouldCreateAccount, hasCompletedOnboarding} = useAuthStore()
    SplashScreen.preventAutoHideAsync();

    const [loaded, error] = useFonts({
        'MeaCulpa-Regular': require('../assets/fonts/MeaCulpa-Regular.ttf'),
        'Aboreto-Regular': require('../assets/fonts/Aboreto-Regular.ttf'),
    });
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
                <SafeAreaView style={styles.container} edges={['top']}>
                    <Stack screenOptions={{headerShown: false}}>
                        <Stack.Protected guard={isLoggedIn}>
                            <Stack.Screen name="(tabs)"/>
                        </Stack.Protected>
                        <Stack.Protected guard={!isLoggedIn && !shouldCreateAccount && hasCompletedOnboarding}>
                            <Stack.Screen name="sign-in"/>
                        </Stack.Protected>
                        <Stack.Protected guard={shouldCreateAccount}>
                            <Stack.Screen name="sign-up"/>
                        </Stack.Protected>
                        <Stack.Protected guard={!hasCompletedOnboarding}>
                            <Stack.Screen name="onboarding"/>
                        </Stack.Protected>
                        <Stack.Screen name="+not-found"/>
                    </Stack>

                    <StatusBar style="auto"/>
                </SafeAreaView>
            </SafeAreaProvider>
        </AuthProvider>


    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.colors.background,

    },


});
