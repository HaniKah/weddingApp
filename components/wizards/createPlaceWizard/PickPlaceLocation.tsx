import {Text} from "react-native"
import WizardController from "@/components/wizards/WizardController";
import {useWizardContext} from "@/components/wizards/Wizard";
import AppView from "@/components/appComponents/AppView";

export default function PickPlaceLocation() {
    const wizard = useWizardContext()

    function onNext() {
        wizard.nextStep()
    }

    return (
        <>
            <AppView withPadding>
                <Text>
                    this is the location page

                </Text>
            </AppView>
            <WizardController
                onNext={onNext}
                isFirstStep={false}
                isLastStep={false}/>
        </>
    )
}