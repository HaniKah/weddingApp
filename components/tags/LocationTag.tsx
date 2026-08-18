import {StyleSheet, Text, View} from 'react-native';
import {Theme} from '@/styles/Theme';
import {IconSymbol} from '@/components/symbols/IconSymbol';
import {CountryCode} from '@/types/open-api';
import {COUNTRIES} from '@/constants/countries';
import {useTranslation} from "react-i18next";

export default function LocationTag({countryCode, city, removeBackground, textColor}: {
    countryCode?: CountryCode,
    city?: string,
    removeBackground?: boolean
    textColor?: string
}) {
    const {t} = useTranslation();
    if (countryCode || city) return (
        <View style={[styles.container, removeBackground && styles.removeBackground]}>
            <IconSymbol name="location" size={14} color={textColor ?? Theme.colors.primary}/>
            <Text style={[styles.text, textColor && {color: textColor}]}>{
                countryCode ? t(`countries.${COUNTRIES.get(countryCode)?.countryCode}`) : t(`cities.${city}`)
            }

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
        gap: 6,
        paddingHorizontal: 10,
        paddingVertical: 6,
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