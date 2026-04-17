import { ScrollView, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { SetStateAction } from 'react';
import { Theme } from '@/styles/Theme';

export default function AppTagsSelect({ name, list, label, onChange, value, style, borders = 'rounded', disabled }: {
  name: string,
  list: any[],
  label: string,
  onChange: SetStateAction<any>
  value: any
  style?: StyleProp<ViewStyle>
  borders?: 'rounded' | 'rectangle'
  disabled?: boolean
}) {


  return (
    <>
      <View style={[style]}>
        <Text style={[styles.label, disabled && styles.disabledLabel]}>{label}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.scrollView}>
          {list.map(c => {
            return (
              <TouchableOpacity disabled={disabled} onPress={() => onChange(c)}
                                style={[styles.items, value === c && styles.activeItem, borders === 'rectangle' && styles.rectangleItem, disabled && styles.disabledItem]}
                                key={c}>
                <Text
                  style={[styles.itemsText, value === c && styles.activeText, disabled && styles.disabledText]}>{c}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View></>
  );
}
const styles = StyleSheet.create({
  label: {
    marginBottom: 5,
  },
  disabledLabel: {
    color: Theme.colors.gray.S400,
  },
  scrollView: {
    flexDirection: 'row',
    gap: 10,
    minWidth: '100%',
  },
  items: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.radius.full,
    flexGrow: 1,
  },
  disabledItem: {
    backgroundColor: Theme.colors.gray.S200,
  },
  activeItem: {
    backgroundColor: Theme.colors.primary,

  },
  rectangleItem: {
    borderRadius: Theme.radius.sm,
  },
  itemsText: {
    textAlign: 'center',
  },
  activeText: {
    color: Theme.colors.white,
  },
  disabledText: {
    color: Theme.colors.gray.S400,
  },

});