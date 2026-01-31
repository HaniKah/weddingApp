import {ScrollView, StyleSheet, Text, View} from "react-native";
import React, {useEffect, useRef, useState} from "react";
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
import {useApi} from "@/utils/api";
import {tryCatch} from "@/utils/tryCatch";


export enum SaleType {
    Percentage = "Percentage",
    Buy1Get1Free = "Buy1Get1Free",
    None = "None"
}

export function PromotionInfo({placeId}: { placeId: number | undefined }) {

    const {api} = useApi()

    const [selectedPackage, setSelectedPackage] = useState<PurchasesPackage>()
    const [saleType, setSaleType] = useState<SaleType>()
    const [salePercentage, setSalePercentage] = useState<number>()
    const [offerings, setOfferings] = useState<PurchasesOfferings | null>(null);
    const formRef = useRef<FormRef>(null)


    const saleLabels: PickerItem<SaleType>[] = Object.entries(SaleType).map(([key, value]) => ({
        name: key,
        value: value
    }))

    let saleList: PickerItem<number>[] = []

    for (let i = 5; i < 100; i = i + 5) {
        saleList.push({name: i + "%", value: i})
    }


    async function submitAndCheckout() {
        console.log("submitting form")
        console.log("selectedPackage: ", selectedPackage?.packageType)
        console.log("placeId: ", placeId)
        if (!selectedPackage || !placeId) return
        console.log("setting attributes")

        const [attributesError, attributesResult] = await tryCatch(Purchases.setAttributes({"placeId": placeId + ""}))
        if (attributesError) console.error(attributesError.message)

        const [purchaseError, purchaseResult] = await tryCatch(Purchases.purchasePackage(selectedPackage))
        if (purchaseError) {
            console.error(purchaseError.message)
            return
        } else {
            console.log("purchase result received")
        }

    }

    useEffect(() => {
        if (!placeId) return
        console.log("placeId from Promotion info", placeId)

        async function getOfferings() {
            const offerings = await Purchases.getOfferings();
            if (
                offerings.current !== null &&
                offerings.current.availablePackages.length !== 0
            ) {
                setOfferings(offerings);
            }
            // console.log("📢 offerings", JSON.stringify(offerings, null, 2));
            console.log("📢 offerings", JSON.stringify(offerings.current?.availablePackages, null, 2));

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
                                         onChange={(v) => setSaleType(v)}
                                         value={saleType}
                                         itemList={saleLabels}/>
                        </View>
                        {saleType === SaleType.Percentage &&
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