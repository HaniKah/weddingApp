import { KeyboardTypeOptions, StyleProp, StyleSheet, Text, TextInput, TextStyle, View, ViewStyle } from 'react-native';
import { Theme } from '@/styles/Theme';
import { useFormContext } from '@/contexts/form-context';
import { useEffect, useMemo, useRef, useState } from 'react';

export default function AppTextInput({
                                       onChange,
                                       value,
                                       keyboardType,
                                       label,
                                       placeholder,
                                       required,
                                       name,
                                       design = 1,
                                       debounceTime = 0,
                                       extraStyles,
                                       unit,
                                       textArea,
                                       onBlur,
                                       secureTextEntry,

                                     }: {

  placeholder?: string,
  label?: string
  onChange: (text: string) => void,
  value: string | undefined,
  keyboardType?: KeyboardTypeOptions,
  required?: boolean,
  name: string
  design?: 1 | 2,
  debounceTime?: number
  extraStyles?: StyleProp<ViewStyle>
  unit?: string
  textArea?: boolean
  onBlur?: () => void
  secureTextEntry?: boolean

}) {

  let styles: TextInputType = design === 1 ? design1 : design2;


  const inputRef = useRef<TextInput>(null);
  const [error, setError] = useState<string | undefined>();
  // const [textInput, setTextInput] = useState<string | undefined>(value);


  const form = useFormContext();


  const debouncer = useMemo(() => {
    let timeout: ReturnType<typeof setTimeout>;

    return (text: string) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(text);
      }, debounceTime);
    };
  }, [onChange, debounceTime]);

  function preTextChange(text: string) {
    onChange(text);
    setError(undefined);
    debouncer(text);

  }

  useEffect(() => {
    if (form.submitting) {

      let valid: string | undefined = value?.trim();
      if (!valid || valid.length === 0) {
        valid = undefined;
      }

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

  }, [form.submitting]);


  return (
    <View style={extraStyles}>
      {label && <Text style={[styles.label]}>{label}</Text>}
      <View style={styles.inputContainer}>
        <TextInput value={value}
                   autoCorrect={false}
                   keyboardType={keyboardType}
                   placeholder={placeholder}
                   placeholderTextColor={Theme.colors.placeholder}
                   ref={inputRef}
                   style={[styles.input, textArea && styles.textArea]}
                   onChangeText={preTextChange}
                   multiline={textArea}
                   onBlur={onBlur}
                   secureTextEntry={secureTextEntry}
        />
        {unit && <Text style={styles.unit}>{unit}</Text>}
      </View>

      {error &&
        <Text style={styles.error}>{error}</Text>
      }
    </View>
  );
}

type TextInputType = {
  inputContainer: ViewStyle,
  input: TextStyle,
  label: TextStyle,
  error: TextStyle,
  onFocus: ViewStyle,
  unit: TextStyle,
  textArea: TextStyle
}


const design1: TextInputType = StyleSheet.create({
    inputContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 2,
      borderColor: Theme.colors.backgroundDisabled,
    },
    input: {
      paddingRight: 10,
      height: 45,
      color: Theme.colors.primary,
      fontSize: Theme.sizes.md,
      width: '100%',
      flex: 1,
      paddingLeft: 5,
    },
    label: {
      color: Theme.colors.primary,
      fontWeight: 'semibold',
      fontSize: Theme.sizes.sm,
    },

    error: {
      fontSize: Theme.sizes.xs,
      color: Theme.colors.red['S500'],
      marginTop: 5,
    },
    onFocus: {
      borderColor: Theme.colors.primary,
    },
    unit: {
      color: Theme.colors.gray.S400,
    },
    textArea: {
      padding: 10,
      height: 250,
    },
  },
);

const design2: TextInputType = StyleSheet.create({
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.white,
    borderColor: Theme.colors.border,
    borderRadius: Theme.radius.sm,
    overflow: 'hidden',
    paddingRight: 10,
    borderWidth: 1,


  },
  input: {
    height: 45,
    color: Theme.colors.primary,
    fontSize: Theme.sizes.md,
    width: '100%',
    flex: 1,
    paddingLeft: 10,
    borderRadius: Theme.radius.sm,


  },
  label: {
    color: Theme.colors.primary,
    fontWeight: 'semibold',
    margin: 5,
    fontSize: Theme.sizes.sm,
  },

  error: {
    fontSize: Theme.sizes.xs,
    color: Theme.colors.red['S500'],
    marginTop: 5,
  },
  onFocus: {
    borderColor: Theme.colors.primary,
  },
  unit: {
    color: Theme.colors.gray.S400,
  },
  textArea: {
    padding: 10,
    height: 250,
  },
});









