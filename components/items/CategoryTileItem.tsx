import {StyleSheet, Text, View} from "react-native";
import {Theme} from "@/styles/Theme";
import {Categories} from "@/types/open-api";
import IconCategory from "@/components/symbols/IconCategory";
import {useTranslation} from "react-i18next";

export default function CategoryTileItem({item}: { item: Categories }) {
    const {t} = useTranslation()
    return (
        <View style={[styles.container, {height: 100}]}>
            <IconCategory color={Theme.colors.secondary} size={30} category={item}/>
            <Text style={styles.label}>{t("categories." + item)}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderRadius: Theme.radius.md,
        backgroundColor: Theme.colors.iconBackground,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "stretch",
        flexGrow: 1,
        minWidth: 100
    },
    label: {
        color: Theme.colors.secondary,
        marginTop: 10,
        textAlign: "center"
    }
})