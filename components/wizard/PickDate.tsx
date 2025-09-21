import WizardHeader from "@/components/wizard/WizardHeader";
import {Animated} from "react-native";
import {StepsDto} from "@/types/open-api";
import AppCalendar from "@/components/wizard/AppCalendar";
import {useState} from "react";
import AppButton from "@/components/appComponent/AppButton";
import ScrollView = Animated.ScrollView;

const today = new Date()

export default function PickDate({onNextStep, onPreviousStep, isFirstStep, isLastStep, currentStep}: {
    onNextStep: () => void,
    onPreviousStep: () => void,
    isFirstStep: boolean,
    isLastStep: boolean,
    currentStep: StepsDto,
}) {
    const [selectedDate, setSelectedDate] = useState<Date>();

    function handleUpdateDate(date: Date) {
        setSelectedDate(date)
    }

    function storeWeddingDate() {
        console.log(selectedDate)
    }


    return (
        <>
            <ScrollView>
                <WizardHeader onNextStep={onNextStep} onPreviousStep={onPreviousStep} isFirstStep={isFirstStep}
                              isLastStep={isLastStep} currentStep={currentStep}/>
                <AppCalendar onDateUpdate={handleUpdateDate} date={today}/>

                <AppButton onPress={storeWeddingDate}>
                    pick this date
                </AppButton>
            </ScrollView>

        </>
    )
}
