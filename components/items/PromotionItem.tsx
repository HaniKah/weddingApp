import {Pressable, StyleSheet, Text, View} from "react-native";
import {Theme} from "@/styles/Theme";

import {useTranslation} from "react-i18next";


export default function PromotionItem({isSelected, title, price, onPress}: {
    isSelected: boolean,
    title: string,
    price: string,
    onPress: () => void
}) {
    const {t} = useTranslation();
    return (
        <>
            <Pressable onPress={onPress} style={[styles.container, isSelected && styles.selectedContainer]}>
                {/*<RadioButton isSelected={isSelected}/>*/}
                <View>
                    <Text style={[styles.title, isSelected && styles.selectedTitle]}>{title}</Text>
                    <Text
                        style={[styles.description, isSelected && styles.selectedTitle]}>{t('promotion.months')}</Text>
                </View>
                <Text style={[styles.price, isSelected && styles.selectedPrice]}>{price}</Text>
                {/*<Text style={isSelected && styles.selectedPrice}>{period}</Text>*/}
                {/*<Text style={isSelected && styles.selectedPrice}>{pkgIdentifier}</Text>*/}
            </Pressable>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        padding: 10,
        borderWidth: 3,
        borderRadius: Theme.radius.md,
        borderColor: Theme.colors.gray.S200,
        backgroundColor: Theme.colors.gray.S200,
    },
    title: {
        fontSize: Theme.sizes.xxl,
        fontWeight: "bold",
        textAlign: "center"
    },
    description: {
        textAlign: "center"
    },

    price: {
        textAlign: "center",
        fontWeight: "bold",
    },


    selectedContainer: {
        borderColor: Theme.colors.blue.S500,
        borderWidth: 3
    },
    selectedTitle: {
        color: Theme.colors.blue.S500
    },
    selectedPrice: {
        color: Theme.colors.blue.S500
    },
})