import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../Button';

describe('Button', () => {
  // ── Render ──────────────────────────────────────────────────
  it('renders with children text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('renders with text prop', () => {
    render(<Button text="Save" />);
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('prefers children over text prop', () => {
    render(<Button text="Fallback">Primary</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Primary');
  });

  // ── Props ───────────────────────────────────────────────────
  it('applies variant class', () => {
    render(<Button variant="outline">Test</Button>);
    expect(screen.getByRole('button')).toHaveClass('w3f-button--outline');
  });

  it('applies color class', () => {
    render(<Button color="danger">Delete</Button>);
    expect(screen.getByRole('button')).toHaveClass('w3f-button--danger');
  });

  it('applies size class', () => {
    render(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button')).toHaveClass('w3f-button--lg');
  });

  it('applies fullWidth class', () => {
    render(<Button fullWidth>Full</Button>);
    expect(screen.getByRole('button')).toHaveClass('w3f-button--full');
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Test</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('defaults to type="button"', () => {
    render(<Button>Test</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('accepts type="submit"', () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  // ── Disabled ────────────────────────────────────────────────
  it('disables the button', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('does not fire onClick when disabled', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button disabled onClick={onClick}>Disabled</Button>);
    await user.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  // ── Interaction ─────────────────────────────────────────────
  it('fires onClick when clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  // ── Icon ────────────────────────────────────────────────────
  it('renders icon on the left by default', () => {
    render(<Button icon={<span data-testid="icon">★</span>}>Star</Button>);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    const content = screen.getByRole('button').querySelector('.w3f-button__content');
    expect(content).toBeInTheDocument();
  });

  it('renders icon on the right', () => {
    render(
      <Button icon={<span data-testid="icon">→</span>} iconPosition="right">
        Next
      </Button>,
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  // ── Unstyled ────────────────────────────────────────────────
  it('applies unstyled class when unstyled=true', () => {
    render(<Button unstyled>Raw</Button>);
    expect(screen.getByRole('button')).toHaveClass('w3f-button--unstyled');
  });

  // ── Ref forwarding ──────────────────────────────────────────
  it('forwards ref to the button element', () => {
    const ref = { current: null as HTMLButtonElement | null };
    render(<Button ref={ref}>Ref</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  // ── Spread props ────────────────────────────────────────────
  it('passes additional HTML attributes', () => {
    render(<Button aria-label="custom" data-testid="btn">Test</Button>);
    expect(screen.getByTestId('btn')).toHaveAttribute('aria-label', 'custom');
  });

  // ── DisplayName ─────────────────────────────────────────────
  it('has displayName set', () => {
    expect(Button.displayName).toBe('Button');
  });
});
