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
                                            required,
                                            fixedTo
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
    fixedTo?: number
}) {


//if the coming value wasn't number ( from database ) which possible is not happening
    function checkValue() {
        return value && isNaN(value) ? undefined : value?.toString()
    }

    function convertToNumber(text: string) {

        // removes anything that is not a number, dot or comma
        let clean = text.replace(/[^0-9.,]/g, "")
        // replace comma with dot
        clean = clean.replace(",", ".")

        const convert = parseFloat(clean)

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