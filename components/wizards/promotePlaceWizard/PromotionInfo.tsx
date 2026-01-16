import {ScrollView, StyleSheet, Text, View} from "react-native";
import {Dispatch, SetStateAction, useRef} from "react";
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
import {AppForm, FormRef} from "@/contexts/form-context";
import AppFieldSet from "@/components/appComponents/AppFieldSet";

export enum PromotionDuration {
    OneMonth = "OneMonth",
    ThreeMonths = "ThreeMonths",
    SixMonths = "SixMonths"
}

export enum SaleType {
    Percentage = "Percentage",
    Buy1Get1Free = "Buy1Get1Free",
    None = "None"
}

export default function PromotionInfo({promotionInfo, setPromotionInfo}: {
    promotionInfo: PromotionInfoDto
    setPromotionInfo: Dispatch<SetStateAction<PromotionInfoDto>>
}) {

    const formRef = useRef<FormRef>(null)

    const wizard = useWizardContext()

    const saleLabels: PickerItem<SaleType>[] = Object.entries(SaleType).map(([key, value]) => ({
        name: key,
        value: value
    }))

    let saleList: PickerItem<number>[] = []

    for (let i = 5; i < 100; i = i + 5) {
        saleList.push({name: i + "%", value: i})
    }

    function onSaleTypeChange(newValue: SaleType) {
        setPromotionInfo((prev) => ({...prev, salePercentage: undefined, saleType: newValue}))
    }

    function onPromotionDurationChange(newValue: PromotionDuration) {
        setPromotionInfo((prev) => ({...prev, promotionDuration: newValue}))

    }

    function onSalePercentageChange(newValue: number) {
        setPromotionInfo((prev) => ({...prev, salePercentage: newValue}))
    }


    function handleNextStep() {
        wizard.nextStep()
    }

    return (
        <>
            <ScrollView style={styles.scrollContainer}>
                <Text style={styles.title}>Promotions</Text>
                <AppForm onSubmit={handleNextStep} ref={formRef}>
                    <AppView extraStyles={styles.AppViewContainer} withPadding>
                        <View>
                            <Horn width={100} height={100} style={styles.image}/>
                            <Text style={styles.headerText}>
                                With place promotion , you will get x2 more visitors on your place , and it will be on
                                the
                                top search
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.subtitle}>Select promotion duration</Text>
                            <View style={styles.itemsList}>
                                <AppFieldSet value={promotionInfo.promotionDuration} name="promotionDuration" required>
                                    <PromotionItem onPress={() => onPromotionDurationChange(PromotionDuration.OneMonth)}
                                                   isSelected={promotionInfo.promotionDuration === PromotionDuration.OneMonth}
                                                   title="1 month"
                                                   price="3.99"
                                                   currency="JOD"/>
                                    <PromotionItem
                                        onPress={() => onPromotionDurationChange(PromotionDuration.ThreeMonths)}
                                        isSelected={promotionInfo.promotionDuration === PromotionDuration.ThreeMonths}
                                        title="3 months"
                                        price="7.99"
                                        currency="JOD"/>
                                    <PromotionItem
                                        onPress={() => onPromotionDurationChange(PromotionDuration.SixMonths)}
                                        isSelected={promotionInfo.promotionDuration === PromotionDuration.SixMonths}
                                        title="6 months"
                                        price="14.99"
                                        currency="JOD"/>
                                </AppFieldSet>

                            </View>
                        </View>
                        <View>
                            <Text style={styles.subtitle}>Add sale label</Text>
                            <AppDropDown name="sale"
                                         required={true}
                                         onChange={onSaleTypeChange}
                                         value={promotionInfo.saleType}
                                         itemList={saleLabels}/>
                        </View>
                        {promotionInfo.saleType === SaleType.Percentage &&
                            <View>
                                <Text style={styles.subtitle}>Choose a percentage</Text>
                                <AppPicker name="percentage"
                                           required
                                           onChange={(v) => onSalePercentageChange(v)}
                                           value={promotionInfo.salePercentage}
                                           itemList={saleList}/>
                            </View>
                        }
                    </AppView>
                </AppForm>
            </ScrollView>
            <WizardController isFirstStep={true} onNext={formRef.current?.submit}/>
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
        gap: 5,
        marginTop: 10,
    },
})