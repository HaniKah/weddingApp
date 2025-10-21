import {useEffect, useState} from "react";
import {WeddingSteps} from "@/types/open-api";
import {API} from "@/utils/api";
import {ActivityIndicator} from "react-native";
import {Redirect} from "expo-router";
import {getItem} from "expo-secure-store";

export default function Index() {
    const [currentStep, setCurrentStep] = useState<WeddingSteps>()

    console.log("my access token", getItem("accessToken"))

    useEffect(() => {

        const getSteps = async () => {
            try {
                const response = await API.plannerControllerGetSteps()
                setCurrentStep(response.data.steps.find(s => !s.isCompleted)?.step || WeddingSteps.Date)


            } catch (err) {
                console.error(err)
            } finally {

            }
        }
        getSteps()

    }, [])

    return currentStep ? <Redirect href={`/${currentStep}`}/> : <ActivityIndicator/>
}