import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToggleButton, ToggleButtonGroup } from '../ToggleButton';

describe('ToggleButton', () => {
  // ── Render ──────────────────────────────────────────────────
  it('renders a button element', () => {
    render(<ToggleButton value="a">A</ToggleButton>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders children text', () => {
    render(<ToggleButton value="bold">Bold</ToggleButton>);
    expect(screen.getByRole('button')).toHaveTextContent('Bold');
  });

  // ── Props ───────────────────────────────────────────────────
  it('applies base class w3f-toggle-button', () => {
    render(<ToggleButton value="a">A</ToggleButton>);
    expect(screen.getByRole('button')).toHaveClass('w3f-toggle-button');
  });

  it('applies selected class when selected', () => {
    render(<ToggleButton value="a" selected>A</ToggleButton>);
    expect(screen.getByRole('button')).toHaveClass('w3f-toggle-button--selected');
  });

  it('applies size modifier class', () => {
    render(<ToggleButton value="a" size="lg">A</ToggleButton>);
    expect(screen.getByRole('button')).toHaveClass('w3f-toggle-button--lg');
  });

  it('applies fullWidth class', () => {
    render(<ToggleButton value="a" fullWidth>A</ToggleButton>);
    expect(screen.getByRole('button')).toHaveClass('w3f-toggle-button--full');
  });

  it('applies disabled class', () => {
    render(<ToggleButton value="a" disabled>A</ToggleButton>);
    expect(screen.getByRole('button')).toHaveClass('w3f-toggle-button--disabled');
  });

  it('applies custom className', () => {
    render(<ToggleButton value="a" className="custom">A</ToggleButton>);
    expect(screen.getByRole('button')).toHaveClass('custom');
  });

  // ── Disabled ────────────────────────────────────────────────
  it('does not fire onChange when disabled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<ToggleButton value="a" disabled onChange={onChange}>A</ToggleButton>);
    await user.click(screen.getByRole('button'));
    expect(onChange).not.toHaveBeenCalled();
  });

  // ── Interaction ─────────────────────────────────────────────
  it('fires onChange when clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<ToggleButton value="bold" onChange={onChange}>Bold</ToggleButton>);
    await user.click(screen.getByRole('button'));
    expect(onChange).toHaveBeenCalled();
  });

  // ── DisplayName ───────────────────────────────────────────
  it('has displayName set', () => {
    expect(ToggleButton.displayName).toBe('ToggleButton');
  });
});

describe('ToggleButtonGroup', () => {
  const renderGroup = (props = {}) =>
    render(
      <ToggleButtonGroup {...props}>
        <ToggleButton value="bold">B</ToggleButton>
        <ToggleButton value="italic">I</ToggleButton>
        <ToggleButton value="underline">U</ToggleButton>
      </ToggleButtonGroup>,
    );

  // ── Render ──────────────────────────────────────────────────
  it('renders a group element', () => {
    renderGroup();
    expect(screen.getByRole('group')).toBeInTheDocument();
  });

  it('renders all toggle buttons', () => {
    renderGroup();
    expect(screen.getAllByRole('checkbox')).toHaveLength(3);
  });

  // ── Props ───────────────────────────────────────────────────
  it('applies wrapper class w3f-toggle-group-wrapper', () => {
    const { container } = renderGroup();
    expect(container.querySelector('.w3f-toggle-group-wrapper')).toBeInTheDocument();
  });

  it('renders label', () => {
    renderGroup({ label: 'Format' });
    expect(screen.getByText('Format')).toBeInTheDocument();
  });

  it('renders required indicator', () => {
    renderGroup({ label: 'Format', required: true });
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('uses radiogroup role when exclusive', () => {
    renderGroup({ exclusive: true });
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
  });

  // ── Error / Helper ────────────────────────────────────────
  it('shows error message with role alert', () => {
    renderGroup({ error: 'Select one' });
    expect(screen.getByRole('alert')).toHaveTextContent('Select one');
  });

  it('shows helper text', () => {
    renderGroup({ helperText: 'Pick formatting' });
    expect(screen.getByText('Pick formatting')).toBeInTheDocument();
  });

  // ── Ref forwarding ────────────────────────────────────────
  it('forwards ref to wrapper div', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(
      <ToggleButtonGroup ref={ref}>
        <ToggleButton value="a">A</ToggleButton>
      </ToggleButtonGroup>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  // ── DisplayName ───────────────────────────────────────────
  it('has displayName set', () => {
    expect(ToggleButtonGroup.displayName).toBe('ToggleButtonGroup');
  });
});
