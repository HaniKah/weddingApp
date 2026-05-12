import '@/utils/i18n';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { AuthProvider } from '@/contexts/auth-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LocationProvider } from '@/contexts/location-context';

export default function RootLayout() {

  SplashScreen.preventAutoHideAsync();

  const [loaded, error] = useFonts({
    'Aboreto-Regular': require('../assets/fonts/Aboreto-Regular.ttf'),
    'SendFlowers-Regular': require('../assets/fonts/SendFlowers-Regular.ttf'),
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
        <GestureHandlerRootView>
          <LocationProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="pick-location" />
              <Stack.Screen name="+not-found" />
            </Stack>
          </LocationProvider>
          <StatusBar style="dark" />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </AuthProvider>


  );

}
