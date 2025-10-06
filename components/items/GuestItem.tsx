import {Pressable, StyleSheet, Text} from "react-native";
import {Theme} from "@/styles/Theme";
import {CoupleSide, GuestsDto} from "@/types/open-api";

export default function GuestItem({item, onPress}: { item: GuestsDto, onPress: (g: GuestsDto) => void }) {
    return (
        <>
            <Pressable onPress={() => onPress(item)}
                       style={[styles.container, item?.coupleSide === CoupleSide.Bride ? styles.bride : styles.groom]}>
                <Text style={styles.text}>{item?.name}</Text>
            </Pressable>
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