import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Breadcrumbs, BreadcrumbItem } from '../Breadcrumbs';

describe('Breadcrumbs', () => {
    it('renders with base CSS class', () => {
        const { container } = render(<Breadcrumbs />);
        expect(container.querySelector('.w3f-breadcrumbs')).toBeInTheDocument();
    });

    it('has displayName set', () => {
        expect(Breadcrumbs.displayName).toBe('Breadcrumbs');
    });

    it('forwards ref to the nav element', () => {
        const ref = { current: null } as React.RefObject<HTMLElement | null>;
        render(<Breadcrumbs ref={ref} />);
        expect(ref.current).toBeInstanceOf(HTMLElement);
        expect(ref.current?.tagName).toBe('NAV');
    });

    it('applies size class', () => {
        const { container } = render(<Breadcrumbs size="lg" />);
        expect(container.querySelector('.w3f-breadcrumbs--lg')).toBeInTheDocument();
    });

    it('applies color class', () => {
        const { container } = render(<Breadcrumbs color="primary" />);
        expect(container.querySelector('.w3f-breadcrumbs--primary')).toBeInTheDocument();
    });

    it('applies custom className', () => {
        const { container } = render(<Breadcrumbs className="my-crumbs" />);
        expect(container.querySelector('.w3f-breadcrumbs.my-crumbs')).toBeInTheDocument();
    });

    it('renders aria-label="breadcrumb"', () => {
        render(<Breadcrumbs />);
        expect(screen.getByLabelText('breadcrumb')).toBeInTheDocument();
    });

    it('renders children as list items', () => {
        const { container } = render(
            <Breadcrumbs>
                <BreadcrumbItem>Home</BreadcrumbItem>
                <BreadcrumbItem>Page</BreadcrumbItem>
            </Breadcrumbs>,
        );
        const items = container.querySelectorAll('.w3f-breadcrumbs__item');
        expect(items).toHaveLength(2);
    });

    it('renders separators between items', () => {
        const { container } = render(
            <Breadcrumbs>
                <BreadcrumbItem>Home</BreadcrumbItem>
                <BreadcrumbItem>Page</BreadcrumbItem>
                <BreadcrumbItem active>Current</BreadcrumbItem>
            </Breadcrumbs>,
        );
        const separators = container.querySelectorAll('.w3f-breadcrumbs__separator');
        expect(separators).toHaveLength(2);
    });

    it('collapses items when maxItems is set', () => {
        const { container } = render(
            <Breadcrumbs maxItems={3} itemsBeforeCollapse={1} itemsAfterCollapse={1}>
                <BreadcrumbItem>Home</BreadcrumbItem>
                <BreadcrumbItem>Products</BreadcrumbItem>
                <BreadcrumbItem>Category</BreadcrumbItem>
                <BreadcrumbItem active>Item</BreadcrumbItem>
            </Breadcrumbs>,
        );
        const expandBtn = container.querySelector('.w3f-breadcrumb-expand');
        expect(expandBtn).toBeInTheDocument();
    });

    it('expands collapsed items on button click', async () => {
        const user = userEvent.setup();
        const { container } = render(
            <Breadcrumbs maxItems={3} itemsBeforeCollapse={1} itemsAfterCollapse={1}>
                <BreadcrumbItem>Home</BreadcrumbItem>
                <BreadcrumbItem>Products</BreadcrumbItem>
                <BreadcrumbItem>Category</BreadcrumbItem>
                <BreadcrumbItem active>Item</BreadcrumbItem>
            </Breadcrumbs>,
        );
        const expandBtn = container.querySelector('.w3f-breadcrumb-expand')!;
        await user.click(expandBtn);
        expect(container.querySelector('.w3f-breadcrumb-expand')).not.toBeInTheDocument();
        const items = container.querySelectorAll('.w3f-breadcrumbs__item');
        expect(items).toHaveLength(4);
    });
});

describe('BreadcrumbItem', () => {
    it('has displayName set', () => {
        expect(BreadcrumbItem.displayName).toBe('BreadcrumbItem');
    });

    it('renders active class and aria-current when active', () => {
        const { container } = render(
            <Breadcrumbs>
                <BreadcrumbItem active>Current</BreadcrumbItem>
            </Breadcrumbs>,
        );
        const item = container.querySelector('.w3f-breadcrumb-item--active');
        expect(item).toBeInTheDocument();
        expect(item).toHaveAttribute('aria-current', 'page');
    });

    it('renders disabled class', () => {
        const { container } = render(
            <Breadcrumbs>
                <BreadcrumbItem href="/x" disabled>Disabled</BreadcrumbItem>
            </Breadcrumbs>,
        );
        expect(container.querySelector('.w3f-breadcrumb-item--disabled')).toBeInTheDocument();
    });

    it('renders as link when href is provided', () => {
        const { container } = render(
            <Breadcrumbs>
                <BreadcrumbItem href="/home">Home</BreadcrumbItem>
            </Breadcrumbs>,
        );
        const link = container.querySelector('a.w3f-breadcrumb-item');
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/home');
    });

    it('fires onClick callback', async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();
        const { container } = render(
            <Breadcrumbs>
                <BreadcrumbItem onClick={onClick}>Click me</BreadcrumbItem>
            </Breadcrumbs>,
        );
        const link = container.querySelector('a.w3f-breadcrumb-item')!;
        await user.click(link);
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('renders icon element', () => {
        const { container } = render(
            <Breadcrumbs>
                <BreadcrumbItem icon={<span data-testid="icon" />}>With icon</BreadcrumbItem>
            </Breadcrumbs>,
        );
        expect(container.querySelector('.w3f-breadcrumb-item__icon')).toBeInTheDocument();
    });
});
