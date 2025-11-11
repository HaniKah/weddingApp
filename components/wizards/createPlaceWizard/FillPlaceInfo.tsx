import {ScrollView, StyleSheet, Switch, Text, View} from "react-native";
import {AppForm} from "@/contexts/form-context";
import AppTextInput from "@/components/appComponents/AppTextInput";
import {useState} from "react";
import {Theme} from "@/styles/Theme";
import AppButton from "@/components/appComponents/AppButton";
import {CreatePlaceInfo} from "@/types/open-api";
import AppNumericInput from "@/components/appComponents/AppNumericInput";


export default function FillPlaceInfo({onNext, setPlaceInfo}: {
    onNext: () => void,
    setPlaceInfo: (info: CreatePlaceInfo) => void
}) {

    const [placeName, setPlaceName] = useState<string>()
    const [phoneNumber, setPhoneNumber] = useState<string>()
    const [facebook, setFacebook] = useState<string>()
    const [instagram, setInstagram] = useState<string>()
    const [tiktok, setTiktok] = useState<string>()
    const [website, setWebsite] = useState<string>()
    const [price, setPrice] = useState<number>()
    const [minPrice, setMinPrice] = useState<number>()
    const [maxPrice, setMaxPrice] = useState<number>()

    const [selectedLanguage, setSelectedLanguage] = useState();
    const [switchEnabled, setSwitchEnabled] = useState(false);


    const handleSubmit = () => {
//this is extra for ts. required fields are handled inside the form
        if (!placeName || !phoneNumber) return
        setPlaceInfo({
            name: placeName,
            phoneNumber: phoneNumber,
            facebook: facebook,
            instagram: instagram,
            tiktok: tiktok,
            website: website
        })
        onNext()
    }
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>Your place&#39;s info</Text>
                <AppForm onSubmit={handleSubmit}>
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
                                trackColor={{false: '#767577', true: Theme.colors.green.S100}}
                                thumbColor={Theme.colors.white}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={() => setSwitchEnabled(!switchEnabled)}
                                value={switchEnabled}
                            />

                        </View>

                        {!switchEnabled &&
                            <AppNumericInput onTextChange={(s) => setPrice(s)} name="minPrice" label="Price"
                                             extraStyles={styles.input}
                                             placeholder="Add your price here"
                                             value={price}
                                             keyboardType={"decimal-pad"}
                                             unit="JOD"
                                             required
                            />

                        }

                        {switchEnabled &&
                            <View style={styles.priceRangeContainer}>
                                <AppNumericInput onTextChange={(s) => setMinPrice(s)} name="minPrice" label="Min. price"
                                                 extraStyles={[styles.input, {flex: 1}]}
                                                 placeholder="Minimum price"
                                                 value={minPrice}
                                                 keyboardType={"decimal-pad"}
                                                 unit="JOD"
                                                 required
                                />
                                <AppNumericInput onTextChange={(s) => setMaxPrice(s)} name="minPrice" label="Max. price"
                                                 extraStyles={[styles.input, {flex: 1}]}
                                                 placeholder="Maximum price"
                                                 value={maxPrice}
                                                 keyboardType={"decimal-pad"}
                                                 unit="JOD"
                                                 required
                                />
                            </View>
                        }

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
        marginTop: 10
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