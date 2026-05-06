import {Image, Linking, StyleSheet, Text, View} from 'react-native';
import {PlacesDto} from '@/types/open-api';
import {Link} from 'expo-router';
import {Theme} from '@/styles/Theme';
import AppButton from '@/components/appComponents/AppButton';
import {ButtonSize} from '@/styles/Button';
import {COUNTRIES} from "@/constants/countries";
import {IconSymbol} from "@/components/symbols/IconSymbol";
import IconCategory from "../symbols/IconCategory";


export default function PlaceItem({item}: { item: PlacesDto }) {

    return (
        <Link push style={styles.wrapper} href={{
            pathname: "/listing/[id]",
            params: {id: item.id!,},
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
                    {item.mainPhoto ?
                        <Image style={styles.image}
                               source={{uri: item.mainPhoto}}/>
                        :
                        <View style={styles.imagePlaceHolder}>
                            <View style={styles.iconWrapper}>
                                <IconCategory size={100} color={Theme.colors.secondary} category={item.category}/>
                            </View>
                        </View>
                    }

                </View>


                <View style={styles.infoContainer}>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>
                        {item.name}
                    </Text>
                    <View style={styles.countryContainer}>
                        <IconSymbol name="location" size={14} color={Theme.colors.secondary}/>
                        <Text style={styles.countryText}>
                            {item.city}
                        </Text>
                    </View>

                    <View style={styles.priceAndCallContainer}>
                        <View style={styles.priceContainer}>
                            {item.minPrice === item.maxPrice ?

                                <Text style={styles.price}>{item.minPrice}</Text> :

                                <Text style={styles.price}>{item.minPrice} - {item.maxPrice}</Text>
                            }
                            <Text
                                style={styles.currency}>{COUNTRIES.get(item.country)?.currency} / {item.priceType}</Text>
                        </View>
                        <AppButton buttonSize={ButtonSize.SM}
                                   onPress={() => Linking.openURL(`tel:${item.phoneNumber}`)}>
                            Call now
                        </AppButton>
                    </View>

                </View>

            </View>
        </Link>

    );

}
const styles = StyleSheet.create({
    countryContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        marginTop: 5,

    },
    countryText: {
        fontSize: Theme.sizes.xs,
        color: Theme.colors.secondary,
    },
    priceAndCallContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    infoContainer: {
        display: 'flex',
        alignItems: 'flex-start',
        padding: 15,
    },
    link: {
        marginBottom: 30,
    },
    imageContainer: {
        height: 180,
        overflow: 'hidden',
        position: 'relative',
    },
    label: {
        position: 'absolute',
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
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.7,
        shadowRadius: 8,

        // Android shadow
        elevation: 8,

    },
    labelText: {
        color: Theme.colors.white,
        fontWeight: 'bold',
    },
    wrapper: {
        paddingHorizontal: Theme.global.appPadding,
        paddingBottom: Theme.global.appPadding,
        width: '100%',
    },
    container: {
        width: '100%',
        borderRadius: Theme.radius.xl,
        backgroundColor: Theme.colors.white,
        overflow: 'hidden',
        boxShadow: Theme.effects.boxShadow,

    },
    image: {
        resizeMode: 'cover',
        height: '100%',

    },
    imagePlaceHolder: {
        height: '100%',
        backgroundColor: Theme.colors.iconBackground,

    },
    iconWrapper: {
        margin: "auto",
        opacity: 0.2
    },
    name: {
        fontWeight: 'bold',
        fontSize: Theme.sizes.md,
        width: 220,


    },
    currency: {
        fontWeight: 'normal',
        color: Theme.colors.secondary,
        fontSize: Theme.sizes.xs,

    },
    priceContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        flex: 1,
    },
    price: {
        fontWeight: 'bold',
        fontSize: Theme.sizes.md,
        color: Theme.colors.primary,
    },

});