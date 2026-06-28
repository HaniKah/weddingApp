import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useState} from 'react';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {useAuth} from '@/contexts/auth-context';
import AppButton from '@/components/appComponents/AppButton';
import {ButtonType} from '@/styles/Button';
import AppKeyboardAvoidingView from '@/components/appComponents/AppKeyboardAvoidingView';
import AuthForm from '@/components/auth/AuthForm';
import {Theme} from '@/styles/Theme';
import Google from '@/assets/icons/social-media/google.svg';


import {useTranslation} from 'react-i18next';
import {SafeAreaView} from "react-native-safe-area-context";


export default function SignIn() {
    const {signInWithGoogle, signInWithApple} = useAuth();
    // const { resetOnboarding } = useAuthStore();
    const [showEmailForm, setShowEmailForm] = useState(false);
    const {t} = useTranslation();


    function closeForm() {
        setShowEmailForm(false);
    }

    return (


        <View style={styles.content}>


            {!showEmailForm && (
                <View>
                    <View
                        style={[styles.welcomeContainer]}
                    >
                        <Text style={styles.appTitle}>Ghamrah</Text>
                        <Text style={styles.subtitle}>{t('auth.welcomeSubtitle')}</Text>
                    </View>

                    <Animated.View
                        style={styles.signInContainer}
                    >
                        <AppButton
                            fullWidth
                            buttonType={ButtonType.PRIMARY}
                            extraStylesBtn={styles.googleButtonPrimary}
                            extraStylesTxt={styles.googleTextPrimary}
                            onPress={signInWithGoogle}
                            CustomIcon={Google}
                        >
                            {t('auth.signInWithGoogle')}
                        </AppButton>

                        <AppButton
                            icon="apple.logo"
                            fullWidth
                            buttonType={ButtonType.PRIMARY}
                            extraStylesBtn={styles.appleButtonPrimary}
                            extraStylesTxt={styles.appleTextPrimary}
                            onPress={signInWithApple}
                        >
                            {t('auth.signInWithApple')}
                        </AppButton>

                        <AppButton
                            fullWidth
                            extraStylesBtn={styles.emailSignInButton}
                            extraStylesTxt={styles.emailSignInText}
                            iconColor="black"
                            icon="mail"
                            onPress={() => setShowEmailForm(true)}
                            buttonType={ButtonType.OUTLINED}>
                            {t('auth.continueWithEmail')}
                        </AppButton>
                        {/*<AppButton onPress={resetOnboarding}>*/}
                        {/*  reset on boarding*/}
                        {/*</AppButton>*/}

                    </Animated.View>
                </View>
            )}

            {showEmailForm && (
                <SafeAreaView style={{backgroundColor: 'transparent'}}>
                    <Pressable onPress={closeForm} style={{flex: 1}}>
                        <AppKeyboardAvoidingView>
                            <Animated.View
                                entering={FadeInDown.duration(400)}
                                style={styles.signInFormContainer}>
                                <AuthForm/>
                            </Animated.View>
                        </AppKeyboardAvoidingView>
                    </Pressable>
                </SafeAreaView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },

    welcomeContainer: {

        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginVertical: 80

    },
    appTitle: {
        fontSize: Theme.sizes.xxxxl,
        color: Theme.colors.primary,
        fontWeight: 'black',
        textAlign: 'center',
        marginBottom: 14,
        fontFamily: Theme.typographies.sendFlowers,
        paddingHorizontal: 20,
    },
    subtitle: {
        fontSize: Theme.sizes.md,
        color: Theme.colors.secondary,
        textAlign: 'center',
        opacity: 0.9,
    },
    signInContainer: {
        gap: 12,
        paddingBottom: 60,
        paddingHorizontal: 30,
    },
    signInFormContainer: {
        justifyContent: 'flex-end',
        flex: 1,
        paddingVertical: 60,
        paddingHorizontal: 30,
    },
    googleButtonPrimary: {
        backgroundColor: Theme.colors.white,
        height: 56,
        boxShadow: Theme.shadow.lg,
    },
    googleTextPrimary: {
        color: Theme.colors.black,
        fontWeight: '600',
    },
    appleButtonPrimary: {
        backgroundColor: Theme.colors.black,
        height: 56,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    appleTextPrimary: {
        color: Theme.colors.white,
        fontWeight: '600',
    },
    emailSignInButton: {
        borderColor: 'black',
        height: 56,
        backgroundColor: 'transparent',
    },
    emailSignInText: {
        color: 'black',
        fontWeight: '600',
    },
});