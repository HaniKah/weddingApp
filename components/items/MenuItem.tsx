import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Theme} from '@/styles/Theme';
import {IconSymbol} from "@/components/symbols/IconSymbol";

export default function MenuItem({
                                     icon,
                                     label,
                                     onPress,
                                 }: {
    icon: string;
    label: string;
    onPress: () => void;
}) {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
        >
            <IconSymbol name={icon as any} size={18} color={Theme.colors.primary}/>
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
        padding: 14,
        gap: 12,
    },
    text: {
        flex: 1,
        fontSize: 15,
        color: Theme.colors.primary,
    }
})