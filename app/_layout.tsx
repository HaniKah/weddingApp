import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { useAuthStore } from '@/utils/authStore';
import { AuthProvider } from '@/contexts/auth-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LocationProvider } from '@/contexts/location-context';
import Purchases from 'react-native-purchases';
import { Platform } from 'react-native';


export default function RootLayout() {
  const { isLoggedIn, shouldCreateAccount, hasCompletedOnboarding, userType, user } = useAuthStore();

  SplashScreen.preventAutoHideAsync();

  const [loaded, error] = useFonts({
    'MeaCulpa-Regular': require('../assets/fonts/MeaCulpa-Regular.ttf'),
    'Aboreto-Regular': require('../assets/fonts/Aboreto-Regular.ttf'),
  });


  useEffect(() => {
    if (!isLoggedIn) return;
    if (Platform.OS === 'ios') {
      Purchases.configure({
        apiKey: process.env.EXPO_PUBLIC_REVENUE_CAT_PUBLIC_KEY_IOS as string,
        appUserID: user.rcAppUserId,
      });
    } else if (Platform.OS === 'android') {
      Purchases.configure({ apiKey: 'we dont have it yet !', appUserID: user.rcAppUserId });
    }

  }, [isLoggedIn]);


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
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Protected guard={isLoggedIn}>
                <Stack.Screen name="(tabs)" />
              </Stack.Protected>
              <Stack.Protected guard={!isLoggedIn && !shouldCreateAccount && hasCompletedOnboarding}>
                <Stack.Screen name="sign-in" />
              </Stack.Protected>
              <Stack.Protected guard={!hasCompletedOnboarding}>
                <Stack.Screen
                  name="onboarding" />
              </Stack.Protected>
              <Stack.Screen name="+not-found" />
            </Stack>
          </LocationProvider>
          <StatusBar style="auto" />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </AuthProvider>


  );

}
