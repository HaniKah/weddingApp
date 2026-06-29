import {KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import {ReactNode} from 'react';

export default function AppKeyboardAvoidingView({children}: { children: ReactNode }) {

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}

        >
            {children}
        </KeyboardAvoidingView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});