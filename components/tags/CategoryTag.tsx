import {Categories} from '@/types/open-api';
import {StyleSheet, Text, View} from 'react-native';
import IconCategory from '../symbols/IconCategory';
import {Theme} from '@/styles/Theme';
import {useTranslation} from 'react-i18next';

export default function CategoryTag({category}: { category: Categories | undefined }) {
    const {t} = useTranslation();
    if (!category) return
    else return (
        <View style={styles.container}>
            <IconCategory size={14} color={Theme.colors.primary} category={category}/>
            <Text style={styles.text}>
                {t('categories.' + category)}
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
});