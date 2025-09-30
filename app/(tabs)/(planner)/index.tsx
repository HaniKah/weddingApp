import {useEffect, useState} from "react";
import {WeddingSteps} from "@/types/open-api";
import {API} from "@/utils/api";
import {ActivityIndicator} from "react-native";
import {Redirect} from "expo-router";

export default function Index() {
    const [currentStep, setCurrentStep] = useState<WeddingSteps>()
    const [isLoading, setLoading] = useState<boolean>(true)

    useEffect(() => {

        const getSteps = async () => {
            try {
                const response = await API.plannerControllerGetSteps()

                setCurrentStep(response.data.steps.find(s => !s.isCompleted)?.step)

                console.log("stepsDto from index: ", response.data)

            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        getSteps()

    }, [])

    return !isLoading ? <Redirect href={`/${currentStep}`}/> : <ActivityIndicator/>
}