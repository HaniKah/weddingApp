import {Dispatch, SetStateAction, useRef, useState} from "react";
import AppNumberInput from "@/components/appComponents/AppNumberInput";
import {AppForm, FormRef} from "@/contexts/form-context";
import WizardController from "@/components/wizards/WizardController";
import {useApi} from "@/utils/api";
import {UpdateStep, VendorPlaceDetailsDto} from "@/types/open-api";
import {useWizardContext} from "@/components/wizards/Wizard";
import {StyleSheet, Text, View} from "react-native";
import {Theme} from "@/styles/Theme";
import AppCheckbox from "@/components/appComponents/AppCheckbox";

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


    return (
        <>
            <View style={styles.container}>
                <AppForm onSubmit={updateFeatures} ref={refForm}>
                    <Text style={styles.labelCapacity}>How many guests can your venue accommodate ?</Text>
                    <AppNumberInput design={2}
                                    name="capacity"
                                    value={capacity}
                                    placeholder="e.g. 500"
                                    required
                                    onTextChange={setCapacity}/>

                    <Text style={styles.labelCapacity}>Venue setup?</Text>
                    <View style={styles.setup}>
                        <AppCheckbox label={"Outdoor"} value={outdoor} onChange={setOutdoor}/>
                        <AppCheckbox label={"Indoor"} value={indoor} onChange={setIndoor}/>
                    </View>

                </AppForm>
            </View>
            <WizardController onNext={refForm.current?.submit}/>

        </>
    )
}
const styles = StyleSheet.create({
    container: {
        padding: 15,
        marginBottom: 100,
    },
    labelCapacity: {
        fontSize: Theme.sizes.xl,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 20,
        color: Theme.colors.primary
    },
    setup: {
        flexDirection: "row",
        gap: 50,
        alignItems: "center",
    },

})