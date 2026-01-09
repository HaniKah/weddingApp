import {StyleSheet, Text, View} from "react-native";
import {IconSymbol} from "@/components/symbols/IconSymbol";
import {Theme} from "@/styles/Theme";


export default function PlaceInfo({iconName, info}: { iconName: any, info: string | undefined }) {
    return (
        <>
            <View style={styles.infoContainer}>
                <IconSymbol name={iconName} color={Theme.colors.black} size={30}
                            weight={'thin'}/>
                <Text style={styles.info}>{info}</Text>
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    infoContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        gap: 10,
    },
    info: {
        paddingHorizontal: 10,
        fontSize: 18,
        flexShrink: 1
    },
})