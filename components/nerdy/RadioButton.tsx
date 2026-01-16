import {StyleSheet, View} from "react-native";
import {Theme} from "@/styles/Theme";

export default function RadioButton({isSelected}: { isSelected: boolean }) {
    return (
        <View style={[styles.outer, isSelected && styles.selectedOuter]}>
            {isSelected &&
                <View style={[styles.inner, isSelected && styles.selectedInner]}/>
            }
        </View>
    )
}
const styles = StyleSheet.create({
    outer: {
        borderColor: Theme.colors.primary,
        borderRadius: Theme.radius.full,
        borderWidth: 2,
        padding: 2,
        width: 18,
        height: 18
    },
    inner: {
        backgroundColor: Theme.colors.primary,
        borderRadius: Theme.radius.full,
        height: "100%",
    },
    selectedOuter: {
        borderColor: Theme.colors.blue.S500,
    },
    selectedInner: {
        backgroundColor: Theme.colors.blue.S500,
    }

})