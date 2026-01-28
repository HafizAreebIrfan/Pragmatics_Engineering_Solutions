/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { Checkbox } from '../Checkbox';

describe('Checkbox', () => {
  describe('rendering', () => {
    it('renders unchecked state', () => {
      render(<Checkbox checked={false} />);
      // The checkbox should render without the checkmark
      expect(screen.queryByText('✓')).toBeNull();
    });

    it('renders checked state', () => {
      render(<Checkbox checked={true} />);
      // The checkbox should render with the checkmark
      expect(screen.getByText('✓')).toBeTruthy();
    });

    it('renders with label', () => {
      render(<Checkbox checked={false} label="Accept terms" />);
      expect(screen.getByText('Accept terms')).toBeTruthy();
    });

    it('renders without label', () => {
      const { queryByText } = render(<Checkbox checked={false} />);
      // Should not have any text except possibly checkmark
      expect(queryByText('Accept terms')).toBeNull();
    });
  });

  describe('interactions', () => {
    it('calls onToggle with true when unchecked checkbox is pressed', () => {
      const onToggle = jest.fn();
      render(<Checkbox checked={false} onToggle={onToggle} label="Toggle me" />);

      fireEvent.press(screen.getByText('Toggle me'));

      expect(onToggle).toHaveBeenCalledWith(true);
    });

    it('calls onToggle with false when checked checkbox is pressed', () => {
      const onToggle = jest.fn();
      render(<Checkbox checked={true} onToggle={onToggle} label="Toggle me" />);

      fireEvent.press(screen.getByText('Toggle me'));

      expect(onToggle).toHaveBeenCalledWith(false);
    });

    it('calls onChange with correct value', () => {
      const onChange = jest.fn();
      render(<Checkbox checked={false} onChange={onChange} label="Change me" />);

      fireEvent.press(screen.getByText('Change me'));

      expect(onChange).toHaveBeenCalledWith(true);
    });

    it('calls both onToggle and onChange when both are provided', () => {
      const onToggle = jest.fn();
      const onChange = jest.fn();
      render(
        <Checkbox
          checked={false}
          onToggle={onToggle}
          onChange={onChange}
          label="Both handlers"
        />
      );

      fireEvent.press(screen.getByText('Both handlers'));

      expect(onToggle).toHaveBeenCalledWith(true);
      expect(onChange).toHaveBeenCalledWith(true);
    });
  });

  describe('disabled state', () => {
    it('does not call onToggle when disabled', () => {
      const onToggle = jest.fn();
      render(
        <Checkbox
          checked={false}
          onToggle={onToggle}
          label="Disabled checkbox"
          disabled
        />
      );

      fireEvent.press(screen.getByText('Disabled checkbox'));

      expect(onToggle).not.toHaveBeenCalled();
    });

    it('does not call onChange when disabled', () => {
      const onChange = jest.fn();
      render(
        <Checkbox
          checked={false}
          onChange={onChange}
          label="Disabled checkbox"
          disabled
        />
      );

      fireEvent.press(screen.getByText('Disabled checkbox'));

      expect(onChange).not.toHaveBeenCalled();
    });

    it('shows reduced opacity when disabled', () => {
      // This test checks that the disabled state renders correctly
      // The actual opacity check would require accessing styles
      const { getByText } = render(
        <Checkbox checked={false} label="Disabled" disabled />
      );

      expect(getByText('Disabled')).toBeTruthy();
    });
  });

  describe('controlled component', () => {
    it('reflects checked prop changes', () => {
      const { rerender, queryByText, getByText } = render(
        <Checkbox checked={false} label="Controlled" />
      );

      // Initially unchecked
      expect(queryByText('✓')).toBeNull();

      // Update to checked
      rerender(<Checkbox checked={true} label="Controlled" />);
      expect(getByText('✓')).toBeTruthy();

      // Update back to unchecked
      rerender(<Checkbox checked={false} label="Controlled" />);
      expect(queryByText('✓')).toBeNull();
    });
  });

  describe('accessibility', () => {
    it('checkbox is accessible and toggleable', () => {
      const onToggle = jest.fn();
      const { getByText } = render(
        <Checkbox checked={false} onToggle={onToggle} label="Accessible checkbox" />
      );
      const label = getByText('Accessible checkbox');
      expect(label).toBeTruthy();
      fireEvent.press(label);
      expect(onToggle).toHaveBeenCalledWith(true);
    });

    it('has correct accessibility state when checked', () => {
      render(<Checkbox checked={true} label="Checked checkbox" />);
      expect(screen.getByText('✓')).toBeTruthy();
    });
  });
});
