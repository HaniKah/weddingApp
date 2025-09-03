import {Image, StyleSheet, Text, View} from "react-native";
import {PlacesDto} from "@/types/open-api";


export default function PlaceItem({item}: { item: PlacesDto }) {

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{uri: 'https://reactnative.dev/docs/assets/p_cat2.png'}}/>
            <View>
                <Text style={styles.name}>
                    {item.name}
                </Text>
                <Text>
                    {item.formatted_address}
                </Text>
            </View>
        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        padding: 15,
        display: "flex",
        flexDirection: "row",
        gap: 10,
        marginBottom: 10,
        backgroundColor: "white",
        borderRadius: 10,
    },
    image: {
        width: 40,
        height: 40,
    },
    name: {
        fontWeight: "bold"
    }
})