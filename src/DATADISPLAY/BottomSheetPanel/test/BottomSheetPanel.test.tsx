import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BottomSheetPanel from '../BottomSheetPanel';

describe('BottomSheetPanel', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
  };

  it('renders when open', () => {
    render(
      <BottomSheetPanel {...defaultProps}>
        <p>Panel content</p>
      </BottomSheetPanel>,
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    const { container } = render(
      <BottomSheetPanel isOpen={false} onClose={vi.fn()}>
        <p>Hidden</p>
      </BottomSheetPanel>,
    );
    expect(container.firstElementChild).toBeNull();
  });

  it('has displayName set', () => {
    expect(BottomSheetPanel.displayName).toBe('BottomSheetPanel');
  });

  it('renders title', () => {
    render(
      <BottomSheetPanel {...defaultProps} title="My Panel">
        <p>content</p>
      </BottomSheetPanel>,
    );
    expect(screen.getByText('My Panel')).toBeInTheDocument();
    expect(screen.getByText('My Panel')).toHaveClass('bottom-sheet-title');
  });

  it('renders children in content area', () => {
    const { container } = render(
      <BottomSheetPanel {...defaultProps}>
        <p>Hello</p>
      </BottomSheetPanel>,
    );
    const content = container.querySelector('.bottom-sheet-content');
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent('Hello');
  });

  it('renders footer', () => {
    const { container } = render(
      <BottomSheetPanel {...defaultProps} footer={<button>Save</button>}>
        <p>content</p>
      </BottomSheetPanel>,
    );
    const footer = container.querySelector('.bottom-sheet-footer');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveTextContent('Save');
  });

  it('renders close button by default', () => {
    render(
      <BottomSheetPanel {...defaultProps}>
        <p>content</p>
      </BottomSheetPanel>,
    );
    expect(screen.getByLabelText('Cerrar panel')).toBeInTheDocument();
  });

  it('hides close button when showCloseButton=false', () => {
    render(
      <BottomSheetPanel {...defaultProps} showCloseButton={false} title="T">
        <p>content</p>
      </BottomSheetPanel>,
    );
    expect(screen.queryByLabelText('Cerrar panel')).toBeNull();
  });

  it('applies size class', () => {
    const { container } = render(
      <BottomSheetPanel {...defaultProps} size="large">
        <p>content</p>
      </BottomSheetPanel>,
    );
    const panel = container.querySelector('.bottom-sheet-panel');
    expect(panel).toHaveClass('bottom-sheet-panel--large');
  });

  it('applies custom className', () => {
    const { container } = render(
      <BottomSheetPanel {...defaultProps} className="my-panel">
        <p>content</p>
      </BottomSheetPanel>,
    );
    const panel = container.querySelector('.bottom-sheet-panel');
    expect(panel).toHaveClass('my-panel');
  });

  it('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn();
    render(
      <BottomSheetPanel isOpen onClose={onClose}>
        <p>content</p>
      </BottomSheetPanel>,
    );
    await userEvent.click(screen.getByLabelText('Cerrar panel'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('has correct ARIA attributes on the dialog', () => {
    render(
      <BottomSheetPanel {...defaultProps} title="Test">
        <p>content</p>
      </BottomSheetPanel>,
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'bottom-sheet-title');
  });
});
