import Toolbar from "@/components/Toolbar";
import {IconSymbol} from "@/components/ui/IconSymbol";
import {Theme} from "@/constants/Theme";
import {StyleSheet, View} from "react-native";
import Wizard, {WizardSteps} from "@/components/wizard/Wizard";
import {useState} from "react";


export default function Index() {


    const [currentStep, setCurrentStep] = useState<WizardSteps>(WizardSteps.Photographer)
    return (
        <>
            <Toolbar>
                <IconSymbol size={24} name="checklist" color={Theme.colors.primary}/>
            </Toolbar>
            <View style={styles.container}>
                <Wizard currentStep={currentStep}/>
            </View>

        </>)


}
const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
})