import {ScrollView, StyleSheet, Text, View} from "react-native";
import {AppForm} from "@/contexts/form-context";
import AppTextInput from "@/components/appComponents/AppTextInput";
import {useState} from "react";
import {Theme} from "@/styles/Theme";
import AppButton from "@/components/appComponents/AppButton";
import {Picker} from "@react-native-picker/picker";


export default function FillPlaceInfo({onNext}: { onNext: () => void }) {

    const [placeName, setPlaceName] = useState<string>()
    const [phoneNumber, setPhoneNumber] = useState<string>()
    const [facebook, setFacebook] = useState<string>()
    const [instagram, setInstagram] = useState<string>()
    const [tiktok, setTiktok] = useState<string>()
    const [website, setWebsite] = useState<string>()

    const [selectedLanguage, setSelectedLanguage] = useState();

    const handleSubmit = () => {
        onNext()
    }
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>Your place info</Text>
                <AppForm onSubmit={handleSubmit}>
                    <ScrollView style={styles.list}>
                        <Picker
                            selectedValue={selectedLanguage}
                            onValueChange={(itemValue, itemIndex) =>
                                setSelectedLanguage(itemValue)
                            }>
                            <Picker.Item label="Java" value="java"/>
                            <Picker.Item label="JavaScript" value="js"/>
                        </Picker>
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
    input: {
        marginTop: 20
    },
    list: {
        height: "80%"
    },

})