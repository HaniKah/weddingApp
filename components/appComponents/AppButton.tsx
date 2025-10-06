import {Pressable, StyleProp, Text, TextStyle, ViewStyle} from "react-native";
import {ButtonSize, ButtonStyles, ButtonType} from "@/styles/Button";
import {useFormContext} from "@/contexts/FormContext";
import {IconSymbol} from "@/components/symbols/IconSymbol";
import {SFSymbols6_0} from "sf-symbols-typescript";
import {Theme} from "@/styles/Theme";

export default function AppButton({
                                      buttonType,
                                      buttonSize,
                                      isSubmit,
                                      onPress,
                                      children,
                                      extraStylesBtn,
                                      extraStylesTxt,
                                      icon,
                                      destructive,
                                      fullWidth,
                                      underline,
                                      inactive

                                  }: {
    buttonSize?: "SM" | "MD" | "LG",
    buttonType?: ButtonType,
    isSubmit?: boolean,
    onPress?: () => void,
    children: React.ReactNode | string,
    extraStylesBtn?: StyleProp<ViewStyle>,
    extraStylesTxt?: StyleProp<TextStyle>,
    icon?: SFSymbols6_0,
    destructive?: boolean,
    fullWidth?: boolean,
    underline?: boolean,
    inactive?: boolean,

}) {
    let buttonStyles: StyleProp<ViewStyle> = {}
    let textStyles: StyleProp<TextStyle> = {}
    let iconSize: number


    if (buttonType === ButtonType.OUTLINED) {
        buttonStyles = ButtonStyles.outlinedBtn;
        textStyles = ButtonStyles.outlinedTxt;
        if (destructive) {
            buttonStyles = {...buttonStyles, borderColor: Theme.colors.red.S500}
            textStyles = {...textStyles, color: Theme.colors.red.S500}
        }

    } else if (buttonType === ButtonType.PLAIN) {
        buttonStyles = ButtonStyles.plainBtn;
        textStyles = ButtonStyles.plainTxt;
        buttonStyles.paddingHorizontal = 0
        buttonStyles.paddingVertical = 0
        if (destructive) {
            textStyles = {...textStyles, color: Theme.colors.red.S500}
        }
    } else {
        buttonStyles = ButtonStyles.primaryBtn;
        textStyles = ButtonStyles.primaryTxt;
        if (destructive) {
            buttonStyles = {...buttonStyles, backgroundColor: Theme.colors.red.S100}
            textStyles = {...textStyles, color: Theme.colors.red.S500}
        }
    }

    switch (buttonSize) {
        case ButtonSize.SM:
            buttonStyles = {...buttonStyles, ...ButtonStyles.smSizeBtn}
            textStyles = {...textStyles, ...ButtonStyles.smSizeTxt}
            iconSize = Theme.sizes.lg
            break;
        case ButtonSize.LG:
            buttonStyles = {...buttonStyles, ...ButtonStyles.lgSizeBtn}
            textStyles = {...textStyles, ...ButtonStyles.lgSizeTxt}
            iconSize = Theme.sizes.xxl
            break
        default:
            buttonStyles = {...buttonStyles, ...ButtonStyles.mdSizeBtn}
            textStyles = {...textStyles, ...ButtonStyles.mdSizeTxt}
            iconSize = Theme.sizes.xl
            break
    }


    if (fullWidth) {
        buttonStyles.alignSelf = "stretch"
    }

    if (underline) {
        textStyles.textDecorationLine = "underline"
    }


    const formContext = useFormContext()

    function handleSubmit() {
        formContext.setChecking(true)
    }


    return (
        <Pressable onPress={isSubmit ? handleSubmit : onPress} style={[buttonStyles, extraStylesBtn]}>
            {icon && <IconSymbol size={iconSize} color={textStyles.color || "black"} name={icon}/>}
            <Text style={[textStyles, extraStylesTxt]}>
                {children}
            </Text>
        </Pressable>
    )
}