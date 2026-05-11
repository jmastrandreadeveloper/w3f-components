import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Text from '../Text';

describe('Text', () => {
  it('renders as a p element by default', () => {
    const { container } = render(<Text>Hello</Text>);
    expect(container.firstElementChild?.tagName).toBe('P');
    expect(container.firstElementChild).toHaveTextContent('Hello');
  });

  it('has displayName set', () => {
    expect(Text.displayName).toBe('Text');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLElement | null };
    render(<Text ref={ref}>Ref</Text>);
    expect(ref.current).toBeTruthy();
    expect(ref.current?.tagName).toBe('P');
  });

  it('renders as h1 when element="h1"', () => {
    const { container } = render(<Text element="h1">Title</Text>);
    expect(container.firstElementChild?.tagName).toBe('H1');
  });

  it('renders as span when element="span"', () => {
    const { container } = render(<Text element="span">Inline</Text>);
    expect(container.firstElementChild?.tagName).toBe('SPAN');
  });

  it('renders as div when element="div"', () => {
    const { container } = render(<Text element="div">Block</Text>);
    expect(container.firstElementChild?.tagName).toBe('DIV');
  });

  it('applies alignment class', () => {
    const { container } = render(<Text align="center">Centered</Text>);
    expect(container.firstElementChild).toHaveClass('w3f-text-center');
  });

  it('applies leading class', () => {
    const { container } = render(<Text leading="relaxed">Spaced</Text>);
    expect(container.firstElementChild).toHaveClass('w3f-leading-relaxed');
  });

  it('applies customClasses', () => {
    const { container } = render(<Text customClasses="my-text w3f-bold">Bold</Text>);
    expect(container.firstElementChild).toHaveClass('my-text');
    expect(container.firstElementChild).toHaveClass('w3f-bold');
  });

  it('renders children content', () => {
    render(<Text>Some text content</Text>);
    expect(screen.getByText('Some text content')).toBeInTheDocument();
  });

  it('renders content prop array', () => {
    const { container } = render(
      <Text content={['Part 1', ' Part 2']} />,
    );
    expect(container.firstElementChild).toHaveTextContent('Part 1 Part 2');
  });

  it('applies direction style', () => {
    const { container } = render(<Text direction="rtl">RTL</Text>);
    expect(container.firstElementChild).toHaveStyle({ direction: 'rtl' });
  });
});
