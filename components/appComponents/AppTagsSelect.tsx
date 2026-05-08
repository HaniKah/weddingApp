import { ScrollView, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useEffect, useState } from 'react';
import { Theme } from '@/styles/Theme';
import { useFormContext } from '@/contexts/form-context';
import { PickerItem } from '@/components/appComponents/AppPicker';

export default function AppTagsSelect<T>({
                                           name,
                                           list,
                                           label,
                                           onChange,
                                           value,
                                           style,
                                           borders = 'rounded',
                                           disabled,
                                           required,
                                         }: {
  name: string,
  list: PickerItem<T>[],
  label: string,
  onChange: (value: T) => void,
  value: T | undefined
  style?: StyleProp<ViewStyle>
  borders?: 'rounded' | 'rectangle'
  disabled?: boolean
  required?: boolean
}) {

  const [error, setError] = useState<string | undefined>();
  const form = useFormContext();

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
    <>
      <View style={[style]}>
        <Text style={[styles.label, disabled && styles.disabledLabel]}>{label}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.scrollView}>
          {list.map(c => {
            return (
              <TouchableOpacity
                disabled={disabled}
                onPress={() => onChange(c.value)}
                style={[
                  styles.items,
                  value === c.value && styles.activeItem,
                  borders === 'rectangle' && styles.rectangleItem,
                  disabled && styles.disabledItem,
                ]}
                key={c.name}
              >
                <Text
                  style={[
                    styles.itemsText,
                    value === c.value && styles.activeText,
                    disabled && styles.disabledText,
                  ]}
                >
                  {c.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  label: {
    marginBottom: 5,
    color: Theme.colors.primary,
  },
  disabledLabel: {
    color: Theme.colors.textDisabled,
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
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  itemsText: {
    textAlign: 'center',
    color: Theme.colors.primary,
  },
  disabledItem: {
    backgroundColor: Theme.colors.backgroundDisabled,
  },
  activeItem: {
    backgroundColor: Theme.colors.primary,
    borderWidth: 0,

  },
  rectangleItem: {
    borderRadius: Theme.radius.md,
  },

  activeText: {
    color: Theme.colors.white,

  },
  disabledText: {
    color: Theme.colors.textDisabled,
  },
  error: {
    fontSize: Theme.sizes.xs,
    color: Theme.colors.red.S500,
    marginTop: 5,
  },


});