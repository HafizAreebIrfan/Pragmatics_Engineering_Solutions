/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Input } from '../Input';

describe('Input', () => {
  describe('rendering', () => {
    it('renders without label', () => {
      const { getByPlaceholderText } = render(
        <Input placeholder="Enter text" />
      );
      expect(getByPlaceholderText('Enter text')).toBeTruthy();
    });

    it('renders with label', () => {
      const { getByText, getByPlaceholderText } = render(
        <Input label="Email" placeholder="Enter email" />
      );

      expect(getByText('Email')).toBeTruthy();
      expect(getByPlaceholderText('Enter email')).toBeTruthy();
    });

    it('renders with value', () => {
      const { getByDisplayValue } = render(
        <Input value="test@example.com" />
      );
      expect(getByDisplayValue('test@example.com')).toBeTruthy();
    });
  });

  describe('error state', () => {
    it('displays error message when error prop is provided', () => {
      const { getByText } = render(
        <Input label="Email" error="Invalid email address" />
      );
      expect(getByText('Invalid email address')).toBeTruthy();
    });

    it('does not display error message when error is not provided', () => {
      const { queryByText } = render(
        <Input label="Email" />
      );
      expect(queryByText('Invalid email address')).toBeNull();
    });
  });

  describe('interactions', () => {
    it('calls onChangeText when text changes', () => {
      const onChangeText = jest.fn();
      const { getByPlaceholderText } = render(
        <Input placeholder="Type here" onChangeText={onChangeText} />
      );

      fireEvent.changeText(getByPlaceholderText('Type here'), 'Hello');

      expect(onChangeText).toHaveBeenCalledWith('Hello');
    });

    it('calls onFocus when input is focused', () => {
      const onFocus = jest.fn();
      const { getByPlaceholderText } = render(
        <Input placeholder="Focus me" onFocus={onFocus} />
      );

      fireEvent(getByPlaceholderText('Focus me'), 'focus');

      expect(onFocus).toHaveBeenCalled();
    });

    it('calls onBlur when input loses focus', () => {
      const onBlur = jest.fn();
      const { getByPlaceholderText } = render(
        <Input placeholder="Blur me" onBlur={onBlur} />
      );

      fireEvent(getByPlaceholderText('Blur me'), 'blur');

      expect(onBlur).toHaveBeenCalled();
    });
  });

  describe('icons', () => {
    it('renders with left icon', () => {
      render(
        <Input
          placeholder="With icon"
          leftIcon={<Text testID="left-icon">📧</Text>}
        />
      );

      expect(screen.getByTestId('left-icon')).toBeTruthy();
    });

    it('renders with right icon', () => {
      render(
        <Input
          placeholder="With icon"
          rightIcon={<Text testID="right-icon">👁️</Text>}
        />
      );

      expect(screen.getByTestId('right-icon')).toBeTruthy();
    });

    it('calls onRightIconPress when right icon is pressed', () => {
      const onRightIconPress = jest.fn();
      render(
        <Input
          placeholder="With icon"
          rightIcon={<Text testID="icon">👁️</Text>}
          onRightIconPress={onRightIconPress}
        />
      );

      // Find the icon and press it
      const icon = screen.getByTestId('icon');
      fireEvent.press(icon);

      expect(onRightIconPress).toHaveBeenCalled();
    });
  });

  describe('input props', () => {
    it('passes secureTextEntry prop correctly', () => {
      const { getByPlaceholderText } = render(
        <Input placeholder="Password" secureTextEntry />
      );

      const input = getByPlaceholderText('Password');
      expect(input.props.secureTextEntry).toBe(true);
    });

    it('passes keyboardType prop correctly', () => {
      const { getByPlaceholderText } = render(
        <Input placeholder="Email" keyboardType="email-address" />
      );

      const input = getByPlaceholderText('Email');
      expect(input.props.keyboardType).toBe('email-address');
    });

    it('passes autoCapitalize prop correctly', () => {
      const { getByPlaceholderText } = render(
        <Input placeholder="Email" autoCapitalize="none" />
      );

      const input = getByPlaceholderText('Email');
      expect(input.props.autoCapitalize).toBe('none');
    });

    it('passes editable prop correctly', () => {
      const { getByPlaceholderText } = render(
        <Input placeholder="Read only" editable={false} />
      );

      const input = getByPlaceholderText('Read only');
      expect(input.props.editable).toBe(false);
    });
  });
});
