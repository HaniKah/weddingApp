import {StyleSheet, Text, View} from "react-native";
import {Theme} from "@/styles/Theme";
import {CoupleSide} from "@/types/open-api";
import React, {Dispatch, useState} from "react";
import AppTextInput from "@/components/appComponents/AppTextInput";
import AppButton from "@/components/appComponents/AppButton";
import {ButtonType} from "@/styles/Button";
import {AppForm} from "@/contexts/FormContext";
import {API} from "@/utils/api";
import AppModal from "@/components/appComponents/AppModal";

interface AddGuestRequest {
    name: string;
    phone: string;
}

export default function AddGuestModal({isVisible, setIsVisible, guestSide, setRefetchTrigger}: {
    setRefetchTrigger?: Dispatch<React.SetStateAction<boolean>>
    isVisible: boolean,
    setIsVisible: Dispatch<React.SetStateAction<boolean>>
    guestSide: CoupleSide | undefined,
}) {
    const [guestName, setGuestName] = useState<string>()
    const [phone, setPhone] = useState<string>()
    const [isLoading, setIsLoading] = useState<boolean>(false)


    async function handleSave(data: AddGuestRequest) {

        console.log("from handleSave in Modal ; ", data)
        if (!guestSide) return
        try {
            setIsLoading(true)
            await API.guestsControllerAddGuest({name: data.name, phoneNumber: data.phone, coupleSide: guestSide})
            finishAndClear()
            setRefetchTrigger && setRefetchTrigger((prev: boolean) => !prev)

        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    function finishAndClear() {
        setIsVisible(false)
        setGuestName(undefined)
        setPhone(undefined)
    }

//todo : wrapper the modal with AppModal
    return (
        <>
            <AppModal isVisible={isVisible} setIsVisible={setIsVisible}>
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
                                <AppButton isSubmit buttonType={ButtonType.PRIMARY}>
                                    save
                                </AppButton>
                            </View>
                        </View>
                    </AppForm>

                </View>
            </AppModal>

        </>
    )
}
const styles = StyleSheet.create({

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