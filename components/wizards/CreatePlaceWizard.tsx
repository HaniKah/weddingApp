import Wizard, {WizardRef} from "@/components/wizards/Wizard";
import {useRef, useState} from "react";
import WizardStep from "@/components/wizards/WizardStep";
import {Text} from "react-native";
import AppButton from "@/components/appComponents/AppButton";


export default function CreatePlaceWizard() {
    const wizardRef = useRef<WizardRef>(null);

    const stepsList = ["step1", "step2", "step3",]
    const [currentStep, setCurrentStep] = useState<string>(stepsList[0]);


    const onNext = () => {
        wizardRef.current?.nextStep();
    };

    return (
        <>
            <Wizard stepsList={stepsList} currentStep={currentStep} setCurrentStep={setCurrentStep} ref={wizardRef}>
                <WizardStep step="step1" currentStep={currentStep}>
                    <Text>
                        ######## step 1
                    </Text>
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

            <AppButton onPress={onNext} fullWidth extraStylesBtn={{marginVertical: 40}}>
                next
            </AppButton>
        </>
    )
}