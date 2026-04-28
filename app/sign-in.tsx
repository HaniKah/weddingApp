import {useAuth} from '@/contexts/auth-context';
import AppButton from '@/components/appComponents/AppButton';
import {ButtonType} from '@/styles/Button';
import {useVideoPlayer, VideoSource, VideoView} from 'expo-video';
import {Pressable, StyleSheet, View} from 'react-native';
import Google from '@/assets/icons/social-media/google.svg';
import {Theme} from '@/styles/Theme';
import {useState} from 'react';
import AuthForm from '@/components/auth/AuthForm';
import Animated, {FadeInUp, FadeOutDown} from 'react-native-reanimated';
import AppKeyboardAvoidingView from '@/components/appComponents/AppKeyboardAvoidingView';
import AppSafeAreaView from "@/components/appComponents/AppSafeAreaView";

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
    const {signInWithGoogle, signInWithApple} = useAuth();
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
                        buttonType={ButtonType.PRIMARY}
                        extraStylesBtn={styles.googleButtonPrimary}
                        extraStylesTxt={styles.googleTextPrimary}
                        onPress={signInWithGoogle}
                        CustomIcon={Google}
                    >
                        Sign In with Google
                    </AppButton>

                    <AppButton
                        icon="apple.logo"
                        fullWidth
                        buttonType={ButtonType.PRIMARY}
                        extraStylesBtn={styles.appleButtonPrimary}
                        extraStylesTxt={styles.appleTextPrimary}
                        onPress={signInWithApple}
                    >
                        Sign In with Apple
                    </AppButton>

                    {/*<View style={styles.orContainer}>*/}
                    {/*    <View style={styles.line}/>*/}
                    {/*    <Text style={styles.orText}>or</Text>*/}
                    {/*    <View style={styles.line}/>*/}
                    {/*</View>*/}


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
                <AppSafeAreaView transparentBackground>
                    <Pressable onPress={closeForm} style={{flex: 1}}>
                        <AppKeyboardAvoidingView>
                            <Animated.View entering={FadeInUp.duration(300)}
                                           exiting={FadeOutDown.duration(300)}
                                           style={styles.signInFormContainer}>
                                <AuthForm/>
                            </Animated.View>
                        </AppKeyboardAvoidingView>
                    </Pressable>
                </AppSafeAreaView>
            )}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    signInContainer: {
        flex: 1,
        gap: 10,
        justifyContent: 'flex-end',
        paddingBottom: 60,
        paddingHorizontal: 30,
    },
    signInFormContainer: {
        justifyContent: "flex-end",
        flex: 1,
        paddingVertical: 60,
        paddingHorizontal: 30,


    },

    googleButtonPrimary: {
        backgroundColor: Theme.colors.white,
    },
    googleTextPrimary: {
        color: Theme.colors.black,
    },
    appleButtonPrimary: {
        backgroundColor: Theme.colors.black,
    },
    appleTextPrimary: {
        color: Theme.colors.white,
    },
    // googleButtonOutlined: {
    //     borderColor: Theme.colors.black,
    //     backgroundColor: 'transparent',
    // },
    // googleTxtOutlined: {
    //     color: 'black',
    // },


    emailSignInButton: {
        borderColor: 'black',
    },
    emailSignInText: {
        color: 'black',
    },
    // orContainer: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     marginVertical: 15,
    //     paddingHorizontal: 10,
    // },
    // line: {
    //     flex: 1,
    //     height: 1,
    //     backgroundColor: Theme.colors.gray.S700,
    //     opacity: 0.5,
    // },
    // orText: {
    //     marginHorizontal: 10,
    //     fontSize: 14,
    //     color: 'black',
    //     fontWeight: '500',
    // },
});