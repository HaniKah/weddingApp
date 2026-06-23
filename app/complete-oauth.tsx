import {router, useLocalSearchParams} from "expo-router";
import {useAuth} from "@/contexts/auth-context";
import {useEffect} from "react";
import {ActivityIndicator, Image, StyleSheet, Text, View} from "react-native";
import {showSnackbar} from "@/components/Snackbar";
import {Theme} from "@/styles/Theme";

export default function CompleteOAuthScreen() {
    const {exchangeWithToken} = useAuth();
    const {exchangeToken} = useLocalSearchParams<{ exchangeToken?: string }>();

    useEffect(() => {
        console.log("complete-oauth screen ....")
        const completeAuth = async () => {
            if (!exchangeToken) {
                showSnackbar("couldn't login, please try again later", "error")
                router.dismissTo("/");
                return;
            }
            await exchangeWithToken(exchangeToken);
            router.dismissTo("/profile");
        };

        const timer = setTimeout(async () => {
            completeAuth();
        }, 5000)
        return () => clearTimeout(timer);

    }, [exchangeToken, exchangeWithToken]);

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Image
                    source={require("../assets/images/splash-icon.png")}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <ActivityIndicator size="large" color={Theme.colors.primary} style={styles.loader}/>
                <Text style={styles.title}>Finalizing your sign in</Text>
                <Text style={styles.subtitle}>We&#39;re getting things ready for you...</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.colors.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: Theme.global.appPadding,
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 40,
    },
    loader: {
        marginBottom: 24,
    },
    title: {
        fontSize: Theme.sizes.xl,
        color: Theme.colors.primary,
        fontFamily: Theme.typographies.aboreto,
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: Theme.sizes.md,
        color: Theme.colors.secondary,
        textAlign: 'center',
        opacity: 0.8,
    }
});
