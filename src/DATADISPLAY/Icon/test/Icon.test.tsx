import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Icon from '../Icon';

describe('Icon', () => {
  it('renders a known icon', () => {
    const { container } = render(<Icon name="Home" />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveClass('w3f-inline-flex');
    expect(wrapper).toHaveClass('w3f-items-center');
    expect(wrapper).toHaveClass('w3f-justify-center');
  });

  it('has displayName set', () => {
    expect(Icon.displayName).toBe('Icon');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLSpanElement | null };
    render(<Icon ref={ref} name="Home" />);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it('renders fallback text for unknown icon', () => {
    const { container } = render(<Icon name="NonExistentIcon123" />);
    const fallback = container.firstElementChild as HTMLElement;
    expect(fallback).toBeInTheDocument();
    expect(fallback).toHaveTextContent('NonExistentIcon123');
    expect(fallback).toHaveClass('w3f-text-sm');
    expect(fallback).toHaveClass('w3f-text-gray');
  });

  it('has aria-hidden on wrapper', () => {
    const { container } = render(<Icon name="Home" />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toHaveAttribute('aria-hidden', 'true');
  });

  it('has role=img on wrapper', () => {
    const { container } = render(<Icon name="Home" />);
    expect(container.firstElementChild).toHaveAttribute('role', 'img');
  });

  it('resolves aliases (user -> User)', () => {
    const { container } = render(<Icon name="user" />);
    // Should resolve to User icon and render SVG, not fallback text
    const wrapper = container.firstElementChild as HTMLElement;
    const svg = wrapper.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Icon name="Home" className="my-icon" />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toHaveClass('my-icon');
  });

  it('renders SVG inside wrapper for valid icon', () => {
    const { container } = render(<Icon name="Home" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
