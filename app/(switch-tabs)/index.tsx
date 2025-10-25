import AppView from "@/components/appComponents/AppView";
import PlacesToolbar from "@/components/toolbars/PlacesToolbar";
import {useApi} from "@/utils/api";
import {StyleSheet, Text} from "react-native";
import {Theme} from "@/styles/Theme";
import {useState} from "react";
import AddPlaceModal from "@/components/modals/AddPlaceModal";

export default function Index() {
    const API = useApi()
    const [openModal, setOpenModal] = useState(false)

    function createPlace() {
        console.log("create place")

    }

    return (
        <>
            <PlacesToolbar onCreatePlace={() => setOpenModal(true)}/>
            <AppView withPadding>
                <Text style={styles.title}>Your places</Text>
            </AppView>
            <AddPlaceModal setIsVisible={setOpenModal} isVisible={openModal}/>
        </>
    )
}
const styles = StyleSheet.create({
    title: {
        fontSize: Theme.sizes.xl,
        fontWeight: "bold",
        padding: 10,
    }
})