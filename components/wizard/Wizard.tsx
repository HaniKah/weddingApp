import {View} from "react-native";
import PickDate from "@/components/wizard/PickDate";
import PickPlace from "@/components/wizard/PickPlace";
import PickDress from "@/components/wizard/PickDress";
import PickPhotographer from "@/components/wizard/PickPhotographer";

export enum WizardSteps {
    Date,
    Place,
    Dress,
    Photographer,
    DJ,
}

type ActiveComponentProps = {
    step: WizardSteps
}
type WizardProps = {
    currentStep: WizardSteps
}

function ActiveComponent({step}: ActiveComponentProps) {
    console.log(step)
    if (step === WizardSteps.Date) {
        return <PickDate/>
    }
    if (step === WizardSteps.Place) {
        return <PickPlace/>
    }
    if (step === WizardSteps.Dress) {
        return <PickDress/>
    }
    if (step === WizardSteps.Photographer) {
        return <PickPhotographer/>
    }
    if (step === WizardSteps.DJ) {
        return <PickPhotographer/>
    }
    //todo : return fallback
}

export default function Wizard({currentStep}: WizardProps) {
    return (
        <View>
            <ActiveComponent step={currentStep}/>
        </View>
    )
}