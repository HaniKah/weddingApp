import {View} from "react-native";
import {useWizardContext} from "@/components/wizards/Wizard";
import {useEffect} from "react";

export default function WizardStep<T>({children, currentStep, step}: {
    children: React.ReactNode,
    currentStep: T,
    step: T
}) {


    const context = useWizardContext()
    useEffect(() => {
        context.registerStep(step)
    }, []);


    if (currentStep === step)
        return (
            <>
                <View style={{flex: 1}}>
                    {children}
                </View>
            </>
        )
}