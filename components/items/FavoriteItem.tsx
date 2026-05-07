import { Image, StyleSheet, Text, View } from 'react-native';
import { Theme } from '@/styles/Theme';
import { IconSymbol } from '@/components/symbols/IconSymbol';
import { COUNTRIES } from '@/constants/countries';
import { Link } from 'expo-router';
import CategoryTag from '@/components/CategoryTag';

type FavoriteItemProps = {
  data: PlaceDetailsDto;
}

export default function FavoriteItem({ data }: FavoriteItemProps) {

  return (
    <Link href={`/listing/${data.id}`}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: data.mainPhoto }} />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.placeName}>{data.name}</Text>
          <CategoryTag category={data.category} />
          <View style={styles.priceContainer}>
            {data.minPrice === data.maxPrice ?
              <Text style={styles.priceText}>{data.minPrice}</Text> :
              <Text style={styles.priceText}>{data.minPrice} - {data.maxPrice}</Text>
            }
            <Text style={styles.currency}>  {COUNTRIES.get(data.countryCode)?.currency}</Text>
          </View>
        </View>
        <IconSymbol name="chevron.right" size={20} color={Theme.colors.border} />
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
    resizeMode: 'cover',
    height: '100%',
  },
  infoContainer: {
    display: 'flex',
    gap: 5,
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
