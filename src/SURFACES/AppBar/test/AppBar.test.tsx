import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AppBar, AppBarLeading, AppBarTitle, AppBarTrailing } from '../AppBar';
import { createRef } from 'react';

describe('AppBar', () => {
    it('renders with base class', () => {
        const { container } = render(<AppBar>Content</AppBar>);
        expect(container.querySelector('header')).toHaveClass('w3f-app-bar');
    });

    it('has displayName set', () => {
        expect(AppBar.displayName).toBe('AppBar');
    });

    it('forwards ref to header element', () => {
        const ref = createRef<HTMLElement>();
        render(<AppBar ref={ref}>Content</AppBar>);
        expect(ref.current).toBeInstanceOf(HTMLElement);
        expect(ref.current?.tagName).toBe('HEADER');
    });

    it('renders children inside toolbar', () => {
        render(<AppBar><span>My App</span></AppBar>);
        expect(screen.getByText('My App')).toBeInTheDocument();
    });

    it('applies primary color class by default', () => {
        const { container } = render(<AppBar>Content</AppBar>);
        expect(container.querySelector('header')).toHaveClass('w3f-app-bar--primary');
    });

    it('applies secondary color class', () => {
        const { container } = render(<AppBar color="secondary">Content</AppBar>);
        expect(container.querySelector('header')).toHaveClass('w3f-app-bar--secondary');
    });

    it('applies dark color class', () => {
        const { container } = render(<AppBar color="dark">Content</AppBar>);
        expect(container.querySelector('header')).toHaveClass('w3f-app-bar--dark');
    });

    it('applies fixed position class', () => {
        const { container } = render(<AppBar position="fixed">Content</AppBar>);
        expect(container.querySelector('header')).toHaveClass('w3f-app-bar--fixed');
    });

    it('applies sticky position class', () => {
        const { container } = render(<AppBar position="sticky">Content</AppBar>);
        expect(container.querySelector('header')).toHaveClass('w3f-app-bar--sticky');
    });

    it('applies sm size class', () => {
        const { container } = render(<AppBar size="sm">Content</AppBar>);
        expect(container.querySelector('header')).toHaveClass('w3f-app-bar--sm');
    });

    it('applies elevated class by default', () => {
        const { container } = render(<AppBar>Content</AppBar>);
        expect(container.querySelector('header')).toHaveClass('w3f-app-bar--elevated');
    });

    it('does not apply elevated class when elevated=false', () => {
        const { container } = render(<AppBar elevated={false}>Content</AppBar>);
        expect(container.querySelector('header')).not.toHaveClass('w3f-app-bar--elevated');
    });

    it('renders toolbar div with correct class', () => {
        const { container } = render(<AppBar>Content</AppBar>);
        expect(container.querySelector('.w3f-app-bar__toolbar')).toBeInTheDocument();
    });

    it('applies custom className', () => {
        const { container } = render(<AppBar className="my-bar">Content</AppBar>);
        expect(container.querySelector('header')).toHaveClass('my-bar');
    });
});

describe('AppBar slot components', () => {
    it('AppBarLeading renders with correct class', () => {
        const { container } = render(<AppBarLeading>Logo</AppBarLeading>);
        expect(container.firstChild).toHaveClass('w3f-app-bar__leading');
    });

    it('AppBarTitle renders with correct class', () => {
        const { container } = render(<AppBarTitle>Title</AppBarTitle>);
        expect(container.firstChild).toHaveClass('w3f-app-bar__title');
    });

    it('AppBarTrailing renders with correct class', () => {
        const { container } = render(<AppBarTrailing>Actions</AppBarTrailing>);
        expect(container.firstChild).toHaveClass('w3f-app-bar__trailing');
    });

    it('slot components have displayName set', () => {
        expect(AppBarLeading.displayName).toBe('AppBarLeading');
        expect(AppBarTitle.displayName).toBe('AppBarTitle');
        expect(AppBarTrailing.displayName).toBe('AppBarTrailing');
    });
});
