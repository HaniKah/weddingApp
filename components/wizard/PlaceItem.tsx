import {Image, StyleSheet, Text, View} from "react-native";
import {PlacesDto} from "@/components/wizard/Wizard";


export default function PlaceItem({item}: { item: PlacesDto }) {

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{uri: 'https://reactnative.dev/docs/assets/p_cat2.png'}}>
            </Image>
            <View>
                <Text>
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
        padding: 4,
        height: 40,
        display: "flex",
        gap: 4
    },
    image: {
        width: 40,
        height: 40,
    }
})