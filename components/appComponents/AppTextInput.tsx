import {KeyboardTypeOptions, StyleProp, StyleSheet, Text, TextInput, View, ViewStyle} from "react-native";
import {Theme} from "@/styles/Theme";
import {useFormContext} from "@/contexts/FormContext";
import {useEffect, useState} from "react";

export default function AppTextInput({
                                         onTextChange,
                                         value,
                                         keyboardType,
                                         label,
                                         placeholder,
                                         extraStyles,
                                         required,
                                         name
                                     }: {
    extraStyles?: StyleProp<ViewStyle>,
    placeholder?: string,
    label?: string
    onTextChange: (text: string) => void,
    value: string | undefined,
    keyboardType?: KeyboardTypeOptions,
    required?: boolean,
    name: string
}) {

    const [error, setError] = useState<string | undefined>()

    const form = useFormContext()

    function preTextChange(text: string) {
        setError(undefined)
        onTextChange(text)
    }

    useEffect(() => {
        if (form.checking) {

            const checked: string | null = (!value || value.length === 0) ? null : value.trim();

            if (required) {
                if (checked) {
                    form.addValue({[name]: checked})
                } else {
                    setError("This field is required")
                    form.setChecking(false)
                }
            } else {
                form.addValue({[name]: checked})
            }
        }

    }, [form.checking]);


    return (
        <View style={[extraStyles]}>

            <Text style={styles.label}>{label}</Text>

            <TextInput value={value}
                       autoCorrect={false}
                       keyboardType={keyboardType}
                       placeholder={placeholder}
                       style={styles.input}
                       onChangeText={preTextChange}/>
            <Text style={styles.error}>{error}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
        input: {
            height: 50,
            borderBottomWidth: 2,
            borderColor: Theme.colors.primaryInactive,
            paddingHorizontal: 10,
            color: Theme.colors.primary,
            fontSize: 20,
        },

        label: {
            fontSize: 18,
            color: Theme.colors.primary,
            fontWeight: "bold",
        },
        error: {
            color: Theme.colors.red["100"],
            marginTop: 5,
        }
    }
)
