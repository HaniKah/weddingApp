import {StyleSheet, Text, View} from "react-native";
import {Theme} from "@/styles/Theme";
import {CoupleSide, GuestsDto} from "@/types/open-api";

export default function GuestItem({item}: { item: GuestsDto }) {
    return (
        <>
            <View style={[styles.container, item.coupleSide === CoupleSide.Bride ? styles.bride : styles.groom]}>
                <Text style={styles.text}>{item.name}</Text>
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        padding: 20
    },
    groom: {
        backgroundColor: Theme.colors.background,
        borderBottomWidth: 2,
        borderBottomColor: Theme.colors.iconBackground,
    },
    bride: {
        backgroundColor: Theme.colors.iconBackground,
        borderBottomWidth: 2,
        borderBottomColor: Theme.colors.background,
    },
    text: {
        fontSize: 20,
        color: Theme.colors.primary,
        fontWeight: "bold",
    }
})