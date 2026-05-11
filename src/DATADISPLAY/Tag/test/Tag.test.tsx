import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Tag from '../Tag';

describe('Tag', () => {
  it('renders with base class', () => {
    render(<Tag color="primary">Label</Tag>);
    const tag = screen.getByText('Label');
    expect(tag).toHaveClass('w3f-tag-base');
  });

  it('has displayName set', () => {
    expect(Tag.displayName).toBe('Tag');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLSpanElement | null };
    render(<Tag ref={ref} color="primary">T</Tag>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it('renders children content', () => {
    render(<Tag color="success">Status OK</Tag>);
    expect(screen.getByText('Status OK')).toBeInTheDocument();
  });

  it('applies color background class', () => {
    render(<Tag color="danger">Error</Tag>);
    expect(screen.getByText('Error')).toHaveClass('w3f-bg-danger');
  });

  it('applies light variant classes', () => {
    render(<Tag color="primary" light>Light</Tag>);
    const tag = screen.getByText('Light');
    expect(tag).toHaveClass('w3f-bg-primary-light');
    expect(tag).toHaveClass('w3f-text-primary');
  });

  it('does not apply text color class without light', () => {
    render(<Tag color="info">Normal</Tag>);
    const tag = screen.getByText('Normal');
    expect(tag).toHaveClass('w3f-bg-info');
    expect(tag).not.toHaveClass('w3f-text-info');
  });

  it('applies unstyled class', () => {
    render(<Tag color="primary" unstyled>Unstyled</Tag>);
    const tag = screen.getByText('Unstyled');
    expect(tag).toHaveClass('w3f-tag-base');
    expect(tag).toHaveClass('w3f-tag--unstyled');
    expect(tag).not.toHaveClass('w3f-bg-primary');
  });

  it('applies custom className', () => {
    render(<Tag color="gray" className="my-tag">Custom</Tag>);
    expect(screen.getByText('Custom')).toHaveClass('my-tag');
  });

  it('renders as a span element', () => {
    const { container } = render(<Tag color="primary">Span</Tag>);
    expect(container.firstElementChild?.tagName).toBe('SPAN');
  });
});
