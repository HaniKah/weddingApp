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
        paddingHorizontal: 20,
        paddingVertical: 10,
        textAlign: 'center',
        borderRadius: Theme.radius.sm,
        borderColor: Theme.colors.primary,
        borderWidth: 1.5,
    },
    outlinedTxt: {
        color: Theme.colors.primary,
        fontSize: Theme.sizes.md,
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
        borderRadius: Theme.radius.lg,
        pointerEvents: "none",
    },
    inactiveTxt: {
        color: Theme.colors.primaryTextInactive,
        fontSize: Theme.sizes.md,
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
        borderRadius: Theme.radius.full,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
// ===========================

    smSizeBtn: {
        borderRadius: Theme.radius.xs,
        paddingHorizontal: 14,
        paddingVertical: 10,
    },
    smSizeTxt: {
        fontSize: Theme.sizes.sm,
    },


    mdSizeBtn: {
        borderRadius: Theme.radius.sm,
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