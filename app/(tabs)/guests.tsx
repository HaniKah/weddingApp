import {FlatList, StyleSheet, View} from "react-native";
import GuestSide from "@/components/GuestSide";
import {CoupleSide, GuestsDto, GuestsViewModel} from "@/types/open-api";
import AddGuestModal from "@/components/modals/AddGuestModal";
import {useEffect, useState} from "react";

import AppView from "@/components/appComponents/AppView";
import GuestItem from "@/components/items/GuestItem";
import GuestsToolbar from "@/components/toolbars/GuestsToolbar";
import {useApi} from "@/utils/api";

export default function Guests() {

    const [modalVisible, setModalVisible] = useState(false)
    const [guestSide, setGuestSide] = useState<CoupleSide>()
    const [isLoading, setIsLoading] = useState(true)
    const [guests, setGuests] = useState<GuestsViewModel>()
    const [trigger, setTrigger] = useState(false)
    const [selectedGuest, setSelectedGuest] = useState<GuestsDto>()

    const API = useApi().api


    const handleAddGuest = (side: CoupleSide) => {
        setGuestSide(side)
        setSelectedGuest(undefined)
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


    }, [trigger]);

    function handleSelectGuest(guest: GuestsDto) {
        setSelectedGuest(guest)
        setModalVisible(true)

    }


    return (
        <>
            <AppView isLoading={isLoading}>
                <GuestsToolbar onCreateGuest={() => setModalVisible(true)}/>
                <View style={styles.container}>
                    <GuestSide side={CoupleSide.Bride}/>
                    <GuestSide side={CoupleSide.Groom}/>
                </View>

                <FlatList style={{marginTop: 2}}
                          renderItem={({item}) => <GuestItem item={item} onPress={handleSelectGuest}/>}
                          data={guests?.result}/>
            </AppView>


            <AddGuestModal guestInfo={selectedGuest} setRefetchTrigger={setTrigger}
                           isVisible={modalVisible}
                           setIsVisible={setModalVisible}/>
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