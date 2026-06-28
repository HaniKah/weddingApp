import {Edges, SafeAreaView} from "react-native-safe-area-context";
import {ReactNode} from "react";
import {StyleProp, StyleSheet, ViewStyle} from "react-native";
import {Theme} from "@/styles/Theme";

export default function AppSafeAreaView({edges = ["top", "bottom"], children, style}: {
    edges?: Edges,
    children: ReactNode,
    style?: StyleProp<ViewStyle>

}) {
    return (
        <>
            <SafeAreaView edges={edges}
                          style={[styles.container, style]}>
                {children}
            </SafeAreaView>
        </>
    )
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.colors.background
    },
});
