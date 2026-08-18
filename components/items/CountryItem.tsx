import {I18nManager, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Theme} from '@/styles/Theme';
import {CountryCode, CountryInfo} from '@/types/open-api';
import {IconSymbol} from '@/components/symbols/IconSymbol';

interface CountryItemProps {
    country: CountryInfo;
    onPress: (countryCode: CountryCode) => void;
}

export default function CountryItem({country, onPress}: CountryItemProps) {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => onPress(country.countryCode)}
            activeOpacity={0.7}
        >
            <View style={styles.content}>
                <View style={styles.flagPlaceholder}>
                    <IconSymbol name="mappin.and.ellipse" size={20} color={Theme.colors.primary}/>
                </View>
                <Text style={styles.countryName}>{country.countryName}</Text>
            </View>
            <IconSymbol name={I18nManager.isRTL ? 'chevron.left' : 'chevron.right'} size={20}
                        color={Theme.colors.gray.S400}/>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 5,
        borderBottomWidth: 1,
        borderBottomColor: Theme.colors.gray.S100,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    flagPlaceholder: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Theme.colors.iconBackground,
        alignItems: 'center',
        justifyContent: 'center',
    },
    countryName: {
        fontSize: Theme.sizes.md,
        color: Theme.colors.gray.S800,
        fontWeight: '500',
    },
});
