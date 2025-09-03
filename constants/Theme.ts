import {StyleSheet} from "react-native";

export const Theme = {
    colors: {
        primary: '#8D6A3C',
        primaryInactive: '#c2b39f',
        background: '#F0F0F0',
        gold1: '#E5C280',
        gold2: '#A97E65',
        iconBackground: '#e5e2df'
    },
    typography: {
        meaCulpa: 'Mea Culpa, cursive', // this is not final , it needs to be configured correctly: https://docs.expo.dev/develop/user-interface/fonts/
    },

};

export const ComponentStyles = StyleSheet.create({
    primaryBtn: {
        backgroundColor: Theme.colors.primary,
        color: 'white',
        fontWeight: 'bold',
        paddingHorizontal: 20,
        paddingVertical: 10,
        width: 100,
        textAlign: 'center',
        borderRadius: 5,
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
