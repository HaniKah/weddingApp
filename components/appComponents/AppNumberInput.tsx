import AppTextInput from '@/components/appComponents/AppTextInput';
import {StyleProp, ViewStyle} from 'react-native';
import {Dispatch, SetStateAction} from "react";
import {showSnackbar} from "@/components/Snackbar";

export default function AppNumberInput({
                                           name,
                                           label,
                                           value,
                                           onTextChange,
                                           placeholder,
                                           extraStyles,
                                           unit,
                                           required,
                                           fixedTo,
                                           design = 1,
                                           containerStyle,
                                       }: {
    name: string,
    label?: string,
    value: number | undefined,
    onTextChange: Dispatch<SetStateAction<number | undefined>>
    placeholder?: string,
    extraStyles?: StyleProp<ViewStyle>,
    unit?: string
    required?: boolean
    fixedTo?: number
    design?: 1 | 2,
    containerStyle?: StyleProp<ViewStyle>,
}) {


//if the coming value wasn't number ( from database )
    function checkValue() {
        return value && isNaN(value) ? undefined : value?.toString();
    }

    function convertToNumber(text: string | undefined) {

        if (!text) {
            onTextChange(undefined);
            return;
        }

        let clean = text.replace(/[^0-9.,]/g, '');
        // replace comma with dot
        clean = clean.replace(',', '.');

        if (clean === "") {
            onTextChange(undefined);
            return;
        }

        const convert = parseFloat(clean);

        if (isNaN(convert)) {
            showSnackbar("couldn't convert to number", "error")
            return
        }
        onTextChange(convert);
    }

    return (

        <AppTextInput extraStyles={extraStyles}
                      containerStyle={containerStyle}
                      placeholder={placeholder}
                      label={label}
                      name={name}
                      keyboardType="number-pad"
                      unit={unit}
                      value={checkValue()}
                      onChange={convertToNumber}
                      required={required}
                      design={design}


        />

    );
}