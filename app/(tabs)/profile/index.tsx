import { useAuth } from '@/contexts/auth-context';
import { useLocationContext } from '@/contexts/location-context';
import AppView from '@/components/appComponents/AppView';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import AppButton from '@/components/appComponents/AppButton';
import { ButtonType } from '@/styles/Button';
import { Theme } from '@/styles/Theme';
import MenuItem from '@/components/items/MenuItem';
import { router, Stack } from 'expo-router';

export default function Index() {
  const { signOut } = useAuth();
  const { address } = useLocationContext();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView style={styles.container}>
        <AppView withPadding>

          <View style={styles.info}>
            <Text style={styles.name}>Welcome back</Text>
            <Text style={styles.address}>{address?.city}, {address?.country}</Text>
          </View>


          <View style={styles.sectionContainer}>

            {/* ACCOUNT */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Account</Text>
              <View style={styles.menuCard}>
                <MenuItem
                  icon="heart"
                  label="My Favorites"
                  onPress={() => router.push('/(tabs)/profile/favorites')}
                />
              </View>
            </View>

            {/* BUSINESS */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Business</Text>
              <View style={styles.menuCard}>
                <MenuItem
                  icon="briefcase"
                  label="My Listings"
                  onPress={() => router.push('/(tabs)/profile/listing')}
                />
              </View>
            </View>

          </View>

          <AppButton extraStylesBtn={{ marginTop: 20 }} fullWidth destructive buttonType={ButtonType.PLAIN}
                     buttonSize="MD" onPress={signOut}>
            Logout
          </AppButton>
        </AppView>
      </ScrollView>

    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: Theme.sizes.xl,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  address: {
    color: Theme.colors.gray.S400,
    textAlign: 'center',
  },

  sectionContainer: {
    marginTop: 30,
  },
  section: { marginBottom: 20 },

  sectionTitle: {
    fontSize: 12,
    color: Theme.colors.gray.S500,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  menuCard: {
    backgroundColor: Theme.colors.iconBackground,
    borderRadius: Theme.radius.md,
    overflow: 'hidden',
  },
});