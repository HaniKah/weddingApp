import {DimensionValue, StyleSheet, Text, View} from "react-native";
import {Theme} from "@/styles/Theme";
import AppButton from "@/components/appComponents/AppButton";
import {ButtonType} from "@/styles/Button";
import {useWizardContext} from "@/components/wizards/Wizard";
import Animated from "react-native-reanimated";
import {t} from "i18next";


export default function WizardController({isFirstStep = false, isLastStep = false, onNext}: {
    isFirstStep?: boolean,
    isLastStep?: boolean,
    onNext?: () => void
}) {

    const wizard = useWizardContext()
    return (
        <>
            <View style={styles.container}>
                <View>
                    <Text
                        style={styles.progressText}>{t("wizard." + wizard.currentStep)} - {wizard.stepsList.indexOf(wizard.currentStep) + 1} of {wizard.stepsList?.length}</Text>
                    <View style={styles.progressContainer}>
                        {/*animations is not working because we are rerendering the whole component each time the stepList or current step changes, need to be optimized*/}
                        <Animated.View
                            style={[styles.progressBar, {
                                width: wizard.progress * 100 + "%" as DimensionValue,
                                animationDuration: 200,
                                animationTimingFunction: 'ease-in-out',
                            }]}></Animated.View>
                    </View>
                </View>

                <View style={styles.navigatorContainer}>
                    <View>
                        <AppButton
                            buttonType={ButtonType.PLAIN}
                            onPress={wizard.previousStep}
                            inactive={isFirstStep}>
                            {t("common.previous")}
                        </AppButton>
                    </View>
                    <View>
                        <AppButton
                            fullRound
                            onPress={onNext}
                        >
                            {isLastStep ? t("common.finish") : t("common.next")}
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
    },
    progressContainer: {
        backgroundColor: Theme.colors.gray.S200,

    },
    progressText: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: Theme.colors.background,
        color: Theme.colors.secondary,
        fontSize: Theme.sizes.md
    },

    progressBar: {
        backgroundColor: Theme.colors.primary,
        height: 2,

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