import {Image, StyleSheet, Text, View} from 'react-native';
import {VendorPlaceDto} from '@/types/open-api';
import {Theme} from '@/styles/Theme';
import {Dispatch, SetStateAction} from "react";
import AppIf from "@/components/appComponents/AppIf";
import {IconSymbol} from "@/components/symbols/IconSymbol";
import {COUNTRIES} from "@/constants/countries";
import {Link} from "expo-router";
import CategoryTag from "@/components/CategoryTag";
import AppPressable from "@/components/appComponents/AppPressable";

type VendorPlaceItemProps = {
    data: VendorPlaceDto;
    setTrigger: Dispatch<SetStateAction<boolean>>;
}

export default function VendorPlaceItem({data, setTrigger}: VendorPlaceItemProps) {

    return (
        <>
            <Link asChild href={`/profile/listing/${data.id}`}>
                <AppPressable>
                    <View style={[styles.container]}>
                        <View style={[styles.imageContainer]}>
                            <AppIf value={data.thumbnail}>
                                <Image style={styles.image} source={{uri: data.thumbnail}}/>
                            </AppIf>
                            <AppIf value={!data.thumbnail}>
                                <View style={styles.imagePlaceholder}>
                                    <IconSymbol size={30} color={Theme.colors.textDisabled} name="plus"/>
                                </View>
                            </AppIf>
                        </View>

                        <View style={styles.infoContainer}>
                            <Text
                                style={styles.placeName}>{data.name}
                            </Text>
                            <CategoryTag category={data.category}/>
                            <View style={styles.priceContainer}>
                                {data.minPrice === data.maxPrice ?
                                    <Text style={styles.priceText}>{data.minPrice}</Text> :
                                    <Text style={styles.priceText}>{data.minPrice} - {data.maxPrice}
                                    </Text>
                                }
                                <Text style={styles.currency}>  {COUNTRIES.get(data.country)?.currency}</Text>
                            </View>
                        </View>
                        <IconSymbol name="chevron.right" size={20} color={Theme.colors.border}/>
                    </View>
                </AppPressable>
            </Link>
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
        padding: 5,
        position: "relative",
        boxShadow: Theme.effects.boxShadow,
        marginTop: 10
    },
    // containerUncompleted: {
    //     backgroundColor: "transparent",
    //     borderWidth: 2,
    //     borderColor: Theme.colors.gray.S300
    // },
    imageContainer: {
        height: 95,
        width: 95,
        borderRadius: Theme.radius.xs,
        overflow: 'hidden',
    },

    image: {
        resizeMode: 'cover',
        height: '100%',
    },
    imagePlaceholder: {
        backgroundColor: Theme.colors.iconBackground,
        height: '100%',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    infoContainer: {
        display: "flex",
        gap: 5,
        flex: 1,
        paddingVertical: 8
    },
    placeName: {
        fontWeight: 'bold',
        fontSize: Theme.sizes.md
    },
    // placeNameUncompleted: {
    //     color: Theme.colors.gray.S400
    // },
    priceText: {
        color: Theme.colors.primary,
        fontWeight: 'bold',
    },
    currency: {
        color: Theme.colors.secondary,

    },
    priceContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
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