import {PickerItem} from "@/components/appComponents/AppPickerDepr";
import {useEffect, useRef, useState} from "react";
import {FlatList, Pressable, StyleProp, StyleSheet, Text, View, ViewStyle} from "react-native";
import {Theme} from "@/styles/Theme";
import {IconSymbol} from "@/components/symbols/IconSymbol";
import AppBottomSheet, {AppBottomSheetRef} from "@/components/appComponents/AppBottomSheet";
import {useFormContext} from "@/contexts/form-context";

export default function AppDropDown<T>({itemList, label, value, onChange, style, title, required, name, disabled}: {
    style?: StyleProp<ViewStyle>,
    value: T | undefined,
    onChange: (value: T) => void,
    itemList: PickerItem<T>[] | undefined
    label?: string
    title?: string
    required?: boolean,
    name: string
    disabled?: boolean
}) {

    const form = useFormContext()
    const [error, setError] = useState<string | undefined>()

    const bottomSheetRef = useRef<AppBottomSheetRef>(null)

    const onSelect = (selectedValue: T) => {
        onChange(selectedValue)
        bottomSheetRef.current?.close()
    }

    function renderItem({item}: { item: PickerItem<T> }) {
        return (
            <Pressable style={styles.renderItem} onPress={() => onSelect(item.value)}>
                <Text>{item.name}</Text>
                {item.value === value && <IconSymbol name="checkmark" size={16} color={Theme.colors.primary}/>}
            </Pressable>
        )
    }

    useEffect(() => {
        if (form.submitting) {

            let valid: boolean = false
            if (value !== undefined && value !== null) {
                valid = true
            }

            if (required) {
                if (valid) {
                    form.addValue({[name]: valid})
                } else {
                    setError("Please check this field")
                    form.setSubmitting(false)
                }
            } else {
                form.addValue({[name]: valid})
            }
        }

        if (value) {
            setError(undefined)
        }

    }, [form.submitting, value]);

    return (
        <View style={style}>
            {label && <Text>{label}</Text>}
            <Pressable disabled={disabled} style={[styles.pressable, disabled && styles.disabledPressable]}
                       onPress={() => bottomSheetRef.current?.open()}>
                <Text style={disabled && styles.disabledText}>
                    {itemList?.find(item => item.value === value)?.name ?? "Select an option"}
                </Text>
                <IconSymbol name="chevron.down" size={20} color={Theme.colors.gray.S400}/>
            </Pressable>
            {error && <Text style={styles.error}>{error}</Text>}

            <AppBottomSheet ref={bottomSheetRef}>
                <View style={styles.viewContainer}>
                    {title && <Text style={styles.title}>{title}</Text>}
                    <FlatList contentContainerStyle={styles.flatListContainer} data={itemList} renderItem={renderItem}/>

                </View>
            </AppBottomSheet>
        </View>

    )
}
const styles = StyleSheet.create({
    viewContainer: {
        padding: 10,
    },
    title: {
        textAlign: "center",
        fontSize: Theme.sizes.md,
        fontWeight: "bold",
    },
    flatListContainer: {
        marginTop: 0,

    },
    pressable: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 15,
        borderRadius: Theme.radius.sm,
        borderColor: Theme.colors.gray.S300,
        backgroundColor: Theme.colors.gray.S200,
        marginVertical: 10
    },
    disabledPressable: {
        backgroundColor: Theme.colors.gray.S200,
    },
    disabledText: {
        color: Theme.colors.gray.S400,
    },
    renderItem: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: Theme.colors.gray.S300,

    },
    error: {
        fontSize: Theme.sizes.xs,
        color: Theme.colors.red["S500"],

    },

})