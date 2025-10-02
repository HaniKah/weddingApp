import {StyleSheet, View} from "react-native";
import GuestSide from "@/components/GuestSide";
import {CoupleSide} from "@/types/open-api";

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
        </>

    )

}
const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
    }
})