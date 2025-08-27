import {FlatList, StyleSheet, Text, View} from "react-native";
import {Theme} from "@/constants/Theme";
import {PlacesDto} from "@/components/wizard/Wizard";
import PlaceItem from "@/components/wizard/PlaceItem";


export default function PickPlace({data}: { data: PlacesDto[] | null }) {

    return (
        <View>
            <Text style={styles.heading}>
                Pick a Place
            </Text>
            <Text style={styles.question}>
                WHERE SHOULD THE WEDDING TAKE A PLACE ?
            </Text>
            <FlatList data={data} renderItem={PlaceItem}/>
        </View>
    )

}
const styles = StyleSheet.create({

    heading: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: Theme.colors.primary,
        fontFamily: Theme.typography.meaCulpa
    },
    question: {
        color: Theme.colors.primary,
        marginTop: 20,
        textAlign: 'center',
        fontSize: 24,
    }
})
