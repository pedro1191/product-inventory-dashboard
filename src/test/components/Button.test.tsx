import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import Button from '../../components/ui/Button';

describe('Button', () => {
  const defaultProps = {
    label: 'Test Button',
    onClick: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render button with label', () => {
      render(<Button {...defaultProps} />);

      expect(screen.getByRole('button', { name: 'Test Button' })).toBeInTheDocument();
    });

    it('should render button without label', () => {
      render(<Button onClick={vi.fn()} />);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('');
    });

    it('should apply custom className', () => {
      render(<Button {...defaultProps} className="custom-button-class" />);

      expect(screen.getByRole('button')).toHaveClass('custom-button-class');
    });

    it('should have default type as button', () => {
      render(<Button {...defaultProps} />);

      expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
    });

    it('should set type attribute correctly', () => {
      render(<Button {...defaultProps} type="submit" />);

      expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
    });
  });

  describe('disabled state', () => {
    it('should be enabled by default', () => {
      render(<Button {...defaultProps} />);

      expect(screen.getByRole('button')).not.toBeDisabled();
    });

    it('should be disabled when disabled prop is true', () => {
      render(<Button {...defaultProps} disabled={true} />);

      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('should not call onClick when disabled and clicked', async () => {
      const user = userEvent.setup();
      const mockOnClick = vi.fn();

      render(<Button label="Disabled Button" onClick={mockOnClick} disabled={true} />);

      await user.click(screen.getByRole('button'));

      expect(mockOnClick).not.toHaveBeenCalled();
    });
  });

  describe('loading state', () => {
    it('should show spinner when isLoading is true', () => {
      render(<Button {...defaultProps} isLoading={true} />);

      // Check for spinner by looking for the SVG element
      const spinner = screen.getByRole('button').querySelector('svg');
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveClass('animate-spin');
    });

    it('should not show spinner when isLoading is false', () => {
      render(<Button {...defaultProps} isLoading={false} />);

      const spinner = screen.getByRole('button').querySelector('svg');
      expect(spinner).not.toBeInTheDocument();
    });
  });

  describe('interaction', () => {
    it('should call onClick when clicked', async () => {
      const user = userEvent.setup();
      const mockOnClick = vi.fn();

      render(<Button {...defaultProps} onClick={mockOnClick} />);

      await user.click(screen.getByRole('button'));

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('edge cases', () => {
    it('should handle null/undefined label', () => {
      render(<Button onClick={vi.fn()} />);

      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should handle combined disabled and loading states', () => {
      render(<Button {...defaultProps} disabled={true} isLoading={true} />);

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button.querySelector('svg')).toBeInTheDocument(); // Spinner still shows
    });
  });

  describe('accessibility', () => {
    it('should have proper button role', () => {
      render(<Button {...defaultProps} />);

      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should be focusable when not disabled', async () => {
      const user = userEvent.setup();
      render(<Button {...defaultProps} />);

      const button = screen.getByRole('button');
      await user.tab();

      expect(button).toHaveFocus();
    });

    it('should not be focusable when disabled', () => {
      render(<Button {...defaultProps} disabled={true} />);

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('should have accessible name from label', () => {
      render(<Button label="Accessible Button" onClick={vi.fn()} />);

      expect(screen.getByRole('button', { name: 'Accessible Button' })).toBeInTheDocument();
    });
  });
});
