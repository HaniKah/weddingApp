import {useAuth} from "@/contexts/auth-context";
import AppButton from "@/components/appComponents/AppButton";
import {ButtonType} from "@/styles/Button";
import {useVideoPlayer, VideoView} from "expo-video";
import {Dimensions, StyleSheet, View} from "react-native";

const videoSource =
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';


export default function SignIn() {
    const {signInWithGoogle} = useAuth()
    const {height, width} = Dimensions.get("window");


    const player = useVideoPlayer(videoSource, player => {
        player.loop = true;
        player.play();
    });


    return (
        <>
            <View style={styles.container}>

                <VideoView style={{height}} player={player}/>

                <View style={styles.signInContainer}>
                    <AppButton fullWidth buttonType={ButtonType.OUTLINED} onPress={signInWithGoogle}>Sign In with
                        google
                    </AppButton>
                </View>

            </View>

        </>


    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",

    },
    controlsContainer: {
        padding: 10,
    },
    signInContainer: {
        position: 'absolute',
        bottom: 50,
        width: '100%',
        padding: 40
    }
});