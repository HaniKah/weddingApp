import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {AppForm, FormRef} from '@/contexts/form-context';
import AppTextInput from '@/components/appComponents/AppTextInput';
import AppButton from '@/components/appComponents/AppButton';
import {ButtonType} from '@/styles/Button';
import {Theme} from '@/styles/Theme';
import {useAuth} from '@/contexts/auth-context';
import {showSnackbar} from '@/components/Snackbar';

const CODE_LENGTH = 6;
const RESEND_COOLDOWN_SECONDS = 60;

enum Step {
    Request = 'Request',
    Reset = 'Reset',
}

interface ForgotPasswordFormProps {
    initialEmail?: string;
    onBackToSignIn: () => void;
}

export default function ForgotPasswordForm({initialEmail, onBackToSignIn}: ForgotPasswordFormProps) {
    const {t} = useTranslation();
    const {forgotPassword, resetPassword, isLoading, errorMessage, setErrorMessage} = useAuth();

    const [step, setStep] = useState<Step>(Step.Request);
    const [email, setEmail] = useState<string | undefined>(initialEmail);
    const [code, setCode] = useState<string>();
    const [newPassword, setNewPassword] = useState<string>();
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>();
    const [cooldown, setCooldown] = useState<number>(0);

    const formRef = useRef<FormRef>(null);

    useEffect(() => {
        if (cooldown <= 0) return;
        const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
        return () => clearTimeout(timer);
    }, [cooldown]);

    function handleChangeCode(text: string | undefined) {
        setErrorMessage(null);
        const digits = text?.replace(/\D/g, '').slice(0, CODE_LENGTH);
        setCode(digits);
    }

    async function handleRequestCode() {
        if (!email) return;
        setErrorMessage(null);
        const success = await forgotPassword(email);
        if (success) {
            setStep(Step.Reset);
            setCooldown(RESEND_COOLDOWN_SECONDS);
        }
    }

    async function handleResendCode() {
        if (cooldown > 0 || !email) return;
        setErrorMessage(null);
        const success = await forgotPassword(email);
        if (success) {
            setCooldown(RESEND_COOLDOWN_SECONDS);
        }
    }

    async function handleResetPassword() {
        if (!email || !code || !newPassword || !confirmNewPassword) return;
        if (newPassword !== confirmNewPassword) {
            alert(t('auth.passwordsDontMatch'));
            return;
        }

        setErrorMessage(null);
        const success = await resetPassword({
            email,
            code,
            newPassword,
        });

        if (success) {
            showSnackbar(t('auth.passwordResetSuccess'), 'success');
            onBackToSignIn();
        }
    }

    return (
        <View onStartShouldSetResponder={() => true} style={styles.container}>
            <Text style={styles.title}>
                {step === Step.Request ? t('auth.forgotPasswordTitle') : t('auth.resetPasswordTitle')}
            </Text>
            <Text style={styles.subtitle}>
                {step === Step.Request
                    ? t('auth.forgotPasswordSubtitle')
                    : t('auth.resetPasswordSubtitle')}
            </Text>

            <AppForm
                ref={formRef}
                onSubmit={step === Step.Request ? handleRequestCode : handleResetPassword}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.formFields}>
                        {step === Step.Request ? (
                            <AppTextInput
                                name="email"
                                label={t('auth.email')}
                                placeholder={t('auth.emailPlaceholder')}
                                value={email}
                                onChange={setEmail}
                                required
                                keyboardType="email-address"
                                inputMode="email"
                            />
                        ) : (
                            <>
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
                                <AppTextInput
                                    name="newPassword"
                                    label={t('auth.newPassword')}
                                    placeholder={t('auth.newPasswordPlaceholder')}
                                    value={newPassword}
                                    onChange={setNewPassword}
                                    required
                                    secureTextEntry
                                />
                                <AppTextInput
                                    name="confirmNewPassword"
                                    label={t('auth.confirmPassword')}
                                    placeholder={t('auth.confirmPasswordPlaceholder')}
                                    value={confirmNewPassword}
                                    onChange={setConfirmNewPassword}
                                    required
                                    secureTextEntry
                                />
                            </>
                        )}
                    </View>

                    {errorMessage && <Text style={styles.errorTextMessage}>{errorMessage}</Text>}

                    <AppButton
                        fullWidth
                        buttonType={ButtonType.PRIMARY}
                        extraStylesBtn={styles.submitButton}
                        isSubmit
                        inactive={isLoading}
                    >
                        {step === Step.Request
                            ? t('auth.sendResetCode')
                            : t('auth.resetPasswordButton')}
                    </AppButton>

                    <View style={styles.footer}>
                        {step === Step.Reset && (
                            <AppButton
                                buttonType={ButtonType.PLAIN}
                                inactive={cooldown > 0}
                                onPress={handleResendCode}
                            >
                                {cooldown > 0
                                    ? t('auth.resendCodeIn', {seconds: cooldown})
                                    : t('auth.resendCode')}
                            </AppButton>
                        )}

                        <AppButton
                            buttonType={ButtonType.PLAIN}
                            onPress={() => {
                                setErrorMessage(null);
                                onBackToSignIn();
                            }}
                        >
                            {t('auth.backToSignIn')}
                        </AppButton>
                    </View>
                </ScrollView>
            </AppForm>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        maxHeight: '80%',
        backgroundColor: Theme.colors.white,
        borderRadius: Theme.radius.xl,
        padding: 20,
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
        marginBottom: 20,
    },
    formFields: {
        marginBottom: 20,
        gap: 20,
    },
    submitButton: {
        marginTop: 4,
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
    scrollContent: {
        paddingBottom: 4,
    },
});
