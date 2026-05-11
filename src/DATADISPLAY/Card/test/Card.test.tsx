import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Card from '../Card';

describe('Card', () => {
  it('renders with default classes', () => {
    const { container } = render(<Card title="Test" />);
    const card = container.firstElementChild as HTMLElement;
    expect(card).toHaveClass('w3f-card');
    expect(card).toHaveClass('w3f-card--default');
    expect(card).toHaveClass('w3f-card--md');
  });

  it('has displayName set', () => {
    expect(Card.displayName).toBe('Card');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<Card ref={ref} title="T" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('renders title and subtitle', () => {
    render(<Card title="Card Title" subtitle="Card Subtitle" />);
    expect(screen.getByText('Card Title')).toHaveClass('w3f-card-title');
    expect(screen.getByText('Card Subtitle')).toHaveClass('w3f-card-subtitle');
  });

  it('renders content', () => {
    const { container } = render(<Card content={<p>Body text</p>} />);
    const content = container.querySelector('.w3f-card-content');
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent('Body text');
  });

  it('renders image with correct class', () => {
    render(<Card imageSrc="test.jpg" imageAlt="Photo" />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'test.jpg');
    expect(img).toHaveClass('w3f-card-image');
  });

  it('applies variant classes', () => {
    const { container } = render(<Card variant="elevated" />);
    expect(container.firstElementChild).toHaveClass('w3f-card--elevated');
  });

  it('applies size classes', () => {
    const { container: sm } = render(<Card size="sm" />);
    expect(sm.firstElementChild).toHaveClass('w3f-card--sm');

    const { container: lg } = render(<Card size="lg" />);
    expect(lg.firstElementChild).toHaveClass('w3f-card--lg');
  });

  it('applies hoverable and clickable classes', () => {
    const { container } = render(<Card hoverable clickable />);
    expect(container.firstElementChild).toHaveClass('w3f-card--hoverable');
    expect(container.firstElementChild).toHaveClass('w3f-card--clickable');
  });

  it('applies fullWidth class', () => {
    const { container } = render(<Card fullWidth />);
    expect(container.firstElementChild).toHaveClass('w3f-card--full-width');
  });

  it('applies horizontal class for left/right image', () => {
    const { container } = render(<Card imagePosition="left" imageSrc="test.jpg" />);
    expect(container.firstElementChild).toHaveClass('w3f-card--horizontal');
  });

  it('renders actions area', () => {
    const { container } = render(<Card actions={<button>Click</button>} />);
    const actions = container.querySelector('.w3f-card-actions');
    expect(actions).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Card className="custom-card" />);
    expect(container.firstElementChild).toHaveClass('custom-card');
  });
});
