import {StyleSheet, Text, View} from 'react-native';
import {Image} from 'expo-image';
import {Theme} from '@/styles/Theme';
import {IconSymbol} from '@/components/symbols/IconSymbol';
import {Link} from 'expo-router';
import CategoryTag from '@/components/CategoryTag';
import {FavoritePlaceDto} from '@/types/open-api';
import IconCategory from '@/components/symbols/IconCategory';
import PriceTag from '@/components/PriceTag';

type FavoriteItemProps = {
    data: FavoritePlaceDto;
}

export default function FavoriteItem({data}: FavoriteItemProps) {

    return (
        <Link href={`/listing/${data.id}`}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    {data.thumbnail ?
                        <Image style={styles.image} source={{uri: data.thumbnail}} transition={200}
                               placeholder={data.thumbnailBlurhash}
                               cachePolicy="memory-disk"
                               contentFit="cover"/> :
                        <View style={styles.placeHolderWrapper}>
                            <View style={styles.placeHolderContainer}>
                                <IconCategory category={data.category} size={50} color={Theme.colors.secondary}/>
                            </View>
                        </View>
                    }
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.placeName}>{data.name}</Text>
                    <CategoryTag category={data.category}/>
                    <PriceTag minPrice={data.minPrice} maxPrice={data.maxPrice} priceType={data.priceType}
                              countryCode={data.country}/>
                </View>
                <IconSymbol name="chevron.right" size={20} color={Theme.colors.border}/>
            </View>
        </Link>
    );
}

const styles = StyleSheet.create({
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
        position: 'relative',
        borderWidth: 1,
        borderColor: Theme.colors.border,
        marginBottom: 10,
    },
    imageContainer: {
        height: 95,
        width: 95,
        borderRadius: Theme.radius.xs,
        overflow: 'hidden',
    },
    image: {
        height: '100%',
    },
    placeHolderWrapper: {
        backgroundColor: Theme.colors.iconBackground,
        height: '100%',
    },
    placeHolderContainer: {
        opacity: 0.3,
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoContainer: {
        display: 'flex',
        gap: 10,
        flex: 1,
        paddingVertical: 8,
    },
    placeName: {
        fontWeight: 'bold',
        fontSize: Theme.sizes.md,
    },
    priceText: {
        color: Theme.colors.primary,
        fontWeight: 'bold',
    },
    currency: {
        color: Theme.colors.secondary,
    },
    priceContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
});
