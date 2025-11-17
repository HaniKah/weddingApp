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
            <ActivityIndicator size={"large"}/>
        )
    } else return (
        <View style={[styles.container, withPadding && {padding: Theme.spaces.appPadding}, extraStyles]}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})