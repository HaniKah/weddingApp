import {ScrollView, StyleSheet, Text, View} from "react-native";
import {Dispatch, SetStateAction, useState} from "react";
import {PromotionInfoDto} from "@/components/wizards/promotePlaceWizard/PromotePlaceWizard";
import {Theme} from "@/styles/Theme";
import Horn from "@/assets/icons/horn.svg"
import PromotionItem from "@/components/items/PromotionItem";
import WizardController from "@/components/wizards/WizardController";
import AppView from "@/components/appComponents/AppView";
import {useWizardContext} from "@/components/wizards/Wizard";
import AppDropDown from "@/components/appComponents/AppDropDown";
import {PickerItem} from "@/components/appComponents/AppPickerDepr";
import AppPicker from "@/components/appComponents/AppPicker";

enum PromotionDurations {
    OneMonth = "OneMonth",
    ThreeMonths = "ThreeMonths",
    SixMonths = "SixMonths"
}

export enum SaleType {
    Percentage = "Percentage",
    Buy1Get1Free = "Buy1Get1Free",
    None = "None"
}

export default function PromotionInfo({setPromotionInfo}: {
    setPromotionInfo: Dispatch<SetStateAction<PromotionInfoDto | undefined>>
}) {

    const wizard = useWizardContext()
    const [selectedDuration, setSelectedDuration] = useState<PromotionDurations | undefined>(undefined)
    const [selectedSale, setSelectedSale] = useState<SaleType>(SaleType.None)
    const [salePercentage, setSalePercentage] = useState<number | undefined>(undefined)

    const saleLabels: PickerItem<SaleType>[] = Object.entries(SaleType).map(([key, value]) => ({
        name: key,
        value: value
    }))

    let saleList: PickerItem<number>[] = []

    for (let i = 5; i < 100; i = i + 5) {
        saleList.push({name: i + "%", value: i})
    }

    function onSaleTypeChange(newValue: SaleType) {
        setSalePercentage(undefined)
        setSelectedSale(newValue)
    }

    return (
        <>
            <ScrollView style={styles.scrollContainer}>
                <Text style={styles.title}>Promotions</Text>
                <AppView extraStyles={styles.AppViewContainer} withPadding>
                    <View>
                        <Horn width={100} height={100} style={styles.image}/>
                        <Text style={styles.headerText}>
                            With place promotion , you will get x2 more visitors on your place , and it will be on the
                            top search
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.subtitle}>Select promotion duration</Text>
                        <View style={styles.itemsList}>
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
                    </View>
                    <View>
                        <Text style={styles.subtitle}>Add sale label</Text>
                        <AppDropDown name="sale"
                                     onChange={onSaleTypeChange}
                                     value={selectedSale}
                                     itemList={saleLabels}/>
                    </View>
                    {selectedSale === SaleType.Percentage &&
                        <View>
                            <Text style={styles.subtitle}>Choose a percentage</Text>
                            <AppPicker name="percentage"
                                       onChange={setSalePercentage}
                                       value={salePercentage}
                                       itemList={saleList}/>
                        </View>
                    }
                </AppView>
            </ScrollView>
            <WizardController isFirstStep={true} onNext={wizard.nextStep}/>
        </>
    )
}
const styles = StyleSheet.create({
    scrollContainer: {
        marginBottom: Theme.global.wizardControllerBottomMargin,
    },
    title: {
        fontSize: Theme.sizes.xl,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 20,
    },
    AppViewContainer: {
        display: "flex",
        flexDirection: "column",
        gap: 30,
    },
    image: {
        marginHorizontal: "auto"
    },
    headerText: {
        textAlign: "center",
        marginTop: 30,
        color: Theme.colors.gray.S700
    },
    subtitle: {
        fontWeight: "bold"
    },

    itemsList: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 5,
        marginTop: 10,
    },
})