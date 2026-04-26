import {StyleSheet, Text, View} from "react-native";
import {Theme} from "@/styles/Theme";
import {IconSymbol} from "@/components/symbols/IconSymbol";

export default function LocationTag({location}: { location: string | undefined }) {
    return (
        <View style={styles.container}>
            <IconSymbol name="location" size={14} color={Theme.colors.primary}/>
            <Text style={styles.text}>
                {location}
            </Text>
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: Theme.colors.iconBackground,
        alignSelf: "flex-start",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: Theme.radius.full,

    },
    text: {
        fontSize: Theme.sizes.xs,
        color: Theme.colors.primary,
    }
})