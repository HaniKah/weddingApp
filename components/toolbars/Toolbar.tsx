import {StyleSheet, View, ViewProps} from "react-native";

export default function Toolbar(props: ViewProps) {
    return (
        <View style={styles.container}>
            {props.children}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        padding: 10,
        display: 'flex',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 10

    },
})