import React from 'react';
import { TouchableOpacity, View, Text, TouchableOpacityProps } from 'react-native';

interface CheckboxProps extends Omit<TouchableOpacityProps, 'onPress'> {
  checked: boolean;
  onToggle?: (checked: boolean) => void;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onToggle,
  onChange,
  label,
  disabled = false,
  className,
  ...props
}) => {
  const handlePress = () => {
    if (disabled) return;
    const newValue = !checked;
    onToggle?.(newValue);
    onChange?.(newValue);
  };

  return (
    <TouchableOpacity
      className={`flex-row items-center ${disabled ? 'opacity-50' : ''} ${className || ''}`}
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={disabled}
      {...props}
    >
      <View
        className={`w-5 h-5 rounded border-2 items-center justify-center ${
          checked
            ? 'bg-brand-primary border-brand-primary'
            : 'bg-transparent border-border'
        }`}
      >
        {checked && (
          <Text className="text-background-primary text-xs font-bold">✓</Text>
        )}
      </View>
      {label && (
        <Text className="text-text-primary text-base ml-3">{label}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Checkbox;
