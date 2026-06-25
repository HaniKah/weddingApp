import {ActivityIndicator, StyleSheet, Text, View} from "react-native";
import {Theme} from "@/styles/Theme";

export default function CompleteOAuthScreen() {

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Finalizing your sign in</Text>
                <Text style={styles.subtitle}>We&#39;re getting things ready for you...</Text>
                <ActivityIndicator size="large" color={Theme.colors.primary} style={styles.loader}/>
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
  
    loader: {
        marginTop: 24,
    },
    title: {
        fontSize: Theme.sizes.xl,
        color: Theme.colors.primary,
        fontWeight: "bold",
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
