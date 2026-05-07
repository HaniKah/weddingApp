import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppForm, FormRef } from '@/contexts/form-context';
import AppTextInput from '@/components/appComponents/AppTextInput';
import AppButton from '@/components/appComponents/AppButton';
import { ButtonType } from '@/styles/Button';
import { Theme } from '@/styles/Theme';
import { useAuth } from '@/contexts/auth-context';

enum AuthTabs {
  SignIn = 'SignIn',
  SignUp = 'SignUp',
}

export default function AuthForm() {
  const [activeTab, setActiveTab] = useState<AuthTabs>(AuthTabs.SignIn);
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();


  const formRef = useRef<FormRef>(null);

  const { signInWithEmail, signUpWithEmail, errorMessage, setErrorMessage } = useAuth();


  const handleSubmit = async () => {
    setErrorMessage(null);
    if (activeTab === AuthTabs.SignIn) {
      if (!email || !password) return;
      signInWithEmail({ email: email, password: password });
    } else {
      if (password !== confirmPassword) {
        // Basic validation for confirm password since AppForm might not handle it automatically
        alert('Passwords don\'t match');
        return;
      }
      if (!password || !confirmPassword || !firstName || !lastName || !email) return;
      signUpWithEmail({ email: email, password: password, firstName: firstName, lastName: lastName });
    }
  };

  function handleToggleTab(activeTab: AuthTabs) {
    setEmail(undefined);
    setPassword(undefined);
    setConfirmPassword(undefined);
    setErrorMessage(null);
    setActiveTab(activeTab);
  }

  return (

    <View onStartShouldSetResponder={() => true} style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === AuthTabs.SignIn && styles.activeTab]}
          onPress={() => handleToggleTab(AuthTabs.SignIn)}
        >
          <Text style={[styles.tabText, activeTab === AuthTabs.SignIn && styles.activeTabText]}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === AuthTabs.SignUp && styles.activeTab]}
          onPress={() => handleToggleTab(AuthTabs.SignUp)}
        >
          <Text style={[styles.tabText, activeTab === AuthTabs.SignUp && styles.activeTabText]}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <AppForm ref={formRef} onSubmit={handleSubmit}>
        <ScrollView>
          <View style={styles.formFields}>
            {activeTab === AuthTabs.SignUp && (
              <AppTextInput
                name="firstName"
                label="First name"
                placeholder="Enter your first name"
                value={firstName}
                onChange={setFirstName}
                required
              />
            )}
            {activeTab === AuthTabs.SignUp && (
              <AppTextInput
                name="lastName"
                label="Last name"
                placeholder="Enter your last name"
                value={lastName}
                onChange={setLastName}
                required
              />
            )}
            <AppTextInput
              name="email"
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChange={setEmail}
              required
              keyboardType="email-address"
              inputMode={'email'}
            />
            <AppTextInput
              name="password"
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChange={setPassword}
              required
              secureTextEntry
            />

            {activeTab === AuthTabs.SignUp && (
              <AppTextInput
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Confirm your password"
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
            {activeTab === AuthTabs.SignIn ? 'Sign in' : 'Sign up'}
          </AppButton>
        </ScrollView>
      </AppForm>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,

    opacity: 0.85,
    boxShadow: Theme.effects.boxShadow,

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
});
