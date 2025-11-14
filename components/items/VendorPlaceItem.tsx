import { Image, StyleSheet, Text, View } from 'react-native';
import { VendorPlaceDto } from '@/types/open-api';
import { Theme } from '@/styles/Theme';
import AppButton from '@/components/appComponents/AppButton';

export default function VendorPlaceItem(data: VendorPlaceDto) {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: data.thumbnail }} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.placeName}>{data.name}</Text>
          <Text>{data.streetName}</Text>
          <Text>{data.prices?.price}</Text>
          <Text>{data.prices?.priceRange?.min} - {data.prices?.priceRange?.max}</Text>


        </View>
        <View>
          <AppButton confirmative>
            Publish
          </AppButton>
        </View>
      </View>
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
  },
});