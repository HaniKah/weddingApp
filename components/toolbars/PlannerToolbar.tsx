import Toolbar from '@/components/toolbars/Toolbar';

import { StyleSheet, Text, View } from 'react-native';
import { Theme } from '@/styles/Theme';
import { useLocationContext } from '@/contexts/location-context';
import { IconSymbol } from '@/components/symbols/IconSymbol';


export default function PlannerToolbar() {

  const { address } = useLocationContext();
  return (
    <>
      <Toolbar>

        <View style={styles.title}>
          <Text style={styles.discoverTitle}>
            DISCOVER YOUR PERFECT
          </Text>
          <Text style={styles.weddingTitle}>
            Wedding Marketplace
          </Text>

          <View style={styles.location}>
            <IconSymbol name="mappin.circle" color={Theme.colors.primary} size={18} />
            <Text>{address?.country}</Text>
          </View>

        </View>
        {/*<View style={styles.checklistBtn}>*/}
        {/*  <IconButton name="checklist" href="/(tabs)/(planner)/checklist" />*/}
        {/*</View>*/}
      </Toolbar>

    </>
  );
}
const styles = StyleSheet.create({
  title: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },

  location: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    gap: 5,
    backgroundColor: Theme.colors.iconBackground,
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: Theme.radius.full,
  },

  discoverTitle: {
    fontSize: Theme.sizes.xs,
  },
  weddingTitle: {
    fontSize: Theme.sizes.xl,
    fontWeight: 'bold',
  },

  note: {
    color: Theme.colors.primary,
  },
  pie: {
    alignSelf: 'center',
  },
  checklistBtn: {
    marginLeft: 'auto',
  },
  skipBtn: {
    alignSelf: 'flex-end',
  },
  filled: {
    color: Theme.colors.green.S700,
    fontWeight: 'bold',
  },
});