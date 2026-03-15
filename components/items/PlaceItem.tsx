import { Image, StyleSheet, Text, View } from "react-native";
import { PlacesDto } from "@/types/open-api";
import { Link } from "expo-router";
import { Theme } from "@/styles/Theme";


export default function PlaceItem({ item }: { item: PlacesDto }) {

    return (
        <Link push style={styles.link} href={{
            pathname: '/[step]/[id]',
            params: { id: item.id!, step: item.step }
        }}>
            <View style={styles.container}>

                <View style={styles.imageContainer}>
                    {
                        item.isPromoted &&
                        <View style={styles.label}>
                            <Text style={styles.labelText}>
                                {item.label}
                            </Text>
                        </View>
                    }
                    <Image style={styles.image}
                        source={{ uri: item.mainPhoto }} />
                </View>
                <View style={styles.infoContainer}>
                    <View>
                        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>
                            {item.name}
                        </Text>
                        {/*<Text>*/}
                        {/*    {item.formattedAddress} this is the address*/}
                        {/*</Text>*/}
                    </View>
                    <View style={styles.priceContainer}>
                        {item.minPrice === item.maxPrice ?

                            <Text style={styles.price}>{item.minPrice}</Text> :

                            <Text style={styles.price}>{item.minPrice} - {item.maxPrice}</Text>
                        }
                        <Text style={styles.currency}>{item.currency}</Text>
                    </View>
                </View>

            </View>
        </Link>

    )

}
const styles = StyleSheet.create({
    infoContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 5
    },
    link: {
        marginBottom: 30
    },
    imageContainer: {
        height: 220,
        borderRadius: 10,
        overflow: "hidden",
        position: "relative"
    },
    label: {
        position: "absolute",
        top: 10,
        left: 10,
        backgroundColor: Theme.colors.red.S500,
        color: Theme.colors.white,
        paddingHorizontal: 15,
        paddingVertical: 7,
        borderRadius: Theme.radius.full,
        zIndex: 1,
        // iOS shadow
        shadowColor: 'white',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.7,
        shadowRadius: 8,

        // Android shadow
        elevation: 8,

    },
    labelText: {
        color: Theme.colors.white,
        fontWeight: "bold"
    },
    container: {
        width: "100%",
        gap: 10,
        borderRadius: 10,
    },
    image: {
        resizeMode: "cover",
        height: "100%",

    },
    name: {
        fontWeight: "bold",
        fontSize: Theme.sizes.md,
        width: 220,


    },
    currency: {
        fontWeight: "normal",
        color: Theme.colors.gray.S500,
        fontSize: Theme.sizes.xs

    },
    priceContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        gap: 5
    },
    price: {
        fontWeight: "bold",
        fontSize: Theme.sizes.sm,
    },

})