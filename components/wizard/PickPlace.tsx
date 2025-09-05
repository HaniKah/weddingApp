import {FlatList, Pressable, StyleSheet, Text, View} from "react-native";
import {Theme} from "@/constants/Theme";

import PlaceItem from "@/components/wizard/PlaceItem";
import {PlacesDto} from "@/types/open-api";
import {IconSymbol} from "@/components/ui/IconSymbol";


export function PickPlace({data, onNextStep, onPreviousStep}: {
    data: PlacesDto[] | undefined,
    onNextStep: () => void,
    onPreviousStep: () => void
}) {


    return (
        <View>
            <FlatList style={styles.scrollContent} data={data} renderItem={PlaceItem} ListHeaderComponent={<>

                <View style={styles.headingContainer}>
                    <Pressable onPress={onNextStep}>
                        <IconSymbol name="arrow.left" color={Theme.colors.primary} weight="thin"/>
                    </Pressable>
                    <Text style={styles.headingText}>
                        Pick a Place
                    </Text>
                    <Pressable onPress={onPreviousStep}>
                        <IconSymbol name="arrow.right" color={Theme.colors.primary} weight="thin"/>
                    </Pressable>
                </View>

                <Text style={styles.question}>
                    WHERE SHOULD THE WEDDING TAKE A PLACE ?
                </Text></>}/>
        </View>
    )

}

const styles = StyleSheet.create({

    scrollContent: {
        marginBottom: 55
    },
    headingContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 30,
    },
    headingText: {
        textAlign: 'center',
        fontSize: 40,
        fontWeight: "bold",
        color: Theme.colors.primary,
        fontFamily: Theme.typography.meaCulpa,
        paddingVertical: 10,
    },
    question: {
        color: Theme.colors.primary,
        paddingVertical: 20,
        paddingHorizontal: 50,
        textAlign: 'center',
        fontSize: 20,
        fontFamily: Theme.typography.aboreto,

    },
    buttonsWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 10

    }
})
