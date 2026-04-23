import {useAuth} from '@/contexts/auth-context';
import AppButton from '@/components/appComponents/AppButton';
import {ButtonType} from '@/styles/Button';
import {useVideoPlayer, VideoSource, VideoView} from 'expo-video';
import {StyleSheet, Text, View} from 'react-native';
import Google from '@/assets/icons/social-media/google.svg';
import {Theme} from '@/styles/Theme';
import {useState} from 'react';
import AuthForm from '@/components/auth/AuthForm';
import Animated, {FadeInUp, FadeOutDown, Layout} from 'react-native-reanimated';

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


    return (

        <View style={styles.container}>

            <VideoView
                player={player}
                nativeControls={false}
                style={StyleSheet.absoluteFill}
                contentFit="cover"
            />
            <View style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                backgroundColor: 'white',
                opacity: 0.3,
            }}>

            </View>

            <Animated.View
                layout={Layout.springify()}
                style={styles.signInContainer}
            >

                <AppButton
                    fullWidth
                    buttonType={showEmailForm ? ButtonType.OUTLINED : ButtonType.PRIMARY}
                    extraStylesBtn={showEmailForm ? styles.googleButtonOutlined : {backgroundColor: 'black'}}
                    onPress={signInWithGoogle}
                    CustomIcon={Google}
                    iconColor={showEmailForm ? 'black' : 'white'}
                >
                    Sign In with Google
                </AppButton>

                <View style={styles.orContainer}>
                    <View style={styles.line}/>
                    <Text style={styles.orText}>or</Text>
                    <View style={styles.line}/>
                </View>

                {!showEmailForm && (
                    <Animated.View
                        entering={FadeInUp}
                        exiting={FadeOutDown}
                    >


                        <AppButton fullWidth
                                   extraStylesBtn={styles.emailSignInButton}
                                   extraStylesTxt={styles.emailSignInText}
                                   iconColor="black"
                                   icon="mail"
                                   onPress={() => setShowEmailForm(true)}
                                   buttonType={ButtonType.OUTLINED}>
                            Continue with Email
                        </AppButton>
                    </Animated.View>
                )}

                {showEmailForm && (
                    <Animated.View
                        entering={FadeInUp.duration(400)}
                        exiting={FadeOutDown}
                    >
                        <AuthForm/>
                    </Animated.View>
                )}
            </Animated.View>
        </View>


    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    signInContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 60,
        paddingHorizontal: 30,
    },
    googleButtonOutlined: {
        borderColor: 'black',
        backgroundColor: 'transparent',
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