import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useState} from 'react';
import Animated, {Easing, FadeInDown, ReduceMotion} from 'react-native-reanimated';
import {useAuth} from '@/contexts/auth-context';
import AppButton from '@/components/appComponents/AppButton';
import {ButtonType} from '@/styles/Button';
import AppKeyboardAvoidingView from '@/components/appComponents/AppKeyboardAvoidingView';
import AuthForm from '@/components/auth/AuthForm';
import {Theme} from '@/styles/Theme';
import Google from '@/assets/icons/social-media/google.svg';


import {useTranslation} from 'react-i18next';

// ease-out-quart: fast start, long settle — matches the calm, unhurried
// register the rest of the sign-in flow is going for.
const EASE_OUT_QUART = Easing.bezier(0.25, 1, 0.5, 1);

function staggeredEntrance(index: number) {
    return FadeInDown.duration(420)
        .delay(120 + index * 70)
        .easing(EASE_OUT_QUART)
        .reduceMotion(ReduceMotion.System)
        .withInitialValues({transform: [{translateY: 12}]});
}

export default function SignIn() {
    const {signInWithGoogle, signInWithApple} = useAuth();
    const [showEmailForm, setShowEmailForm] = useState(false);
    const {t} = useTranslation();


    function closeForm() {
        setShowEmailForm(false);
    }

    return (
        <View style={styles.content}>

            {!showEmailForm && (
                <View>
                    <Animated.View
                        entering={FadeInDown.duration(500).easing(EASE_OUT_QUART).reduceMotion(ReduceMotion.System)}
                        style={styles.welcomeContainer}
                    >
                        <Text style={styles.appTitle}>{t('common.appName')}</Text>
                        <Text style={styles.subtitle}>{t('auth.welcomeSubtitle')}</Text>
                    </Animated.View>

                    <View style={styles.signInContainer}>
                        <Animated.View entering={staggeredEntrance(0)}>
                            <AppButton
                                fullWidth
                                buttonType={ButtonType.OUTLINED}
                                extraStylesBtn={styles.googleButton}
                                extraStylesTxt={styles.googleText}
                                onPress={signInWithGoogle}
                                CustomIcon={Google}
                            >
                                {t('auth.signInWithGoogle')}
                            </AppButton>
                        </Animated.View>

                        <Animated.View entering={staggeredEntrance(1)}>
                            <AppButton
                                icon="apple.logo"
                                fullWidth
                                buttonType={ButtonType.PRIMARY}
                                extraStylesBtn={styles.appleButton}
                                extraStylesTxt={styles.appleText}
                                onPress={signInWithApple}
                            >
                                {t('auth.signInWithApple')}
                            </AppButton>
                        </Animated.View>

                        <Animated.View entering={staggeredEntrance(2)} style={styles.dividerRow}>
                            <View style={styles.dividerLine}/>
                            <Text style={styles.dividerText}>{t('common.or')}</Text>
                            <View style={styles.dividerLine}/>
                        </Animated.View>

                        <Animated.View entering={staggeredEntrance(3)}>
                            <AppButton
                                fullWidth
                                extraStylesBtn={styles.emailButton}
                                extraStylesTxt={styles.emailText}
                                icon="mail"
                                iconColor={Theme.colors.primary}
                                onPress={() => setShowEmailForm(true)}
                                buttonType={ButtonType.PLAIN}>
                                {t('auth.continueWithEmail')}
                            </AppButton>
                        </Animated.View>
                    </View>
                </View>
            )}

            {showEmailForm && (
                <AppKeyboardAvoidingView>
                    <Pressable onPress={closeForm} style={styles.pressable}>
                        <Animated.View
                            entering={FadeInDown.duration(400).easing(EASE_OUT_QUART).reduceMotion(ReduceMotion.System)}
                            style={styles.signInFormContainer}>
                            <AuthForm/>
                        </Animated.View>
                    </Pressable>
                </AppKeyboardAvoidingView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },

    welcomeContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 48,
    },
    appTitle: {
        fontSize: 34,
        letterSpacing: -0.5,
        color: Theme.colors.primary,
        textAlign: 'center',
        marginBottom: 10,
        fontFamily: Theme.typographies.poppins.black,
    },
    subtitle: {
        fontSize: Theme.sizes.md,
        color: Theme.colors.secondary,
        textAlign: 'center',
        lineHeight: 22,
        maxWidth: 280,
    },
    signInContainer: {
        gap: 12,
        paddingBottom: 48,
        paddingHorizontal: 24,
    },
    signInFormContainer: {
        justifyContent: 'center',
        flex: 1,
        paddingHorizontal: 20,
    },
    googleButton: {
        backgroundColor: Theme.colors.white,
        borderColor: Theme.colors.border,
        height: 56,
        boxShadow: Theme.shadow.md,
    },
    googleText: {
        color: Theme.colors.black,
        fontWeight: '600',
    },
    appleButton: {
        backgroundColor: Theme.colors.black,
        height: 56,
    },
    appleText: {
        color: Theme.colors.white,
        fontWeight: '600',
    },
    dividerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginVertical: 4,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: Theme.colors.border,
    },
    dividerText: {
        fontSize: Theme.sizes.sm,
        color: Theme.colors.secondary,
    },
    emailButton: {
        height: 48,
        alignSelf: 'center',
    },
    emailText: {
        color: Theme.colors.primary,
        fontWeight: '600',
    },
    pressable: {
        flex: 1,
    },
});
