import WizardHeader from "@/components/wizards/plannerWizard/WizardHeader";
import {Animated} from "react-native";
import {StepsDto} from "@/types/open-api";
import AppCalendar from "@/components/appComponents/AppCalendar";
import {useEffect, useState} from "react";
import AppButton from "@/components/appComponents/AppButton";
import {useApi} from "@/utils/api";
import ScrollView = Animated.ScrollView;


export default function PickDate({onNextStep, onPreviousStep, isFirstStep, isLastStep, currentStep}: {
    onNextStep: () => void,
    onPreviousStep: () => void,
    isFirstStep: boolean,
    isLastStep: boolean,
    currentStep: StepsDto,
}) {

    const API = useApi()

    const [selectedDate, setSelectedDate] = useState<string>(new Date().toLocaleDateString("en-CA"));
    const [loading, setLoading] = useState(false)

    function handleUpdateDate(day: string): void {

        setSelectedDate(day)
    }

    async function storeWeddingDate() {

        if (!selectedDate) return
        try {

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
            const weddingDate = await API.plannerControllerGetWeddingDate()
            if (weddingDate.data.date) {
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
