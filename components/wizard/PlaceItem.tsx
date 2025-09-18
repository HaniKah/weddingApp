import {Image, StyleSheet, Text, View} from "react-native";
import {PlacesDto} from "@/types/open-api";
import {Link} from "expo-router";


export default function PlaceItem({item}: { item: PlacesDto }) {


    return (
        <Link style={styles.link} href={{
            pathname: '/[id]',
            params: {id: item.id!}
        }}>
            <View style={styles.container}>
                <Image style={styles.image} source={{uri: 'https://reactnative.dev/docs/assets/p_cat2.png'}}/>
                <View>
                    <Text style={styles.name}>
                        {item.name}
                    </Text>
                    <Text>
                        {item.formattedAddress}
                    </Text>
                </View>
            </View>
        </Link>

    )

}
const styles = StyleSheet.create({
    link: {
        marginBottom: 10
    },
    container: {
        width: "100%",
        padding: 15,
        display: "flex",
        flexDirection: "row",
        gap: 10,
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