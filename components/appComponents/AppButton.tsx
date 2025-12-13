import {Pressable, StyleProp, Text, TextStyle, ViewStyle} from 'react-native';
import {ButtonSize, ButtonStyles, ButtonType} from '@/styles/Button';
import {useFormContext} from '@/contexts/form-context';
import {IconSymbol} from '@/components/symbols/IconSymbol';
import {SFSymbols6_0} from 'sf-symbols-typescript';
import {Theme} from '@/styles/Theme';

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
                                      confirmative,
                                      fullWidth,
                                      underline,
                                      inactive,
                                      textPosition,
                                      fullRound,
                                      disable

                                  }: {
    buttonSize?: 'SM' | 'MD' | 'LG',
    buttonType?: ButtonType,
    isSubmit?: boolean,
    onPress?: (props: any) => void,
    children: React.ReactNode | string,
    extraStylesBtn?: StyleProp<ViewStyle>,
    extraStylesTxt?: StyleProp<TextStyle>,
    icon?: SFSymbols6_0,
    destructive?: boolean,
    confirmative?: boolean,
    fullWidth?: boolean,
    underline?: boolean,
    inactive?: boolean,
    textPosition?: 'LEFT' | 'RIGHT'
    fullRound?: boolean,
    disable?: boolean

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

    } else if (buttonType === ButtonType.PLAIN) {
        buttonStyles = ButtonStyles.plainBtn;
        textStyles = ButtonStyles.plainTxt;
        if (destructive) {
            textStyles = {...textStyles, color: Theme.colors.red.S500};
        }
        if (confirmative) {
            textStyles = {...textStyles, color: Theme.colors.green.S600};
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

    if (inactive) {
        buttonStyles = {...buttonStyles, ...ButtonStyles.inactiveBtn};
        textStyles = {...textStyles, ...ButtonStyles.inactiveTxt};
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
        formContext.setChecking(true);
    }

//if Padding is not working , then probably you want to change the padding-Horizontal/Vertical and not the general padding

    return (
        <Pressable disabled={disable} onPress={isSubmit ? handleSubmit : onPress}
                   style={[buttonStyles, extraStylesBtn]}>
            {icon &&
                <IconSymbol size={iconSize} color={textStyles.color || 'black'} name={icon}/>}
            <Text style={[textStyles, extraStylesTxt]}>
                {children}
            </Text>
        </Pressable>
    );
}