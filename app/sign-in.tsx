import {useAuth} from '@/contexts/auth-context';
import AppButton from '@/components/appComponents/AppButton';
import {ButtonType} from '@/styles/Button';
import {useVideoPlayer, VideoSource, VideoView} from 'expo-video';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Google from '@/assets/icons/social-media/google.svg';
import {Theme} from '@/styles/Theme';
import {useState} from 'react';
import AuthForm from '@/components/auth/AuthForm';
import Animated, {FadeInUp, FadeOutDown} from 'react-native-reanimated';
import AppKeyboardAvoidingView from '@/components/appComponents/AppKeyboardAvoidingView';

// const videoSource =
//     'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

const assetId = require('../assets/videos/ring.mp4');

const videoSource: VideoSource = {
    assetId,
    metadata: {
        title: 'ring',
        artist: 'artist',
    },
};

// const videoSource = process.env.EXPO_PUBLIC_VIDEO_URL as string


export default function SignIn() {
    const {signInWithGoogle} = useAuth();
    const [showEmailForm, setShowEmailForm] = useState(false);

    const player = useVideoPlayer(videoSource, (player) => {
        player.loop = true;
        player.play();
    });

    function closeForm() {
        player.play()
        setShowEmailForm(false)
    }


    return (

        <View style={styles.container}>

            <VideoView
                player={player}
                nativeControls={false}
                style={StyleSheet.absoluteFill}
                contentFit="cover"
            />
            {!showEmailForm && (
                <View style={styles.signInContainer}
                >

                    <AppButton
                        fullWidth
                        buttonType={showEmailForm ? ButtonType.OUTLINED : ButtonType.PRIMARY}
                        extraStylesBtn={showEmailForm ? styles.googleButtonOutlined : styles.googleButtonPrimary}
                        extraStylesTxt={showEmailForm && styles.googleTxtOutlined}
                        onPress={signInWithGoogle}
                        CustomIcon={Google}
                    >
                        Sign In with Google
                    </AppButton>

                    <View style={styles.orContainer}>
                        <View style={styles.line}/>
                        <Text style={styles.orText}>or</Text>
                        <View style={styles.line}/>
                    </View>


                    <AppButton fullWidth
                               extraStylesBtn={styles.emailSignInButton}
                               extraStylesTxt={styles.emailSignInText}
                               iconColor="black"
                               icon="mail"
                               onPress={() => setShowEmailForm(true)}
                               buttonType={ButtonType.OUTLINED}>
                        Continue with Email
                    </AppButton>
                </View>
            )}

            {showEmailForm && (
                <Pressable onPress={closeForm} style={{flex: 1}}>
                    <AppKeyboardAvoidingView>
                        <Animated.View entering={FadeInUp.duration(300)}
                                       exiting={FadeOutDown.duration(300)}
                                       style={styles.signInContainer}>
                            <AuthForm/>
                        </Animated.View>
                    </AppKeyboardAvoidingView>
                </Pressable>
            )}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        height: "100%"
    },
    signInContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 60,
        paddingHorizontal: 30,
    },

    googleButtonPrimary: {
        backgroundColor: Theme.colors.black,
    },
    googleButtonOutlined: {
        borderColor: Theme.colors.black,
        backgroundColor: 'transparent',
    },
    googleTxtOutlined: {
        color: 'black',
    },


    emailSignInButton: {
        borderColor: 'black',
    },
    emailSignInText: {
        color: 'black',
    },
    orContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
        paddingHorizontal: 10,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: Theme.colors.gray.S700,
        opacity: 0.5,
    },
    orText: {
        marginHorizontal: 10,
        fontSize: 14,
        color: 'black',
        fontWeight: '500',
    },
});