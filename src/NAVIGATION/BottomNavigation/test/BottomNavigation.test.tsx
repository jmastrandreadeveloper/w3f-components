import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BottomNavigation, BottomNavigationAction } from '../BottomNavigation';

describe('BottomNavigation', () => {
    it('renders with base CSS class', () => {
        const { container } = render(<BottomNavigation />);
        expect(container.querySelector('.w3f-bottom-nav')).toBeInTheDocument();
    });

    it('has displayName set', () => {
        expect(BottomNavigation.displayName).toBe('BottomNavigation');
    });

    it('forwards ref to the nav element', () => {
        const ref = { current: null } as React.RefObject<HTMLElement | null>;
        render(<BottomNavigation ref={ref} />);
        expect(ref.current).toBeInstanceOf(HTMLElement);
        expect(ref.current?.tagName).toBe('NAV');
    });

    it('applies variant class', () => {
        const { container } = render(<BottomNavigation variant="elevated" />);
        expect(container.querySelector('.w3f-bottom-nav--elevated')).toBeInTheDocument();
    });

    it('applies color class', () => {
        const { container } = render(<BottomNavigation color="secondary" />);
        expect(container.querySelector('.w3f-bottom-nav--secondary')).toBeInTheDocument();
    });

    it('applies fixed class when fixed prop is true', () => {
        const { container } = render(<BottomNavigation fixed />);
        expect(container.querySelector('.w3f-bottom-nav--fixed')).toBeInTheDocument();
    });

    it('applies disabled class when disabled', () => {
        const { container } = render(<BottomNavigation disabled />);
        expect(container.querySelector('.w3f-bottom-nav--disabled')).toBeInTheDocument();
    });

    it('applies custom className', () => {
        const { container } = render(<BottomNavigation className="my-nav" />);
        expect(container.querySelector('.w3f-bottom-nav.my-nav')).toBeInTheDocument();
    });

    it('renders with role="tablist"', () => {
        render(<BottomNavigation />);
        expect(screen.getByRole('tablist')).toBeInTheDocument();
    });

    it('renders children actions', () => {
        render(
            <BottomNavigation value="home">
                <BottomNavigationAction label="Home" value="home" />
                <BottomNavigationAction label="Search" value="search" />
            </BottomNavigation>,
        );
        expect(screen.getAllByRole('tab')).toHaveLength(2);
    });
});

describe('BottomNavigationAction', () => {
    it('has displayName set', () => {
        expect(BottomNavigationAction.displayName).toBe('BottomNavigationAction');
    });

    it('fires onChange on click', async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(
            <BottomNavigation onChange={onChange}>
                <BottomNavigationAction label="Home" value="home" />
            </BottomNavigation>,
        );
        await user.click(screen.getByRole('tab'));
        expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('shows active class when value matches', () => {
        render(
            <BottomNavigation value="home">
                <BottomNavigationAction label="Home" value="home" />
            </BottomNavigation>,
        );
        const tab = screen.getByRole('tab');
        expect(tab.className).toContain('w3f-bottom-nav-action--active');
    });

    it('renders badge when provided', () => {
        const { container } = render(
            <BottomNavigation value="home">
                <BottomNavigationAction label="Home" value="home" badge={5} />
            </BottomNavigation>,
        );
        expect(container.querySelector('.w3f-bottom-nav-action__badge')).toHaveTextContent('5');
    });

    it('truncates badge to 99+ when over 99', () => {
        const { container } = render(
            <BottomNavigation value="home">
                <BottomNavigationAction label="Home" value="home" badge={150} />
            </BottomNavigation>,
        );
        expect(container.querySelector('.w3f-bottom-nav-action__badge')).toHaveTextContent('99+');
    });

    it('renders label element', () => {
        const { container } = render(
            <BottomNavigation showLabels>
                <BottomNavigationAction label="Home" value="home" />
            </BottomNavigation>,
        );
        expect(container.querySelector('.w3f-bottom-nav-action__label')).toHaveTextContent('Home');
    });

    it('does not fire onChange when disabled', async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(
            <BottomNavigation onChange={onChange}>
                <BottomNavigationAction label="Home" value="home" disabled />
            </BottomNavigation>,
        );
        await user.click(screen.getByRole('tab'));
        expect(onChange).not.toHaveBeenCalled();
    });
});
