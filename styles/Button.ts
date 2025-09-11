import {StyleSheet} from "react-native";
import {Theme} from "@/styles/Theme";

export const ButtonStyles = StyleSheet.create({
    primaryBtn: {
        backgroundColor: Theme.colors.primary,
        color: 'white',
        fontWeight: 'bold',
        paddingHorizontal: 20,
        paddingVertical: 14,
        width: 100,
        textAlign: 'center',
        borderRadius: 8,
    },
    outlinedBtn: {
        backgroundColor: "transparent",
        color: Theme.colors.primary,
        borderStyle: 'solid',
        fontWeight: 'bold',
        paddingHorizontal: 20,
        paddingVertical: 10,
        width: 100,
        textAlign: 'center',
        borderRadius: 5,
    },
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
    }
})