import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, TextInputProps } from 'react-native';

interface SearchBarProps extends Omit<TextInputProps, 'style'> {
  onSearch?: (text: string) => void;
  onFilterPress?: () => void;
  showFilter?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onFilterPress,
  showFilter = true,
  placeholder = 'Search',
  className,
  ...props
}) => {
  const [value, setValue] = useState('');

  const handleChangeText = (text: string) => {
    setValue(text);
    onSearch?.(text);
  };

  return (
    <View className={`flex-row items-center gap-3 ${className || ''}`}>
      <View className="flex-1 flex-row items-center bg-background-secondary rounded-lg px-4 py-3">
        <Text className="text-text-muted mr-3">🔍</Text>
        <TextInput
          className="flex-1 text-text-primary text-base"
          placeholder={placeholder}
          placeholderTextColor="#666666"
          value={value}
          onChangeText={handleChangeText}
          {...props}
        />
      </View>
      {showFilter && (
        <TouchableOpacity
          className="bg-background-secondary rounded-lg p-3"
          onPress={onFilterPress}
          activeOpacity={0.7}
        >
          <Text className="text-text-primary">⚙️</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;
