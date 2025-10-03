import {StyleSheet, View} from "react-native";
import GuestSide from "@/components/GuestSide";
import {CoupleSide} from "@/types/open-api";
import GuestItem from "@/components/items/GuestItem";

export default function Guests() {
    const handleAddGuest = () => {
        console.log("add guest ...")
    }
    return (
        <>
            <View style={styles.container}>
                <GuestSide side={CoupleSide.Bride} onAddGuest={handleAddGuest}/>
                <GuestSide side={CoupleSide.Groom} onAddGuest={handleAddGuest}/>
            </View>
            <View style={styles.listContainer}>
                <GuestItem side={CoupleSide.Bride} name="hani"/>
                <GuestItem side={CoupleSide.Bride} name="hani"/>
                <GuestItem side={CoupleSide.Groom} name="Angelina"/>
                <GuestItem side={CoupleSide.Groom} name="Angelina"/>
                <GuestItem side={CoupleSide.Groom} name="Angelina"/>
            </View>

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