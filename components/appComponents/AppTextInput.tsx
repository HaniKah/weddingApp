import {
    I18nManager,
    InputModeOptions,
    KeyboardTypeOptions,
    StyleProp,
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
import {useTranslation} from 'react-i18next';

export type CheckResult = { error: string | undefined }

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
    secureTextEntry?: boolean
    inputMode?: InputModeOptions
    extraStyles?: StyleProp<ViewStyle>
    containerStyle?: StyleProp<ViewStyle>
    customChecks?: ((text: string | undefined) => CheckResult)[]
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
                                         secureTextEntry,
                                         inputMode,
                                         extraStyles,
                                         containerStyle,
                                         customChecks

                                     }: AppTextInputProps) {

    let styles: TextInputType = design === 1 ? design1 : design2;


    const inputRef = useRef<TextInput>(null);
    const [error, setError] = useState<string | undefined>();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    // const [isFocused, setIsFocused] = useState<boolean>(false)
    // const [textInput, setTextInput] = useState<string | undefined>(value);


    const form = useFormContext();
    const {isoCountry} = useLocationContext()
    const {t} = useTranslation();


    function preTextChange(text: string | undefined) {
        onChange(text);
    }


    const checkRequired = useCallback((text: string | undefined): CheckResult => {
        if (required && !text) {
            return {error: t('form.fieldRequired')}
        } else {
            return {error: undefined}
        }
    }, [required, t])

    const checkPhoneNumber = useCallback((text: string | undefined): CheckResult => {
            if (keyboardType === "phone-pad" && text && isoCountry) {
                const phoneNumber = parsePhoneNumber(text, isoCountry)
                if (!phoneNumber.isValid() || phoneNumber.country !== isoCountry) {
                    return {error: t('form.invalidPhoneNumber')}
                }
            }
            return {error: undefined}
        }
        , [keyboardType, isoCountry, t])

    const runChecks = useCallback((text: string | undefined): CheckResult => {
        const checksToRun = [checkRequired, checkPhoneNumber, ...(customChecks ?? [])]
        for (const check of checksToRun) {
            const result: CheckResult = check(text)
            if (result.error) {
                return result
            }
        }
        return {error: undefined}
    }, [checkRequired, checkPhoneNumber, customChecks])

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

    }, [form.submitting, runChecks, value, name]);

    const isNumericField = keyboardType === 'phone-pad' || keyboardType === 'decimal-pad' || keyboardType === 'number-pad';

    const isArabic = useMemo(() => {
        if (!value) {
            if (isNumericField) return placeholder ? /[\u0600-\u06FF]/.test(placeholder) : false;
            return I18nManager.isRTL;
        }
        return /[\u0600-\u06FF]/.test(value);
    }, [value, isNumericField, placeholder])

    const textAlignStyle = {textAlign: I18nManager.isRTL ? 'right' as const : 'left' as const};

    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={[styles.label, textAlignStyle]}>{label}</Text>}
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
                    // onBlur={() => setIsFocused(false)}
                    // onFocus={() => setIsFocused(true)}
                           secureTextEntry={secureTextEntry && !showPassword}
                           inputMode={inputMode}
                           textAlign={isArabic ? 'right' : 'left'}


                />
                {unit && <Text style={styles.unit}>{unit}</Text>}
                {secureTextEntry &&
                    <IconButton testID="visibility-icon"
                                onPress={() => setShowPassword(!showPassword)}
                                color={Theme.colors.backgroundDisabled}
                                size={24}
                                name={showPassword ? 'eye.slash.fill' : 'eye.fill'}
                                removeBackground/>}
                {
                    !secureTextEntry && value && value?.length > 0 &&
                    <IconButton onPress={() => preTextChange(undefined)} color={Theme.colors.backgroundDisabled}
                                testID="clear-icon"
                                size={24}
                                name="x.circle.fill"
                                extraStylesBtn={{marginStart: 5}}
                                removeBackground/>
                }
            </View>

            {error &&
                <Text style={[styles.error, textAlignStyle]}>{error}</Text>
            }
        </View>
    );
}

type TextInputType = {
    container: ViewStyle,
    inputContainer: ViewStyle,
    input: TextStyle,
    label: TextStyle,
    error: TextStyle,
    onFocus: ViewStyle,
    unit: TextStyle,
    textArea: TextStyle
}


const design1: TextInputType = StyleSheet.create({
        container: {
            alignSelf: "stretch",
        },
        inputContainer: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 2,
            borderColor: Theme.colors.border,

        },
        input: {
            paddingEnd: 10,
            height: 50,
            color: Theme.colors.primary,
            fontSize: Theme.sizes.md,
            width: '100%',
            flex: 1,
            paddingStart: 5,
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
    container: {
        alignSelf: "stretch"
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Theme.colors.white,
        borderColor: Theme.colors.border,
        borderRadius: Theme.radius.md,
        overflow: 'hidden',
        paddingEnd: 10,
        borderWidth: 1,
    },
    input: {
        height: 50,
        color: Theme.colors.primary,
        fontSize: Theme.sizes.sm,
        width: '100%',
        flex: 1,
        paddingStart: 14,
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









