import Wizard, {WizardRef} from "@/components/wizards/Wizard";
import {useRef, useState} from "react";
import WizardStep from "@/components/wizards/WizardStep";
import {Text} from "react-native";
import AppButton from "@/components/appComponents/AppButton";
import PickPlaceType from "@/components/wizards/createPlaceWizard/PickPlaceType";
import {WeddingSteps} from "@/types/open-api";


export default function CreatePlaceWizard() {
    const wizardRef = useRef<WizardRef>(null);

    const stepsList = ["step1", "step2", "step3",]
    const [currentStep, setCurrentStep] = useState<string>(stepsList[0]);

    const [selectedType, setSelectedType] = useState<WeddingSteps | null>(null)


    const onNext = () => {
        wizardRef.current?.nextStep();
    };

    return (
        <>
            <Wizard stepsList={stepsList} currentStep={currentStep} setCurrentStep={setCurrentStep} ref={wizardRef}>
                <WizardStep step="step1" currentStep={currentStep}>
                    <PickPlaceType selectedType={selectedType} setSelectedType={setSelectedType}/>
                </WizardStep>
                <WizardStep step="step2" currentStep={currentStep}>
                    <Text>
                        step 2
                    </Text>
                </WizardStep>
                <WizardStep step="step3" currentStep={currentStep}>
                    <Text>
                        step 3
                    </Text>
                </WizardStep>
            </Wizard>

            <AppButton onPress={onNext} fullWidth extraStylesBtn={{marginVertical: 30}}>
                next
            </AppButton>
        </>
    )
}