import {ScrollView, StyleSheet, Switch, Text, View} from "react-native";
import {AppForm, FormRef} from "@/contexts/form-context";
import AppTextInput from "@/components/appComponents/AppTextInput";
import {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import {Theme} from "@/styles/Theme";
import {CountryCode, CountryInfo, PriceType, UpdateStep, VendorPlaceDetailsDto} from "@/types/open-api";
import {PickerItem} from "@/components/appComponents/AppPickerDepr";
import {useApi} from "@/utils/api";
import WizardController from "@/components/wizards/WizardController";
import {useWizardContext} from "@/components/wizards/Wizard";
import AppDropDown from "@/components/appComponents/AppDropDown";


export default function FillPlaceInfo({data, setData}: {
    data: VendorPlaceDetailsDto | undefined
    setData: Dispatch<SetStateAction<VendorPlaceDetailsDto | undefined>>
}) {

    const [placeName, setPlaceName] = useState<string | undefined>(data?.name)
    const [phoneNumber, setPhoneNumber] = useState<string | undefined>(data?.phoneNumber)
    const [facebook, setFacebook] = useState<string | undefined>(data?.facebook)
    const [instagram, setInstagram] = useState<string | undefined>(data?.instagram)
    const [tiktok, setTiktok] = useState<string | undefined>(data?.tiktok)
    const [website, setWebsite] = useState<string | undefined>(data?.website)
    const [minPrice, setMinPrice] = useState<string | undefined>(data?.minPrice)
    const [maxPrice, setMaxPrice] = useState<string | undefined>(data?.maxPrice)
    const [priceType, setPriceType] = useState<PriceType>(data?.priceType || PriceType.None)

    const [selectedCountryCode, setSelectedCountryCode] = useState<CountryCode | undefined>(data?.countryCode)
    const [countriesList, setCountriesList] = useState<CountryInfo[]>([])
    const [countriesDropDownOptions, setCountriesDropDownOption] = useState<PickerItem<CountryCode>[]>([])
    const [currency, setCurrency] = useState<string | undefined>(data?.currency)

    const API = useApi()
    const wizard = useWizardContext()

    const [switchEnabled, setSwitchEnabled] = useState(data?.minPrice !== data?.maxPrice);

    function enterFixedPrice(price: string | undefined) {
        setMinPrice(price)
        setMaxPrice(price)
    }

    useEffect(() => {
        const getCountries = async () => {
            try {
                const res = await API.placesControllerGetCountries()

                setCountriesList(res.data.result)

                const options: PickerItem<CountryCode>[] = res.data.result.map((c) => ({
                    name: c.countryName,
                    value: c.countryCode
                }))
                setCountriesDropDownOption(options)

            } catch (err) {
                console.log(err)
            }
        }
        getCountries()
    }, []);

    useEffect(() => {
        setCurrency(countriesList?.find(c => c.countryCode === selectedCountryCode)?.currency)
    }, [selectedCountryCode]);

    const updatePlace = async () => {
        if (!data?.id) return;
        try {
            const res = await API.placesControllerUpdatePlace({
                id: data.id,
                updateStep: UpdateStep.FillPlaceInfo,
                placeInfo: {
                    name: placeName,
                    phoneNumber: phoneNumber,
                    facebook: facebook,
                    instagram: instagram,
                    tiktok: tiktok,
                    website: website,
                    minPrice: minPrice,
                    maxPrice: maxPrice,
                    priceType: priceType,

                },
                location: {
                    countryCode: selectedCountryCode
                }
            })
            setData(res.data)

        } catch (err) {
            console.error(err)
        }
    }

    const handleNextStep = (async () => {
        if (data?.id) {
            await updatePlace()
        }
        wizard.nextStep()
    })


    const priceTypeList: PickerItem<PriceType>[] = Object.values(PriceType).map((v) => ({
        name: v.toString(), // needs to be translated here
        value: v
    }))

    const formRef = useRef<FormRef>(null)


    return (
        <>
            <View style={styles.container}>
                <AppForm ref={formRef} onSubmit={handleNextStep}>
                    <ScrollView>
                        <Text style={styles.title}>Your place&#39;s info</Text>
                        <Text style={styles.subtitle}>
                            Basic Info
                        </Text>
                        <AppTextInput value={placeName}
                                      required
                                      onTextChange={(s) => setPlaceName(s)} name="name"
                                      label="Place's name"
                                      placeholder="name of your place"
                                      extraStyles={styles.input}/>
                        <AppTextInput name="phoneNumber"
                                      required
                                      label="Phone number"
                                      placeholder="Phone number"
                                      onTextChange={(s) => setPhoneNumber(s)}
                                      value={phoneNumber}
                                      extraStyles={styles.input}
                        />

                        <Text style={styles.subtitle}>
                            Location
                        </Text>
                        <AppDropDown name="country"
                                     required
                                     label="Country"
                                     onChange={setSelectedCountryCode}
                                     value={selectedCountryCode}
                                     itemList={countriesDropDownOptions}/>


                        <Text style={styles.subtitle}>
                            Price details
                        </Text>
                        <View style={styles.switchContainer}>
                            <Text style={styles.switchText}>Price range </Text>
                            <Switch
                                trackColor={{false: '#767577', true: Theme.colors.green.S600}}
                                thumbColor={Theme.colors.white}
                                onValueChange={() => setSwitchEnabled(!switchEnabled)}
                                value={switchEnabled}
                            />

                        </View>

                        {!switchEnabled &&
                            <AppTextInput onTextChange={(s) => enterFixedPrice(s)} name="Price"
                                          label="Price"
                                          extraStyles={styles.input}
                                          placeholder="Add your price here"
                                          value={minPrice}
                                          keyboardType={"decimal-pad"}
                                          unit={currency}
                                          required
                            />

                        }

                        {switchEnabled &&
                            <View style={styles.priceRangeContainer}>
                                <AppTextInput onTextChange={(s) => setMinPrice(s)} name="minPrice"
                                              label="Min. price"
                                              extraStyles={[styles.input, {flex: 1}]}
                                              placeholder="Minimum price"
                                              value={minPrice}
                                              keyboardType={"decimal-pad"}
                                              unit={currency}
                                              required
                                />
                                <AppTextInput onTextChange={(s) => setMaxPrice(s)} name="minPrice"
                                              label="Max. price"
                                              extraStyles={[styles.input, {flex: 1}]}
                                              placeholder="Maximum price"
                                              value={maxPrice}
                                              keyboardType={"decimal-pad"}
                                              unit={currency}
                                              required
                                />
                            </View>
                        }

                        <AppDropDown style={styles.input}
                                     label="Price type"
                                     itemList={priceTypeList}
                                     value={priceType}
                                     onChange={setPriceType}
                                     title="Select price type"
                                     name="priceType"
                                     required
                        />


                        <Text style={styles.subtitle}>
                            Social media
                        </Text>
                        <AppTextInput name="facebook"
                                      label="Facebook"
                                      placeholder="Link to your place's facebook account"
                                      onTextChange={(s) => setFacebook(s)}
                                      value={facebook}
                                      extraStyles={styles.input}
                        />
                        <AppTextInput name="instagram"
                                      label="Instagram"
                                      placeholder="Link to your place's instagram account"
                                      onTextChange={(s) => setInstagram(s)}
                                      value={instagram}
                                      extraStyles={styles.input}
                        />
                        <AppTextInput name="tiktok"
                                      label="Tiktok"
                                      placeholder="Link to your place's Tikok account"
                                      onTextChange={(s) => setTiktok(s)}
                                      value={tiktok}
                                      extraStyles={styles.input}
                        />
                        <AppTextInput name="website"
                                      label="Website"
                                      placeholder="Link to your place's website"
                                      onTextChange={(s) => setWebsite(s)}
                                      value={website}
                                      extraStyles={styles.input}
                        />

                    </ScrollView>
                </AppForm>
            </View>
            <WizardController
                onNext={formRef.current?.submit}
                isFirstStep={false}
                isLastStep={false}/>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        marginBottom: 100,
    },
    title: {
        fontSize: Theme.sizes.xl,
        fontWeight: "bold",
        textAlign: "center",
        width: "100%",
    },
    subtitle: {
        fontSize: Theme.sizes.xl,
        fontWeight: "bold",
        color: Theme.colors.gray.S300,
        paddingTop: 25,
        paddingBottom: 25,

        // backgroundColor: Theme.colors.gray.S200,
        // padding: 10

    },
    input: {
        marginTop: 15,
        marginBottom: 5
    },

    switchContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 15,

    },
    switchText: {
        flex: 1,
        fontSize: Theme.sizes.md
    },
    priceRangeContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 35
    }

})