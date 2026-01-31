import {FlatList, StyleSheet, View} from "react-native";
import GuestSide from "@/components/GuestSide";
import {CoupleSide, GuestsDto, GuestsViewModel} from "@/types/open-api";
import AddGuestModal from "@/components/modals/AddGuestModal";
import {useEffect, useRef, useState} from "react";

import AppView from "@/components/appComponents/AppView";
import GuestItem from "@/components/items/GuestItem";
import GuestsToolbar from "@/components/toolbars/GuestsToolbar";
import {useApi} from "@/utils/api";
import {AppModalRef} from "@/components/appComponents/AppModal";

export default function Guests() {

    const [guestSide, setGuestSide] = useState<CoupleSide>()
    const [isLoading, setIsLoading] = useState(true)
    const [guests, setGuests] = useState<GuestsViewModel>()
    const [trigger, setTrigger] = useState(false)
    const [selectedGuest, setSelectedGuest] = useState<GuestsDto>()

    const API = useApi().api
    const addGuestModalRef = useRef<AppModalRef>(null)


    const handleAddGuest = (side: CoupleSide) => {
        setGuestSide(side)
        setSelectedGuest(undefined)
        addGuestModalRef.current?.open()
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
        addGuestModalRef.current?.open()


    }


    return (
        <>
            <AppView isLoading={isLoading}>
                <GuestsToolbar onCreateGuest={() => addGuestModalRef.current?.open()}/>
                <View style={styles.container}>
                    <GuestSide side={CoupleSide.Bride}/>
                    <GuestSide side={CoupleSide.Groom}/>
                </View>

                <FlatList style={{marginTop: 2}}
                          renderItem={({item}) => <GuestItem item={item} onPress={handleSelectGuest}/>}
                          data={guests?.result}/>
            </AppView>


            <AddGuestModal ref={addGuestModalRef}
                           guestInfo={selectedGuest}
                           setRefetchTrigger={setTrigger}
            />
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