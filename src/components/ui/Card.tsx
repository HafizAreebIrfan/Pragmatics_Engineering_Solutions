import React from 'react';
import { View, ViewProps, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated';
  onPress?: () => void;
}

interface PressableCardProps extends TouchableOpacityProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  onPress,
  className,
  ...props
}) => {
  const baseStyles = 'bg-background-secondary rounded-xl p-4';
  const variantStyles = variant === 'elevated' ? 'shadow-lg' : '';
  const combinedClassName = `${baseStyles} ${variantStyles} ${className || ''}`;

  if (onPress) {
    return (
      <TouchableOpacity
        className={combinedClassName}
        onPress={onPress}
        activeOpacity={0.7}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View className={combinedClassName} {...props}>
      {children}
    </View>
  );
};

export const PressableCard: React.FC<PressableCardProps> = ({
  children,
  variant = 'default',
  className,
  ...props
}) => {
  const baseStyles = 'bg-background-secondary rounded-xl p-4';
  const variantStyles = variant === 'elevated' ? 'shadow-lg' : '';

  return (
    <TouchableOpacity
      className={`${baseStyles} ${variantStyles} ${className || ''}`}
      activeOpacity={0.7}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
};

export default Card;
