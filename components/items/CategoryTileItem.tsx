import {StyleSheet, Text, View} from "react-native";
import {Theme} from "@/styles/Theme";
import {Categories} from "@/types/open-api";
import IconCategory from "@/components/symbols/IconCategory";
import {useTranslation} from "react-i18next";
import AppPressable from "@/components/appComponents/AppPressable";
import {Dispatch, SetStateAction} from "react";

export default function CategoryTileItem({item, selected, setSelected}: {
    item: Categories,
    setSelected: Dispatch<SetStateAction<Categories | undefined>>,
    selected: Categories | undefined
}) {
    const {t} = useTranslation()
    return (
        <AppPressable onPress={() => setSelected(item)}>
            <View style={[styles.container, selected === item && styles.containerSelected]}>
                <IconCategory color={selected === item ? Theme.colors.white : Theme.colors.secondary} size={30}
                              category={item}/>
                <Text style={[styles.label, selected === item && styles.labelSelected]}>{t("categories." + item)}</Text>
            </View>
        </AppPressable>
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
        flexBasis: 100,
        flexGrow: 1,
        height: 100,
    },

    label: {
        color: Theme.colors.secondary,
        marginTop: 10,
        textAlign: "center"
    },
    containerSelected: {
        backgroundColor: Theme.colors.primary
    },
    labelSelected: {
        color: Theme.colors.white
    }

})