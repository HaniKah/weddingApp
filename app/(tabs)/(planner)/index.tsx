import {useEffect, useState} from "react";
import {WeddingSteps} from "@/types/open-api";

import {ActivityIndicator} from "react-native";
import {Redirect} from "expo-router";
import {useApi} from "@/utils/api";

export default function Index() {

    const API = useApi()
    const [currentStep, setCurrentStep] = useState<WeddingSteps>()


    useEffect(() => {
        const getSteps = async () => {
            try {
                const response = await API.plannerControllerGetSteps()
                setCurrentStep(response.data.steps.find(s => !s.isCompleted)?.step || WeddingSteps.Host)


            } catch (err) {
                console.error(err)
            } finally {

            }
        }
        getSteps()
    }, [])

    return currentStep ? <Redirect href={`/${currentStep}`}/> : <ActivityIndicator/>
}