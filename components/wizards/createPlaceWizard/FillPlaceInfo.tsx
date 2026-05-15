import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';
import {AppForm, FormRef} from '@/contexts/form-context';
import AppTextInput from '@/components/appComponents/AppTextInput';
import {Dispatch, SetStateAction, useEffect, useMemo, useRef, useState} from 'react';
import {Theme} from '@/styles/Theme';
import {Categories, CountryCode, PriceType, UpdateStep, VendorPlaceDetailsDto} from '@/types/open-api';
import {useApi} from '@/utils/api';
import WizardController from '@/components/wizards/WizardController';
import {useWizardContext} from '@/components/wizards/Wizard';
import AppDropDown from '@/components/appComponents/AppDropDown';
import {COUNTRIES} from '@/constants/countries';
import AppTagsSelect from '@/components/appComponents/AppTagsSelect';
import AppKeyboardAvoidingView from '@/components/appComponents/AppKeyboardAvoidingView';
import {PickerItem} from '@/components/appComponents/AppPicker';
import {useTranslation} from 'react-i18next';

enum PriceKind {
    Range = 'Range',
    Single = 'Single',
    NoPrice = 'NoPrice',
}

export default function FillPlaceInfo({data, setData}: {
    data: VendorPlaceDetailsDto | undefined
    setData: Dispatch<SetStateAction<VendorPlaceDetailsDto | undefined>>
}) {


    const [placeName, setPlaceName] = useState<string | undefined>(data?.name);
    const [phoneNumber, setPhoneNumber] = useState<string | undefined>(data?.phoneNumber);
    const [minPrice, setMinPrice] = useState<string | undefined | null>(data?.minPrice);
    const [maxPrice, setMaxPrice] = useState<string | undefined | null>(data?.maxPrice);
    const [priceKind, setPriceKind] = useState<PriceKind>();
    const [priceType, setPriceType] = useState<PriceType | undefined | null>(data?.priceType);
    const [city, setCity] = useState<string | undefined>(data?.city);
    const [category, setCategory] = useState<Categories | undefined>(data?.category);
    const [countryCode, setCountryCode] = useState<CountryCode | undefined>(data?.countryCode);

    const [isLoading, setIsLoading] = useState(false);

    const countries = Array.from(COUNTRIES.keys());

    const {t} = useTranslation();


    const countriesPickerItems: PickerItem<CountryCode>[] = countries.map(c => ({
        value: c,
        name: COUNTRIES.get(c)?.countryName ?? '',
    }));

    const categoriesPickerItems: PickerItem<Categories>[] = Object.values(Categories).map((c) => ({
            name: t('categories.' + c),
            value: c,
        }),
    );
    const priceKindPickerItems: PickerItem<PriceKind>[] = Object.values(PriceKind).map((p) => ({
        name: t('priceKind.' + p),
        value: p,
    }));

    const priceTypeList: PickerItem<PriceType>[] = Object.values(PriceType).map((v) => ({
        name: t('priceType.' + v),
        value: v,
    }));

    const citiesPickerItem: PickerItem<string>[] | undefined = useMemo(() => {
        if (!countryCode) return;
        const cities = COUNTRIES.get(countryCode)?.cities;
        return cities?.map((c: string) => ({value: c, name: c}));
    }, [countryCode]);


    const API = useApi().api;

    const wizard = useWizardContext();

    // const [switchEnabled, setSwitchEnabled] = useState(data?.minPrice !== data?.maxPrice);

    function enterFixedPrice(price: string | undefined) {
        setMinPrice(price);
        setMaxPrice(price);
    }

    const tsRequiredCheck = placeName && phoneNumber && category && countryCode && city;

    const createPlace = async () => {
        if (!tsRequiredCheck) return;//this is already checked through the from but just for the sake of ts
        try {
            setIsLoading(true);
            const res = await API.placesControllerCreatePlace({
                placeInfo: {
                    name: placeName,
                    phoneNumber: phoneNumber,
                    minPrice: minPrice,
                    maxPrice: maxPrice,
                    priceType: priceType,
                    category: category,
                },
                location: {
                    countryCode: countryCode,
                    city: city,
                },
            });
            setData(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };
    const updatePlace = async () => {
        if (!tsRequiredCheck) return;//this is already checked through the from but just for the sake of ts
        if (!data?.id) return;
        try {
            setIsLoading(true);
            const res = await API.placesControllerUpdatePlace({
                id: data.id,
                updateStep: UpdateStep.FillPlaceInfo,
                placeInfo: {
                    name: placeName,
                    phoneNumber: phoneNumber,
                    minPrice: minPrice,
                    maxPrice: maxPrice,
                    priceType: priceType,
                    category: category,
                }, location: {
                    countryCode: countryCode,
                    city: city,
                },
            });
            setData(res.data);

        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };


    const handleNextStep = (async () => {
        if (data?.id) {
            await updatePlace();
        } else {
            await createPlace();
        }

        wizard.nextStep();
    });


    const formRef = useRef<FormRef>(null);

    useEffect(() => {
        setPlaceName(data?.name ?? undefined);
        setPhoneNumber(data?.phoneNumber ?? undefined);
        setMinPrice(data?.minPrice ?? undefined);
        setMaxPrice(data?.maxPrice ?? undefined);
        setPriceType(data?.priceType ?? undefined);
        setCity(data?.city ?? undefined);
        setCategory(data?.category ?? undefined);
        setCountryCode(data?.countryCode ?? undefined);

        if (data?.minPrice && data?.maxPrice) {
            setPriceKind(data.minPrice === data.maxPrice ? PriceKind.Single : PriceKind.Range);
        } else {
            setPriceKind(PriceKind.NoPrice);
        }

    }, [data]);

    function onPriceKindChange(priceKind: PriceKind) {
        if (priceKind === PriceKind.NoPrice) {
            setMinPrice(null);
            setMaxPrice(null);
            setPriceType(null);
        }
        if (priceKind === PriceKind.Single) {
            setMaxPrice(minPrice);
        }
        setPriceKind(priceKind);
    }


    return isLoading ? (<ActivityIndicator size="large" style={{flex: 1}}/>) :
        (
            <>
                <AppKeyboardAvoidingView>
                    <View style={styles.container}>
                        <AppForm ref={formRef} onSubmit={handleNextStep}>
                            <ScrollView style={styles.scrollView}>
                                <View style={styles.input}>
                                    <AppTextInput value={placeName}
                                                  required
                                                  design={2}
                                                  onChange={(s) => setPlaceName(s)}
                                                  name="name"
                                                  label="Business name"
                                                  placeholder="e.g. Royal Wedding Hall"
                                    />
                                </View>

                                <View style={styles.input}>
                                    <AppTagsSelect
                                        name="category"
                                        list={categoriesPickerItems}
                                        label="Categories"
                                        value={category}
                                        onChange={setCategory}
                                        required

                                    />
                                </View>

                                <View style={styles.input}>
                                    <AppTextInput name="phoneNumber"
                                                  required
                                                  design={2}
                                                  label="Phone number"
                                                  placeholder="e.g. +962xxxxxx"
                                                  keyboardType="phone-pad"
                                                  onChange={(s) => setPhoneNumber(s)}
                                                  value={phoneNumber}
                                    />
                                </View>

                                <View style={styles.input}>
                                    <AppDropDown name="country"
                                                 required
                                                 label="Country"
                                                 onChange={setCountryCode}
                                                 value={countryCode}
                                                 itemList={countriesPickerItems}
                                    />
                                </View>

                                <View style={styles.input}>
                                    <AppDropDown name="city"
                                                 required
                                                 label="City"
                                                 onChange={setCity}
                                                 value={city}
                                                 itemList={citiesPickerItem}
                                                 disabled={!countryCode}
                                    />
                                </View>

                                <View style={styles.input}>
                                    <AppTagsSelect
                                        name="priceKind"
                                        list={priceKindPickerItems}
                                        label="Price"
                                        value={priceKind}
                                        onChange={onPriceKindChange}
                                        borders="rectangle"
                                        disabled={!data?.countryCode && !countryCode}
                                        required
                                    />
                                </View>

                                {priceKind === PriceKind.Single && countryCode &&
                                    <View style={styles.input}>
                                        <AppTextInput onChange={(s) => enterFixedPrice(s)} name="singlePrice"
                                                      label="Single price"
                                                      placeholder="Add your price here"
                                                      value={minPrice}
                                                      keyboardType={'decimal-pad'}
                                                      unit={COUNTRIES.get(countryCode)?.currency}
                                                      required
                                                      design={2}
                                        />
                                    </View>
                                }

                                {priceKind === PriceKind.Range && countryCode &&
                                    <View style={[styles.input, styles.priceRangeContainer]}>
                                        <AppTextInput onChange={(s) => setMinPrice(s)} name="minPrice"
                                                      label="Min. price"
                                                      design={2}
                                                      extraStyles={{flex: 1}}
                                                      placeholder="Minimum price"
                                                      value={minPrice}
                                                      keyboardType={'decimal-pad'}
                                                      unit={COUNTRIES.get(countryCode)?.currency}
                                                      required
                                        />
                                        <AppTextInput onChange={(s) => setMaxPrice(s)} name="minPrice"
                                                      label="Max. price"
                                                      design={2}
                                                      extraStyles={{flex: 1}}
                                                      placeholder="Maximum price"
                                                      value={maxPrice}
                                                      keyboardType={'decimal-pad'}
                                                      unit={COUNTRIES.get(countryCode)?.currency}
                                                      required
                                        />
                                    </View>
                                }

                                {minPrice !== null && minPrice !== undefined && maxPrice !== null && maxPrice !== undefined &&
                                    <View style={styles.input}>
                                        <AppDropDown
                                            label="Price type"
                                            itemList={priceTypeList}
                                            value={priceType}
                                            onChange={setPriceType}
                                            title="Select price type"
                                            name="priceType"
                                            required
                                        />
                                    </View>
                                }


                            </ScrollView>
                        </AppForm>
                    </View>
                </AppKeyboardAvoidingView>
                <WizardController
                    onNext={formRef.current?.submit}
                    isFirstStep={false}
                    isLastStep={false}/>
            </>
        );
}

const styles = StyleSheet.create({
    scrollView: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        marginVertical: 10,
    },
    container: {
        padding: 15,
        marginBottom: 100,
    },

    subtitle: {
        fontSize: Theme.sizes.xl,
        fontWeight: 'bold',
        color: Theme.colors.gray.S300,
        paddingTop: 25,
        paddingBottom: 25,
    },


    priceKindContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        marginTop: 10,
    },
    priceKind: {
        backgroundColor: Theme.colors.iconBackground,
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: Theme.radius.sm,
    },
    priceKindText: {
        textAlign: 'center',
    },
    switchContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,

    },
    priceRangeContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },


});