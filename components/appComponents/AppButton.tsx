import {Pressable, StyleProp, Text, TextStyle, ViewStyle} from "react-native";
import {ButtonStyles, ButtonType} from "@/styles/Button";

export default function AppButton({buttonType, onPress, children, extraStylesBtn, extraStylesTxt}: {
    buttonType?: ButtonType,
    onPress?: () => void,
    children: string,
    extraStylesBtn?: StyleProp<ViewStyle>,
    extraStylesTxt?: StyleProp<TextStyle>,
}) {
    let buttonStyles = {}
    let textStyles = {}

    if (buttonType === ButtonType.OUTLINED) {
        buttonStyles = ButtonStyles.outlinedBtn
        textStyles = ButtonStyles.outlinedTxt
    } else if (buttonType === ButtonType.INACTIVE) {
        buttonStyles = ButtonStyles.inactiveBtn
        textStyles = ButtonStyles.inactiveTxt
    } else if (buttonType === ButtonType.PLAIN) {
        buttonStyles = ButtonStyles.plainBtn
        textStyles = ButtonStyles.plainTxt
    } else {
        buttonStyles = ButtonStyles.primaryBtn
        textStyles = ButtonStyles.primaryTxt
    }

    return (
        <Pressable onPress={onPress} style={[buttonStyles, extraStylesBtn]}>
            <Text style={[textStyles, extraStylesTxt]}>
                {children}
            </Text>
        </Pressable>
    )
}