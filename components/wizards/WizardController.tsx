import {StyleSheet, View} from "react-native";
import {Theme} from "@/styles/Theme";
import AppButton from "@/components/appComponents/AppButton";
import {ButtonType} from "@/styles/Button";
import {useWizardContext} from "@/components/wizards/Wizard";

export default function WizardController({isFirstStep, isLastStep}: {
    isFirstStep?: boolean,
    isLastStep?: boolean,
}) {
    const wizard = useWizardContext()
    return (
        <><View style={styles.container}>


            <View style={styles.progressContainer}>
                <View style={styles.progressBar}></View>
            </View>
            <View style={styles.navigatorContainer}>
                <View>
                    <AppButton
                        buttonType={ButtonType.PLAIN}
                        onPress={wizard.previousStep}
                        disable={isFirstStep}>
                        previous
                    </AppButton>
                </View>
                <View>
                    <AppButton
                        fullRound
                        onPress={wizard.nextStep}
                        disable={isLastStep}>
                        {isLastStep ? "upload and Finish" : "next"}
                    </AppButton>
                </View>

            </View>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    }
    ,
    progressContainer: {
        backgroundColor: Theme.colors.gray.S200,

    },

    progressBar: {
        backgroundColor: Theme.colors.primary,
        height: 2,
        width: "30%",
    },

    navigatorContainer: {
        backgroundColor: Theme.colors.white,
        paddingTop: 20,
        paddingBottom: 35,
        paddingHorizontal: 35,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },


})