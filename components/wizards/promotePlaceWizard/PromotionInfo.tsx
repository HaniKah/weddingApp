import {ScrollView, StyleSheet, Text, View} from "react-native";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {Theme} from "@/styles/Theme";
import Horn from "@/assets/icons/horn.svg"
import AppView from "@/components/appComponents/AppView";
import AppDropDown from "@/components/appComponents/AppDropDown";
import {PickerItem} from "@/components/appComponents/AppPickerDepr";
import AppPicker from "@/components/appComponents/AppPicker";
import {AppForm, FormRef} from "@/contexts/form-context";
import AppFieldSet from "@/components/appComponents/AppFieldSet";
import AppButton from "@/components/appComponents/AppButton";
import Purchases, {PurchasesOfferings, PurchasesPackage} from "react-native-purchases";
import PromotionItem from "@/components/items/PromotionItem";
import {IconSymbol} from "@/components/symbols/IconSymbol";
import {tryCatch} from "@/utils/tryCatch";

//todo : this is duplicated in backend , use only backend
export enum SaleLabelType {
    Sale = "Sale",
    Buy1Get1Free = "Buy1Get1Free",
    None = "None"
}

export function PromotionInfo({placeId}: { placeId: number | undefined }) {

    const [selectedPackage, setSelectedPackage] = useState<PurchasesPackage>()
    const [saleLabel, setSaleLabel] = useState<SaleLabelType>(SaleLabelType.None)
    const [salePercentage, setSalePercentage] = useState<string | null>(null)
    const [offerings, setOfferings] = useState<PurchasesOfferings | null>(null);
    const formRef = useRef<FormRef>(null)


    const saleLabels: PickerItem<SaleLabelType>[] = Object.entries(SaleLabelType).map(([key, value]) => ({
        name: key,
        value: value
    }))

    let saleList: PickerItem<string>[] = []

    for (let i = 5; i < 100; i = i + 5) {
        saleList.push({name: i + "%", value: i / 100 + ""})
    }

    const getPromotionExpiration = useCallback((beginAt: Date) => {
        if (!selectedPackage) return
        switch (selectedPackage.packageType) {
            case "MONTHLY":
                return new Date(beginAt.setMonth(beginAt.getMonth() + 1)).toISOString()
            case "THREE_MONTH":
                return new Date(beginAt.setMonth(beginAt.getMonth() + 3)).toISOString()
            case "SIX_MONTH":
                return new Date(beginAt.setMonth(beginAt.getMonth() + 6)).toISOString()
        }
    }, [selectedPackage])


    async function submitAndCheckout() {
        if (!selectedPackage || !placeId) return

        const beginsAt = new Date()
        // for now RC only supports attaching custom data to the user attributes , the name itsel doesnt make sense but it works for catching these data in the webhook
        const [attributesError, attributesResult] = await tryCatch(Purchases.setAttributes({
            "placeId": placeId + "",
            "promotionBeginsAt": beginsAt.toISOString(),
            "promotionEndsAt": getPromotionExpiration(beginsAt) as string,
            "saleLabel": saleLabel,
            "salePercentage": salePercentage

        }))
        if (attributesError) {
            console.error(attributesError.message)
            return
        }
        const [purchaseError, purchaseResult] = await tryCatch(Purchases.purchasePackage(selectedPackage))
        if (purchaseError) {
            console.error(purchaseError.message)
            return
        }
    }

    useEffect(() => {
        if (!placeId) return

        async function getOfferings() {
            const offerings = await Purchases.getOfferings();
            if (
                offerings.current !== null &&
                offerings.current.availablePackages.length !== 0
            ) {
                setOfferings(offerings);
            }

        }

        getOfferings();
    }, [placeId]);


    return (
        <>
            <ScrollView style={styles.scrollContainer}>
                <Horn width={100} height={100} style={styles.image}/>
                <Text style={styles.title}>Promotions</Text>
                <AppView extraStyles={styles.AppViewContainer} withPadding>
                    <View>
                        <View style={styles.bulletPoints}>
                            <IconSymbol name="checkmark.circle" color={Theme.colors.gray.S300}/>
                            <Text style={styles.headerText}>
                                Add your place to the top-search result
                            </Text>
                        </View>
                        <View style={styles.bulletPoints}>
                            <IconSymbol name="checkmark.circle" color={Theme.colors.gray.S300}/>
                            <Text style={styles.headerText}>
                                Get x2 more viewers on your page
                            </Text>
                        </View>
                        <View style={styles.bulletPoints}>
                            <IconSymbol name="checkmark.circle" color={Theme.colors.gray.S300}/>
                            <Text style={styles.headerText}>
                                Add sale label
                            </Text>
                        </View>

                    </View>
                    <AppForm ref={formRef} onSubmit={submitAndCheckout}>
                        <View>
                            <Text style={styles.subtitle}>Select promotion duration</Text>
                            <AppFieldSet value={selectedPackage} name="selectedProduct" required>
                                <View style={styles.offeringsContainer}>
                                    {offerings?.current?.availablePackages.map((pkg) => (
                                        <PromotionItem
                                            isSelected={selectedPackage?.identifier === pkg.identifier}
                                            key={pkg.identifier}
                                            title={pkg.product.title}
                                            price={pkg.product.priceString}
                                            onPress={() => setSelectedPackage(pkg)}
                                        />
                                    ))}
                                </View>
                            </AppFieldSet>

                        </View>
                        <View>
                            <Text style={styles.subtitle}>Add sale label</Text>
                            <AppDropDown name="sale"
                                         required={true}
                                         onChange={(v) => setSaleLabel(v)}
                                         value={saleLabel}
                                         itemList={saleLabels}/>
                        </View>
                        {saleLabel === SaleLabelType.Sale &&
                            <View>
                                <Text style={styles.subtitle}>Choose a percentage</Text>
                                <AppPicker name="percentage"
                                           required
                                           onChange={(v) => setSalePercentage(v)}
                                           value={salePercentage}
                                           itemList={saleList}/>
                            </View>
                        }
                        <AppButton fullWidth isSubmit>
                            Checkout
                        </AppButton>
                    </AppForm>
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>
                            Cancel anytime • Secure payment • Instant access
                        </Text>
                    </View>
                </AppView>
            </ScrollView>


        </>
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,

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
        color: Theme.colors.gray.S700
    },
    subtitle: {
        fontWeight: "bold"
    },
    bulletPoints: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        gap: 10,
        marginVertical: 3
    },
    form: {
        flex: 1
    },

    offeringsContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        gap: 8
    },
    footer: {
        paddingVertical: 10,
        alignItems: "center",
    },
    footerText: {
        fontSize: Theme.sizes.sm,
        color: Theme.colors.gray.S500,
    },
})