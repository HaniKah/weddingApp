import Toolbar from "@/components/Toolbar";

import {Pressable, StyleSheet, Text} from "react-native";
import {WizardSteps} from "@/app/(tabs)";
import {Theme} from "@/constants/Theme";

export default function PlannerToolbar({currentStep, onSkipStep, isLastStep}: {
    currentStep: WizardSteps,
    onSkipStep: () => void,
    isLastStep: boolean,
}) {
    return (
        <>
            <Toolbar>
                {!isLastStep &&
                    <Pressable style={styles.skipBtn} onPress={() => onSkipStep()}>
                        <Text style={styles.skipTxt}>Skip</Text>
                    </Pressable>
                }
            </Toolbar>

        </>
    )
}
const styles = StyleSheet.create({
    skipBtn: {
        alignSelf: 'flex-end',
    },
    skipTxt: {
        color: Theme.colors.primary
    }
})