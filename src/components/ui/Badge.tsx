import React from 'react';
import { View, Text, ViewProps } from 'react-native';

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info';
type BadgeSize = 'sm' | 'md';

interface BadgeProps extends ViewProps {
  label: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, { bg: string; text: string }> = {
  default: {
    bg: 'bg-background-tertiary',
    text: 'text-text-secondary',
  },
  success: {
    bg: 'bg-status-success/20',
    text: 'text-status-success',
  },
  warning: {
    bg: 'bg-status-warning/20',
    text: 'text-status-warning',
  },
  error: {
    bg: 'bg-status-error/20',
    text: 'text-status-error',
  },
  info: {
    bg: 'bg-status-info/20',
    text: 'text-status-info',
  },
};

const sizeStyles: Record<BadgeSize, { container: string; text: string }> = {
  sm: {
    container: 'px-2 py-1 rounded',
    text: 'text-xs',
  },
  md: {
    container: 'px-3 py-1.5 rounded-md',
    text: 'text-sm',
  },
};

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'default',
  size = 'sm',
  icon,
  className,
  ...props
}) => {
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];

  return (
    <View
      className={`flex-row items-center ${variantStyle.bg} ${sizeStyle.container} ${className || ''}`}
      {...props}
    >
      {icon && <View className="mr-1">{icon}</View>}
      <Text className={`font-medium ${variantStyle.text} ${sizeStyle.text}`}>
        {label}
      </Text>
    </View>
  );
};

export default Badge;
