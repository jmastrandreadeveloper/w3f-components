import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import FormField from '../FormField';

describe('FormField', () => {
  // ── Render ──────────────────────────────────────────────────
  it('renders a group element', () => {
    render(<FormField><input /></FormField>);
    expect(screen.getByRole('group')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <FormField>
        <input data-testid="child" />
      </FormField>,
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  // ── Props ───────────────────────────────────────────────────
  it('applies base class w3f-form-field', () => {
    const { container } = render(<FormField><input /></FormField>);
    expect(container.querySelector('.w3f-form-field')).toBeInTheDocument();
  });

  it('applies stacked layout class by default', () => {
    const { container } = render(<FormField><input /></FormField>);
    expect(container.querySelector('.w3f-form-field--stacked')).toBeInTheDocument();
  });

  it('applies inline layout class', () => {
    const { container } = render(<FormField layout="inline"><input /></FormField>);
    expect(container.querySelector('.w3f-form-field--inline')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<FormField className="my-field"><input /></FormField>);
    expect(container.querySelector('.w3f-form-field')).toHaveClass('my-field');
  });

  it('renders label text', () => {
    render(<FormField label="Name"><input /></FormField>);
    expect(screen.getByText('Name')).toBeInTheDocument();
  });

  it('renders required indicator', () => {
    render(<FormField label="Name" required><input /></FormField>);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('applies label class w3f-form-field__label', () => {
    const { container } = render(<FormField label="Name"><input /></FormField>);
    expect(container.querySelector('.w3f-form-field__label')).toBeInTheDocument();
  });

  it('applies content class w3f-form-field__content', () => {
    const { container } = render(<FormField><input /></FormField>);
    expect(container.querySelector('.w3f-form-field__content')).toBeInTheDocument();
  });

  // ── Error / Helper ────────────────────────────────────────
  it('shows error message with role alert', () => {
    render(<FormField error="Required"><input /></FormField>);
    expect(screen.getByRole('alert')).toHaveTextContent('Required');
  });

  it('shows helper text when no error', () => {
    render(<FormField helperText="Enter your name"><input /></FormField>);
    expect(screen.getByText('Enter your name')).toBeInTheDocument();
  });

  // ── Ref forwarding ────────────────────────────────────────
  it('forwards ref to the wrapper div', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<FormField ref={ref}><input /></FormField>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  // ── DisplayName ───────────────────────────────────────────
  it('has displayName set', () => {
    expect(FormField.displayName).toBe('FormField');
  });
});
