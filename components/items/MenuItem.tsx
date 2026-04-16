import { Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Theme } from '@/styles/Theme';

function MenuItem({
                    icon,
                    label,
                    onPress,
                  }: {
  icon: string;
  label: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={{ flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 }}
      onPress={onPress}
    >
      <Feather name={icon as any} size={18} color={Theme.colors.primary} />
      <Text
        style={{
          flex: 1,
          fontSize: 15,
          color: Theme.colors.primary,
        }}
      >
        {label}
      </Text>
      <Feather name="chevron-right" size={16} color={Theme.colors.primary} />
    </TouchableOpacity>
  );
}

export default MenuItem;