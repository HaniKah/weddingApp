import React from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as LinkingAPI from 'expo-linking';

interface ForceUpdateScreenProps {
    storeUrls: {
        ios: string;
        android: string;
    };
}

export const ForceUpdateScreen: React.FC<ForceUpdateScreenProps> = ({storeUrls}) => {
    const handleUpdate = () => {
        const url = Platform.OS === 'ios' ? storeUrls.ios : storeUrls.android;
        LinkingAPI.openURL(url);
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Update Required</Text>
                <Text style={styles.message}>
                    A new version of the app is required to continue. Please update to the latest version to enjoy the
                    best
                    experience.
                </Text>
                <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                    <Text style={styles.buttonText}>Update Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
    },
    content: {
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 30,
        color: '#666',
    },
    button: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});
