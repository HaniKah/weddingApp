import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Theme} from '@/styles/Theme';
import {IconSymbol, IconSymbolName} from "@/components/symbols/IconSymbol";

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
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
        >
            <IconSymbol name={icon} size={18} color={Theme.colors.primary}/>
            <Text
                style={styles.text}
            >
                {label}
            </Text>
            <IconSymbol name="chevron.right" size={16} color={Theme.colors.primary}/>


        </TouchableOpacity>
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
        borderRadius: Theme.radius.md,
        overflow: 'hidden',
        boxShadow: Theme.effects.boxShadow
    },
    text: {
        flex: 1,
        fontSize: 15,
        color: Theme.colors.primary,
    },
    menuCard: {},
})