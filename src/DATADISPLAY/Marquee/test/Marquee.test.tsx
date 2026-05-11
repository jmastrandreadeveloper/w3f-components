import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Marquee from '../Marquee';
import { buildFadeMask } from '../Marquee.utils';

describe('Marquee', () => {
  it('renders with base class', () => {
    const { container } = render(
      <Marquee><span>Item 1</span></Marquee>
    );
    expect(container.firstElementChild).toHaveClass('w3f-marquee');
  });

  it('has displayName set', () => {
    expect(Marquee.displayName).toBe('Marquee');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<Marquee ref={ref}><span>Ref</span></Marquee>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('renders children content', () => {
    render(<Marquee><span>Logo A</span></Marquee>);
    const items = screen.getAllByText('Logo A');
    expect(items.length).toBeGreaterThanOrEqual(1);
    expect(items[0]).toBeInTheDocument();
  });

  it('applies horizontal class by default', () => {
    const { container } = render(
      <Marquee><span>H</span></Marquee>
    );
    expect(container.firstElementChild).toHaveClass('w3f-marquee--horizontal');
  });

  it('applies vertical class for up direction', () => {
    const { container } = render(
      <Marquee direction="up"><span>V</span></Marquee>
    );
    expect(container.firstElementChild).toHaveClass('w3f-marquee--vertical');
  });

  it('applies vertical class for down direction', () => {
    const { container } = render(
      <Marquee direction="down"><span>V</span></Marquee>
    );
    expect(container.firstElementChild).toHaveClass('w3f-marquee--vertical');
  });

  it('applies pause-hover class by default', () => {
    const { container } = render(
      <Marquee><span>P</span></Marquee>
    );
    expect(container.firstElementChild).toHaveClass('w3f-marquee--pause-hover');
  });

  it('does not apply pause-hover when disabled', () => {
    const { container } = render(
      <Marquee pauseOnHover={false}><span>NP</span></Marquee>
    );
    expect(container.firstElementChild).not.toHaveClass('w3f-marquee--pause-hover');
  });

  it('applies left track direction by default', () => {
    const { container } = render(
      <Marquee><span>L</span></Marquee>
    );
    const track = container.querySelector('.w3f-marquee__track');
    expect(track).toHaveClass('w3f-marquee__track--left');
  });

  it('applies right track direction', () => {
    const { container } = render(
      <Marquee direction="right"><span>R</span></Marquee>
    );
    const track = container.querySelector('.w3f-marquee__track');
    expect(track).toHaveClass('w3f-marquee__track--right');
  });

  it('applies up track direction', () => {
    const { container } = render(
      <Marquee direction="up"><span>U</span></Marquee>
    );
    const track = container.querySelector('.w3f-marquee__track');
    expect(track).toHaveClass('w3f-marquee__track--up');
  });

  it('applies down track direction', () => {
    const { container } = render(
      <Marquee direction="down"><span>D</span></Marquee>
    );
    const track = container.querySelector('.w3f-marquee__track');
    expect(track).toHaveClass('w3f-marquee__track--down');
  });

  it('duplicates children based on repeat prop', () => {
    const { container } = render(
      <Marquee repeat={3}><span>Item</span></Marquee>
    );
    const groups = container.querySelectorAll('.w3f-marquee__group');
    expect(groups.length).toBe(3);
  });

  it('defaults to 2 repetitions', () => {
    const { container } = render(
      <Marquee><span>Item</span></Marquee>
    );
    const groups = container.querySelectorAll('.w3f-marquee__group');
    expect(groups.length).toBe(2);
  });

  it('marks duplicate groups as aria-hidden', () => {
    const { container } = render(
      <Marquee repeat={3}><span>Item</span></Marquee>
    );
    const groups = container.querySelectorAll('.w3f-marquee__group');
    expect(groups[0].getAttribute('aria-hidden')).toBeNull();
    expect(groups[1].getAttribute('aria-hidden')).toBe('true');
    expect(groups[2].getAttribute('aria-hidden')).toBe('true');
  });

  it('has role="marquee" for accessibility', () => {
    const { container } = render(
      <Marquee><span>A11y</span></Marquee>
    );
    expect(container.firstElementChild).toHaveAttribute('role', 'marquee');
  });

  it('sets default aria-label', () => {
    const { container } = render(
      <Marquee><span>Test</span></Marquee>
    );
    expect(container.firstElementChild).toHaveAttribute('aria-label', 'Scrolling content');
  });

  it('accepts custom aria-label', () => {
    const { container } = render(
      <Marquee aria-label="Our partners"><span>Test</span></Marquee>
    );
    expect(container.firstElementChild).toHaveAttribute('aria-label', 'Our partners');
  });

  it('applies custom className', () => {
    const { container } = render(
      <Marquee className="my-marquee"><span>C</span></Marquee>
    );
    expect(container.firstElementChild).toHaveClass('my-marquee');
  });

  it('sets CSS custom properties via style', () => {
    const { container } = render(
      <Marquee speed={15} gap={32}><span>S</span></Marquee>
    );
    const el = container.firstElementChild as HTMLElement;
    expect(el.style.getPropertyValue('--marquee-speed')).toBe('15s');
    expect(el.style.getPropertyValue('--marquee-gap')).toBe('32px');
  });

  it('generates fade mask for non-zero fadeEdge', () => {
    // jsdom doesn't serialize maskImage; test the util directly
    const mask = buildFadeMask('left', 50);
    expect(mask).toContain('linear-gradient');
    expect(mask).toContain('50px');
  });

  it('does not generate fade mask when fadeEdge is 0', () => {
    const mask = buildFadeMask('left', 0);
    expect(mask).toBeUndefined();
  });

  it('clamps repeat to at least 1', () => {
    const { container } = render(
      <Marquee repeat={-5}><span>Item</span></Marquee>
    );
    const groups = container.querySelectorAll('.w3f-marquee__group');
    expect(groups.length).toBe(1);
  });

  it('renders as a div element', () => {
    const { container } = render(
      <Marquee><span>Div</span></Marquee>
    );
    expect(container.firstElementChild?.tagName).toBe('DIV');
  });
});
