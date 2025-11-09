import {StyleSheet} from "react-native";
import {Theme} from "@/styles/Theme";

const GeneralButtonStyles = StyleSheet.create({
    general: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: 'flex-start',
        gap: 8
    }
})

export const ButtonStyles = StyleSheet.create({

    primaryBtn: {
        ...GeneralButtonStyles.general,
        backgroundColor: Theme.colors.primary,
    },

    primaryTxt: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },


// ===========================

    outlinedBtn: {
        ...GeneralButtonStyles.general,
        borderStyle: 'solid',
        borderColor: Theme.colors.primary,
        borderWidth: 1.5,
    },
    outlinedTxt: {
        color: Theme.colors.primary,
        textAlign: 'center',

        fontWeight: 'bold',
    },

// ===========================

    inactiveBtn: {
        ...GeneralButtonStyles.general,
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
        ...GeneralButtonStyles.general,

    },
    plainTxt: {
        textAlign: "center",
        color: Theme.colors.primary,
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
        fontSize: Theme.sizes.xs,
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
    },

    // ===========================
    destructiveBtn: {
        borderColor: Theme.colors.red.S500,
    },
    destructiveTxt: {
        color: Theme.colors.red.S500,
    }


})

export enum ButtonType {
    PRIMARY = "PRIMARY",
    OUTLINED = "OUTLINED",
    PLAIN = "PLAIN",
}

export enum ButtonSize {
    SM = "SM",
    MD = "MD",
    LG = "LG",
}