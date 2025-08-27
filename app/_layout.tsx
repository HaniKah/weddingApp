import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import 'react-native-reanimated';
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {StyleSheet} from "react-native";
import {Theme} from "@/constants/Theme";


export default function RootLayout() {

    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/MeaCulpa-Regular.ttf'),
    });

    if (!loaded) {
        // Async font loading only occurs in development.
        return null;
    }

    return (

        <SafeAreaProvider>
            <SafeAreaView style={styles.container} edges={['top']}>
                <Stack>
                    <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                    <Stack.Screen name="+not-found"/>
                </Stack>

                <StatusBar style="auto"/>
            </SafeAreaView>
        </SafeAreaProvider>


    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.colors.background,

    },


});
