import {Categories} from "@/types/open-api";
import {StyleSheet, Text, View} from "react-native";
import IconCategory from "./symbols/IconCategory";
import {Theme} from "@/styles/Theme";

export default function CategoryTag({category}: { category: Categories }) {
    return (
        <View style={styles.container}>
            <IconCategory width={14} height={14} fill={Theme.colors.primary} category={category}/>
            <Text style={styles.text}>
                {category}
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
        marginVertical: 5
    },
    text: {
        fontSize: Theme.sizes.xs,
        color: Theme.colors.primary,
    }
})