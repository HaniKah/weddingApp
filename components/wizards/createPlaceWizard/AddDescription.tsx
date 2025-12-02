import AppTextInput from "@/components/appComponents/AppTextInput";
import {StyleSheet, Text} from "react-native";
import {Theme} from "@/styles/Theme";
import AppButton from "@/components/appComponents/AppButton";

export default function AddDescription({onNext, description, setDescription}: {
    onNext: () => void,
    description: string | undefined,
    setDescription: (text: string) => void
}) {


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
            <AppButton extraStylesBtn={styles.button} fullWidth onPress={onNext}>next</AppButton>
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