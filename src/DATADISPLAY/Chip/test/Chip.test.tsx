import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Chip from '../Chip';

describe('Chip', () => {
  it('renders with base class', () => {
    const { container } = render(<Chip label="Tag" />);
    const chip = container.firstElementChild as HTMLElement;
    expect(chip).toBeInTheDocument();
    expect(chip).toHaveClass('w3f-chip');
  });

  it('has displayName set', () => {
    expect(Chip.displayName).toBe('Chip');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<Chip ref={ref} label="Ref" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('renders label text', () => {
    const { container } = render(<Chip label="Hello" />);
    const label = container.querySelector('.w3f-chip__label');
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent('Hello');
  });

  it('applies disabled class', () => {
    const { container } = render(<Chip label="Disabled" disabled />);
    expect(container.firstElementChild).toHaveClass('w3f-chip--disabled');
  });

  it('applies focused class', () => {
    const { container } = render(<Chip label="Focused" isFocused />);
    expect(container.firstElementChild).toHaveClass('w3f-chip--focused');
  });

  it('renders close button when onClose is provided', () => {
    const { container } = render(<Chip label="Close" onClose={() => {}} />);
    const closeBtn = container.querySelector('.w3f-chip-close');
    expect(closeBtn).toBeInTheDocument();
    expect(closeBtn).toHaveTextContent('\u00d7');
  });

  it('does not render close button when disabled', () => {
    const { container } = render(<Chip label="No Close" onClose={() => {}} disabled />);
    expect(container.querySelector('.w3f-chip-close')).toBeNull();
  });

  it('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn();
    const { container } = render(<Chip label="Closeable" onClose={onClose} />);
    const closeBtn = container.querySelector('.w3f-chip-close') as HTMLElement;
    await userEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('applies unstyled class', () => {
    const { container } = render(<Chip label="Unstyled" unstyled />);
    expect(container.firstElementChild).toHaveClass('w3f-chip--unstyled');
  });

  it('applies custom className', () => {
    const { container } = render(<Chip label="Custom" className="my-chip" />);
    expect(container.firstElementChild).toHaveClass('my-chip');
  });

  it('has correct ARIA attributes', () => {
    render(<Chip label="Aria" />);
    const chip = screen.getByRole('button');
    expect(chip).toHaveAttribute('aria-disabled', 'false');
  });
});
