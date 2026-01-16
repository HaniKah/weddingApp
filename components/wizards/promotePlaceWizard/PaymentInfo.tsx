import {StyleSheet, Text, View} from "react-native";
import WizardController from "@/components/wizards/WizardController";
import {useWizardContext} from "@/components/wizards/Wizard";

export default function PaymentInfo() {
    const wizard = useWizardContext()
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.subtitle}>
                    this is the payment info
                </Text>
                <WizardController isLastStep={true} onNext={wizard.nextStep}/>
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    subtitle: {
        marginBottom: 20,
        fontWeight: "bold"
    }
})