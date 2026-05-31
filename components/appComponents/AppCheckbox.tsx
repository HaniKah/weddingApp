import {Pressable, StyleSheet, Text, View} from "react-native";
import {Theme} from "@/styles/Theme";
import {IconSymbol} from "@/components/symbols/IconSymbol";


export default function AppCheckbox({label, value, onChange}: {
    label: string,
    value: boolean | undefined,
    onChange: (value: boolean) => void
}) {
    return (
        <Pressable onPress={() => onChange(!value)} style={styles.container}>
            <View style={[styles.checkbox, value && styles.isChecked]}>
                <IconSymbol name="checkmark" size={16} color={Theme.colors.white}/>
            </View>
            <Text style={styles.label}>{label}</Text>

        </Pressable>
    )
}
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        alignSelf: 'flex-start',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: Theme.colors.primary,
        backgroundColor: Theme.colors.white,
    },
    isChecked: {
        backgroundColor: Theme.colors.primary,
    },
    label: {
        color: Theme.colors.primary,
        fontSize: Theme.sizes.md
    },
    pressable: {
        backgroundColor: Theme.colors.primary,
    }
})