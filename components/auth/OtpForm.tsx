import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import AppTextInput from '@/components/appComponents/AppTextInput';
import AppButton from '@/components/appComponents/AppButton';
import {ButtonType} from '@/styles/Button';
import {Theme} from '@/styles/Theme';
import {useAuth} from '@/contexts/auth-context';

const CODE_LENGTH = 6;
const RESEND_COOLDOWN_SECONDS = 60;

export default function OtpForm() {
    const {t} = useTranslation();
    const {
        verifyEmail,
        resendVerification,
        clearPendingVerification,
        pendingVerificationEmail,
        isLoading,
        errorMessage,
        setErrorMessage,
    } = useAuth();

    const [code, setCode] = useState<string>();
    // Start the cooldown immediately — a code was just sent on signup/signin.
    const [cooldown, setCooldown] = useState<number>(RESEND_COOLDOWN_SECONDS);

    useEffect(() => {
        if (cooldown <= 0) return;
        const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
        return () => clearTimeout(timer);
    }, [cooldown]);

    function handleChangeCode(text: string | undefined) {
        setErrorMessage(null);
        // Keep digits only, capped at the expected length.
        const digits = text?.replace(/\D/g, '').slice(0, CODE_LENGTH);
        setCode(digits);
    }

    function handleVerify() {
        if (!pendingVerificationEmail || !code || code.length !== CODE_LENGTH) return;
        verifyEmail({email: pendingVerificationEmail, code});
    }

    function handleResend() {
        if (cooldown > 0 || !pendingVerificationEmail) return;
        resendVerification(pendingVerificationEmail);
        setCooldown(RESEND_COOLDOWN_SECONDS);
    }

    const canVerify = !!code && code.length === CODE_LENGTH && !isLoading;

    return (
        <View onStartShouldSetResponder={() => true} style={styles.container}>
            <Text style={styles.title}>{t('auth.verifyEmailTitle')}</Text>
            <Text style={styles.subtitle}>
                {t('auth.verifyEmailSubtitle', {email: pendingVerificationEmail ?? ''})}
            </Text>

            <View style={styles.field}>
                <AppTextInput
                    name="code"
                    label={t('auth.verificationCode')}
                    placeholder={t('auth.verificationCodePlaceholder')}
                    value={code}
                    onChange={handleChangeCode}
                    keyboardType="number-pad"
                    inputMode="numeric"
                    required
                />
            </View>

            {errorMessage && <Text style={styles.errorTextMessage}>{errorMessage}</Text>}

            <AppButton
                fullWidth
                buttonType={ButtonType.PRIMARY}
                extraStylesBtn={styles.submitButton}
                inactive={!canVerify}
                onPress={handleVerify}
            >
                {t('auth.verifyButton')}
            </AppButton>

            <View style={styles.footer}>
                <AppButton
                    buttonType={ButtonType.PLAIN}
                    inactive={cooldown > 0}
                    onPress={handleResend}
                >
                    {cooldown > 0
                        ? t('auth.resendCodeIn', {seconds: cooldown})
                        : t('auth.resendCode')}
                </AppButton>

                <AppButton buttonType={ButtonType.PLAIN} onPress={clearPendingVerification}>
                    {t('auth.backToSignIn')}
                </AppButton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        opacity: 0.95,
        boxShadow: Theme.shadow.lg,
    },
    title: {
        fontSize: Theme.sizes.xl,
        fontWeight: 'bold',
        color: Theme.colors.primary,
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: Theme.sizes.sm,
        color: Theme.colors.secondary,
        textAlign: 'center',
        marginBottom: 24,
    },
    field: {
        marginBottom: 20,
    },
    submitButton: {
        backgroundColor: 'black',
    },
    footer: {
        marginTop: 16,
        alignItems: 'center',
        gap: 8,
    },
    errorTextMessage: {
        color: Theme.colors.red.S500,
        marginBottom: 20,
    },
});
