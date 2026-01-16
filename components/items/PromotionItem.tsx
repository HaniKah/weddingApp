import {Pressable, StyleSheet, Text} from "react-native";
import RadioButton from "@/components/nerdy/RadioButton";
import {Theme} from "@/styles/Theme";

export default function PromotionItem({isSelected, title, price, currency, onPress}: {
    isSelected: boolean,
    title: string,
    price: string,
    currency: string
    onPress: () => void
}) {
    return (
        <>
            <Pressable onPress={onPress} style={[styles.container, isSelected && styles.selectedContainer]}>
                <RadioButton isSelected={isSelected}/>
                <Text style={[styles.title, isSelected && styles.selectedTitle]}>{title}</Text>
                <Text style={isSelected && styles.selectedPrice}>{price} {currency}</Text>
            </Pressable>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 25,
        borderWidth: 3,
        borderRadius: Theme.radius.md,
        borderColor: Theme.colors.gray.S200
    },
    selectedContainer: {
        borderColor: Theme.colors.blue.S500,
        borderWidth: 3
    },
    selectedPrice: {
        color: Theme.colors.blue.S500
    },
    title: {
        flex: 1,
        marginHorizontal: 10
    },
    selectedTitle: {
        color: Theme.colors.blue.S500
    }
})