import { StyleSheet, Text, View } from 'react-native';
import { Theme } from '@/styles/Theme';
import { IconSymbol } from '@/components/symbols/IconSymbol';
import { CountryCode } from '@/types/open-api';
import { COUNTRIES } from '@/constants/countries';

export default function LocationTag({ countryCode, city, removeBackground, textColor }: {
  countryCode?: CountryCode,
  city?: string,
  removeBackground?: boolean
  textColor?: string
}) {
  if (countryCode || city) return (
    <View style={[styles.container, removeBackground && styles.removeBackground]}>
      <IconSymbol name="location" size={14} color={textColor ?? Theme.colors.primary} />
      <Text style={[styles.text, textColor && { color: textColor }]}>
        {countryCode ? COUNTRIES.get(countryCode)?.countryName : city}
      </Text>
    </View>

  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.iconBackground,
    alignSelf: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: Theme.radius.full,

  },
  text: {
    fontSize: Theme.sizes.xs,
    color: Theme.colors.primary,
  },
  removeBackground: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    backgroundColor: 'transparent',
  },
});