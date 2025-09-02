import {StyleSheet, View} from "react-native";

import {useEffect, useState} from "react";
import PlannerToolbar from "@/components/toolbars/PlannerToolbar";
import PickDate from "@/components/wizard/PickDate";
import {PickPlace} from "@/components/wizard/PickPlace";
import {Api, PlacesViewModel} from "@/types/open-api";

export type ActiveComponentProps = {
    currentStep: WizardSteps
    data: PlacesViewModel
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


const steps: WizardSteps[] = Object.values(WizardSteps)
const API_URL = process.env.EXPO_PUBLIC_API_URL
const {api} = new Api({baseURL: API_URL, withCredentials: true})

export default function Index() {
    const [currentStep, setCurrentStep] = useState<WizardSteps>(WizardSteps.Date)
    const [isLastStep, setIsLastStep] = useState(false)
    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState<PlacesViewModel>()


    useEffect(() => {
        const getPlaces = async (): Promise<void> => {
            const response = await api.placesControllerGetDummyPlaces({step: currentStep})
            setData(response.data)

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


    function ActiveComponent({currentStep, data}: { currentStep: WizardSteps, data: PlacesViewModel | undefined }) {
        if (currentStep === WizardSteps.Date) {
            return <PickDate/>
        }
        return <PickPlace data={data?.result}/>
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