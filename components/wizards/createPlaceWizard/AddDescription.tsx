import AppTextInput from "@/components/appComponents/AppTextInput";
import {StyleSheet, Text} from "react-native";
import {Theme} from "@/styles/Theme";
import AppButton from "@/components/appComponents/AppButton";
import {CreatePlaceSteps, VendorPlaceDetailsDto} from "@/types/open-api";
import {useState} from "react";
import {useApi} from "@/utils/api";

export default function AddDescription({onNext, data, placeId}: {
    onNext: () => void,
    data: VendorPlaceDetailsDto | undefined
    placeId?: number

}) {

    const [description, setDescription] = useState<string | undefined>(data?.description)
    const API = useApi()

    const updatePlace = async () => {
        if (!placeId) return;
        try {
            await API.placesControllerUpdatePlace({
                id: placeId,
                createStep: CreatePlaceSteps.AddDescription,
                description: description
            })

        } catch (err) {
            console.error(err)
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