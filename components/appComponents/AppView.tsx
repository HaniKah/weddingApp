import {ActivityIndicator, StyleProp, StyleSheet, View, ViewStyle} from "react-native";
import {Theme} from "@/styles/Theme";

export default function AppView({isLoading, withPadding, children, extraStyles}: {
    isLoading?: boolean,
    withPadding?: boolean,
    children: React.ReactNode,
    extraStyles?: StyleProp<ViewStyle>
}) {
    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator style={styles.loadingIndicator} size={"large"}/>
            </View>
        )
    } else return (
        <View style={[styles.container, withPadding && styles.withPadding, extraStyles]}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingIndicator: {
        marginVertical: "auto",
    },
    withPadding: {
        padding: Theme.global.appPadding,
    },
})