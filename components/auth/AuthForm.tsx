import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppForm, FormRef } from '@/contexts/form-context';
import AppTextInput from '@/components/appComponents/AppTextInput';
import AppButton from '@/components/appComponents/AppButton';
import { ButtonType } from '@/styles/Button';
import { Theme } from '@/styles/Theme';

interface AuthFormProps {
  onSignIn: (data: any) => void;
  onSignUp: (data: any) => void;
}

export default function AuthForm({ onSignIn, onSignUp }: AuthFormProps) {
  const [activeTab, setActiveTab] = useState<'signIn' | 'signUp'>('signIn');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const formRef = useRef<FormRef>(null);

  const handleSubmit = (data: any) => {
    if (activeTab === 'signIn') {
      onSignIn(data);
    } else {
      if (data.password !== data.confirmPassword) {
        // Basic validation for confirm password since AppForm might not handle it automatically
        alert('Passwords don\'t match');
        return;
      }
      onSignUp(data);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'signIn' && styles.activeTab]}
          onPress={() => setActiveTab('signIn')}
        >
          <Text style={[styles.tabText, activeTab === 'signIn' && styles.activeTabText]}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'signUp' && styles.activeTab]}
          onPress={() => setActiveTab('signUp')}
        >
          <Text style={[styles.tabText, activeTab === 'signUp' && styles.activeTabText]}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <AppForm ref={formRef} onSubmit={handleSubmit}>
        <View style={styles.formFields}>
          <AppTextInput
            name="email"
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChange={setEmail}
            required
            keyboardType="email-address"
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
          {activeTab === 'signUp' && (
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

        <AppButton
          fullWidth
          buttonType={ButtonType.PRIMARY}
          extraStylesBtn={styles.submitButton}
          isSubmit
        >
          {activeTab === 'signIn' ? 'Sign in' : 'Sign up'}
        </AppButton>
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
  },
  submitButton: {
    backgroundColor: 'black',
  },
});
