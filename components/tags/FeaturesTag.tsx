import {StyleSheet, Text, View} from "react-native";
import {PlacesFeatures} from "@/types/open-api";
import {Theme} from "@/styles/Theme";
import React from "react";
import {useTranslation} from "react-i18next";

export default function FeaturesTag({features}: { features: PlacesFeatures | undefined }) {
    const {t} = useTranslation();
    // const list = useMemo(() => Object.entries(features).filter(([key, value]) => value), [features])
    if (!features) return null;
    return (
        <View style={styles.container}>
            {Object.entries(features).filter(([_, value]) => value).map(([key, value], index) => (
                <React.Fragment key={key}>
                    {index > 0 && (
                        <Text style={styles.textContent}>•</Text>
                    )}

                    {value &&

                        <Text style={styles.textContent} key={key}>{t("feature." + key)} <Text>{value}</Text></Text>
                    }
                </React.Fragment>
            ))}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 6
    },
    textContent: {
        fontSize: Theme.sizes.xs,
        color: Theme.colors.secondary,
    }
})