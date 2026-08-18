import {Dispatch, SetStateAction, useCallback, useRef, useState} from "react";
import AppNumberInput from "@/components/appComponents/AppNumberInput";
import {AppForm, FormRef} from "@/contexts/form-context";
import WizardController from "@/components/wizards/WizardController";
import {useApi} from "@/utils/api";
import {UpdateStep, VendorPlaceDetailsDto} from "@/types/open-api";
import {useWizardContext} from "@/components/wizards/Wizard";
import {StyleSheet, Text, View} from "react-native";
import {Theme} from "@/styles/Theme";
import AppCheckbox from "@/components/appComponents/AppCheckbox";
import {useTranslation} from "react-i18next";
import FeaturesHero from "@/components/wizards/createPlaceWizard/FeaturesHero";

export default function AddFeaturesHost({data, setData}: {
    data: VendorPlaceDetailsDto,
    setData: Dispatch<SetStateAction<VendorPlaceDetailsDto | undefined>>
}) {
    const [capacity, setCapacity] = useState<number | undefined>(data.features?.capacity)
    const [outdoor, setOutdoor] = useState<boolean | undefined>(data.features?.outdoor)
    const [indoor, setIndoor] = useState<boolean | undefined>(data.features?.indoor)
    const refForm = useRef<FormRef>(null)
    const {api} = useApi()
    const wizard = useWizardContext();
    const {t} = useTranslation()

    async function updateFeatures() {
        try {
            const res = await api.placesControllerUpdatePlace({
                updateStep: UpdateStep.AddFeatures,
                id: data.id,
                features: {
                    category: data.category,
                    features: {
                        capacity: capacity,
                        outdoor: outdoor,
                        indoor: indoor,
                    }
                }
            })
            setData(res.data)
            wizard.nextStep()
        } catch (err) {
            console.error(err)
        }
    }

    const onNext = useCallback(() => {
        refForm.current?.submit()
    }, [])


    return (
        <>
            <View style={styles.container}>
                <FeaturesHero category={data?.category}/>
                <AppForm onSubmit={updateFeatures} ref={refForm}>
                    <View style={styles.formContainer}>
                        <View>
                            <Text style={styles.question}>{t('wizard.venueCapacityQuestion')}</Text>
                            <AppNumberInput design={2}
                                            name="capacity"
                                            value={capacity}
                                            placeholder={t('wizard.capacityPlaceholder')}
                                            onTextChange={setCapacity}
                            />
                        </View>
                        <View style={styles.questionContainer}>
                            <Text style={styles.question}>{t('wizard.venueSetupQuestion')}</Text>
                            <View style={styles.checkboxesContainer}>
                                <AppCheckbox label={t("feature.outdoor")} value={outdoor} onChange={setOutdoor}/>
                                <AppCheckbox label={t("feature.indoor")} value={indoor} onChange={setIndoor}/>
                            </View>
                        </View>
                    </View>
                </AppForm>
            </View>
            <WizardController onNext={onNext}/>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 40,
        marginTop: 40,
        flex: 1,
    },
    formContainer: {
        gap: 60
    },
    questionContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 10,
    },
    question: {
        fontSize: Theme.sizes.xl,
        fontWeight: 'bold',
        color: Theme.colors.primary,
        marginBottom: 15,
        textAlign: "center",
    },
    description: {
        color: Theme.colors.secondary,
        fontStyle: "italic",
        alignSelf: "center",
        marginBottom: 50,
        textAlign: "center",
        paddingHorizontal: 20
    },
    checkboxesContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 40,
        width: "100%",
    },

})