import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import * as Progress from 'react-native-progress';
import {Theme} from "@/styles/Theme";

interface OTAUpdateScreenProps {
    progress: number;
}

export const OTAUpdateScreen: React.FC<OTAUpdateScreenProps> = ({progress}) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={Theme.colors.primary}/>
            <Text style={styles.title}>Updating App...</Text>
            <Text style={styles.message}>Please wait while we install the latest updates.</Text>

            <View style={styles.progressContainer}>
                <Progress.Circle
                    size={100}
                    progress={progress}
                    showsText={true}
                    formatText={(p) => `${Math.round(p * 100)}%`}
                    color={Theme.colors.primary}
                />
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
        zIndex: 10000,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 20,
        color: Theme.colors.primary
    },
    message: {
        fontSize: 16,
        color: Theme.colors.secondary,
        marginTop: 10,
        textAlign: 'center',

    },
    progressContainer: {
        marginTop: 40,
    },
});
