import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Select from '../Select';

const options = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
  { value: 'c', label: 'Gamma' },
];

describe('Select', () => {
  // ── Render ──────────────────────────────────────────────────
  it('renders a select element', () => {
    render(<Select label="Pick" options={options} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders all options', () => {
    render(<Select label="Pick" options={options} />);
    expect(screen.getAllByRole('option')).toHaveLength(3);
  });

  // ── Props ───────────────────────────────────────────────────
  it('applies container class w3f-select-container', () => {
    const { container } = render(<Select label="Pick" options={options} />);
    expect(container.querySelector('.w3f-select-container')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Select label="Pick" options={options} className="custom" />);
    expect(container.firstElementChild).toHaveClass('custom');
  });

  it('renders label text', () => {
    render(<Select label="Country" options={options} />);
    expect(screen.getByText('Country')).toBeInTheDocument();
  });

  it('renders required indicator', () => {
    render(<Select label="Country" options={options} required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  // ── Disabled ────────────────────────────────────────────────
  it('disables the select', () => {
    render(<Select label="Pick" options={options} disabled />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  // ── Interaction ─────────────────────────────────────────────
  it('fires onChange when value changes', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Select label="Pick" options={options} onChange={onChange} />);
    await user.selectOptions(screen.getByRole('combobox'), 'a');
    expect(onChange).toHaveBeenCalled();
  });

  // ── Error / Helper ────────────────────────────────────────
  it('shows error message with role alert', () => {
    render(<Select label="Pick" options={options} error="Required" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Required');
  });

  it('shows helper text', () => {
    render(<Select label="Pick" options={options} helperText="Choose one" />);
    expect(screen.getByText('Choose one')).toBeInTheDocument();
  });

  // ── Ref forwarding ────────────────────────────────────────
  it('forwards ref to the select element', () => {
    const ref = { current: null as HTMLSelectElement | null };
    render(<Select label="Pick" options={options} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLSelectElement);
  });

  // ── DisplayName ───────────────────────────────────────────
  it('has displayName set', () => {
    expect(Select.displayName).toBe('Select');
  });
});
