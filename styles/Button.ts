import {StyleSheet} from "react-native";
import {Theme} from "@/styles/Theme";

export const ButtonStyles = StyleSheet.create({

    primaryBtn: {
        backgroundColor: Theme.colors.primary,

    },

    primaryTxt: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },

// ===========================

    outlinedBtn: {
        backgroundColor: "transparent",
        color: Theme.colors.primary,
        borderStyle: 'solid',
        fontWeight: 'bold',
        textAlign: 'center',
        borderColor: Theme.colors.primary,
        borderWidth: 1.5,
    },
    outlinedTxt: {
        color: Theme.colors.primary,
        textAlign: 'center',
        width: "100%",
    },

// ===========================

    inactiveBtn: {
        backgroundColor: Theme.colors.primaryInactive,
        color: 'white',
        fontWeight: 'normal',
        textAlign: 'center',
        pointerEvents: "none",
    },
    inactiveTxt: {
        color: Theme.colors.primaryTextInactive,
        textAlign: 'center',
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
        borderRadius: Theme.radius.full,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
// ===========================

    smSizeBtn: {
        borderRadius: Theme.radius.sm,
        paddingHorizontal: 14,
        paddingVertical: 8,
    },
    smSizeTxt: {
        fontSize: Theme.sizes.sm,
    },


    mdSizeBtn: {
        borderRadius: Theme.radius.md,
        paddingHorizontal: 20,
        paddingVertical: 14,
    },
    mdSizeTxt: {
        fontSize: Theme.sizes.md,
    },

    lgSizeBtn: {
        borderRadius: Theme.radius.md,
        paddingHorizontal: 24,
        paddingVertical: 18,
    },
    lgSizeTxt: {
        fontSize: Theme.sizes.lg,
    }

})

export enum ButtonType {
    PRIMARY = "PRIMARY",
    OUTLINED = "OUTLINED",
    INACTIVE = "INACTIVE",
    PLAIN = "PLAIN",
    LINK = "LINK",
}

export enum ButtonSize {
    SM = "SM",
    MD = "MD",
    LG = "LG",
}