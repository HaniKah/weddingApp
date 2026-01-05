import WizardController from "@/components/wizards/WizardController";
import {useWizardContext} from "@/components/wizards/Wizard";
import MapView, {PROVIDER_GOOGLE} from "react-native-maps";
import {StyleSheet, View} from "react-native";

export default function PickPlaceLocation() {
    const wizard = useWizardContext()

    function onNext() {
        wizard.nextStep()
    }

    return (
        <>
            <View style={styles.container}>
                <MapView provider={PROVIDER_GOOGLE} style={styles.map}/>
            </View>
            <WizardController
                onNext={onNext}
                isFirstStep={false}
                isLastStep={false}/>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});