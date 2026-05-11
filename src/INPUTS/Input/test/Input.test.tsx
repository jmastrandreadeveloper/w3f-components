import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from '../Input';

describe('Input', () => {
  // ── Render ──────────────────────────────────────────────────
  it('renders an input element', () => {
    render(<Input label="Name" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders the label text', () => {
    render(<Input label="Email" />);
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  // ── Props ───────────────────────────────────────────────────
  it('applies the container class w3f-input-container', () => {
    const { container } = render(<Input label="Test" />);
    expect(container.querySelector('.w3f-input-container')).toBeInTheDocument();
  });

  it('applies the wrapper class w3f-input-wrapper', () => {
    const { container } = render(<Input label="Test" />);
    expect(container.querySelector('.w3f-input-wrapper')).toBeInTheDocument();
  });

  it('applies custom className to container', () => {
    const { container } = render(<Input label="Test" className="my-custom" />);
    expect(container.firstElementChild).toHaveClass('my-custom');
  });

  it('renders required indicator when required', () => {
    render(<Input label="Name" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('sets input type', () => {
    render(<Input label="Pass" type="password" />);
    expect(screen.getByLabelText('Pass')).toHaveAttribute('type', 'password');
  });

  // ── Disabled ────────────────────────────────────────────────
  it('disables the input', () => {
    render(<Input label="Disabled" disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  // ── Interaction ─────────────────────────────────────────────
  it('fires onChange when typing', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Input label="Name" value="" onChange={onChange} />);
    await user.type(screen.getByRole('textbox'), 'a');
    expect(onChange).toHaveBeenCalled();
  });

  // ── Error / Helper ────────────────────────────────────────
  it('shows error message with role alert', () => {
    render(<Input label="Email" error="Required" value="" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Required');
  });

  it('shows helper text when no error', () => {
    render(<Input label="Email" helperText="Enter email" />);
    expect(screen.getByText('Enter email')).toBeInTheDocument();
  });

  // ── Icons ─────────────────────────────────────────────────
  it('renders leading icon', () => {
    const { container } = render(
      <Input label="Search" leadingIcon={<span data-testid="lead">L</span>} />,
    );
    expect(screen.getByTestId('lead')).toBeInTheDocument();
    expect(container.querySelector('.w3f-input-icon--leading')).toBeInTheDocument();
  });

  // ── Ref forwarding ────────────────────────────────────────
  it('forwards ref to the input element', () => {
    const ref = { current: null as HTMLInputElement | null };
    render(<Input label="Ref" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  // ── DisplayName ───────────────────────────────────────────
  it('has displayName set', () => {
    expect(Input.displayName).toBe('Input');
  });
});
