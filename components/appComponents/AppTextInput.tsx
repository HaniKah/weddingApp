import {KeyboardTypeOptions, StyleProp, StyleSheet, Text, TextInput, TextStyle, View, ViewStyle} from "react-native";
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
                                         debounceTime = 0,
                                         extraStyles,
                                         unit,
                                         textArea,

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
    extraStyles?: StyleProp<ViewStyle>
    unit?: string
    textArea?: boolean

}) {

    let styles: TextInputType = design === 1 ? design1 : design2


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
        if (form.submitting) {

            let valid: string | undefined = value?.trim();
            if (!valid || valid.length === 0) {
                valid = undefined
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

    }, [form.submitting]);

    return (
        <View style={extraStyles}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={styles.inputContainer}>
                <TextInput value={textInput}
                           autoCorrect={false}
                           keyboardType={keyboardType}
                           placeholder={placeholder}
                           ref={inputRef}
                           style={[styles.input, textArea && styles.textArea]}
                           onChangeText={preTextChange}
                           multiline={textArea}

                />
                {unit && <Text style={styles.unit}>JOD</Text>}
            </View>

            <Text style={styles.error}>{error}</Text>
        </View>
    )
}

type TextInputType = {
    inputContainer: ViewStyle,
    input: TextStyle,
    label: TextStyle,
    error: TextStyle,
    onFocus: ViewStyle,
    unit: TextStyle,
    textArea: TextStyle
}


const design1: TextInputType = StyleSheet.create({
        inputContainer: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            borderBottomWidth: 2,
            borderColor: Theme.colors.primaryInactive,
        },
        input: {
            paddingRight: 10,
            height: 45,
            color: Theme.colors.primary,
            fontSize: Theme.sizes.md,
            width: "100%",
            flex: 1,
            paddingLeft: 5,
        },
        label: {
            color: Theme.colors.primary,
            fontWeight: "semibold",
            fontSize: Theme.sizes.sm,
        },
        error: {
            fontSize: Theme.sizes.xs,
            color: Theme.colors.red["S500"],
            marginTop: 5,
        },
        onFocus: {
            borderColor: Theme.colors.primary,
        },
        unit: {
            color: Theme.colors.gray.S400,
        },
        textArea: {
            padding: 10,
            height: 250
        }
    }
)

const design2: TextInputType = StyleSheet.create({
    inputContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Theme.colors.white,
        borderRadius: Theme.radius.sm,
        overflow: "hidden",
        paddingRight: 10,
    },
    input: {
        height: 45,
        color: Theme.colors.primary,
        fontSize: Theme.sizes.md,
        width: "100%",
        flex: 1,
        paddingLeft: 20
    },
    label: {
        color: Theme.colors.primary,
        fontWeight: "semibold",
        margin: 5,
        fontSize: Theme.sizes.xs,
    },
    error: {
        fontSize: Theme.sizes.xs,
        color: Theme.colors.red["S500"],
        marginTop: 5,
    },
    onFocus: {
        borderColor: Theme.colors.primary,
    },
    unit: {
        color: Theme.colors.gray.S400,
    },
    textArea: {
        padding: 10,
        height: 250
    }
})









