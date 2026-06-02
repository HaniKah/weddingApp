import {StyleSheet, Text, View} from "react-native";
import {useTranslation} from "react-i18next";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {Categories, UpdateStep, VendorPlaceDetailsDto} from "@/types/open-api";
import RadioButtonElement from "@/components/RadioButtonElement";
import {Theme} from "@/styles/Theme";
import WizardController from "@/components/wizards/WizardController";
import {useApi} from "@/utils/api";
import {useWizardContext} from "@/components/wizards/Wizard";
import IconCategory from "@/components/symbols/IconCategory";

export default function AddFeaturesDress({data, setData}: {
    data: VendorPlaceDetailsDto,
    setData: Dispatch<SetStateAction<VendorPlaceDetailsDto | undefined>>
}) {
    const [rent, setRent] = useState<boolean | undefined>(data.features?.rent)
    const {api} = useApi()
    const wizard = useWizardContext();
    const {t} = useTranslation()


    useEffect(() => {
        async function updateFeatures() {
            try {
                const res = await api.placesControllerUpdatePlace({
                    updateStep: UpdateStep.AddFeatures,
                    id: data.id,
                    features: {
                        category: data.category,
                        features: {
                            rent: rent,
                        }
                    }
                })
                setData(res.data)
            } catch (err) {
                console.error(err)
            }
        }

        updateFeatures()
    }, [rent])


    return (
        <>
            <View style={styles.container}>
                <View style={styles.iconContainer}>
                    <IconCategory color={Theme.colors.primary} size={100} category={Categories.Dress}/>
                </View>
                <Text style={styles.subtitle}>{t("Quick question about your listing.")}</Text>
                <Text style={styles.label}>{t("Do you offer dress rentals ?")}</Text>
                <Text
                    style={styles.subtitle}>{t("Customers love knowing what’s available before they visit your boutique.")}</Text>
                <View style={styles.setup}>
                    <Text>{rent}</Text>

                    <RadioButtonElement
                        icon="checkmark"
                        value={rent}
                        item={{value: true, name: "Yes, we do"}}
                        onChange={setRent}/>

                    <RadioButtonElement
                        icon="xmark"
                        value={data.features.rent}
                        item={{value: false, name: "No, not yet"}}
                        onChange={setRent}/>
                </View>
            </View>
            <WizardController onNext={wizard.nextStep}/>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 40,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",

    },
    iconContainer: {
        backgroundColor: Theme.colors.iconBackground,
        borderRadius: Theme.radius.full,
        alignSelf: "center",
        padding: 30,
        marginBottom: 20
    },
    subtitle: {
        color: Theme.colors.secondary,
        fontStyle: "italic",
        alignSelf: "center",
        marginBottom: 50,
        textAlign: "center",
        paddingHorizontal: 20

    },

    label: {
        fontSize: Theme.sizes.xl,
        fontWeight: 'bold',
        color: Theme.colors.primary,
        textAlign: "center",
        marginBottom: 10,
        textIndent: "center"

    },
    setup: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
})