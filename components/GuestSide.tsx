import {CoupleSide} from "@/types/open-api";
import {StyleSheet, Text, View} from "react-native";
import {Theme} from "@/styles/Theme";

export default function GuestSide({side}: { side: CoupleSide }) {
    return (
        <>
            <View style={[styles.container, side === CoupleSide.Bride ? styles.bride : styles.groom]}>
                <Text style={styles.text}>{side}&#39;s guests</Text>
            </View>
        </>
    )
}
const styles = StyleSheet.create({

    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        paddingHorizontal: 10,
        paddingBottom: 40,
        paddingTop: 80,
    },
    groom: {
        flex: 1,
        backgroundColor: Theme.colors.background,
        // borderBottomWidth: 2,
        // borderBottomColor: Theme.colors.iconBackground,
    },
    bride: {
        flex: 1,
        backgroundColor: Theme.colors.iconBackground,
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        color: Theme.colors.primary,

    }
})