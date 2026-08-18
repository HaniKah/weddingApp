import {StyleSheet, Text, View} from 'react-native';
import {Image} from 'expo-image';
import {PlacesDto} from '@/types/open-api';
import {Link} from 'expo-router';
import {Theme} from '@/styles/Theme';
import IconCategory from '../symbols/IconCategory';
import AppPressable from '@/components/appComponents/AppPressable';
import LocationTag from "@/components/tags/LocationTag";
import PriceTag from "@/components/tags/PriceTag";
import FeaturesTag from "@/components/tags/FeaturesTag";


export default function PlaceItem({item}: { item: PlacesDto }) {
    return (
        <Link push asChild style={styles.wrapper} href={{
            pathname: '/listing/[id]',
            params: {id: item.id!},
        }}>
            <AppPressable>

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
                                   source={{uri: item.mainPhoto}}
                                   transition={200}
                                   placeholder={item.mainPhotoBlurhash}
                                   cachePolicy="memory-disk"
                                   contentFit="cover"/>
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

                        <LocationTag city={item.city} removeBackground textColor={Theme.colors.secondary}/>

                        <FeaturesTag features={item.features}/>

                        <View style={styles.priceAndCallContainer}>
                            <PriceTag maxPrice={item.maxPrice} minPrice={item.minPrice} priceType={item.priceType}
                                      countryCode={item.country}/>
                            {/*<AppButton buttonSize={ButtonSize.SM}*/}
                            {/*           onPress={() => Linking.openURL(`tel:${item.phoneNumber}`)}>*/}
                            {/*    Call now*/}
                            {/*</AppButton>*/}
                        </View>

                    </View>

                </View>
            </AppPressable>
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

    },
    infoContainer: {
        display: 'flex',
        alignItems: 'flex-start',
        padding: 15,
        gap: 5,
    },
    link: {
        marginBottom: 30,
    },
    imageContainer: {
        height: 200,
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
        boxShadow: Theme.shadow.lg,

    },
    image: {
        height: '100%',

    },
    imagePlaceHolder: {
        height: '100%',
        backgroundColor: Theme.colors.iconBackground,

    },
    iconWrapper: {
        margin: 'auto',
        opacity: 0.2,
    },
    name: {
        fontWeight: 'bold',
        fontSize: Theme.sizes.md,
    },


});