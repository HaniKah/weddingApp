import {Pressable, StyleSheet, Text} from "react-native";
import {IconSymbol} from "@/components/symbols/IconSymbol";
import {Theme} from "@/styles/Theme";
import {SFSymbols6_0} from "sf-symbols-typescript";
import {PickerItem} from "@/components/appComponents/AppPicker";

export default function RadioButtonElement({value, icon, item, onChange}: {
    value: boolean | undefined
    icon?: SFSymbols6_0,
    item: PickerItem<boolean>
    onChange: (value: boolean) => void
}) {
    return (
        <Pressable onPress={() => onChange(item.value)}

                   style={[styles.container, item.value === value && styles.containerSelected]}>
            {
                icon &&
                <IconSymbol name={icon} size={24}
                            color={item.value === value ? Theme.colors.primary : Theme.colors.secondary}/>
            }
            <Text style={[styles.label, item.value === value && styles.labelSelected]}>{item.name}</Text>

        </Pressable>
    )
}
const styles = StyleSheet.create({
    container: {
        width: 100,
        height: 100,
        borderRadius: Theme.radius.lg,
        borderWidth: 3,
        borderColor: Theme.colors.border,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        gap: 10,
    },
    label: {
        color: Theme.colors.secondary,
        fontSize: Theme.sizes.lg
    },
    containerSelected: {
        borderColor: Theme.colors.primary,
    },
    labelSelected: {
        color: Theme.colors.primary,
        fontWeight: 'bold',
    }
})