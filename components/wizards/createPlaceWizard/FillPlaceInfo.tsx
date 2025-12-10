import {ScrollView, StyleSheet, Switch, Text, View} from "react-native";
import {AppForm} from "@/contexts/form-context";
import AppTextInput from "@/components/appComponents/AppTextInput";
import {Dispatch, SetStateAction, useState} from "react";
import {Theme} from "@/styles/Theme";
import AppButton from "@/components/appComponents/AppButton";
import {CreatePlaceRequest, UpdateStep, VendorPlaceDetailsDto} from "@/types/open-api";
import {PickerItem} from "@/components/appComponents/AppPicker";
import SelectPriceType from "@/components/SelectPriceType.ios";
import {useApi} from "@/utils/api";

export enum PriceType {
    Person = "Person",
    Hour = "Hour",
    None = "None"
}

export default function FillPlaceInfo({placeId, data, onNext, setCreateRequest}: {
    placeId?: number,
    data: VendorPlaceDetailsDto | undefined
    onNext: () => void,
    setCreateRequest: Dispatch<SetStateAction<CreatePlaceRequest>>
}) {

    const [placeName, setPlaceName] = useState<string | undefined>(data?.name)
    const [phoneNumber, setPhoneNumber] = useState<string | undefined>(data?.phoneNumber)
    const [facebook, setFacebook] = useState<string | undefined>(data?.facebook)
    const [instagram, setInstagram] = useState<string | undefined>(data?.instagram)
    const [tiktok, setTiktok] = useState<string | undefined>(data?.tiktok)
    const [website, setWebsite] = useState<string | undefined>(data?.website)
    const [minPrice, setMinPrice] = useState<string | undefined>(data?.minPrice)
    const [maxPrice, setMaxPrice] = useState<string | undefined>(data?.maxPrice)
    const [priceType, setPriceType] = useState<PriceType>(PriceType.None)

    const API = useApi()

    const [switchEnabled, setSwitchEnabled] = useState(data?.minPrice !== data?.maxPrice);

    function enterFixedPrice(price: string | undefined) {
        setMinPrice(price)
        setMaxPrice(price)
    }

    const updatePlace = async () => {
        if (!placeId) return;
        try {
            await API.placesControllerUpdatePlace({
                id: placeId,
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
                }
            })

        } catch (err) {
            console.error(err)
        }
    }

    const preNext = (async () => {
        if (placeId) {
            await updatePlace()
        } else {
            setCreateRequest(prev => {
                return {
                    ...prev,
                    placeInfo: {
                        name: placeName,
                        phoneNumber: phoneNumber,
                        facebook: facebook,
                        instagram: instagram,
                        tiktok: tiktok,
                        website: website,
                        minPrice: minPrice,
                        maxPrice: maxPrice,
                    }
                }
            })
        }

        onNext()
    })


    const priceTypeList: PickerItem<PriceType>[] = Object.values(PriceType).map((v) => ({
        label: v.toString(), // needs to be translated here
        value: v
    }))

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>Your place&#39;s info</Text>
                <AppForm onSubmit={preNext}>
                    <ScrollView style={styles.list}>

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
                            <AppTextInput onTextChange={(s) => enterFixedPrice(s)} name="Price"
                                          label="Price"
                                          extraStyles={styles.input}
                                          placeholder="Add your price here"
                                          value={minPrice}
                                          keyboardType={"decimal-pad"}
                                          unit="JOD"
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
                                              unit="JOD"
                                              required
                                />
                                <AppTextInput onTextChange={(s) => setMaxPrice(s)} name="minPrice"
                                              label="Max. price"
                                              extraStyles={[styles.input, {flex: 1}]}
                                              placeholder="Maximum price"
                                              value={maxPrice}
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