import {Edges, SafeAreaView} from "react-native-safe-area-context";
import {ReactNode} from "react";
import {StyleSheet} from "react-native";
import {Theme} from "@/styles/Theme";

export default function AppSafeAreaView({edges = ['top'], children, transparentBackground}: {
    edges?: Edges,
    children: ReactNode,
    transparentBackground?: boolean

}) {
    return (
        <>
            <SafeAreaView edges={edges}
                          style={[styles.container, {backgroundColor: transparentBackground ? "transparen" : Theme.colors.background}]}>
                {children}
            </SafeAreaView>
        </>
    )
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
