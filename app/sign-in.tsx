import { useAuth } from "@/contexts/auth-context";
import AppButton from "@/components/appComponents/AppButton";
import { ButtonType } from "@/styles/Button";
import { useVideoPlayer, VideoSource, VideoView } from "expo-video";
import { StyleSheet, Text, View } from "react-native";
import Google from "@/assets/icons/social-media/google.svg"

// const videoSource =
//     'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

const assetId = require("../assets/videos/ring.mp4")

const videoSource: VideoSource = {
    assetId,
    metadata: {
        title: 'ring',
        artist: 'artist',
    },
};

// const videoSource = process.env.EXPO_PUBLIC_VIDEO_URL as string


export default function SignIn() {
    const { signInWithGoogle } = useAuth()

    const player = useVideoPlayer(videoSource, (player) => {
        player.loop = true;
        player.play();
    })


    return (

        <View style={styles.container}>

            <VideoView
                player={player}
                nativeControls={false}
                style={StyleSheet.absoluteFill}
                contentFit="cover"
            />
            <View style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                backgroundColor: "white",
                opacity: 0.3,
            }}>

            </View>

            <View
                style={styles.signInContainer}
            >

                <AppButton
                    fullWidth
                    buttonType={ButtonType.PRIMARY}
                    onPress={signInWithGoogle}
                    CustomIcon={Google}
                >
                    Sign In with Google
                </AppButton>
            </View>
        </View>


    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
    },
    signInContainer: {
        flex: 1,
        justifyContent: "flex-end",
        paddingBottom: 60,
        paddingHorizontal: 30,
    },
});