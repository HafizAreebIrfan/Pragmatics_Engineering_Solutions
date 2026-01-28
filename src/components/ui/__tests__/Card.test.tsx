/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Card, PressableCard } from '../Card';

describe('Card', () => {
  describe('rendering', () => {
    it('renders children correctly', () => {
      render(
        <Card>
          <Text>Card content</Text>
        </Card>
      );

      expect(screen.getByText('Card content')).toBeTruthy();
    });

    it('renders with default variant', () => {
      const { getByText } = render(
        <Card>
          <Text>Default Card</Text>
        </Card>
      );

      expect(getByText('Default Card')).toBeTruthy();
    });

    it('renders with elevated variant', () => {
      const { getByText } = render(
        <Card variant="elevated">
          <Text>Elevated Card</Text>
        </Card>
      );

      expect(getByText('Elevated Card')).toBeTruthy();
    });

    it('renders multiple children', () => {
      render(
        <Card>
          <Text>First</Text>
          <Text>Second</Text>
          <Text>Third</Text>
        </Card>
      );

      expect(screen.getByText('First')).toBeTruthy();
      expect(screen.getByText('Second')).toBeTruthy();
      expect(screen.getByText('Third')).toBeTruthy();
    });
  });

  describe('pressable behavior', () => {
    it('renders as TouchableOpacity when onPress is provided', () => {
      const onPress = jest.fn();
      const { getByText } = render(
        <Card onPress={onPress}>
          <Text>Pressable Card</Text>
        </Card>
      );

      fireEvent.press(getByText('Pressable Card'));

      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it('renders as View when onPress is not provided', () => {
      render(
        <Card>
          <Text>Non-pressable Card</Text>
        </Card>
      );

      // Just checking it renders - no press handler
      expect(screen.getByText('Non-pressable Card')).toBeTruthy();
    });
  });

  describe('custom className', () => {
    it('accepts custom className', () => {
      const { getByText } = render(
        <Card className="mb-4">
          <Text>Custom Class</Text>
        </Card>
      );

      expect(getByText('Custom Class')).toBeTruthy();
    });
  });
});

describe('PressableCard', () => {
  describe('rendering', () => {
    it('renders children correctly', () => {
      render(
        <PressableCard>
          <Text>Pressable content</Text>
        </PressableCard>
      );

      expect(screen.getByText('Pressable content')).toBeTruthy();
    });

    it('renders with default variant', () => {
      const { getByText } = render(
        <PressableCard>
          <Text>Default Pressable</Text>
        </PressableCard>
      );

      expect(getByText('Default Pressable')).toBeTruthy();
    });

    it('renders with elevated variant', () => {
      const { getByText } = render(
        <PressableCard variant="elevated">
          <Text>Elevated Pressable</Text>
        </PressableCard>
      );

      expect(getByText('Elevated Pressable')).toBeTruthy();
    });
  });

  describe('interactions', () => {
    it('calls onPress when pressed', () => {
      const onPress = jest.fn();
      const { getByText } = render(
        <PressableCard onPress={onPress}>
          <Text>Press me</Text>
        </PressableCard>
      );

      fireEvent.press(getByText('Press me'));

      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it('handles multiple presses', () => {
      const onPress = jest.fn();
      const { getByText } = render(
        <PressableCard onPress={onPress}>
          <Text>Multi press</Text>
        </PressableCard>
      );

      fireEvent.press(getByText('Multi press'));
      fireEvent.press(getByText('Multi press'));
      fireEvent.press(getByText('Multi press'));

      expect(onPress).toHaveBeenCalledTimes(3);
    });

    it('does not call onPress when disabled', () => {
      const onPress = jest.fn();
      const { getByText } = render(
        <PressableCard onPress={onPress} disabled>
          <Text>Disabled</Text>
        </PressableCard>
      );

      fireEvent.press(getByText('Disabled'));

      expect(onPress).not.toHaveBeenCalled();
    });
  });
});
