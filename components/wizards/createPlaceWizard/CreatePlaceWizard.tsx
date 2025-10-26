import Wizard, {WizardRef} from "@/components/wizards/Wizard";
import {useRef, useState} from "react";
import WizardStep from "@/components/wizards/WizardStep";
import {Text} from "react-native";
import PickPlaceType from "@/components/wizards/createPlaceWizard/PickPlaceType";
import {WeddingSteps} from "@/types/open-api";
import FillPlaceInfo from "@/components/wizards/createPlaceWizard/FillPlaceInfo";

enum CreatePlaceSteps {
    PickPlaceType = "PickPlaceType",
    FillPlaceInfo = "FillPlaceInfo",
    PickPlaceLocation = "PickPlaceLocation"
}

export default function CreatePlaceWizard() {
    const wizardRef = useRef<WizardRef>(null);

    const stepsList: CreatePlaceSteps[] = Object.values(CreatePlaceSteps);
    const [currentStep, setCurrentStep] = useState<string>(stepsList[0]);

    const [selectedType, setSelectedType] = useState<WeddingSteps | null>(null)


    const onNext = () => {
        wizardRef.current?.nextStep();
    };

    return (
        <>
            <Wizard stepsList={stepsList} currentStep={currentStep} setCurrentStep={setCurrentStep} ref={wizardRef}>
                <WizardStep step={CreatePlaceSteps.PickPlaceType} currentStep={currentStep}>
                    <PickPlaceType onNext={onNext} selectedType={selectedType} setSelectedType={setSelectedType}/>
                </WizardStep>
                <WizardStep step={CreatePlaceSteps.FillPlaceInfo} currentStep={currentStep}>
                    <FillPlaceInfo/>
                </WizardStep>
                <WizardStep step={CreatePlaceSteps.PickPlaceLocation} currentStep={currentStep}>
                    <Text>
                        step 3
                    </Text>
                </WizardStep>
            </Wizard>


        </>
    )
}