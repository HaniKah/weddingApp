import {StyleSheet, Text, View} from "react-native";
import {Dispatch, SetStateAction, useState} from "react";
import {PromotionInfoDto} from "@/components/wizards/promotePlaceWizard/PromotePlaceWizard";
import {Theme} from "@/styles/Theme";
import Horn from "@/assets/icons/horn.svg"
import PromotionItem from "@/components/items/PromotionItem";
import WizardController from "@/components/wizards/WizardController";
import AppView from "@/components/appComponents/AppView";
import {useWizardContext} from "@/components/wizards/Wizard";

enum PromotionDurations {
    OneMonth = "OneMonth",
    ThreeMonths = "ThreeMonths",
    SixMonths = "SixMonths"
}

export default function PromotionInfo({setPromotionInfo}: {
    setPromotionInfo: Dispatch<SetStateAction<PromotionInfoDto | undefined>>
}) {

    const wizard = useWizardContext()
    const [selectedDuration, setSelectedDuration] = useState<PromotionDurations | undefined>(undefined)

    return (
        <AppView withPadding>
            <View>
                <Horn width={150} height={150} style={styles.image}/>
                <Text style={styles.headerText}>With place promotion , you will get x2 more visitors on your place , and
                    it will be on the top
                    search
                </Text>
            </View>
            <Text style={styles.subtitle}>Select promotion duration</Text>
            <View style={styles.itemsContainer}>
                <PromotionItem onPress={() => setSelectedDuration(PromotionDurations.OneMonth)}
                               isSelected={selectedDuration === PromotionDurations.OneMonth}
                               title="1 month"
                               price="3.99"
                               currency="JOD"/>
                <PromotionItem onPress={() => setSelectedDuration(PromotionDurations.ThreeMonths)}
                               isSelected={selectedDuration === PromotionDurations.ThreeMonths}
                               title="3 months"
                               price="7.99"
                               currency="JOD"/>
                <PromotionItem onPress={() => setSelectedDuration(PromotionDurations.SixMonths)}
                               isSelected={selectedDuration === PromotionDurations.SixMonths}
                               title="6 months"
                               price="14.99"
                               currency="JOD"/>
            </View>
            <WizardController isFirstStep={true} onNext={wizard.nextStep}/>
        </AppView>
    )
}
const styles = StyleSheet.create({
    container: {
        position: "relative",
        flex: 1
    },
    header: {},
    image: {
        marginTop: 30,
        marginHorizontal: "auto"
    },
    headerText: {
        textAlign: "center",
        marginVertical: 30,
        color: Theme.colors.gray.S700
    },
    subtitle: {
        marginBottom: 10,
        fontWeight: "bold"
    },
    itemsContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 5,
    }

})