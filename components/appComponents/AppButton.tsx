import {Pressable, StyleProp, Text, TextStyle, ViewStyle} from 'react-native';
import {ButtonSize, ButtonStyles, ButtonType} from '@/styles/Button';
import {useFormContext} from '@/contexts/form-context';
import {IconSymbol} from '@/components/symbols/IconSymbol';
import {SFSymbols6_0} from 'sf-symbols-typescript';
import {Theme} from '@/styles/Theme';
import {SvgProps} from "react-native-svg";
import {FC} from "react";

export default function AppButton({
                                      buttonType,
                                      buttonSize,
                                      isSubmit,
                                      onPress,
                                      children,
                                      extraStylesBtn,
                                      extraStylesTxt,
                                      icon,
                                      CustomIcon,
                                      destructive,
                                      confirmative,
                                      informative,
                                      fullWidth,
                                      underline,
                                      inactive,
                                      textPosition,
                                      fullRound,


                                  }: {
    buttonSize?: 'SM' | 'MD' | 'LG',
    buttonType?: ButtonType,
    isSubmit?: boolean,
    onPress?: (props: any) => void,
    children: React.ReactNode | string,
    extraStylesBtn?: StyleProp<ViewStyle>,
    extraStylesTxt?: StyleProp<TextStyle>,
    icon?: SFSymbols6_0,
    CustomIcon?: FC<SvgProps>,
    destructive?: boolean,
    confirmative?: boolean,
    informative?: boolean,
    fullWidth?: boolean,
    underline?: boolean,
    inactive?: boolean,
    textPosition?: 'LEFT' | 'RIGHT'
    fullRound?: boolean,


}) {
    let buttonStyles: StyleProp<ViewStyle> = {};
    let textStyles: StyleProp<TextStyle> = {};
    let iconSize: number;


    if (buttonType === ButtonType.OUTLINED) {
        buttonStyles = ButtonStyles.outlinedBtn;
        textStyles = ButtonStyles.outlinedTxt;
        if (destructive) {
            buttonStyles = {...buttonStyles, borderColor: Theme.colors.red.S500};
            textStyles = {...textStyles, color: Theme.colors.red.S500};
        }
        if (confirmative) {
            buttonStyles = {...buttonStyles, borderColor: Theme.colors.green.S500};
            textStyles = {...textStyles, color: Theme.colors.green.S500};
        }
        if (informative) {
            buttonStyles = {...buttonStyles, borderColor: Theme.colors.blue.S500};
            textStyles = {...textStyles, color: Theme.colors.blue.S500};
        }
        if (inactive) {
            buttonStyles = {...buttonStyles, borderColor: Theme.colors.gray.S300};
            textStyles = {...textStyles, color: Theme.colors.gray.S500};
        }

    } else if (buttonType === ButtonType.PLAIN) {
        buttonStyles = ButtonStyles.plainBtn;
        textStyles = ButtonStyles.plainTxt;
        if (destructive) {
            textStyles = {...textStyles, color: Theme.colors.red.S500};
        }
        if (confirmative) {
            textStyles = {...textStyles, color: Theme.colors.green.S600};
        }
        if (informative) {
            textStyles = {...textStyles, color: Theme.colors.blue.S500};
        }
        if (inactive) {
            textStyles = {...textStyles, color: Theme.colors.gray.S500};
        }
    } else {
        buttonStyles = ButtonStyles.primaryBtn;
        textStyles = ButtonStyles.primaryTxt;
        if (destructive) {
            buttonStyles = {...buttonStyles, backgroundColor: Theme.colors.red.S100};
            textStyles = {...textStyles, color: Theme.colors.red.S500};
        }
        if (confirmative) {
            buttonStyles = {...buttonStyles, backgroundColor: Theme.colors.green.S100};
            textStyles = {...textStyles, color: Theme.colors.green.S600};
        }
        if (informative) {
            buttonStyles = {...buttonStyles, backgroundColor: Theme.colors.blue.S100};
            textStyles = {...textStyles, color: Theme.colors.blue.S500};
        }
        if (inactive) {
            buttonStyles = {...buttonStyles, backgroundColor: Theme.colors.gray.S300};
            textStyles = {...textStyles, color: Theme.colors.gray.S600};
        }
    }

    switch (buttonSize) {
        case ButtonSize.SM:
            buttonStyles = {...buttonStyles, ...ButtonStyles.smSizeBtn};
            textStyles = {...textStyles, ...ButtonStyles.smSizeTxt};
            iconSize = Theme.sizes.lg;
            break;
        case ButtonSize.LG:
            buttonStyles = {...buttonStyles, ...ButtonStyles.lgSizeBtn};
            textStyles = {...textStyles, ...ButtonStyles.lgSizeTxt};
            iconSize = Theme.sizes.xxl;
            break;
        default:
            buttonStyles = {...buttonStyles, ...ButtonStyles.mdSizeBtn};
            textStyles = {...textStyles, ...ButtonStyles.mdSizeTxt};
            iconSize = Theme.sizes.xl;
            break;
    }

    if (buttonType === ButtonType.PLAIN) {
        buttonStyles.paddingHorizontal = 0;
        buttonStyles.paddingVertical = 0;
    }


    if (underline) {
        textStyles.textDecorationLine = 'underline';
    }
    if (fullWidth) {
        buttonStyles.alignSelf = 'stretch';
    }
    if (fullRound) {
        buttonStyles.borderRadius = Theme.radius.full
    }

    switch (textPosition) {
        case "LEFT":
            buttonStyles.justifyContent = 'flex-start';
            break;
        case "RIGHT":
            buttonStyles.justifyContent = 'flex-end';
            break;
    }

    const formContext = useFormContext();

    function handleSubmit() {
        formContext.setSubmitting(true)
    }


//if Padding is not working , then probably you want to change the padding-Horizontal/Vertical and not the general padding

    return (
        <Pressable disabled={inactive} onPress={isSubmit ? handleSubmit : onPress}
                   style={[buttonStyles, extraStylesBtn]}>
            {CustomIcon && <CustomIcon/>}
            {icon &&
                <IconSymbol size={iconSize} color={textStyles.color || 'black'} name={icon}/>}
            <Text style={[textStyles, extraStylesTxt]}>
                {children}
            </Text>
        </Pressable>
    );
}