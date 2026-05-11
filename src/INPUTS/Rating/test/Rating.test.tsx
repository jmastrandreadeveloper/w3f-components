import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Rating from '../Rating';

describe('Rating', () => {
  // ── Render ──────────────────────────────────────────────────
  it('renders a radiogroup', () => {
    render(<Rating />);
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
  });

  it('renders 5 radio items by default', () => {
    render(<Rating />);
    expect(screen.getAllByRole('radio')).toHaveLength(5);
  });

  it('renders custom max items', () => {
    render(<Rating max={10} />);
    expect(screen.getAllByRole('radio')).toHaveLength(10);
  });

  // ── Props ───────────────────────────────────────────────────
  it('applies wrapper class w3f-rating-wrapper', () => {
    const { container } = render(<Rating />);
    expect(container.querySelector('.w3f-rating-wrapper')).toBeInTheDocument();
  });

  it('renders label text', () => {
    render(<Rating label="Rate this" />);
    expect(screen.getByText('Rate this')).toBeInTheDocument();
  });

  it('renders required indicator', () => {
    render(<Rating label="Rate" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('shows value display when showValue=true', () => {
    render(<Rating showValue value={3} />);
    expect(screen.getByText('3/5')).toBeInTheDocument();
  });

  // ── Disabled ────────────────────────────────────────────────
  it('applies disabled class to items', () => {
    const { container } = render(<Rating disabled />);
    expect(container.querySelector('.w3f-rating-item--disabled')).toBeInTheDocument();
  });

  // ── Interaction ─────────────────────────────────────────────
  it('fires onChange when clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Rating onChange={onChange} />);
    await user.click(screen.getAllByRole('radio')[2]);
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('does not fire onChange when disabled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Rating disabled onChange={onChange} />);
    await user.click(screen.getAllByRole('radio')[0]);
    expect(onChange).not.toHaveBeenCalled();
  });

  // ── Error / Helper ────────────────────────────────────────
  it('shows error message with role alert', () => {
    render(<Rating error="Required" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Required');
  });

  it('shows helper text', () => {
    render(<Rating helperText="Select a rating" />);
    expect(screen.getByText('Select a rating')).toBeInTheDocument();
  });

  // ── Ref forwarding ────────────────────────────────────────
  it('forwards ref to wrapper div', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<Rating ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  // ── DisplayName ───────────────────────────────────────────
  it('has displayName set', () => {
    expect(Rating.displayName).toBe('Rating');
  });
});
