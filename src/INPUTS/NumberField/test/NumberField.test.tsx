import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberField from '../NumberField';

describe('NumberField', () => {
  // ── Render ──────────────────────────────────────────────────
  it('renders a text input with decimal inputMode', () => {
    render(<NumberField label="Amount" />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('inputMode', 'decimal');
  });

  it('renders label text', () => {
    render(<NumberField label="Quantity" />);
    expect(screen.getByText('Quantity')).toBeInTheDocument();
  });

  // ── Props ───────────────────────────────────────────────────
  it('applies container class w3f-input-container', () => {
    const { container } = render(<NumberField label="Test" />);
    expect(container.querySelector('.w3f-input-container')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<NumberField label="Test" className="my-num" />);
    expect(container.firstElementChild).toHaveClass('my-num');
  });

  it('renders required indicator', () => {
    render(<NumberField label="Qty" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('renders spin buttons', () => {
    render(<NumberField label="Qty" />);
    expect(screen.getByLabelText('Incrementar valor')).toBeInTheDocument();
    expect(screen.getByLabelText('Decrementar valor')).toBeInTheDocument();
  });

  // ── Disabled ────────────────────────────────────────────────
  it('disables the input', () => {
    render(<NumberField label="Qty" disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('disables spin buttons when disabled', () => {
    render(<NumberField label="Qty" disabled />);
    expect(screen.getByLabelText('Incrementar valor')).toBeDisabled();
    expect(screen.getByLabelText('Decrementar valor')).toBeDisabled();
  });

  // ── Interaction ─────────────────────────────────────────────
  it('increments value via spin button', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<NumberField label="Qty" value={5} onChange={onChange} />);
    await user.click(screen.getByLabelText('Incrementar valor'));
    expect(onChange).toHaveBeenCalled();
  });

  // ── Error / Helper ────────────────────────────────────────
  it('shows error message with role alert', () => {
    render(<NumberField label="Qty" error="Invalid" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Invalid');
  });

  it('shows helper text', () => {
    render(<NumberField label="Qty" helperText="Enter a number" />);
    expect(screen.getByText('Enter a number')).toBeInTheDocument();
  });

  // ── Ref forwarding ────────────────────────────────────────
  it('forwards ref to the input element', () => {
    const ref = { current: null as HTMLInputElement | null };
    render(<NumberField label="Qty" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  // ── DisplayName ───────────────────────────────────────────
  it('has displayName set', () => {
    expect(NumberField.displayName).toBe('NumberField');
  });
});
