import {ActivityIndicator, ScrollView, StyleSheet, Switch, Text, View} from "react-native";
import {AppForm} from "@/contexts/form-context";
import AppTextInput from "@/components/appComponents/AppTextInput";
import {useCallback, useEffect, useState} from "react";
import {Theme} from "@/styles/Theme";
import AppButton from "@/components/appComponents/AppButton";
import {CreatePlaceSteps, PlacePriceRange, VendorPlaceDetailsViewModel} from "@/types/open-api";
import {PickerItem} from "@/components/appComponents/AppPicker";
import SelectPriceType from "@/components/SelectPriceType.ios";
import {useApi} from "@/utils/api";

export enum PriceType {
    Person = "Person",
    Hour = "Hour",
    None = "None"
}

export default function FillPlaceInfo({onNext, data, setData}: {
    data: VendorPlaceDetailsViewModel | undefined,
    setData: (data: VendorPlaceDetailsViewModel) => void,
    onNext: () => void,
}) {

    const API = useApi()
    const [placeName, setPlaceName] = useState<string | undefined>(data?.place.placeInfo?.name)
    const [phoneNumber, setPhoneNumber] = useState<string | undefined>(data?.place.placeInfo?.phoneNumber)
    const [priceRange, setPriceRange] = useState<PlacePriceRange | undefined>(data?.place.placeInfo?.priceRange.priceRange)
    const [facebook, setFacebook] = useState<string>()
    const [instagram, setInstagram] = useState<string>()
    const [tiktok, setTiktok] = useState<string>()
    const [website, setWebsite] = useState<string>()
    //todo : to be added to the Db
    const [priceType, setPriceType] = useState<PriceType>(PriceType.None)
    const [isLoading, setIsLoading] = useState(false)
    const [switchEnabled, setSwitchEnabled] = useState(false);

    const enterPriceRange = ({newMin, newMax}: { newMin?: string, newMax?: string }) => {
        if (newMin) {
            setPriceRange((prev) => ({min: newMin, max: prev?.max}))
        }
        if (newMax) {
            setPriceRange((prev) => ({max: newMax, min: prev?.min}))
        }
    }

    useEffect(() => {
        setSwitchEnabled(priceRange?.min !== priceRange?.max)
    }, [priceRange]);


    const priceTypeList: PickerItem<PriceType>[] = Object.values(PriceType).map((v) => ({
        label: v.toString(), // needs to be translated here
        value: v
    }))

    const updatePlace = useCallback(async () => {
        //if condition is extra for ts. required fields are handled inside the form and will present an error if not filled
        if (!placeName || !phoneNumber || !priceRange) return
        try {
            setIsLoading(true)
            const res = await API.placesControllerUpdatePlace({
                placeId: data?.place.placeId,
                createStep: CreatePlaceSteps.FillPlaceInfo,
                placeInfo: {
                    priceRange: {
                        priceRange: priceRange,
                        currency: "JOD"
                    },
                    name: placeName,
                    phoneNumber: phoneNumber,
                    facebook,
                    instagram,
                    tiktok,
                    website
                }
            })
            setData(res.data)
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }, [])


    if (isLoading) return (<ActivityIndicator/>)
    else
        return (
            <>
                <View style={styles.container}>
                    <Text style={styles.title}>Your place&#39;s info</Text>
                    <AppForm onSubmit={updatePlace}>
                        <ScrollView style={styles.list}>
                            {/*<Picker*/}
                            {/*    selectedValue={selectedLanguage}*/}
                            {/*    onValueChange={(itemValue, itemIndex) =>*/}
                            {/*        setSelectedLanguage(itemValue)*/}
                            {/*    }>*/}
                            {/*    <Picker.Item label="Java" value="java"/>*/}
                            {/*    <Picker.Item label="JavaScript" value="js"/>*/}
                            {/*</Picker>*/}
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
                                Price details
                            </Text>
                            <View style={styles.switchContainer}>
                                <Text style={styles.switchText}>Price range </Text>
                                <Switch
                                    trackColor={{false: '#767577', true: Theme.colors.green.S600}}
                                    thumbColor={Theme.colors.white}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={() => setSwitchEnabled(!switchEnabled)}
                                    value={switchEnabled}
                                />

                            </View>

                            {!switchEnabled &&
                                <AppTextInput onTextChange={(s) => enterPriceRange({newMin: s, newMax: s})} name="Price"
                                              label="Price"
                                              extraStyles={styles.input}
                                              placeholder="Add your price here"
                                              value={priceRange?.min}
                                              keyboardType={"decimal-pad"}
                                              unit="JOD"
                                              required
                                />

                            }

                            {switchEnabled &&
                                <View style={styles.priceRangeContainer}>
                                    <AppTextInput onTextChange={(s) => enterPriceRange({newMin: s})} name="minPrice"
                                                  label="Min. price"
                                                  extraStyles={[styles.input, {flex: 1}]}
                                                  placeholder="Minimum price"
                                                  value={priceRange?.min}
                                                  keyboardType={"decimal-pad"}
                                                  unit="JOD"
                                                  required
                                    />
                                    <AppTextInput onTextChange={(s) => enterPriceRange({newMax: s})} name="minPrice"
                                                  label="Max. price"
                                                  extraStyles={[styles.input, {flex: 1}]}
                                                  placeholder="Maximum price"
                                                  value={priceRange?.max}
                                                  keyboardType={"decimal-pad"}
                                                  unit="JOD"
                                                  required
                                    />
                                </View>
                            }

                            <SelectPriceType style={styles.input} label="Price type" itemList={priceTypeList}
                                             value={priceType}
                                             setValue={setPriceType}/>


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
                        <AppButton fullWidth isSubmit>next</AppButton>
                    </AppForm>
                </View>

            </>
        )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        paddingBottom: 0,
    },
    title: {
        fontSize: Theme.sizes.xl,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 20,
        width: "100%",
    },
    subtitle: {
        fontSize: Theme.sizes.xl,
        fontWeight: "bold",
        color: Theme.colors.gray.S300,
        paddingVertical: 15

        // backgroundColor: Theme.colors.gray.S200,
        // padding: 10

    },
    input: {
        marginTop: 15
    },
    list: {
        height: "80%"
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