import AppTextInput from "@/components/appComponents/AppTextInput";
import {KeyboardTypeOptions, StyleProp, ViewStyle} from "react-native";

export default function AppNumericInput({
                                            name,
                                            label,
                                            value,
                                            onTextChange,
                                            placeholder,
                                            extraStyles,
                                            keyboardType,
                                            unit,
                                            required
                                        }: {
    name: string,
    label?: string,
    value: number | undefined,
    onTextChange: (value: number | undefined) => void,
    placeholder?: string,
    extraStyles?: StyleProp<ViewStyle>,
    keyboardType?: KeyboardTypeOptions,
    unit?: string
    required?: boolean
}) {


//if the coming value wasn't number ( from database ) which possible is not happening
    function checkValue() {
        return value && isNaN(value) ? undefined : value?.toString()
    }

    function convertToNumber(text: string) {
        const convert: number = parseFloat(text)
        if (isNaN(convert)) return
        onTextChange(convert)
    }

    return (

        <AppTextInput extraStyles={extraStyles}
                      placeholder={placeholder}
                      label={label}
                      name={name}
                      keyboardType={keyboardType}
                      unit={unit}
                      value={checkValue()}
                      onTextChange={convertToNumber}
                      required={required}
        />

    )
}