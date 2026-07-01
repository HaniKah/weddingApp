import {StyleSheet, Text, View} from "react-native";
import {useTranslation} from "react-i18next";
import {Dispatch, SetStateAction, useState} from "react";
import {UpdateStep, VendorPlaceDetailsDto} from "@/types/open-api";
import RadioButtonElement from "@/components/RadioButtonElement";
import {Theme} from "@/styles/Theme";
import WizardController from "@/components/wizards/WizardController";
import {useApi} from "@/utils/api";
import {useWizardContext} from "@/components/wizards/Wizard";
import FeaturesHero from "@/components/wizards/createPlaceWizard/FeaturesHero";
import {showSnackbar} from "@/components/Snackbar";
import AppView from "@/components/appComponents/AppView";

export default function AddFeaturesDress({data, setData}: {
    data: VendorPlaceDetailsDto,
    setData: Dispatch<SetStateAction<VendorPlaceDetailsDto | undefined>>
}) {
    const [rent, setRent] = useState<boolean | undefined>(data.features?.rent)
    const [isLoading, setIsLoading] = useState(false)
    const {api} = useApi()
    const wizard = useWizardContext();
    const {t} = useTranslation()


    async function updateFeatures() {
        try {
            setIsLoading(true)
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
        } catch {
            showSnackbar("unknown error", "error")
        } finally {
            setIsLoading(false)
        }
    }

    async function handleNext() {
        await updateFeatures()
        wizard.nextStep()
    }


    return (
        <>
            <AppView isLoading={isLoading} extraStyles={styles.container}>
                <FeaturesHero category={data?.category}/>
                <Text style={styles.question}>{t("Do you offer dress rentals ?")}</Text>
                <Text
                    style={styles.description}>{t("Customers love knowing what’s available before they visit your boutique.")}</Text>
                <View style={styles.setup}>
                    <Text>{rent}</Text>

                    <RadioButtonElement
                        icon="checkmark"
                        value={rent}
                        item={{value: true, name: "Yes, we do"}}
                        onChange={setRent}/>

                    <RadioButtonElement
                        icon="xmark"
                        value={rent}
                        item={{value: false, name: "No, not yet"}}
                        onChange={setRent}/>
                </View>
            </AppView>
            <WizardController onNext={handleNext}/>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 40,
        marginTop: 40,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    question: {
        fontSize: Theme.sizes.xl,
        fontWeight: 'bold',
        color: Theme.colors.primary,
        textAlign: "center",
        marginBottom: 10,
    },
    description: {
        color: Theme.colors.secondary,
        fontStyle: "italic",
        alignSelf: "center",
        marginBottom: 50,
        textAlign: "center",
        paddingHorizontal: 20
    },
    setup: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
})