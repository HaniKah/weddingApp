import {
    InputModeOptions,
    KeyboardTypeOptions,
    StyleSheet,
    Text,
    TextInput,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native';
import {Theme} from '@/styles/Theme';
import {useFormContext} from '@/contexts/form-context';
import {Dispatch, SetStateAction, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {IconButton} from '@/components/symbols/IconButton';
import {parsePhoneNumber} from "libphonenumber-js";
import {useLocationContext} from "@/contexts/location-context";

export type AppTextInputProps = {
    placeholder?: string,
    label?: string
    onChange: (text: string | undefined) => void | Dispatch<SetStateAction<string | undefined>>
    value: string | undefined | null,
    keyboardType?: KeyboardTypeOptions,
    required?: boolean,
    name: string
    design?: 1 | 2,
    unit?: string
    textArea?: boolean
    onBlur?: () => void
    secureTextEntry?: boolean
    inputMode?: InputModeOptions
    extraStyles?: ViewStyle
}

export default function AppTextInput({
                                         onChange,
                                         value,
                                         keyboardType,
                                         label,
                                         placeholder,
                                         required,
                                         name,
                                         design = 1,
                                         unit,
                                         textArea,
                                         onBlur,
                                         secureTextEntry,
                                         inputMode,
                                         extraStyles,
                                     }: AppTextInputProps) {

    let styles: TextInputType = design === 1 ? design1 : design2;


    const inputRef = useRef<TextInput>(null);
    const [error, setError] = useState<string | undefined>();
    // const [textInput, setTextInput] = useState<string | undefined>(value);


    const form = useFormContext();
    const {isoCountry} = useLocationContext()


    function preTextChange(text: string | undefined) {
        onChange(text);
        setError(undefined);

    }

    type CheckResult = { error: string | undefined }

    const checkRequired = useCallback((text: string | undefined): CheckResult => {
        if (required && !text) {
            return {error: 'This field is required'}
        } else {
            return {error: undefined}
        }
    }, [required])

    const checkPhoneNumber = useCallback((text: string | undefined): CheckResult => {
            if (keyboardType === "phone-pad" && text && isoCountry) {
                const phoneNumber = parsePhoneNumber(text, isoCountry)
                if (!phoneNumber.isValid() || phoneNumber.country !== isoCountry) {
                    return {error: 'Invalid phone number'}
                }
            }
            return {error: undefined}
        }
        , [keyboardType, isoCountry])

    const runChecks = useCallback((text: string | undefined): CheckResult => {
        const checksToRun = [checkRequired, checkPhoneNumber]
        for (const check of checksToRun) {
            const result: CheckResult = check(text)
            if (result.error) {
                return result
            }
        }
        return {error: undefined}
    }, [checkRequired, checkPhoneNumber])

    useEffect(() => {
        if (form.submitting) {
            const text = value?.trim()
            const result = runChecks(text)
            if (result.error) {
                setError(result.error)
                form.setSubmitting(false)
            } else {
                form.addValue({[name]: text})
            }
        }

    }, [form.submitting, runChecks]);

    const isArabic = useMemo(() => {
        if (!value) return
        return /[\u0600-\u06FF]/.test(value);
    }, [value])

    return (
        <View style={{flex: 1}}>
            {label && <Text style={[styles.label]}>{label}</Text>}
            <View style={[styles.inputContainer, extraStyles]}>
                <TextInput value={value || undefined}
                           autoCorrect={false}
                           keyboardType={keyboardType}
                           placeholder={placeholder}
                           placeholderTextColor={Theme.colors.placeholder}
                           ref={inputRef}
                           style={[styles.input, textArea && styles.textArea]}
                           onChangeText={preTextChange}
                           multiline={textArea}
                           onBlur={onBlur}
                           secureTextEntry={secureTextEntry}
                           inputMode={inputMode}
                           textAlign={isArabic ? 'right' : 'left'}


                />
                {unit && <Text style={styles.unit}>{unit}</Text>}
                {
                    value && value?.length > 0 && inputRef.current?.isFocused() &&
                    <IconButton onPress={() => preTextChange(undefined)} color={Theme.colors.backgroundDisabled}
                                size={24}
                                name="x.circle.fill"
                                removeBackground/>
                }
            </View>

            {error &&
                <Text style={styles.error}>{error}</Text>
            }
        </View>
    );
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
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 2,
            borderColor: Theme.colors.border,

        },
        input: {
            paddingRight: 10,
            height: 45,
            color: Theme.colors.primary,
            fontSize: Theme.sizes.md,
            width: '100%',
            flex: 1,
            paddingLeft: 5,
        },
        label: {
            color: Theme.colors.primary,
            fontWeight: 'semibold',
            fontSize: Theme.sizes.sm,
        },

        error: {
            fontSize: Theme.sizes.xs,
            color: Theme.colors.red['S500'],
            marginTop: 5,
        },
        onFocus: {
            borderColor: Theme.colors.primary,
        },
        unit: {
            color: Theme.colors.placeholder,
        },
        textArea: {
            padding: 10,
            height: 250,
        },
    },
);

const design2: TextInputType = StyleSheet.create({
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Theme.colors.white,
        borderColor: Theme.colors.border,
        borderRadius: Theme.radius.md,
        overflow: 'hidden',
        paddingRight: 10,
        borderWidth: 1,
    },
    input: {
        height: 45,
        color: Theme.colors.primary,
        fontSize: Theme.sizes.sm,
        width: '100%',
        flex: 1,
        paddingLeft: 14,
        borderRadius: Theme.radius.sm,


    },
    label: {
        color: Theme.colors.primary,
        fontWeight: 'semibold',
        margin: 5,
        fontSize: Theme.sizes.sm,
    },

    error: {
        fontSize: Theme.sizes.xs,
        color: Theme.colors.red['S500'],
        marginTop: 5,
    },
    onFocus: {
        borderColor: Theme.colors.primary,
    },
    unit: {
        color: Theme.colors.placeholder,
    },
    textArea: {
        padding: 10,
        height: 250,
    },
});









