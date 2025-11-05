import {Image, StyleSheet, Text, View} from "react-native";
import {VendorPlaceDto} from "@/types/open-api";

export default function VendorPlaceItem(data: VendorPlaceDto) {
    return (
        <>
            <View>
                <Image style={styles.image} source={{uri: data.thumbnail}}/>
                <Text>{data.name}</Text>
                <Text>{data.streetName}</Text>
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    image: {
        width: 300,
        height: 150,

    },
})