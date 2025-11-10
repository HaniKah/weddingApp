import {Image, StyleSheet, Text, View} from "react-native";
import {VendorPlaceDto} from "@/types/open-api";

export default function VendorPlaceItem(data: VendorPlaceDto) {
    return (
        <>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{uri: data.thumbnail}}/>
                </View>
                <Text>{data.name}</Text>
                <Text>{data.streetName}</Text>
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        padding: 20
    },
    imageContainer: {
        height: 50,
        width: 50,
    },
    image: {
        backgroundSize: "cover",
        height: "100%",
    },
})