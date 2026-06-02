import {View} from "react-native";
import {useWizardContext} from "@/components/wizards/Wizard";
import {useEffect} from "react";

export default function WizardStep<T>({children, step}: {
    children: React.ReactNode,
    step: T,
}) {


    const context = useWizardContext()
    useEffect(() => {
        context.registerStep(step)
    }, []);


    if (context.currentStep === step)
        return (
            <>
                <View style={{flex: 1}}>
                    {children}
                </View>
            </>
        )
}