import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { useAuth } from '@/contexts/auth-context';
import AppButton from '@/components/appComponents/AppButton';
import { ButtonType } from '@/styles/Button';
import AppSafeAreaView from '@/components/appComponents/AppSafeAreaView';
import AppKeyboardAvoidingView from '@/components/appComponents/AppKeyboardAvoidingView';
import AuthForm from '@/components/auth/AuthForm';
import { Theme } from '@/styles/Theme';
import Google from '@/assets/icons/social-media/google.svg';
import { useAuthStore } from '@/utils/authStore';


export default function SignIn() {
  const { signInWithGoogle, signInWithApple } = useAuth();
  const { resetOnboarding } = useAuthStore();
  const [showEmailForm, setShowEmailForm] = useState(false);


  function closeForm() {
    setShowEmailForm(false);
  }

  return (


    <View style={styles.content}>
      {!showEmailForm && (
        <View
          style={styles.welcomeContainer}
        >
          <Text style={styles.appTitle}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in in order to create listing, manage favorites and get more
            features</Text>
        </View>
      )}

      {!showEmailForm && (
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

          <AppButton
            fullWidth
            extraStylesBtn={styles.emailSignInButton}
            extraStylesTxt={styles.emailSignInText}
            iconColor="black"
            icon="mail"
            onPress={() => setShowEmailForm(true)}
            buttonType={ButtonType.OUTLINED}>
            Continue with Email
          </AppButton>

          <AppButton onPress={() => resetOnboarding()}>
            reset on boarding
          </AppButton>
        </Animated.View>
      )}

      {showEmailForm && (
        <AppSafeAreaView transparentBackground>
          <Pressable onPress={closeForm} style={{ flex: 1 }}>
            <AppKeyboardAvoidingView>
              <Animated.View
                entering={FadeInDown.duration(400)}
                exiting={FadeOutDown.duration(300)}
                style={styles.signInFormContainer}>
                <AuthForm />
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
    flex: 1,
    backgroundColor: 'black',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 80,
  },
  appTitle: {
    fontSize: Theme.sizes.xxl,
    color: Theme.colors.primary,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 14,
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
    boxShadow: Theme.effects.boxShadow,
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