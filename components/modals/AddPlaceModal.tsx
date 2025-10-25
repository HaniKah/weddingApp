import AppModal from "@/components/appComponents/AppModal";
import {StyleSheet, Text} from "react-native";
import AppView from "@/components/appComponents/AppView";
import {Theme} from "@/styles/Theme";

export default function AddPlaceModal({isVisible, setIsVisible}: {
    isVisible: boolean,
    setIsVisible: (value: boolean) => void
}) {

    return (
        <>
            <AppModal isVisible={isVisible} setIsVisible={setIsVisible}>
                <AppView withPadding>
                    <Text style={styles.title}>
                        Create a place
                    </Text>
                </AppView>
            </AppModal>
        </>
    )
}
const styles = StyleSheet.create({
    title: {
        fontSize: Theme.sizes.xl,
        fontWeight: "bold"
    }
})