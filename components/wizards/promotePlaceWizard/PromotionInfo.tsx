import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Theme} from '@/styles/Theme';
import AppView from '@/components/appComponents/AppView';
import AppDropDown from '@/components/appComponents/AppDropDown';
import AppPicker, {PickerItem} from '@/components/appComponents/AppPicker';
import {AppForm, FormRef} from '@/contexts/form-context';
import AppFieldSet from '@/components/appComponents/AppFieldSet';
import AppButton from '@/components/appComponents/AppButton';
import Purchases, {PurchasesOfferings, PurchasesPackage} from 'react-native-purchases';
import PromotionItem from '@/components/items/PromotionItem';
import {IconSymbol} from '@/components/symbols/IconSymbol';

import {useTranslation} from 'react-i18next';


//todo : this is duplicated in backend , use only backend
export enum SaleLabelType {
    Sale = 'Sale',
    Buy1Get1Free = 'Buy1Get1Free',
    None = 'None'
}

export function PromotionInfo({placeId, onFinish}: { placeId: number | undefined, onFinish: () => void }) {

    const [selectedPackage, setSelectedPackage] = useState<PurchasesPackage>();
    const [saleLabel, setSaleLabel] = useState<SaleLabelType>(SaleLabelType.None);
    const [salePercentage, setSalePercentage] = useState<string | null>(null);
    const [offerings, setOfferings] = useState<PurchasesOfferings | null>(null);
    const formRef = useRef<FormRef>(null);
    const {t} = useTranslation();


    const saleLabels: PickerItem<SaleLabelType>[] = Object.entries(SaleLabelType).map(([key, value]) => ({
        name: t('promotion.saleLabels.' + key),
        value: value,
    }));

    let saleList: PickerItem<string>[] = [];

    for (let i = 5; i < 100; i = i + 5) {
        saleList.push({name: i + '%', value: i / 100 + ''});
    }

    const getPromotionExpiration = useCallback((beginAt: Date) => {
        if (!selectedPackage) return;
        switch (selectedPackage.packageType) {
            case 'MONTHLY':
                return new Date(beginAt.setMonth(beginAt.getMonth() + 1)).toISOString();
            case 'THREE_MONTH':
                return new Date(beginAt.setMonth(beginAt.getMonth() + 3)).toISOString();
            case 'SIX_MONTH':
                return new Date(beginAt.setMonth(beginAt.getMonth() + 6)).toISOString();
        }
    }, [selectedPackage]);


    async function submitAndCheckout() {
        // if (!selectedPackage || !placeId) return
        //
        // const beginsAt = new Date()
        // // for now RC only supports attaching custom data to the user attributes , the name itsel doesnt make sense but it works for catching these data in the webhook
        // const [attributesError, attributesResult] = await tryCatch(Purchases.setAttributes({
        //     "placeId": placeId + "",
        //     "promotionBeginsAt": beginsAt.toISOString(),
        //     "promotionEndsAt": getPromotionExpiration(beginsAt) as string,
        //     "saleLabel": saleLabel,
        //     "salePercentage": salePercentage
        //
        // }))
        // if (attributesError) {
        //     console.error(attributesError.message)
        //     return
        // }
        // const [purchaseError, purchaseResult] = await tryCatch(Purchases.purchasePackage(selectedPackage))
        // if (purchaseError) {
        //     console.error(purchaseError.message)
        //     return
        // } else {
        //     onFinish()
        // }
    }

    useEffect(() => {
        if (!placeId) return;

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
                <Text style={styles.title}>{t('promotion.promotions')}</Text>
                <AppView extraStyles={styles.AppViewContainer} withPadding>
                    <View>
                        <View style={styles.bulletPoints}>
                            <IconSymbol name="checkmark.circle" color={Theme.colors.gray.S300}/>
                            <Text style={styles.headerText}>
                                {t('promotion.bullet1')}
                            </Text>
                        </View>
                        <View style={styles.bulletPoints}>
                            <IconSymbol name="checkmark.circle" color={Theme.colors.gray.S300}/>
                            <Text style={styles.headerText}>
                                {t('promotion.bullet2')}
                            </Text>
                        </View>
                        <View style={styles.bulletPoints}>
                            <IconSymbol name="checkmark.circle" color={Theme.colors.gray.S300}/>
                            <Text style={styles.headerText}>
                                {t('promotion.bullet3')}
                            </Text>
                        </View>

                    </View>
                    <AppForm ref={formRef} onSubmit={submitAndCheckout}>
                        <View>
                            <Text style={styles.subtitle}>{t('promotion.selectDuration')}</Text>
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
                            <Text style={styles.subtitle}>{t('promotion.addSaleLabel')}</Text>
                            <AppDropDown name="sale"
                                         required={true}
                                         onChange={(v) => setSaleLabel(v)}
                                         value={saleLabel}
                                         itemList={saleLabels}/>
                        </View>
                        {saleLabel === SaleLabelType.Sale &&
                            <View>
                                <Text style={styles.subtitle}>{t('promotion.choosePercentage')}</Text>
                                <AppPicker name="percentage"
                                           required
                                           onChange={(v) => setSalePercentage(v)}
                                           value={salePercentage}
                                           itemList={saleList}/>
                            </View>
                        }
                        <AppButton fullWidth isSubmit>
                            {t('promotion.checkout')}
                        </AppButton>
                    </AppForm>
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>
                            {t('promotion.footerText')}
                        </Text>
                    </View>
                </AppView>
            </ScrollView>


        </>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,

    },
    title: {
        fontSize: Theme.sizes.xl,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    AppViewContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 30,
    },
    image: {
        marginHorizontal: 'auto',
    },
    headerText: {
        textAlign: 'center',
        color: Theme.colors.gray.S700,
    },
    subtitle: {
        fontWeight: 'bold',
    },
    bulletPoints: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
        marginVertical: 3,
    },
    form: {
        flex: 1,
    },

    offeringsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        gap: 8,
    },
    footer: {
        paddingVertical: 10,
        alignItems: 'center',
    },
    footerText: {
        fontSize: Theme.sizes.sm,
        color: Theme.colors.gray.S500,
    },
});