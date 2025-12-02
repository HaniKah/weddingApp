import AppTextInput from "@/components/appComponents/AppTextInput";
import {StyleSheet, Text} from "react-native";
import {Theme} from "@/styles/Theme";
import AppButton from "@/components/appComponents/AppButton";
import {CreatePlaceSteps, VendorPlaceDetailsViewModel} from "@/types/open-api";
import {useApi} from "@/utils/api";
import {useState} from "react";

export default function AddDescription({onNext, data, setData}: {
    onNext: () => void,
    data: VendorPlaceDetailsViewModel | undefined,
    setData: (data: VendorPlaceDetailsViewModel) => void,
}) {
    const API = useApi()
    const [description, setDescription] = useState<string | undefined>(data?.place.description)
    const [loading, setLoading] = useState(false)

    async function updatePlace() {
        try {
            setLoading(true)
            const res = await API.placesControllerUpdatePlace({
                placeId: data?.place.placeId,
                createStep: CreatePlaceSteps.AddDescription,
                description: description
            })
            setData(res.data)
            onNext()
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Text style={styles.title}>Add Description</Text>

            <AppTextInput name="description"
                          value={description}
                          onTextChange={(text) => setDescription(text)}
                          design={1}
                          textArea
                          label="Description"
                          placeholder="Add your description to your place"

            />
            <AppButton extraStylesBtn={styles.button} fullWidth onPress={updatePlace}>next</AppButton>
            <Text>{description}</Text>
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