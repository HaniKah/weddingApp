import { Image, StyleSheet, Text, View } from 'react-native';
import { VendorPlaceDto } from '@/types/open-api';
import { Theme } from '@/styles/Theme';
import { Dispatch, SetStateAction } from "react";
import AppIf from "@/components/appComponents/AppIf";
import { IconSymbol } from "@/components/symbols/IconSymbol";
import AppPressable from "@/components/appComponents/AppPressable";

type VendorPlaceItemProps = {
    data: VendorPlaceDto;
    setTrigger: Dispatch<SetStateAction<boolean>>;
    onPress: (place: VendorPlaceDto) => void;
}

export default function VendorPlaceItem({ data, setTrigger, onPress }: VendorPlaceItemProps) {

    return (
        <>
            <AppPressable onPress={() => onPress(data)}>
                <View style={[styles.container, !data.isCompleted && styles.containerUncompleted]}>
                    {
                        data.isPromoted &&
                        <View testID="promotionDot" style={styles.promotionDot}></View>
                    }

                    <View style={[styles.imageContainer, !data.isCompleted && styles.imagesContainerUncompleted]}>
                        <AppIf value={data.isCompleted}>
                            <Image style={styles.image} source={{ uri: data.thumbnail }} />
                        </AppIf>
                        <AppIf value={!data.isCompleted}>
                            <IconSymbol color={Theme.colors.gray.S400} size={40} weight="thin" name="plus" />
                        </AppIf>
                    </View>

                    <View style={styles.infoContainer}>
                        <Text
                            style={[styles.placeName, !data.name && styles.placeNameUncompleted]}>{data.name || "add place name"}</Text>
                        <Text>{data.streetName}</Text>
                        <View style={styles.priceContainer}>
                            {data.minPrice === data.maxPrice ?
                                <Text>{data.minPrice}</Text> :
                                <Text>{data.minPrice} - {data.maxPrice}
                                </Text>
                            }
                            {!data.minPrice && <Text style={styles.priceUncompleted}>add your price</Text>}
                            <Text style={styles.currency}>  {data.currency}</Text>
                        </View>
                    </View>
                </View>
            </AppPressable>
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
        position: "relative",

    },
    containerUncompleted: {
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: Theme.colors.gray.S300
    },
    imageContainer: {
        height: 75,
        width: 75,
        borderRadius: Theme.radius.xs,
        overflow: 'hidden',
    },
    imagesContainerUncompleted: {
        backgroundColor: Theme.colors.gray.S200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
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
    placeNameUncompleted: {
        color: Theme.colors.gray.S400
    },
    currency: {
        color: Theme.colors.gray.S500,

    },
    priceContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    priceUncompleted: {
        color: Theme.colors.gray.S400,
    },
    promotionDot: {
        backgroundColor: Theme.colors.blue.S500,
        height: 10,
        width: 10,
        position: "absolute",
        top: 10,
        right: 10,
        borderRadius: Theme.radius.full
    }

});