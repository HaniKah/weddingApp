import WizardHeader from "@/components/wizard/WizardHeader";
import {Animated} from "react-native";
import {StepsDto} from "@/types/open-api";
import AppCalendar from "@/components/appComponents/AppCalendar";
import {useEffect, useState} from "react";
import AppButton from "@/components/appComponents/AppButton";
import {API} from "@/utils/api";
import ScrollView = Animated.ScrollView;


export default function PickDate({onNextStep, onPreviousStep, isFirstStep, isLastStep, currentStep}: {
    onNextStep: () => void,
    onPreviousStep: () => void,
    isFirstStep: boolean,
    isLastStep: boolean,
    currentStep: StepsDto,
}) {
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toLocaleDateString("en-CA"));
    const [loading, setLoading] = useState(false)

    function handleUpdateDate(day: string): void {
        console.log("selected date :", day)
        setSelectedDate(day)
    }

    async function storeWeddingDate() {
        console.log("storing date :", selectedDate)
        if (!selectedDate) return
        try {
            console.log("in the try block")
            setLoading(true)
            await API.plannerControllerUpdateWeddingDate({date: selectedDate})
        } catch (err) {
            console.error("error :", err)
        } finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        const getWeddingDate = async () => {
            console.log("getWeddingDate .....")
            const weddingDate = await API.plannerControllerGetWeddingDate()
            if (weddingDate.data.date) {
                console.log("stored wedding date :", weddingDate.data.date)
                setSelectedDate(weddingDate.data.date)
            }
        }

        getWeddingDate()

    }, []);


    return (
        <>
            <ScrollView>
                <WizardHeader onNextStep={onNextStep} onPreviousStep={onPreviousStep} isFirstStep={isFirstStep}
                              isLastStep={isLastStep} currentStep={currentStep}/>
                <AppCalendar onDateUpdate={handleUpdateDate} markedDate={selectedDate}/>

                <AppButton onPress={storeWeddingDate}>
                    pick this date
                </AppButton>
            </ScrollView>

        </>
    )
}
