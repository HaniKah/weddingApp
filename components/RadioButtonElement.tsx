import {Pressable, StyleSheet, Text, View} from "react-native";
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
                <IconSymbol
                    weight="bold"
                    style={styles.icon}
                    name={icon} size={15}
                    color={item.value === value ? Theme.colors.primary : Theme.colors.secondary}/>
            }


            {item.value === value &&
                <View style={styles.dot}/>
            }

            <Text style={[styles.label, item.value === value && styles.labelSelected]}>{item.name}</Text>

        </Pressable>
    )
}
const styles = StyleSheet.create({
    container: {
        height: 80,
        width: 120,
        borderRadius: Theme.radius.lg,
        borderWidth: 3,
        borderColor: Theme.colors.border,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 10,
        paddingHorizontal: 10,
        position: "relative"
    },
    dot: {
        height: 10,
        width: 10,
        position: "absolute",
        right: 10,
        top: 10,
        borderRadius: Theme.radius.full,
        backgroundColor: Theme.colors.primary,
    },
    icon: {
        position: "absolute",
        left: 10,
        top: 10,
    },
    label: {
        color: Theme.colors.secondary,
        fontSize: Theme.sizes.md
    },
    containerSelected: {
        borderColor: Theme.colors.primary,
    },
    labelSelected: {
        color: Theme.colors.primary,
        fontWeight: 'bold',
    }
})