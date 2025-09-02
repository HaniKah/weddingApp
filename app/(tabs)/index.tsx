import {StyleSheet, View} from "react-native";

import {useEffect, useState} from "react";
import PlannerToolbar from "@/components/toolbars/PlannerToolbar";
import PickDate from "@/components/wizard/PickDate";
import {PickPlace} from "@/components/wizard/PickPlace";

export type ActiveComponentProps = {
    currentStep: WizardSteps
    data: PlacesDto[] | null
}

export enum WizardSteps {
    Date = "Date",
    Host = "Host",
    Dress = "Dress",
    Photographer = "Photographer",

}

interface LatLng {
    lng: number
    lat: number
}

export interface PlacesDto {
    placeId?: string;
    businessStatus?: string;
    location?: LatLng;
    name?: string;
    formatted_address?: string;
    formatted_phone_number?: string;
}

const steps: WizardSteps[] = Object.values(WizardSteps)
const API_URL = process.env.EXPO_PUBLIC_API_URL

export default function Index() {
    const [currentStep, setCurrentStep] = useState<WizardSteps>(WizardSteps.Date)
    const [isLastStep, setIsLastStep] = useState(false)
    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState(null)


    useEffect(() => {
        const getPlaces = async () => {
            try {
                const response = await fetch(API_URL + `api/places/getDummyPlaces?step=${currentStep}`)
                const json = await response.json()
                console.log(json)
                setData(json.result)
            } catch (err) {
                console.error(err)
            } finally {

                setLoading(false)
            }

        }

        const checkLastStep = () => {
            if (currentStep === steps[steps.length - 1]) {
                setIsLastStep(true)
            } else {
                setIsLastStep(false)
            }
        }

        getPlaces()
        checkLastStep()
    }, [currentStep])


    function ActiveComponent({currentStep, data}: ActiveComponentProps) {
        if (currentStep === WizardSteps.Date) {
            return <PickDate/>
        }
        return <PickPlace data={data}/>
    }

    function handleSkipEvent() {
        if (currentStep !== steps[steps.length - 1]) {
            const index = steps.indexOf(currentStep)
            const nextStep = steps[index + 1]
            setCurrentStep(nextStep)
        }
    }


    return (
        <>
            <View style={styles.container}>
                <PlannerToolbar currentStep={currentStep} onSkipStep={handleSkipEvent} isLastStep={isLastStep}/>
                <ActiveComponent currentStep={currentStep} data={data}/>
            </View>

        </>)


}
const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
})