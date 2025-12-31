import {Edges, SafeAreaView} from "react-native-safe-area-context";
import {StyleProp} from "react-native/Libraries/StyleSheet/StyleSheet";
import {ViewStyle} from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import {ReactNode} from "react";
import {StyleSheet} from "react-native";
import {Theme} from "@/styles/Theme";

export default function AppSafeAreaView({edges = ['top'], extraStyles, children}: {
    edges?: Edges,
    extraStyles?: StyleProp<ViewStyle>,
    children: ReactNode
}) {
    return (
        <>
            <SafeAreaView edges={edges} style={extraStyles ? extraStyles : styles.container}>
                {children}
            </SafeAreaView>
        </>
    )
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.colors.background,
    },
});
