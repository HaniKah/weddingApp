import {StyleSheet, Text, View} from "react-native";
import {IconSymbol} from "@/components/symbols/IconSymbol";
import {Theme} from "@/styles/Theme";
import {Link} from "expo-router";
import {ChecklistDto} from "@/types/open-api";

export default function CheckItem({item, firstItem, lastItem}: {
    item: ChecklistDto,
    firstItem: boolean,
    lastItem: boolean,
}) {
    function Item() {
        return (
            <View style={styles.container}>
                <View style={styles.symbolContainer}>

                    <View style={[styles.connectingLines, firstItem && styles.connectingLinesEdges]}></View>

                    {
                        item.isCompleted ?
                            <IconSymbol size={30} color={Theme.colors.green.S700}
                                        name="checkmark.circle.fill"/> :
                            <IconSymbol size={30} name="circle" color={Theme.colors.primary}/>
                    }

                    <View style={[styles.connectingLines, lastItem && styles.connectingLinesEdges]}></View>
                </View>


                <View style={styles.textContainer}>
                    <View>
                        <Text style={[styles.step, item.isCompleted && styles.isCompleted]}>{item.step}</Text>
                        {item.isCompleted &&
                            <Text style={[styles.place, styles.isCompleted]}>{item.placeName}</Text>}
                    </View>

                    <Text style={[styles.place, styles.isCompleted]}>
                        {item.cost}
                    </Text>
                </View>
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

    container: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10
    },

    symbolContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    connectingLines: {
        width: 1,
        borderWidth: 1,
        borderColor: Theme.colors.iconBackground,
        height: 23,

    },
    connectingLinesEdges: {
        borderWidth: 0
    },

    textContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        flex: 1,
        borderBottomWidth: 1,
        borderColor: Theme.colors.iconBackground,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        height: 76,

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
        color: Theme.colors.green.S700,
    }
})