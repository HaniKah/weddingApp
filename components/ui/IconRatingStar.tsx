import {StyleSheet, Text, View} from "react-native";
import {Theme} from "@/styles/Theme";
import {IconSymbol} from "@/components/ui/IconSymbol";

export default function IconRatingStar({rating}: { rating: number | null | undefined }) {

    return (
        <>
            <View style={styles.container}>
                <IconSymbol name="star.fill" color={Theme.colors.gold1} size={20} weight={'bold'}/>
                {rating ? <Text>{rating}</Text> : <Text>-</Text>}
            </View>

        </>
    )
}
const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 5
    },

})