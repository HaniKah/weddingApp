import {View} from "react-native";

export default function WizardStep<T>({children, currentStep, step}: {
    children: React.ReactNode,
    currentStep: T,
    step: T
}) {

    if (currentStep === step)
        return (
            <>
                <View style={{flex: 1}}>
                    {children}
                </View>
            </>
        )
}