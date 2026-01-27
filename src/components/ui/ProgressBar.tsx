import React from 'react';
import { View, Text, ViewProps } from 'react-native';

interface ProgressBarProps extends ViewProps {
  progress: number; // 0-100
  label?: string;
  showPercentage?: boolean;
  variant?: 'default' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
}

const variantColors: Record<string, string> = {
  default: 'bg-brand-primary',
  success: 'bg-status-success',
  warning: 'bg-status-warning',
  error: 'bg-status-error',
};

const sizeStyles: Record<string, string> = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  label,
  showPercentage = true,
  variant = 'default',
  size = 'md',
  className,
  ...props
}) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <View className={`w-full ${className || ''}`} {...props}>
      {(label || showPercentage) && (
        <View className="flex-row justify-between items-center mb-2">
          {label && (
            <Text className="text-text-secondary text-sm">{label}</Text>
          )}
          {showPercentage && (
            <Text className="text-brand-primary text-sm font-medium">
              {clampedProgress.toFixed(2)}%
            </Text>
          )}
        </View>
      )}
      <View className={`w-full bg-background-tertiary rounded-full overflow-hidden ${sizeStyles[size]}`}>
        <View
          className={`${sizeStyles[size]} ${variantColors[variant]} rounded-full`}
          style={{ width: `${clampedProgress}%` }}
        />
      </View>
    </View>
  );
};

export default ProgressBar;
