import {Pressable, StyleProp, Text, TextStyle, ViewStyle} from "react-native";
import {ButtonSize, ButtonStyles, ButtonType} from "@/styles/Button";
import {useFormContext} from "@/contexts/FormContext";

export default function AppButton({
                                      buttonType,
                                      buttonSize,
                                      isSubmit,
                                      onPress,
                                      children,
                                      extraStylesBtn,
                                      extraStylesTxt
                                  }: {
    buttonSize?: "SM" | "MD" | "LG",
    buttonType?: ButtonType,
    isSubmit?: boolean,
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
    } else if (buttonType === ButtonType.LINK) {
        buttonStyles = ButtonStyles.linkBtn
        textStyles = ButtonStyles.linkTxt
    } else {
        buttonStyles = ButtonStyles.primaryBtn
        textStyles = ButtonStyles.primaryTxt
    }

    if (buttonSize === ButtonSize.SM) {
        buttonStyles = {...buttonStyles, ...ButtonStyles.smSizeBtn}
        textStyles = {...textStyles, ...ButtonStyles.smSizeTxt}
    } else if (buttonSize === ButtonSize.LG) {
        buttonStyles = {...buttonStyles, ...ButtonStyles.lgSizeBtn}
        textStyles = {...textStyles, ...ButtonStyles.lgSizeTxt}
    } else {
        buttonStyles = {...buttonStyles, ...ButtonStyles.mdSizeBtn}
        textStyles = {...textStyles, ...ButtonStyles.mdSizeTxt}
    }


    const formContext = useFormContext()

    function handleSubmit() {
        formContext.setChecking(true)
    }


    return (
        <Pressable onPress={isSubmit ? handleSubmit : onPress} style={[buttonStyles, extraStylesBtn]}>
            <Text style={[textStyles, extraStylesTxt]}>
                {children}
            </Text>
        </Pressable>
    )
}