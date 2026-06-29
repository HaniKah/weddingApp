import React, {useRef, useState} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AppForm, FormRef} from '@/contexts/form-context';
import AppTextInput from '@/components/appComponents/AppTextInput';
import AppButton from '@/components/appComponents/AppButton';
import {ButtonType} from '@/styles/Button';
import {Theme} from '@/styles/Theme';
import {useAuth} from '@/contexts/auth-context';
import OtpForm from '@/components/auth/OtpForm';

import {useTranslation} from 'react-i18next';


enum AuthTabs {
    SignIn = 'SignIn',
    SignUp = 'SignUp',
}

export default function AuthForm() {
    const [activeTab, setActiveTab] = useState<AuthTabs>(AuthTabs.SignIn);
    const {t} = useTranslation();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [confirmPassword, setConfirmPassword] = useState<string>();
    const [firstName, setFirstName] = useState<string>();
    const [lastName, setLastName] = useState<string>();


    const formRef = useRef<FormRef>(null);

    const {signInWithEmail, signUpWithEmail, errorMessage, setErrorMessage, pendingVerificationEmail} = useAuth();


    const handleSubmit = async () => {
        setErrorMessage(null);
        if (activeTab === AuthTabs.SignIn) {
            if (!email || !password) return;
            signInWithEmail({email: email, password: password});
        } else {
            if (password !== confirmPassword) {
                // Basic validation for confirm password since AppForm might not handle it automatically
                alert(t('auth.passwordsDontMatch'));
                return;
            }
            if (!password || !confirmPassword || !firstName || !lastName || !email) return;
            signUpWithEmail({email: email, password: password, firstName: firstName, lastName: lastName});
        }
    };

    function handleToggleTab(activeTab: AuthTabs) {
        setEmail(undefined);
        setPassword(undefined);
        setConfirmPassword(undefined);
        setErrorMessage(null);
        setActiveTab(activeTab);
    }

    // Once signup/signin reports the email needs verifying, swap the form for
    // the OTP step until the user verifies or backs out.
    if (pendingVerificationEmail) {
        return <OtpForm/>;
    }

    return (

        <View onStartShouldSetResponder={() => true}
              style={[styles.container]}>
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === AuthTabs.SignIn && styles.activeTab]}
                    onPress={() => handleToggleTab(AuthTabs.SignIn)}
                >
                    <Text
                        style={[styles.tabText, activeTab === AuthTabs.SignIn && styles.activeTabText]}>{t('auth.signIn')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === AuthTabs.SignUp && styles.activeTab]}
                    onPress={() => handleToggleTab(AuthTabs.SignUp)}
                >
                    <Text
                        style={[styles.tabText, activeTab === AuthTabs.SignUp && styles.activeTabText]}>{t('auth.signUp')}</Text>
                </TouchableOpacity>
            </View>

            <AppForm ref={formRef} onSubmit={handleSubmit}>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}

                >
                    <View style={styles.formFields}>
                        {activeTab === AuthTabs.SignUp && (
                            <AppTextInput
                                name="firstName"
                                label={t('auth.firstName')}
                                placeholder={t('auth.firstNamePlaceholder')}
                                value={firstName}
                                onChange={setFirstName}
                                required
                            />
                        )}
                        {activeTab === AuthTabs.SignUp && (
                            <AppTextInput
                                name="lastName"
                                label={t('auth.lastName')}
                                placeholder={t('auth.lastNamePlaceholder')}
                                value={lastName}
                                onChange={setLastName}
                                required
                            />
                        )}
                        <AppTextInput
                            name="email"
                            label={t('auth.email')}
                            placeholder={t('auth.emailPlaceholder')}
                            value={email}
                            onChange={setEmail}
                            required
                            keyboardType="email-address"
                            inputMode={'email'}
                        />
                        <AppTextInput
                            name="password"
                            label={t('auth.password')}
                            placeholder={t('auth.passwordPlaceholder')}
                            value={password}
                            onChange={setPassword}
                            required
                            secureTextEntry
                        />

                        {activeTab === AuthTabs.SignUp && (
                            <AppTextInput
                                name="confirmPassword"
                                label={t('auth.confirmPassword')}
                                placeholder={t('auth.confirmPasswordPlaceholder')}
                                value={confirmPassword}
                                onChange={setConfirmPassword}
                                required
                                secureTextEntry
                            />
                        )}
                    </View>
                    {errorMessage &&
                        <Text style={styles.errorTextMessage}>{errorMessage}</Text>
                    }
                    <AppButton
                        fullWidth
                        buttonType={ButtonType.PRIMARY}
                        extraStylesBtn={styles.submitButton}
                        isSubmit
                    >
                        {activeTab === AuthTabs.SignIn ? t('auth.signInButton') : t('auth.signUpButton')}
                    </AppButton>
                </ScrollView>
            </AppForm>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        // Never let the form grow past the space the keyboard leaves; the
        // ScrollView inside takes over once the content is taller than this.
        maxHeight: '80%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        opacity: 0.85,
        boxShadow: Theme.shadow.lg,

    },
    tabContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: Theme.colors.gray.S300,
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: 'black',
    },
    tabText: {
        fontSize: 16,
        color: Theme.colors.gray.S500,
    },
    activeTabText: {
        color: 'black',
        fontWeight: 'bold',
    },
    formFields: {
        marginBottom: 20,
        gap: 20,
    },
    submitButton: {
        backgroundColor: 'black',
    },
    errorTextMessage: {
        color: Theme.colors.red.S500,
        marginBottom: 20,
    },
    scrollContent: {
        // No flexGrow: 1 here — that would stretch the content to fill the
        // ScrollView and prevent it from ever scrolling to the submit button.
        paddingBottom: 4,
    },
});
