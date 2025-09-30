import {StyleSheet, Text, View} from "react-native";
import {IconSymbol} from "@/components/symbols/IconSymbol";
import {Theme} from "@/styles/Theme";
import {Link} from "expo-router";
import {WeddingSteps} from "@/types/open-api";

export default function CheckItem({isCompleted, placeId, step, placeName}: {
    isCompleted: boolean,
    placeId: number | null,
    step: WeddingSteps,
    placeName: string | null
}) {
    const pathName = isCompleted ? "/[id]" : "/"
    const pathParams = placeId ? {id: placeId} : {id: 1}
    return (
        <Link style={styles.link} href={{pathname: pathName, params: pathParams}}>
            <View style={styles.container}>
                {
                    isCompleted ?
                        <IconSymbol style={styles.symbol} size={35} color={Theme.colors.green["100"]}
                                    name="checkmark.circle.fill"/> :
                        <IconSymbol style={styles.symbol} size={35} name="circle" color={Theme.colors.primary}/>
                }

                <View style={styles.textContainer}>
                    <Text style={[styles.step, isCompleted && styles.isCompleted]}>Host</Text>
                    {isCompleted && <Text style={[styles.place, styles.isCompleted]}>{placeName}</Text>}
                </View>
            </View>
        </Link>
    )
}
const styles = StyleSheet.create({
    link: {
        width: "100%",
    },

    container: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

    symbol: {
        marginRight: 10,
    },

    textContainer: {
        borderBottomWidth: 1,
        borderColor: Theme.colors.iconBackground,
        width: "100%",
        paddingVertical: 15,
    },

    step: {
        fontWeight: "bold",
        fontSize: 18,
        color: Theme.colors.primary,
    },

    place: {
        fontSize: 16,
        color: Theme.colors.primary,
    },

    isCompleted: {
        color: Theme.colors.green["100"],
    }
})