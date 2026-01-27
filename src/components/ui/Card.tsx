import React from 'react';
import { View, ViewProps, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated';
}

interface PressableCardProps extends TouchableOpacityProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className,
  ...props
}) => {
  const baseStyles = 'bg-background-secondary rounded-xl p-4';
  const variantStyles = variant === 'elevated' ? 'shadow-lg' : '';

  return (
    <View className={`${baseStyles} ${variantStyles} ${className || ''}`} {...props}>
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
