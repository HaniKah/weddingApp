import { useEffect, useRef, useState } from 'react';
import { FlatList, Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Theme } from '@/styles/Theme';
import { IconSymbol } from '@/components/symbols/IconSymbol';
import AppBottomSheet, { AppBottomSheetRef } from '@/components/appComponents/AppBottomSheet';
import { useFormContext } from '@/contexts/form-context';
import { PickerItem } from '@/components/appComponents/AppPicker';

export default function AppDropDown<T>({ itemList, label, value, onChange, style, title, required, name, disabled }: {
  style?: StyleProp<ViewStyle>,
  value: T | undefined,
  onChange: (value: T) => void,
  itemList: PickerItem<T>[] | undefined
  label?: string
  title?: string
  required?: boolean,
  name: string
  disabled?: boolean
}) {

  const form = useFormContext();
  const [error, setError] = useState<string | undefined>();

  const bottomSheetRef = useRef<AppBottomSheetRef>(null);

  const onSelect = (selectedValue: T) => {
    onChange(selectedValue);
    bottomSheetRef.current?.close();
  };

  function renderItem({ item }: { item: PickerItem<T> }) {
    return (
      <Pressable style={styles.renderItem} onPress={() => onSelect(item.value)}>
        <Text>{item.name}</Text>
        {item.value === value && <IconSymbol name="checkmark" size={16} color={Theme.colors.primary} />}
      </Pressable>
    );
  }

  useEffect(() => {
    if (form.submitting) {
      const valid = value !== undefined && value !== null;

      if (required) {
        if (valid) {
          form.addValue({ [name]: valid });
        } else {
          setError('Please check this field');
          form.setSubmitting(false);
        }
      } else {
        form.addValue({ [name]: valid });
      }
    }

    if (value !== undefined && value !== null) {
      setError(undefined);
    }
  }, [form.submitting, value, required, name, form]);

  return (
    <View style={style}>
      {label && <Text style={[styles.label, disabled && styles.disabledText]}>{label}</Text>}
      <Pressable disabled={disabled} style={[styles.pressable, disabled && styles.disabledPressable]}
                 onPress={() => bottomSheetRef.current?.open()}>
        <Text style={[styles.selectedText, disabled && styles.disabledText]}>
          {itemList?.find(item => item.value === value)?.name ?? 'Select an option'}
        </Text>
        <IconSymbol name="chevron.down" size={20} color={Theme.colors.border} />
      </Pressable>
      {error && <Text style={styles.error}>{error}</Text>}

      <AppBottomSheet ref={bottomSheetRef}>
        <View style={styles.viewContainer}>
          {title && <Text style={styles.title}>{title}</Text>}
          <FlatList contentContainerStyle={styles.flatListContainer} data={itemList} renderItem={renderItem} />

        </View>
      </AppBottomSheet>
    </View>

  );
}
const styles = StyleSheet.create({
  viewContainer: {
    padding: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: Theme.sizes.md,
    fontWeight: 'bold',

  },
  label: {
    color: Theme.colors.primary,
  },
  flatListContainer: {
    marginTop: 0,

  },
  pressable: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: Theme.radius.md,
    borderColor: Theme.colors.border,
    backgroundColor: Theme.colors.white,
    marginVertical: 5,
    borderWidth: 1,
  },
  disabledPressable: {
    backgroundColor: Theme.colors.backgroundDisabled,
    borderWidth: 0,
  },
  selectedText: {
    color: Theme.colors.primary,
  },
  disabledText: {
    color: Theme.colors.textDisabled,
  },
  renderItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.gray.S300,

  },
  error: {
    fontSize: Theme.sizes.xs,
    color: Theme.colors.red['S500'],

  },

});