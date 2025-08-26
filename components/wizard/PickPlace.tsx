import {StyleSheet, Text, View} from "react-native";
import {Theme} from "@/constants/Theme";


export default function PickPlace() {
    // const [places, setPlaces] = useState([])
    // useEffect(() => {
    //     const fetchPlaces = async () => {
    //         const data = await searchPlaces("pizza");
    //         setPlaces(data);
    //         console.log(data);
    //     };
    //     fetchPlaces();
    // }, []);
    return (
        <View>
            <Text style={styles.heading}>
                Pick a Place
            </Text>
            <Text style={styles.question}>
                WHERE SHOULD THE WEDDING TAKE A PLACE ?
            </Text>
        </View>
    )

}
const styles = StyleSheet.create({

    heading: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: Theme.colors.primary,
        fontFamily: Theme.typography.meaCulpa
    },
    question: {
        color: Theme.colors.primary,
        marginTop: 20,
        textAlign: 'center',
        fontSize: 24,
    }
})
