import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Checkbox from '../Checkbox';

describe('Checkbox', () => {
  // ── Render ──────────────────────────────────────────────────
  it('renders a checkbox input', () => {
    render(<Checkbox label="Accept" />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('renders the label text', () => {
    render(<Checkbox label="Terms" />);
    expect(screen.getByText('Terms')).toBeInTheDocument();
  });

  // ── Props ───────────────────────────────────────────────────
  it('applies wrapper class w3f-checkbox-wrapper', () => {
    const { container } = render(<Checkbox label="Test" />);
    expect(container.querySelector('.w3f-checkbox-wrapper')).toBeInTheDocument();
  });

  it('applies w3f-checkbox-input class to the input', () => {
    render(<Checkbox label="Test" />);
    expect(screen.getByRole('checkbox')).toHaveClass('w3f-checkbox-input');
  });

  it('applies disabled class w3f-checkbox-wrapper--disabled', () => {
    const { container } = render(<Checkbox label="Test" disabled />);
    expect(container.querySelector('.w3f-checkbox-wrapper--disabled')).toBeInTheDocument();
  });

  it('applies color modifier class', () => {
    render(<Checkbox label="Test" color="success" />);
    expect(screen.getByRole('checkbox')).toHaveClass('w3f-checkbox--success');
  });

  it('applies custom className', () => {
    const { container } = render(<Checkbox label="Test" className="my-class" />);
    expect(container.firstElementChild).toHaveClass('my-class');
  });

  // ── Disabled ────────────────────────────────────────────────
  it('disables the checkbox', () => {
    render(<Checkbox label="Disabled" disabled />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  // ── Interaction ─────────────────────────────────────────────
  it('fires onChange when clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Checkbox label="Click" onChange={onChange} />);
    await user.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('does not fire onChange when disabled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Checkbox label="Click" disabled onChange={onChange} />);
    await user.click(screen.getByRole('checkbox'));
    expect(onChange).not.toHaveBeenCalled();
  });

  // ── Children ──────────────────────────────────────────────
  it('shows children content when checked', async () => {
    const user = userEvent.setup();
    render(
      <Checkbox label="Toggle">
        <span data-testid="nested">Nested content</span>
      </Checkbox>,
    );
    await user.click(screen.getByRole('checkbox'));
    expect(screen.getByTestId('nested')).toBeInTheDocument();
  });

  // ── Ref forwarding ────────────────────────────────────────
  it('forwards ref to the input element', () => {
    const ref = { current: null as HTMLInputElement | null };
    render(<Checkbox label="Ref" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  // ── DisplayName ───────────────────────────────────────────
  it('has displayName set', () => {
    expect(Checkbox.displayName).toBe('Checkbox');
  });
});
