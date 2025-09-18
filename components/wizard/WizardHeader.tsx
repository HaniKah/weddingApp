import {Pressable, StyleSheet, Text, View} from "react-native";
import {IconSymbol} from "@/components/ui/IconSymbol";
import {Theme} from "@/styles/Theme";
import {StepsDto} from "@/types/open-api";

export default function WizardHeader({onNextStep, onPreviousStep, isFirstStep, isLastStep, currentStep}: {
    onNextStep: () => void,
    onPreviousStep: () => void
    isFirstStep: boolean,
    isLastStep: boolean,
    currentStep: StepsDto
}) {
    return (
        <>
            <View style={styles.headingContainer}>
                <Pressable style={isFirstStep && styles.buttonsHidden} onPress={onPreviousStep}>
                    <IconSymbol name="arrow.left" color={Theme.colors.primary} weight="thin"/>
                </Pressable>

                <Text style={styles.headingText}>
                    {currentStep.title}
                </Text>

                <Pressable style={isLastStep && styles.buttonsHidden} onPress={onNextStep}>
                    <IconSymbol name="arrow.right" color={Theme.colors.primary} weight="thin"/>
                </Pressable>

            </View>

            <Text style={styles.description}>
                {currentStep.description}
            </Text>

        </>
    )

}
const styles = StyleSheet.create({
    headingContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 30,
    },
    headingText: {
        textAlign: 'center',
        fontSize: 40,
        fontWeight: "bold",
        color: Theme.colors.primary,
        fontFamily: Theme.typographies.meaCulpa,
        paddingVertical: 10,
    },
    description: {
        color: Theme.colors.primary,
        paddingVertical: 20,
        paddingHorizontal: 20,
        textAlign: 'center',
        fontSize: 20,
        fontFamily: Theme.typographies.aboreto,

    },
    buttonsWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 10

    },
    buttonsHidden: {
        opacity: 0,
        pointerEvents: "none"
    }
})