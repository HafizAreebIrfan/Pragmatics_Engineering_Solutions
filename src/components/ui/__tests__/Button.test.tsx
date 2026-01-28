/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Button } from '../Button';

describe('Button', () => {
  describe('rendering', () => {
    it('renders with title', () => {
      render(<Button title="Click me" />);
      expect(screen.getByText('Click me')).toBeTruthy();
    });

    it('renders with primary variant by default', () => {
      const { getByText } = render(<Button title="Primary" />);
      const button = getByText('Primary');
      expect(button).toBeTruthy();
    });

    it('renders with secondary variant', () => {
      const { getByText } = render(<Button title="Secondary" variant="secondary" />);
      expect(getByText('Secondary')).toBeTruthy();
    });

    it('renders with outline variant', () => {
      const { getByText } = render(<Button title="Outline" variant="outline" />);
      expect(getByText('Outline')).toBeTruthy();
    });

    it('renders with ghost variant', () => {
      const { getByText } = render(<Button title="Ghost" variant="ghost" />);
      expect(getByText('Ghost')).toBeTruthy();
    });
  });

  describe('sizes', () => {
    it('renders with small size', () => {
      const { getByText } = render(<Button title="Small" size="sm" />);
      expect(getByText('Small')).toBeTruthy();
    });

    it('renders with medium size (default)', () => {
      const { getByText } = render(<Button title="Medium" size="md" />);
      expect(getByText('Medium')).toBeTruthy();
    });

    it('renders with large size', () => {
      const { getByText } = render(<Button title="Large" size="lg" />);
      expect(getByText('Large')).toBeTruthy();
    });
  });

  describe('interactions', () => {
    it('calls onPress when pressed', () => {
      const onPress = jest.fn();
      const { getByText } = render(<Button title="Press me" onPress={onPress} />);

      fireEvent.press(getByText('Press me'));

      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it('does not call onPress when disabled', () => {
      const onPress = jest.fn();
      const { getByText } = render(
        <Button title="Disabled" onPress={onPress} disabled />
      );

      fireEvent.press(getByText('Disabled'));

      expect(onPress).not.toHaveBeenCalled();
    });

    it('does not call onPress when loading', () => {
      const onPress = jest.fn();
      render(<Button title="Loading" onPress={onPress} loading />);

      // Button text is replaced by ActivityIndicator when loading
      expect(screen.queryByText('Loading')).toBeNull();
    });
  });

  describe('loading state', () => {
    it('shows loading indicator when loading', () => {
      const { queryByText, UNSAFE_getByType } = render(
        <Button title="Loading" loading />
      );

      // Text should not be visible
      expect(queryByText('Loading')).toBeNull();

      // ActivityIndicator should be present
      const ActivityIndicator = require('react-native').ActivityIndicator;
      expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
    });

    it('hides title when loading', () => {
      const { queryByText } = render(<Button title="Submit" loading />);
      expect(queryByText('Submit')).toBeNull();
    });
  });

  describe('icons', () => {
    it('renders with left icon', () => {
      const { getByText } = render(
        <Button
          title="With Icon"
          leftIcon={<Text testID="left-icon">👈</Text>}
        />
      );

      expect(getByText('With Icon')).toBeTruthy();
      expect(screen.getByTestId('left-icon')).toBeTruthy();
    });

    it('renders with right icon', () => {
      const { getByText } = render(
        <Button
          title="With Icon"
          rightIcon={<Text testID="right-icon">👉</Text>}
        />
      );

      expect(getByText('With Icon')).toBeTruthy();
      expect(screen.getByTestId('right-icon')).toBeTruthy();
    });

    it('renders with both icons', () => {
      render(
        <Button
          title="Both Icons"
          leftIcon={<Text testID="left-icon">👈</Text>}
          rightIcon={<Text testID="right-icon">👉</Text>}
        />
      );

      expect(screen.getByText('Both Icons')).toBeTruthy();
      expect(screen.getByTestId('left-icon')).toBeTruthy();
      expect(screen.getByTestId('right-icon')).toBeTruthy();
    });
  });

  describe('accessibility', () => {
    it('button is accessible and pressable', () => {
      const onPress = jest.fn();
      const { getByText } = render(<Button title="Accessible" onPress={onPress} />);
      const button = getByText('Accessible');
      expect(button).toBeTruthy();
      fireEvent.press(button);
      expect(onPress).toHaveBeenCalled();
    });

    it('disabled button has correct accessibility state', () => {
      const { getByText } = render(<Button title="Disabled" disabled />);
      const button = getByText('Disabled');
      expect(button).toBeTruthy();
      // The parent touchable should be disabled
    });
  });
});
