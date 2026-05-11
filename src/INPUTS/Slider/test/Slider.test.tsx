import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Slider from '../Slider';

describe('Slider', () => {
  // ── Render ──────────────────────────────────────────────────
  it('renders a range input', () => {
    render(<Slider />);
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    render(<Slider label="Volume" />);
    expect(screen.getByText('Volume')).toBeInTheDocument();
  });

  // ── Props ───────────────────────────────────────────────────
  it('applies the component class w3f-slider-component', () => {
    const { container } = render(<Slider />);
    expect(container.querySelector('.w3f-slider-component')).toBeInTheDocument();
  });

  it('applies the input class w3f-range-input', () => {
    render(<Slider />);
    expect(screen.getByRole('slider')).toHaveClass('w3f-range-input');
  });

  it('applies custom className', () => {
    const { container } = render(<Slider className="my-slider" />);
    expect(container.firstElementChild).toHaveClass('my-slider');
  });

  it('sets min, max, step attributes', () => {
    render(<Slider min={10} max={200} step={5} />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('min', '10');
    expect(slider).toHaveAttribute('max', '200');
    expect(slider).toHaveAttribute('step', '5');
  });

  it('shows value display by default', () => {
    render(<Slider value={42} />);
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('hides value display when showValue is false', () => {
    render(<Slider value={42} showValue={false} />);
    expect(screen.queryByText('42')).not.toBeInTheDocument();
  });

  // ── Disabled ────────────────────────────────────────────────
  it('disables the slider', () => {
    render(<Slider disabled />);
    expect(screen.getByRole('slider')).toBeDisabled();
  });

  // ── Interaction ─────────────────────────────────────────────
  it('fires onChange when value changes', () => {
    const onChange = vi.fn();
    render(<Slider onChange={onChange} value={50} />);
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '75' } });
    expect(onChange).toHaveBeenCalledWith(75);
  });

  // ── Ref forwarding ────────────────────────────────────────
  it('forwards ref to the input element', () => {
    const ref = { current: null as HTMLInputElement | null };
    render(<Slider ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  // ── DisplayName ───────────────────────────────────────────
  it('has displayName set', () => {
    expect(Slider.displayName).toBe('Slider');
  });
});
