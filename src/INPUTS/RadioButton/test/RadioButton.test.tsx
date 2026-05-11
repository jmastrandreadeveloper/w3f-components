import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RadioButton, RadioGroup } from '../RadioButton';

describe('RadioButton', () => {
  // ── DisplayName ───────────────────────────────────────────
  it('has displayName set', () => {
    expect(RadioButton.displayName).toBe('RadioButton');
  });

  it('RadioGroup has displayName set', () => {
    expect(RadioGroup.displayName).toBe('RadioGroup');
  });
});

describe('RadioGroup', () => {
  const renderGroup = (props = {}) =>
    render(
      <RadioGroup label="Fruit" {...props}>
        <RadioButton label="Apple" value="apple" />
        <RadioButton label="Banana" value="banana" />
        <RadioButton label="Cherry" value="cherry" />
      </RadioGroup>,
    );

  // ── Render ──────────────────────────────────────────────────
  it('renders a radiogroup', () => {
    renderGroup();
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
  });

  it('renders all radio buttons', () => {
    renderGroup();
    expect(screen.getAllByRole('radio')).toHaveLength(3);
  });

  it('renders legend label', () => {
    renderGroup();
    expect(screen.getByText('Fruit')).toBeInTheDocument();
  });

  // ── Props ───────────────────────────────────────────────────
  it('renders required indicator', () => {
    renderGroup({ required: true });
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = renderGroup({ className: 'custom-group' });
    expect(container.firstElementChild).toHaveClass('custom-group');
  });

  // ── Interaction ─────────────────────────────────────────────
  it('fires onChange when a radio is clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderGroup({ onChange });
    await user.click(screen.getByLabelText('Apple'));
    expect(onChange).toHaveBeenCalledWith('apple');
  });

  it('selects the correct radio', async () => {
    const user = userEvent.setup();
    renderGroup();
    await user.click(screen.getByLabelText('Banana'));
    expect(screen.getByLabelText('Banana')).toBeChecked();
  });

  // ── Error ─────────────────────────────────────────────────
  it('shows error message with role alert', () => {
    renderGroup({ error: 'Select one' });
    expect(screen.getByRole('alert')).toHaveTextContent('Select one');
  });

  // ── Selection panel ───────────────────────────────────────
  it('shows selection panel when showSelection is true and value selected', async () => {
    const user = userEvent.setup();
    renderGroup({ showSelection: true });
    await user.click(screen.getByLabelText('Apple'));
    expect(screen.getByRole('status')).toHaveTextContent('apple');
  });

  // ── Disabled ────────────────────────────────────────────────
  it('disables individual radio button', () => {
    render(
      <RadioGroup label="Test">
        <RadioButton label="A" value="a" disabled />
        <RadioButton label="B" value="b" />
      </RadioGroup>,
    );
    expect(screen.getByLabelText('A')).toBeDisabled();
    expect(screen.getByLabelText('B')).not.toBeDisabled();
  });

  // ── Ref forwarding ────────────────────────────────────────
  it('forwards ref to the wrapper div', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(
      <RadioGroup label="Test" ref={ref}>
        <RadioButton label="A" value="a" />
      </RadioGroup>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
