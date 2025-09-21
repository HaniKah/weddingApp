import {Pressable, Text} from "react-native";
import {ButtonStyles, ButtonType} from "@/styles/Button";

export default function AppButton({buttonType, onPress, children}: {
    buttonType?: ButtonType,
    onPress?: () => void,
    children: string
}) {
    let buttonStyles = {}
    let textStyles = {}

    if (buttonType === ButtonType.OUTLINED) {
        buttonStyles = ButtonStyles.outlinedBtn
        textStyles = ButtonStyles.outlinedTxt
    } else if (buttonType === ButtonType.INACTIVE) {
        buttonStyles = ButtonStyles.inactiveBtn
        textStyles = ButtonStyles.inactiveTxt
    } else {
        buttonStyles = ButtonStyles.primaryBtn
        textStyles = ButtonStyles.primaryTxt
    }
    console.log(buttonStyles)
    return (
        <Pressable onPress={onPress} style={buttonStyles}>
            <Text style={textStyles}>
                {children}
            </Text>
        </Pressable>
    )
}