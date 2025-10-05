import {StyleSheet} from "react-native";
import {Theme} from "@/styles/Theme";

export const ButtonStyles = StyleSheet.create({
    primaryBtn: {
        backgroundColor: Theme.colors.primary,
        paddingHorizontal: 20,
        paddingVertical: 14,
        borderRadius: Theme.sizes.buttonRadius,
    },
    primaryTxt: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: Theme.sizes.buttonText,
        textAlign: 'center',
        width: "100%",
    },

// ===========================

    outlinedBtn: {
        backgroundColor: "transparent",
        color: Theme.colors.primary,
        borderStyle: 'solid',
        fontWeight: 'bold',
        paddingHorizontal: 20,
        paddingVertical: 10,
        textAlign: 'center',
        borderRadius: Theme.sizes.buttonRadius,
        borderColor: Theme.colors.primary,
        borderWidth: 1.5,
    },
    outlinedTxt: {
        color: Theme.colors.primary,
        fontSize: Theme.sizes.buttonText,
        textAlign: 'center',
        width: "100%",
    },

// ===========================

    inactiveBtn: {
        backgroundColor: Theme.colors.primaryInactive,
        color: 'white',
        fontWeight: 'normal',
        paddingHorizontal: 20,
        paddingVertical: 14,
        textAlign: 'center',
        borderRadius: Theme.sizes.buttonRadius,
        pointerEvents: "none",
    },
    inactiveTxt: {
        color: Theme.colors.primaryTextInactive,
        fontSize: Theme.sizes.buttonText,
        textAlign: 'center',
        width: "100%",
        pointerEvents: "none",
    },

// ===========================

    plainBtn: {
        width: "auto"
    },
    plainTxt: {
        textAlign: "center",
        color: Theme.colors.primary,
    },

// ===========================

    linkBtn: {
        width: "auto"
    },
    linkTxt: {
        textAlign: "center",
        color: Theme.colors.primary,
        textDecorationLine: "underline",
    },

// ===========================

    iconBtn: {
        width: 30,
        height: 30,
        padding: 4,
        backgroundColor: Theme.colors.iconBackground,
        color: Theme.colors.primary,
        borderRadius: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

})

export enum ButtonType {
    PRIMARY = "PRIMARY",
    OUTLINED = "OUTLINED",
    INACTIVE = "INACTIVE",
    PLAIN = "PLAIN",
    LINK = "LINK"
}