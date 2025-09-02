import {StyleSheet, View} from "react-native";

import {useEffect, useState} from "react";
import PlannerToolbar from "@/components/toolbars/PlannerToolbar";
import PickDate from "@/components/wizard/PickDate";
import {PickPlace} from "@/components/wizard/PickPlace";
import {Api, PlacesViewModel, WeddingSteps} from "@/types/open-api";

export type ActiveComponentProps = {
    currentStep: WeddingSteps
    data: PlacesViewModel
}


interface LatLng {
    lng: number
    lat: number
}


const API_URL = process.env.EXPO_PUBLIC_API_URL
const {api} = new Api({baseURL: API_URL, withCredentials: true})


export default function Index() {
    const [currentStep, setCurrentStep] = useState<WeddingSteps>(WeddingSteps.Date)
    const [steps, setSteps] = useState<WeddingSteps[]>([])
    const [isLastStep, setIsLastStep] = useState(false)
    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState<PlacesViewModel>()


    useEffect(() => {
        const getSteps = async () => {
            const response = await api.placesControllerGetSteps()
            console.log("currentStep", response.data.currentStep)
            setCurrentStep(response.data.currentStep)
            setSteps(response.data.steps)
        }
        getSteps()

    }, [])
    useEffect(() => {
        const getPlaces = async (): Promise<void> => {
            const response = await api.placesControllerGetPlaces({step: currentStep})
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
    }, [currentStep, steps]);


    function ActiveComponent({currentStep, data}: { currentStep: WeddingSteps, data: PlacesViewModel | undefined }) {
        if (currentStep === WeddingSteps.Date) {
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