import {FlatList, StyleSheet, Text, View} from "react-native";
import {Theme} from "@/constants/Theme";

import PlaceItem from "@/components/wizard/PlaceItem";
import {PlacesDto} from "@/types/open-api";


export function PickPlace({data}: { data: PlacesDto[] | undefined }) {

    return (
        <View>
            <FlatList style={styles.scrollContent} data={data} renderItem={PlaceItem} ListHeaderComponent={<>
                <Text style={styles.heading}>
                    Pick a Place
                </Text>
                <Text style={styles.question}>
                    WHERE SHOULD THE WEDDING TAKE A PLACE ?
                </Text></>}/>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollContent: {
        marginBottom: 55
    },

    heading: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: "bold",
        color: Theme.colors.primary,
        fontFamily: Theme.typography.meaCulpa
    },
    question: {
        color: Theme.colors.primary,
        padding: 20,
        textAlign: 'center',
        fontSize: 24,

    },
    buttonsWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 10

    }
})
