import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Link from '../Link';

describe('Link', () => {
    it('renders with base CSS class', () => {
        render(<Link href="/home">Home</Link>);
        const link = screen.getByRole('link');
        expect(link.className).toContain('w3f-link');
    });

    it('has displayName set', () => {
        expect(Link.displayName).toBe('Link');
    });

    it('forwards ref to the anchor element', () => {
        const ref = { current: null } as React.RefObject<HTMLAnchorElement | null>;
        render(<Link href="/test" ref={ref}>Test</Link>);
        expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
    });

    it('renders as anchor when href is provided', () => {
        render(<Link href="/home">Home</Link>);
        const link = screen.getByRole('link');
        expect(link.tagName).toBe('A');
        expect(link).toHaveAttribute('href', '/home');
    });

    it('renders as button when no href is provided', () => {
        render(<Link onClick={() => {}}>Click</Link>);
        const btn = screen.getByRole('button');
        expect(btn.tagName).toBe('BUTTON');
        expect(btn.className).toContain('w3f-link--button');
    });

    it('applies color class', () => {
        render(<Link href="#" color="danger">Danger</Link>);
        const link = screen.getByRole('link');
        expect(link.className).toContain('w3f-link--danger');
    });

    it('applies underline class', () => {
        render(<Link href="#" underline="hover">Link</Link>);
        const link = screen.getByRole('link');
        expect(link.className).toContain('w3f-link--underline-hover');
    });

    it('applies variant class', () => {
        render(<Link href="#" variant="h3">Title</Link>);
        const link = screen.getByRole('link');
        expect(link.className).toContain('w3f-link--h3');
    });

    it('applies disabled class and aria-disabled', () => {
        const { container } = render(<Link href="/test" disabled>Disabled</Link>);
        const anchor = container.querySelector('a');
        expect(anchor).toBeInTheDocument();
        expect(anchor?.className).toContain('w3f-link--disabled');
        expect(anchor).toHaveAttribute('aria-disabled', 'true');
    });

    it('applies custom className', () => {
        render(<Link href="#" className="my-link">Custom</Link>);
        const link = screen.getByRole('link');
        expect(link.className).toContain('my-link');
    });

    it('fires onClick callback', async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();
        render(<Link onClick={onClick}>Click me</Link>);
        await user.click(screen.getByRole('button'));
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('does not navigate when disabled', () => {
        const { container } = render(<Link href="/test" disabled>Disabled</Link>);
        const anchor = container.querySelector('a');
        expect(anchor).not.toHaveAttribute('href');
    });

    it('renders icon on the left by default', () => {
        const { container } = render(
            <Link href="#" icon={<span data-testid="icon" />}>With icon</Link>,
        );
        const iconWrapper = container.querySelector('.w3f-link__icon');
        expect(iconWrapper).toBeInTheDocument();
    });

    it('adds external props when external is true', () => {
        render(<Link href="https://example.com" external>External</Link>);
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
});
