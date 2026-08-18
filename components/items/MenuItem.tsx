import {I18nManager, StyleSheet, Text, View} from 'react-native';
import {Theme} from '@/styles/Theme';
import {IconSymbol, IconSymbolName} from '@/components/symbols/IconSymbol';
import AppPressable from '@/components/appComponents/AppPressable';

export default function MenuItem({
                                     icon,
                                     label,
                                     onPress,
                                 }: {
    icon: IconSymbolName;
    label: string;
    onPress: () => void;
}) {
    return (
        <AppPressable
            onPress={onPress}
        >
            <View style={styles.container}>
                <IconSymbol name={icon} size={18} color={Theme.colors.primary}/>
                <Text
                    style={styles.text}
                >
                    {label}
                </Text>
                <IconSymbol name={I18nManager.isRTL ? 'chevron.left' : 'chevron.right'} size={16}
                            color={Theme.colors.primary}/>
            </View>
        </AppPressable>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 22,
        gap: 12,
        backgroundColor: Theme.colors.white,
        overflow: 'hidden',
    },
    text: {
        flex: 1,
        fontSize: 15,
        color: Theme.colors.primary,
    },
    menuCard: {},
});