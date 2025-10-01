import {StyleSheet, Text, View} from "react-native";
import {IconSymbol} from "@/components/symbols/IconSymbol";
import {Theme} from "@/styles/Theme";
import {Link} from "expo-router";
import {ChecklistDto} from "@/types/open-api";

export default function CheckItem({item}: { item: ChecklistDto }) {
    function Item() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.container}>
                    {
                        item.isCompleted ?
                            <IconSymbol style={styles.symbol} size={35} color={Theme.colors.green["100"]}
                                        name="checkmark.circle.fill"/> :
                            <IconSymbol style={styles.symbol} size={35} name="circle" color={Theme.colors.primary}/>
                    }

                    <View style={styles.textContainer}>
                        <Text style={[styles.step, item.isCompleted && styles.isCompleted]}>{item.step}</Text>
                        {item.isCompleted && <Text style={[styles.place, styles.isCompleted]}>{item.placeName}</Text>}
                    </View>
                </View>
                <Text style={[styles.place, styles.isCompleted]}>
                    {item.cost}
                </Text>
            </View>

        )
    }

    return (
        <>
            {item.placeId &&
                <Link dangerouslySingular href={{pathname: "/[step]/[id]", params: {step: item.step, id: item.placeId}}}
                      style={styles.link}>
                    <Item/>
                </Link>}

            {!item.placeId &&
                <Link style={styles.link} dismissTo href={{pathname: "/[step]", params: {step: item.step}}}>
                    <Item/>
                </Link>}

        </>

    )
}
const styles = StyleSheet.create({
    link: {
        width: "100%",
    },

    wrapper: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
    },

    container: {
        flex: 1,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",

    },

    symbol: {
        marginRight: 8,
    },

    textContainer: {
        display: "flex",
        justifyContent: "center",
        borderBottomWidth: 1,
        borderColor: Theme.colors.iconBackground,
        width: "100%",
        paddingVertical: 10,
        paddingHorizontal: 10,
        height: 75
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