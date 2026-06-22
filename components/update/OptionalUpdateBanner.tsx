import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface OptionalUpdateBannerProps {
  onDismiss: () => void;
  onUpdate: () => void;
}

export const OptionalUpdateBanner: React.FC<OptionalUpdateBannerProps> = ({ onDismiss, onUpdate }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>A new version is available!</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onUpdate} style={styles.updateButton}>
          <Text style={styles.updateButtonText}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDismiss} style={styles.dismissButton}>
          <Text style={styles.dismissButtonText}>Later</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#007AFF',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  text: {
    color: '#fff',
    fontWeight: '600',
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
  },
  updateButton: {
    marginRight: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  updateButtonText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  dismissButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  dismissButtonText: {
    color: '#fff',
  },
});
