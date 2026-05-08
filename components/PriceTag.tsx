import { StyleSheet, Text, View } from 'react-native';
import AppIf from '@/components/appComponents/AppIf';
import { COUNTRIES } from '@/constants/countries';
import { Theme } from '@/styles/Theme';
import { CountryCode, PriceType } from '@/types/open-api';
import { useTranslation } from 'react-i18next';

export default function PriceTag({ minPrice, maxPrice, countryCode, priceType }: {
  minPrice: string | undefined,
  maxPrice: string | undefined,
  countryCode: CountryCode | undefined,
  priceType: PriceType | undefined
}) {
  const { t } = useTranslation();
  if (countryCode) return (
    <View style={styles.container}>
      <AppIf value={!maxPrice && !maxPrice}>
        <Text style={styles.currency}>No price</Text>
      </AppIf>
      <AppIf value={maxPrice && minPrice}>
        <View style={styles.priceContainer}>
          {
            minPrice === maxPrice ?
              <Text style={styles.priceText}>{minPrice}</Text> :
              <Text style={styles.priceText}>{minPrice} - {maxPrice}</Text>
          }
          <Text
            style={styles.currency}>  {COUNTRIES.get(countryCode)?.currency} / {t('priceType.' + priceType)}</Text>
        </View>

      </AppIf>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  priceText: {
    fontWeight: 'bold',
    fontSize: Theme.sizes.md,
    color: Theme.colors.primary,
  },
});