import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import RangeSlider from '../RangeSlider';

describe('RangeSlider', () => {
  // ── Render ──────────────────────────────────────────────────
  it('renders a group element', () => {
    render(<RangeSlider />);
    expect(screen.getByRole('group')).toBeInTheDocument();
  });

  it('renders two accessible range inputs', () => {
    render(<RangeSlider />);
    expect(screen.getAllByRole('slider')).toHaveLength(2);
  });

  // ── Props ───────────────────────────────────────────────────
  it('applies the wrapper class w3f-range-slider-wrapper', () => {
    const { container } = render(<RangeSlider />);
    expect(container.querySelector('.w3f-range-slider-wrapper')).toBeInTheDocument();
  });

  it('applies custom className to outer div', () => {
    const { container } = render(<RangeSlider className="custom-range" />);
    expect(container.firstElementChild).toHaveClass('custom-range');
  });

  it('sets default aria-label', () => {
    render(<RangeSlider />);
    expect(screen.getByRole('group')).toHaveAttribute('aria-label', 'Selector de rango');
  });

  it('accepts custom ariaLabel', () => {
    render(<RangeSlider ariaLabel="Price range" />);
    expect(screen.getByRole('group')).toHaveAttribute('aria-label', 'Price range');
  });

  it('renders value labels', () => {
    render(<RangeSlider />);
    expect(screen.getByText('Valor mínimo')).toBeInTheDocument();
    expect(screen.getByText('Valor máximo')).toBeInTheDocument();
  });

  // ── Disabled ────────────────────────────────────────────────
  it('applies is-disabled class when disabled', () => {
    const { container } = render(<RangeSlider disabled />);
    expect(container.querySelector('.is-disabled')).toBeInTheDocument();
  });

  it('disables both range inputs', () => {
    render(<RangeSlider disabled />);
    const sliders = screen.getAllByRole('slider');
    sliders.forEach((s) => expect(s).toBeDisabled());
  });

  // ── Error ─────────────────────────────────────────────────
  it('shows error message with role alert', () => {
    render(<RangeSlider error="Invalid range" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Invalid range');
  });

  it('applies has-error class when error', () => {
    const { container } = render(<RangeSlider error="err" />);
    expect(container.querySelector('.has-error')).toBeInTheDocument();
  });

  // ── Ref forwarding ────────────────────────────────────────
  it('forwards ref to wrapper div', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<RangeSlider ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  // ── DisplayName ───────────────────────────────────────────
  it('has displayName set', () => {
    expect(RangeSlider.displayName).toBe('RangeSlider');
  });
});
