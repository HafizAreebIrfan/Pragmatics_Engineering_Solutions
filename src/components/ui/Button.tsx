import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
} from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, { container: string; text: string }> = {
  primary: {
    container: 'bg-brand-primary',
    text: 'text-background-primary',
  },
  secondary: {
    container: 'bg-background-tertiary',
    text: 'text-text-primary',
  },
  outline: {
    container: 'bg-transparent border border-brand-primary',
    text: 'text-brand-primary',
  },
  ghost: {
    container: 'bg-transparent',
    text: 'text-brand-primary',
  },
};

const sizeStyles: Record<ButtonSize, { container: string; text: string }> = {
  sm: {
    container: 'py-2 px-4 rounded',
    text: 'text-sm',
  },
  md: {
    container: 'py-3 px-6 rounded-lg',
    text: 'text-base',
  },
  lg: {
    container: 'py-4 px-8 rounded-xl',
    text: 'text-lg',
  },
};

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  className,
  ...props
}) => {
  const isDisabled = disabled || loading;
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];

  return (
    <TouchableOpacity
      className={`flex-row items-center justify-center ${variantStyle.container} ${sizeStyle.container} ${isDisabled ? 'opacity-50' : ''} ${className || ''}`}
      disabled={isDisabled}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? '#0D0D0D' : '#00D26A'}
          size="small"
        />
      ) : (
        <>
          {leftIcon && <>{leftIcon}</>}
          <Text
            className={`font-semibold ${variantStyle.text} ${sizeStyle.text} ${leftIcon ? 'ml-2' : ''} ${rightIcon ? 'mr-2' : ''}`}
          >
            {title}
          </Text>
          {rightIcon && <>{rightIcon}</>}
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;
