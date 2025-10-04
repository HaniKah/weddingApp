import {Modal, StyleSheet, Text, View} from "react-native";
import {Theme} from "@/styles/Theme";
import {CoupleSide} from "@/types/open-api";
import {useState} from "react";
import AppTextInput from "@/components/appComponents/AppTextInput";
import AppButton from "@/components/appComponents/AppButton";
import {ButtonType} from "@/styles/Button";
import {AppForm} from "@/contexts/FormContext";

interface AddGuestRequest {
    name: string;
    phone: string;
}

export default function AddGuestModal({isVisible, setIsVisible, guestSide}: {
    isVisible: boolean,
    setIsVisible: (value: boolean) => void
    guestSide: CoupleSide | undefined,
}) {
    const [guestName, setGuestName] = useState<string>()
    const [phone, setPhone] = useState<string>()


    function handleSave(data: AddGuestRequest) {

        console.log("from handleSave in Modal ; ", data)
        // setIsVisible(false)
        finishAndClear()
    }

    function finishAndClear() {
        setIsVisible(false)
        setGuestName(undefined)
        setPhone(undefined)
    }

    return (
        <>
            <Modal presentationStyle="pageSheet" animationType="slide" visible={isVisible}
                   onRequestClose={() => setIsVisible(false)}>
                <View style={styles.wrapper}>
                    <View style={styles.handle}></View>
                    <View style={styles.container}>
                        <Text style={styles.text}> {guestSide}&#39;s guests </Text>
                        <View style={styles.symbol}></View>

                        <AppForm onSubmit={(data: AddGuestRequest) => handleSave(data)}>
                            <View style={styles.form}>
                                <View style={{display: "flex", gap: 40, flex: 1}}>

                                    <AppTextInput name="name"
                                                  required
                                                  placeholder="add guest name"
                                                  label="Guest name"
                                                  value={guestName}
                                                  onTextChange={(s: string) => setGuestName(s)}/>

                                    <AppTextInput name="phone"
                                                  required
                                                  placeholder="add phone number" label="Phone number"
                                                  value={phone}
                                                  onTextChange={(s: string) => setPhone(s)}/>

                                </View>
                                <View style={{marginBottom: 40}}>
                                    <AppButton isSubmit onPress={() => handleSave} buttonType={ButtonType.PRIMARY}>
                                        save
                                    </AppButton>
                                </View>
                            </View>
                        </AppForm>


                    </View>
                </View>
            </Modal>

        </>
    )
}
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: Theme.colors.background,

    },
    handle: {
        height: 3,
        width: 120,
        backgroundColor: Theme.colors.iconBackground,
        borderRadius: 10,
        marginHorizontal: "auto",
        marginVertical: 10,
    },
    container: {
        padding: 20,
        flex: 1
    },
    text: {
        fontSize: 24,
        color: Theme.colors.primary,
        fontWeight: "bold",
        textAlign: "center",
    },
    symbol: {
        height: 100,
        width: 100,
        backgroundColor: Theme.colors.iconBackground,
        marginHorizontal: "auto",
        marginTop: 20
    },
    form: {
        marginTop: 50,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",


    }


})