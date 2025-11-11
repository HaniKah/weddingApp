import {KeyboardTypeOptions, StyleProp, StyleSheet, Text, TextInput, View, ViewStyle} from "react-native";
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
                                         unit
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
            let checked: string | undefined = value?.trim();

            if (!checked || checked.length === 0) {
                checked = undefined
            }

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
        <View style={extraStyles}>
            {label && <Text style={design === 2 ? design2.label : design1.label}>{label}</Text>}
            <View style={design === 2 ? design2.inputContainer : design1.inputContainer}>
                <TextInput value={textInput}
                           autoCorrect={false}
                           keyboardType={keyboardType}
                           placeholder={placeholder}
                           ref={inputRef}
                           style={design === 2 ? design2.input : design1.input}
                           onChangeText={preTextChange}

                />
                {unit && <Text style={design === 2 ? design2.unit : design1.unit}>JOD</Text>}
            </View>

            <Text style={design === 2 ? design2.error : design1.error}>{error}</Text>
        </View>
    )
}

const design1 = StyleSheet.create({
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
            margin: 5,

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
        }
    }
)

const design2 = StyleSheet.create({
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
    }

})




