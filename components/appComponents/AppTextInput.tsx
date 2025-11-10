import {KeyboardTypeOptions, StyleSheet, Text, TextInput, View} from "react-native";
import {Theme} from "@/styles/Theme";
import {useFormContext} from "@/contexts/form-context";
import {useEffect, useRef, useState} from "react";
import {Timeout} from "@radix-ui/primitive";

export default function AppTextInput({
                                         onTextChange,
                                         value,
                                         keyboardType,
                                         label,
                                         placeholder,
                                         required,
                                         name,
                                         design = 1,
                                         debounceTime = 0
                                     }: {

    placeholder?: string,
    label?: string
    onTextChange: (text: string) => void,
    value: string | undefined,
    keyboardType?: KeyboardTypeOptions,
    required?: boolean,
    name: string
    design?: 1 | 2,
    debounceTime?: number
}) {

    const inputRef = useRef<TextInput>(null)
    const [error, setError] = useState<string | undefined>()
    const [textInput, setTextInput] = useState<string | undefined>(value)

    const form = useFormContext()


    let timeout: Timeout

    function debouncer(func: () => void) {
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => {
            func()
        }, debounceTime)
    }

    function preTextChange(text: string) {
        setTextInput(text)
        setError(undefined)
        debouncer(() => onTextChange(text))

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
        <View>
            {label && <Text style={[base.label, design === 2 ? design2.label : design1.label]}>{label}</Text>}
            <TextInput value={textInput}
                       autoCorrect={false}
                       keyboardType={keyboardType}
                       placeholder={placeholder}
                       ref={inputRef}
                       style={[base.input, design === 2 ? design2.input : design1.input]}
                       onChangeText={preTextChange}/>
            <Text style={[base.error, design === 2 ? design2.error : design1.error]}>{error}</Text>
        </View>
    )
}

const base = StyleSheet.create({
    input: {
        height: 45,
        paddingRight: 10,

        color: Theme.colors.primary,
        fontSize: Theme.sizes.md,

    },
    label: {
        fontSize: Theme.sizes.xs,
        color: Theme.colors.primary,
        fontWeight: "semibold",
        margin: 5
    },
    error: {
        fontSize: Theme.sizes.xs,
        color: Theme.colors.red["S500"],
        marginTop: 5,
    },
    onFocus: {
        borderColor: Theme.colors.primary,
    }

})

const design1 = StyleSheet.create({
        input: {
            borderBottomWidth: 2,
            borderColor: Theme.colors.primaryInactive,
            paddingLeft: 5,
        },
        label: {},
        error: {},
        onFocus: {}
    }
)

const design2 = StyleSheet.create({
    input: {
        backgroundColor: Theme.colors.white,
        borderRadius: Theme.radius.sm,
        paddingLeft: 20
    },
    label: {},
    error: {},
    onFocus: {}

})




