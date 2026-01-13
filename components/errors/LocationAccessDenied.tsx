import {StyleSheet, Text, View} from "react-native";

export default function LocationAccessDenied({errorMsg}: { errorMsg: string | null }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Location access denied</Text>
            <Text style={styles.msg}>{errorMsg}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        padding: 24,
        marginVertical: "auto"
    },
    title: {
        fontSize: 18,
        textAlign: "center",
        fontWeight: "bold"
    },
    msg: {
        textAlign: "center",
        marginVertical: 20
    },
    button: {}
})