import {Image, StyleSheet, Text, View} from "react-native";
import {PlacesDto} from "@/types/open-api";
import {Link} from "expo-router";
import {Theme} from "@/styles/Theme";


export default function PlaceItem({item}: { item: PlacesDto }) {

    return (
        <Link push style={styles.link} href={{
            pathname: '/[step]/[id]',
            params: {id: item.id!, step: item.step}
        }}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image}
                           source={{uri: item.mainPhoto}}/>
                </View>
                <View style={styles.infoContainer}>
                    <View>
                        <Text style={styles.name}>
                            {item.name}
                        </Text>
                        <Text>
                            {item.formattedAddress}
                        </Text>
                    </View>
                    <View>
                        {item.minPrice === item.maxPrice ?

                            <Text style={styles.price}>{item.minPrice}
                                <Text style={styles.currency}>{item.currency}</Text>
                            </Text> :

                            <Text style={styles.price}>{item.minPrice} - {item.maxPrice}
                                <Text style={styles.currency}>{item.currency}</Text>
                            </Text>
                        }
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
    },
    link: {
        marginBottom: 10
    },
    imageContainer: {
        height: 170,
        borderRadius: 10,
        overflow: "hidden",
    },
    container: {
        width: "100%",


        gap: 10,

        borderRadius: 10,
    },
    image: {
        backgroundSize: "cover",
        height: "100%",

    },
    name: {
        fontWeight: "bold",
        fontSize: Theme.sizes.lg,
    },
    currency: {
        color: Theme.colors.gray.S500,

    },
    price: {
        fontWeight: "bold",
        fontSize: Theme.sizes.md,
    }
})