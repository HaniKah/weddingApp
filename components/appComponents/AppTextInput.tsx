import {KeyboardTypeOptions, StyleProp, StyleSheet, Text, TextInput, View, ViewStyle} from "react-native";
import {Theme} from "@/styles/Theme";

export default function AppTextInput({
                                         onTextChange,
                                         value,
                                         keyboardType,
                                         label,
                                         placeholder,
                                         extraStyles,
                                         error,
                                         required
                                     }: {
    error?: string,
    extraStyles?: StyleProp<ViewStyle>,
    placeholder?: string,
    label?: string
    onTextChange: (text: string) => void,
    value: string | undefined,
    keyboardType?: KeyboardTypeOptions,
    required?: boolean,
}) {

    return (
        <View style={[extraStyles]}>

            <Text style={styles.label}>{label}</Text>

            <TextInput value={value}
                       keyboardType={keyboardType}
                       placeholder={placeholder}
                       style={styles.input}
                       onChangeText={onTextChange}/>
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
