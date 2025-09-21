import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import Toggle from '../../components/Toggle';
import type { OptionModel } from '../../models';

describe('Toggle', () => {
  const mockOptions: OptionModel[] = [
    { key: 'option1', label: 'Option 1' },
    { key: 'option2', label: 'Option 2' },
    { key: 'option3', label: 'Option 3' },
  ];

  const defaultProps = {
    value: 'option1',
    options: mockOptions,
    onChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render all options with labels', () => {
      render(<Toggle {...defaultProps} />);

      expect(screen.getByLabelText('Option 1')).toBeInTheDocument();
      expect(screen.getByLabelText('Option 2')).toBeInTheDocument();
      expect(screen.getByLabelText('Option 3')).toBeInTheDocument();
    });

    it('should have correct checked state based on value prop', () => {
      render(<Toggle {...defaultProps} value="option2" />);

      expect(screen.getByLabelText('Option 1')).not.toBeChecked();
      expect(screen.getByLabelText('Option 2')).toBeChecked();
      expect(screen.getByLabelText('Option 3')).not.toBeChecked();
    });
  });

  describe('interaction', () => {
    it('should call onChange when an option is clicked', async () => {
      const user = userEvent.setup();
      const mockOnChange = vi.fn();

      render(<Toggle {...defaultProps} onChange={mockOnChange} />);

      await user.click(screen.getByLabelText('Option 2'));

      expect(mockOnChange).toHaveBeenCalledTimes(1);
      expect(mockOnChange).toHaveBeenCalledWith('option2');
    });

    it('should not call onChange when clicking the currently selected option', async () => {
      const user = userEvent.setup();
      const mockOnChange = vi.fn();

      render(<Toggle {...defaultProps} value="option1" onChange={mockOnChange} />);

      await user.click(screen.getByLabelText('Option 1'));

      // Radio buttons don't fire onChange when clicking already selected option
      expect(mockOnChange).not.toHaveBeenCalled();
    });
  });

  describe('edge cases', () => {
    it('should handle empty options array', () => {
      render(<Toggle value="" options={[]} onChange={vi.fn()} />);

      expect(screen.queryByRole('radio')).not.toBeInTheDocument();
    });

    it('should handle single option', async () => {
      const user = userEvent.setup();
      const singleOption: OptionModel[] = [
        { key: 'only', label: 'Only Option' },
      ];
      const mockOnChange = vi.fn();

      // Test with unselected initial state
      render(<Toggle value="" options={singleOption} onChange={mockOnChange} />);

      expect(screen.getByLabelText('Only Option')).not.toBeChecked();

      await user.click(screen.getByLabelText('Only Option'));
      expect(mockOnChange).toHaveBeenCalledWith('only');
    });

    it('should handle value that does not match any option', () => {
      render(<Toggle value="nonexistent" options={mockOptions} onChange={vi.fn()} />);

      const radioInputs = screen.getAllByRole('radio');
      radioInputs.forEach(radio => {
        expect(radio).not.toBeChecked();
      });
    });
  });

  describe('accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(<Toggle {...defaultProps} />);

      const radioInputs = screen.getAllByRole('radio');
      radioInputs.forEach(radio => {
        expect(radio).toHaveAttribute('type', 'radio');
      });
    });

    it('should associate labels with radio inputs correctly', () => {
      render(<Toggle {...defaultProps} />);

      const option1Radio = screen.getByLabelText('Option 1');
      const option2Radio = screen.getByLabelText('Option 2');
      const option3Radio = screen.getByLabelText('Option 3');

      expect(option1Radio).toBeInTheDocument();
      expect(option2Radio).toBeInTheDocument();
      expect(option3Radio).toBeInTheDocument();
    });

    it('should be keyboard navigable', async () => {
      const user = userEvent.setup();
      render(<Toggle {...defaultProps} />);

      const firstRadio = screen.getAllByRole('radio')[0];

      await user.tab();
      expect(firstRadio).toHaveFocus();
    });
  });
});
