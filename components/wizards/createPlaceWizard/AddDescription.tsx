import AppTextInput from "@/components/appComponents/AppTextInput";
import {StyleSheet, Text} from "react-native";
import {Theme} from "@/styles/Theme";
import AppButton from "@/components/appComponents/AppButton";
import {CreatePlaceRequest, UpdateStep, VendorPlaceDetailsDto} from "@/types/open-api";
import {Dispatch, SetStateAction, useState} from "react";
import {useApi} from "@/utils/api";

export default function AddDescription({onNext, data, setCreateRequest}: {
    onNext: () => void,
    data: VendorPlaceDetailsDto | undefined
    setCreateRequest: Dispatch<SetStateAction<CreatePlaceRequest>>

}) {

    const [description, setDescription] = useState<string | undefined>(data?.description)
    const API = useApi()

    const updatePlace = async () => {
        if (data?.id) {
            try {
                await API.placesControllerUpdatePlace({
                    id: data.id,
                    updateStep: UpdateStep.AddDescription,
                    description: description
                })

            } catch (err) {
                console.error(err)
            }
        } else {
            setCreateRequest(prev => ({...prev, description: description}))
        }

    }

    const preNext = async () => {
        await updatePlace()
        onNext()
    }

    return (
        <>
            <Text style={styles.title}>Add Description</Text>

            <AppTextInput name="description"
                          value={data?.description}
                          onTextChange={(text) => setDescription(text)}
                          design={1}
                          textArea
                          label="Description"
                          placeholder="Add your description to your place"

            />
            <AppButton extraStylesBtn={styles.button} fullWidth onPress={preNext}>next</AppButton>
        </>
    )
}
const styles = StyleSheet.create({
    title: {
        fontSize: Theme.sizes.xl,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 20,
        marginBottom: 50,
        width: "100%",
    },
    button: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        marginVertical: 30,
        marginHorizontal: 15

    },
})