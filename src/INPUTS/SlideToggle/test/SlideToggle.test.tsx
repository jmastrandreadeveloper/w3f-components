import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SlideToggle from '../SlideToggle';

describe('SlideToggle', () => {
  // ── Render ──────────────────────────────────────────────────
  it('renders a switch role element', () => {
    render(<SlideToggle />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<SlideToggle label="Dark mode" />);
    expect(screen.getByText('Dark mode')).toBeInTheDocument();
  });

  // ── Props ───────────────────────────────────────────────────
  it('applies the base class w3f-slide-toggle', () => {
    render(<SlideToggle />);
    expect(screen.getByRole('switch')).toHaveClass('w3f-slide-toggle');
  });

  it('applies custom className to wrapper', () => {
    const { container } = render(<SlideToggle className="custom" />);
    expect(container.firstElementChild).toHaveClass('custom');
  });

  it('sets aria-checked to false by default', () => {
    render(<SlideToggle />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
  });

  it('sets aria-checked to true when checked', () => {
    render(<SlideToggle checked />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });

  // ── Disabled ────────────────────────────────────────────────
  it('applies aria-disabled when disabled', () => {
    render(<SlideToggle disabled />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-disabled', 'true');
  });

  it('does not fire onChange when disabled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<SlideToggle disabled onChange={onChange} />);
    await user.click(screen.getByRole('switch'));
    expect(onChange).not.toHaveBeenCalled();
  });

  // ── Interaction ─────────────────────────────────────────────
  it('fires onChange when clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<SlideToggle onChange={onChange} />);
    await user.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  // ── Error / Helper ────────────────────────────────────────
  it('shows error message with role alert', () => {
    render(<SlideToggle error="Required" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Required');
  });

  it('shows helper text', () => {
    render(<SlideToggle helperText="Toggle this" />);
    expect(screen.getByText('Toggle this')).toBeInTheDocument();
  });

  // ── Ref forwarding ────────────────────────────────────────
  it('forwards ref to wrapper div', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<SlideToggle ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  // ── DisplayName ───────────────────────────────────────────
  it('has displayName set', () => {
    expect(SlideToggle.displayName).toBe('SlideToggle');
  });
});
