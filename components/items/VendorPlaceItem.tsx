import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {VendorPlaceDto} from '@/types/open-api';
import {Theme} from '@/styles/Theme';
import {Dispatch, SetStateAction} from "react";

type VendorPlaceItemProps = {
    data: VendorPlaceDto;
    setTrigger: Dispatch<SetStateAction<boolean>>;
    onPress: (place: VendorPlaceDto) => void;
}

export default function VendorPlaceItem({data, setTrigger, onPress}: VendorPlaceItemProps) {

    return (
        <>
            <Pressable onPress={() => onPress(data)}>
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={{uri: data.thumbnail}}/>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.placeName}>{data.name}</Text>
                        <Text>{data.streetName}</Text>
                        <View style={styles.priceContainer}>
                            {data.minPrice === data.maxPrice ?
                                <Text>{data.minPrice}</Text> :
                                <Text>{data.minPrice} - {data.maxPrice}
                                </Text>
                            }
                            <Text style={styles.currency}>  {data.currency}</Text>
                        </View>
                    </View>
                </View>
            </Pressable>
        </>
    );
}
const styles = StyleSheet.create({
    publishBtn: {},
    publishText: {},

    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
        borderRadius: Theme.radius.md,
        backgroundColor: Theme.colors.white,
        overflow: 'hidden',
        padding: 10,

    },
    containerUncompleted: {
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: Theme.colors.gray.S300
    },
    imageContainer: {
        height: 75,
        width: 75,
    },
    image: {
        borderRadius: Theme.radius.xs,
        backgroundSize: 'cover',
        height: '100%',
    },
    infoContainer: {
        flex: 1,
    },
    placeName: {
        fontWeight: 'bold',
        fontSize: Theme.sizes.md
    },
    currency: {
        color: Theme.colors.gray.S500,

    },
    priceContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    }
});