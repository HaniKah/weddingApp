import {Pressable, StyleSheet, Text, View} from "react-native";
import {IconSymbol} from "@/components/ui/IconSymbol";
import {Theme} from "@/constants/Theme";

export default function WizardHeader({onNextStep, onPreviousStep, isFirstStep, isLastStep}: {
    onNextStep: () => void,
    onPreviousStep: () => void
    isFirstStep: boolean,
    isLastStep: boolean,
}) {
    return (
        <>
            <View style={styles.headingContainer}>
                {!isFirstStep && <Pressable onPress={onPreviousStep}>
                    <IconSymbol name="arrow.left" color={Theme.colors.primary} weight="thin"/>
                </Pressable>}

                <Text style={styles.headingText}>
                    Pick a Place
                </Text>

                {!isLastStep && <Pressable onPress={onNextStep}>
                    <IconSymbol name="arrow.right" color={Theme.colors.primary} weight="thin"/>
                </Pressable>}

            </View>

            <Text style={styles.question}>
                WHERE SHOULD THE WEDDING TAKE A PLACE ?
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
        fontFamily: Theme.typography.meaCulpa,
        paddingVertical: 10,
    },
    question: {
        color: Theme.colors.primary,
        paddingVertical: 20,
        paddingHorizontal: 50,
        textAlign: 'center',
        fontSize: 20,
        fontFamily: Theme.typography.aboreto,

    },
    buttonsWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 10

    }
})