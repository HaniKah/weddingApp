import {StyleSheet} from "react-native";
import {Theme} from "@/styles/Theme";

export const CommonStyles = StyleSheet.create({
    dataNotFound: {
        fontSize: Theme.sizes.md,
        fontStyle: 'italic',
        textAlign: 'center',
        color: Theme.colors.gray.S600,
        marginVertical: 50,
    }
})