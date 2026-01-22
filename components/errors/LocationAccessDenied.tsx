import {StyleSheet, Text, View} from "react-native";
import {ErrorMsg} from "@/types/general";

export default function LocationAccessDenied({errorMsg}: { errorMsg: ErrorMsg | null }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{errorMsg?.title}</Text>
            <Text style={styles.msg}>{errorMsg?.msg}</Text>
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