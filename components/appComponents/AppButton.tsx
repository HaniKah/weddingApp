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
    let buttonStyles: StyleProp<ViewStyle> = {}
    let textStyles: StyleProp<TextStyle> = {}

    switch (buttonType) {
        case ButtonType.OUTLINED:
            buttonStyles = ButtonStyles.outlinedBtn;
            textStyles = ButtonStyles.outlinedTxt;
            break;
        case ButtonType.INACTIVE:
            buttonStyles = ButtonStyles.inactiveBtn;
            textStyles = ButtonStyles.inactiveTxt;
            break;
        case ButtonType.PLAIN:
            buttonStyles = ButtonStyles.plainBtn;
            textStyles = ButtonStyles.plainTxt;
            break;
        case ButtonType.LINK:
            buttonStyles = ButtonStyles.linkBtn;
            textStyles = ButtonStyles.linkTxt;
            break;
        default:
            buttonStyles = ButtonStyles.primaryBtn;
            textStyles = ButtonStyles.primaryTxt;
            break;
    }

    switch (buttonSize) {
        case ButtonSize.SM:
            buttonStyles = {...buttonStyles, ...ButtonStyles.smSizeBtn}
            textStyles = {...textStyles, ...ButtonStyles.smSizeTxt}
            break;
        case ButtonSize.LG:
            buttonStyles = {...buttonStyles, ...ButtonStyles.lgSizeBtn}
            textStyles = {...textStyles, ...ButtonStyles.lgSizeTxt}
            break
        default:
            buttonStyles = {...buttonStyles, ...ButtonStyles.mdSizeBtn}
            textStyles = {...textStyles, ...ButtonStyles.mdSizeTxt}
            break
    }
    

    if (buttonType === ButtonType.LINK || buttonType === ButtonType.PLAIN) {
        buttonStyles.paddingHorizontal = 0
        buttonStyles.paddingVertical = 0
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