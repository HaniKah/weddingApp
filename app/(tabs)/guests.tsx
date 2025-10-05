import {FlatList, StyleSheet, View} from "react-native";
import GuestSide from "@/components/GuestSide";
import {CoupleSide, GuestsViewModel} from "@/types/open-api";
import AddGuestModal from "@/components/modal/AddGuestModal";
import {useEffect, useState} from "react";
import {API} from "@/utils/api";
import AppView from "@/components/appComponents/AppView";
import GuestItem from "@/components/items/GuestItem";

export default function Guests() {

    const [modalVisible, setModalVisible] = useState(false)
    const [guestSide, setGuestSide] = useState<CoupleSide>()
    const [isLoading, setIsLoading] = useState(true)
    const [guests, setGuests] = useState<GuestsViewModel>()


    const handleAddGuest = (side: CoupleSide) => {
        setGuestSide(side)
        setModalVisible(true)
    }

    useEffect(() => {

        async function getAllGuests() {
            try {
                const response = await API.guestsControllerGetGuests()
                setGuests(response.data)
            } catch (err) {
                console.error(err)
            } finally {
                setIsLoading(false)
            }
        }

        getAllGuests()


    }, []);


    return (
        <>
            <AppView isLoading={isLoading}>
                <View style={styles.container}>
                    <GuestSide side={CoupleSide.Bride} onAddGuest={handleAddGuest}/>
                    <GuestSide side={CoupleSide.Groom} onAddGuest={handleAddGuest}/>
                </View>

                <FlatList renderItem={GuestItem} data={guests?.result}/>
            </AppView>


            <AddGuestModal guestSide={guestSide} isVisible={modalVisible} setIsVisible={setModalVisible}/>
        </>

    )

}
const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
    },
    listContainer: {
        marginTop: 2,
    }
})