import {PickerItem} from "@/components/appComponents/AppPickerDepr";
import {useEffect, useState} from "react";
import {Pressable, StyleProp, StyleSheet, Text, View, ViewStyle} from "react-native";
import {Theme} from "@/styles/Theme";
import {IconSymbol} from "@/components/symbols/IconSymbol";
import AppBottomSheet from "@/components/appComponents/AppBottomSheet";
import {useFormContext} from "@/contexts/form-context";
import {Picker} from "@react-native-picker/picker";

export default function AppPicker<T>({itemList, label, value, onChange, style, title, required, name}: {
    style?: StyleProp<ViewStyle>,
    value: T | undefined,
    onChange: (value: T) => void,
    itemList: PickerItem<T>[] | undefined
    label?: string
    title?: string
    required?: boolean,
    name: string
}) {

    const form = useFormContext()
    const [isVisible, setIsVisible] = useState(false)
    const [error, setError] = useState<string | undefined>()


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
            <Pressable style={styles.pressable} onPress={() => setIsVisible(true)}>
                <Text>
                    {itemList?.find(item => item.value === value)?.name ?? "Select an option"}
                </Text>
                <IconSymbol name="chevron.down" size={20} color={Theme.colors.gray.S400}/>
            </Pressable>
            {error && <Text style={styles.error}>{error}</Text>}

            <AppBottomSheet
                isVisible={isVisible}
                setIsVisible={setIsVisible}>
                <Picker
                    selectedValue={value}
                    onValueChange={(itemValue, itemIndex) =>
                        onChange(itemValue)
                    }>
                    {itemList?.map((item, i) => {
                        return (

                            <Picker.Item key={i} label={item.name} value={item.value}/>
                        )
                    })}

                </Picker>
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
        marginTop: 5,
    },

})