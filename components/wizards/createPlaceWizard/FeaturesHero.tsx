import {StyleSheet, Text, View} from "react-native";
import IconCategory from "@/components/symbols/IconCategory";
import {Categories} from "@/types/open-api";
import {Theme} from "@/styles/Theme";
import {useTranslation} from "react-i18next";

export default function FeaturesHero({category,}: { category: Categories }) {
    const {t} = useTranslation()

    return (

        <View>
            <View style={styles.iconContainer}>
                <IconCategory color={Theme.colors.primary} size={100} category={category}/>
            </View>
            <Text style={styles.description}>{t("Quick question about your listing.")}</Text>
        </View>

    )
}
const styles = StyleSheet.create({
    iconContainer: {
        backgroundColor: Theme.colors.iconBackground,
        borderRadius: Theme.radius.full,
        alignSelf: "center",
        padding: 30,
        marginBottom: 20
    },
    description: {
        color: Theme.colors.secondary,
        fontStyle: "italic",
        alignSelf: "center",
        marginBottom: 50,
        textAlign: "center",
        paddingHorizontal: 20

    },
})