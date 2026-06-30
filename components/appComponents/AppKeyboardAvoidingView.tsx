import {KeyboardAvoidingView, StyleSheet} from 'react-native';
import {ReactNode} from 'react';

export default function AppKeyboardAvoidingView({children}: { children: ReactNode }) {

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
            keyboardVerticalOffset={30}

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