import {StyleSheet, Text, View} from "react-native";
import {useTranslation} from "react-i18next";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {UpdateStep, VendorPlaceDetailsDto} from "@/types/open-api";
import RadioButtonElement from "@/components/RadioButtonElement";
import {Theme} from "@/styles/Theme";
import WizardController from "@/components/wizards/WizardController";
import {useApi} from "@/utils/api";
import {useWizardContext} from "@/components/wizards/Wizard";

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
                <Text style={styles.label}>{t("Do you rent dresses ?")}</Text>
                <View style={styles.setup}>
                    <Text>{rent}</Text>

                    <RadioButtonElement
                        value={rent}
                        item={{value: true, name: "Yes"}}
                        onChange={setRent}/>

                    <RadioButtonElement value={data.features.rent}
                                        item={{value: false, name: "No"}}
                                        onChange={setRent}/>
                </View>
            </View>
            <WizardController onNext={wizard.nextStep}/>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        padding: 15,
        marginVertical: "auto",

    },
    setup: {
        flexDirection: "row",
        gap: 50,
        alignItems: "center",
    },
    label: {
        fontSize: Theme.sizes.xl,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 20,
        color: Theme.colors.primary,
        textAlign: "center",

    },

})