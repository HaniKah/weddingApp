import {StyleSheet, View} from "react-native";
import Wizard, {WizardSteps} from "@/components/wizard/Wizard";
import {useState} from "react";


export default function Index() {


    const [currentStep, setCurrentStep] = useState<WizardSteps>(WizardSteps.Photographer)
    return (
        <>
            <View style={styles.container}>
                <Wizard/>
            </View>

        </>)


}
const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
})