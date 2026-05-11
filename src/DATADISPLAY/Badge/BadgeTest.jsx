// Badge.test.jsx - Suite de Tests con Jest y React Testing Library

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Badge from './Badge';
import BadgeWrapper from './BadgeWrapper';

describe('Badge Component', () => {

    // ============================================
    // TESTS BÁSICOS
    // ============================================

    describe('Basic Rendering', () => {
        test('renders badge with children', () => {
            render(<Badge>Test Badge</Badge>);
            expect(screen.getByText('Test Badge')).toBeInTheDocument();
        });

        test('renders with default props', () => {
            const { container } = render(<Badge>Default</Badge>);
            const badge = container.querySelector('.w3f-badge');

            expect(badge).toHaveClass('w3f-bg-primary');
            expect(badge).toHaveClass('w3f-badge-md');
        });

        test('renders with role status', () => {
            render(<Badge>Status</Badge>);
            expect(screen.getByRole('status')).toBeInTheDocument();
        });
    });

    // ============================================
    // TESTS DE COLORES
    // ============================================

    describe('Color Variants', () => {
        const colors = ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'gray'];

        test.each(colors)('renders %s color correctly', (color) => {
            const { container } = render(<Badge color={color}>Test</Badge>);
            const badge = container.querySelector('.w3f-badge');
            expect(badge).toHaveClass(`w3f-bg-${color}`);
        });
    });

    // ============================================
    // TESTS DE TAMAÑOS
    // ============================================

    describe('Size Variants', () => {
        test('renders small size', () => {
            const { container } = render(<Badge size="sm">Small</Badge>);
            expect(container.querySelector('.w3f-badge-sm')).toBeInTheDocument();
        });

        test('renders medium size', () => {
            const { container } = render(<Badge size="md">Medium</Badge>);
            expect(container.querySelector('.w3f-badge-md')).toBeInTheDocument();
        });

        test('renders large size', () => {
            const { container } = render(<Badge size="lg">Large</Badge>);
            expect(container.querySelector('.w3f-badge-lg')).toBeInTheDocument();
        });
    });

    // ============================================
    // TESTS DE VARIANTES DE ESTILO
    // ============================================

    describe('Style Variants', () => {
        test('renders solid variant (default)', () => {
            const { container } = render(<Badge variant="solid">Solid</Badge>);
            const badge = container.querySelector('.w3f-badge');
            expect(badge).not.toHaveClass('w3f-badge-outline');
            expect(badge).not.toHaveClass('w3f-badge-soft');
            expect(badge).not.toHaveClass('w3f-badge-dot');
        });

        test('renders outline variant', () => {
            const { container } = render(<Badge variant="outline">Outline</Badge>);
            expect(container.querySelector('.w3f-badge-outline')).toBeInTheDocument();
        });

        test('renders soft variant', () => {
            const { container } = render(<Badge variant="soft">Soft</Badge>);
            expect(container.querySelector('.w3f-badge-soft')).toBeInTheDocument();
        });

        test('renders dot variant without content', () => {
            const { container } = render(<Badge variant="dot" />);
            const badge = container.querySelector('.w3f-badge-dot');
            expect(badge).toBeInTheDocument();
            expect(badge).toBeEmptyDOMElement();
        });
    });

    // ============================================
    // TESTS DE CONTADOR Y MAX
    // ============================================

    describe('Counter and Max', () => {
        test('displays number as is when below max', () => {
            render(<Badge max={99}>{50}</Badge>);
            expect(screen.getByText('50')).toBeInTheDocument();
        });

        test('displays max+ when number exceeds max', () => {
            render(<Badge max={99}>{150}</Badge>);
            expect(screen.getByText('99+')).toBeInTheDocument();
        });

        test('displays number at max threshold', () => {
            render(<Badge max={99}>{99}</Badge>);
            expect(screen.getByText('99')).toBeInTheDocument();
        });

        test('works with custom max value', () => {
            render(<Badge max={999}>{1500}</Badge>);
            expect(screen.getByText('999+')).toBeInTheDocument();
        });
    });

    // ============================================
    // TESTS DE POSICIONAMIENTO
    // ============================================

    describe('Positioning', () => {
        const positions = [
            'top-right',
            'top-left',
            'top-center',
            'bottom-right',
            'bottom-left',
            'bottom-center',
            'middle-right',
            'middle-left'
        ];

        test.each(positions)('applies %s position class', (position) => {
            const { container } = render(<Badge position={position}>Test</Badge>);
            expect(container.querySelector(`.badge-${position}`)).toBeInTheDocument();
        });

        test('renders without position class when position is null', () => {
            const { container } = render(<Badge>Test</Badge>);
            const badge = container.querySelector('.w3f-badge');

            positions.forEach(position => {
                expect(badge).not.toHaveClass(`badge-${position}`);
            });
        });
    });

    // ============================================
    // TESTS DE ANIMACIONES
    // ============================================

    describe('Animations', () => {
        test('applies pulse animation when pulse is true', () => {
            const { container } = render(<Badge pulse>Pulse</Badge>);
            expect(container.querySelector('.w3f-badge-pulse')).toBeInTheDocument();
        });

        test('applies animate animation when animate is true', () => {
            const { container } = render(<Badge animate>Animate</Badge>);
            expect(container.querySelector('.w3f-badge-animate')).toBeInTheDocument();
        });

        test('applies both animations when both are true', () => {
            const { container } = render(<Badge pulse animate>Both</Badge>);
            const badge = container.querySelector('.w3f-badge');
            expect(badge).toHaveClass('w3f-badge-pulse');
            expect(badge).toHaveClass('w3f-badge-animate');
        });
    });

    // ============================================
    // TESTS DE VISIBILIDAD
    // ============================================

    describe('Visibility', () => {
        test('renders badge when invisible is false', () => {
            render(<Badge invisible={false}>Visible</Badge>);
            expect(screen.getByText('Visible')).toBeInTheDocument();
        });

        test('does not render badge when invisible is true', () => {
            const { container } = render(<Badge invisible={true}>Hidden</Badge>);
            expect(container.querySelector('.w3f-badge')).not.toBeInTheDocument();
        });

        test('returns null when invisible', () => {
            const { container } = render(<Badge invisible>Hidden</Badge>);
            expect(container.firstChild).toBeNull();
        });
    });

    // ============================================
    // TESTS DE ACCESIBILIDAD
    // ============================================

    describe('Accessibility', () => {
        test('uses custom aria-label when provided', () => {
            render(<Badge ariaLabel="Custom label">5</Badge>);
            expect(screen.getByLabelText('Custom label')).toBeInTheDocument();
        });

        test('generates automatic aria-label for numbers', () => {
            render(<Badge>{10}</Badge>);
            expect(screen.getByLabelText('10 notifications')).toBeInTheDocument();
        });

        test('generates automatic aria-label for dot variant', () => {
            render(<Badge variant="dot" />);
            expect(screen.getByLabelText('Notification indicator')).toBeInTheDocument();
        });

        test('has role status', () => {
            render(<Badge>Status</Badge>);
            const badge = screen.getByRole('status');
            expect(badge).toBeInTheDocument();
        });
    });

    // ============================================
    // TESTS DE CLASES PERSONALIZADAS
    // ============================================

    describe('Custom Classes', () => {
        test('applies custom className', () => {
            const { container } = render(<Badge className="custom-class">Test</Badge>);
            const badge = container.querySelector('.w3f-badge');
            expect(badge).toHaveClass('custom-class');
            expect(badge).toHaveClass('w3f-badge');
        });

        test('preserves default classes with custom className', () => {
            const { container } = render(
                <Badge className="custom" color="danger" size="lg">Test</Badge>
            );
            const badge = container.querySelector('.w3f-badge');
            expect(badge).toHaveClass('custom');
            expect(badge).toHaveClass('w3f-badge');
            expect(badge).toHaveClass('w3f-bg-danger');
            expect(badge).toHaveClass('w3f-badge-lg');
        });
    });
});

// ============================================
// TESTS DEL BADGE WRAPPER
// ============================================

describe('BadgeWrapper Component', () => {

    describe('Basic Rendering', () => {
        test('renders children', () => {
            render(
                <BadgeWrapper badgeContent={5}>
                    <button>Click me</button>
                </BadgeWrapper>
            );
            expect(screen.getByText('Click me')).toBeInTheDocument();
        });

        test('renders badge with content', () => {
            render(
                <BadgeWrapper badgeContent={5}>
                    <button>Click me</button>
                </BadgeWrapper>
            );
            expect(screen.getByText('5')).toBeInTheDocument();
        });

        test('renders with relative positioning', () => {
            const { container } = render(
                <BadgeWrapper badgeContent={5}>
                    <button>Click me</button>
                </BadgeWrapper>
            );
            const wrapper = container.firstChild;
            expect(wrapper).toHaveStyle({ position: 'relative' });
        });
    });

    describe('Badge Visibility Logic', () => {
        test('shows badge when badgeContent is number greater than 0', () => {
            render(
                <BadgeWrapper badgeContent={5}>
                    <button>Test</button>
                </BadgeWrapper>
            );
            expect(screen.getByText('5')).toBeInTheDocument();
        });

        test('hides badge when badgeContent is 0 and showZero is false', () => {
            const { container } = render(
                <BadgeWrapper badgeContent={0}>
                    <button>Test</button>
                </BadgeWrapper>
            );
            expect(container.querySelector('.w3f-badge')).not.toBeInTheDocument();
        });

        test('shows badge when badgeContent is 0 and showZero is true', () => {
            render(
                <BadgeWrapper
                    badgeContent={0}
                    badgeProps={{ showZero: true }}
                >
                    <button>Test</button>
                </BadgeWrapper>
            );
            expect(screen.getByText('0')).toBeInTheDocument();
        });

        test('shows badge for dot variant even without content', () => {
            const { container } = render(
                <BadgeWrapper
                    badgeContent=""
                    badgeProps={{ variant: 'dot' }}
                >
                    <button>Test</button>
                </BadgeWrapper>
            );
            expect(container.querySelector('.w3f-badge-dot')).toBeInTheDocument();
        });

        test('hides badge when badgeProps.invisible is true', () => {
            const { container } = render(
                <BadgeWrapper
                    badgeContent={5}
                    badgeProps={{ invisible: true }}
                >
                    <button>Test</button>
                </BadgeWrapper>
            );
            expect(container.querySelector('.w3f-badge')).not.toBeInTheDocument();
        });
    });

    describe('Badge Position', () => {
        test('applies default top-right position when overlap is true', () => {
            const { container } = render(
                <BadgeWrapper badgeContent={5} overlap={true}>
                    <button>Test</button>
                </BadgeWrapper>
            );
            expect(container.querySelector('.badge-top-right')).toBeInTheDocument();
        });

        test('does not apply position when overlap is false', () => {
            const { container } = render(
                <BadgeWrapper badgeContent={5} overlap={false}>
                    <button>Test</button>
                </BadgeWrapper>
            );
            expect(container.querySelector('[class*="badge-"]')).not.toBeInTheDocument();
        });

        test('respects custom position from badgeProps', () => {
            const { container } = render(
                <BadgeWrapper
                    badgeContent={5}
                    badgeProps={{ position: 'bottom-left' }}
                >
                    <button>Test</button>
                </BadgeWrapper>
            );
            expect(container.querySelector('.badge-bottom-left')).toBeInTheDocument();
        });
    });

    describe('Badge Props Forwarding', () => {
        test('forwards color prop to Badge', () => {
            const { container } = render(
                <BadgeWrapper
                    badgeContent={5}
                    badgeProps={{ color: 'danger' }}
                >
                    <button>Test</button>
                </BadgeWrapper>
            );
            expect(container.querySelector('.w3f-bg-danger')).toBeInTheDocument();
        });

        test('forwards size prop to Badge', () => {
            const { container } = render(
                <BadgeWrapper
                    badgeContent={5}
                    badgeProps={{ size: 'lg' }}
                >
                    <button>Test</button>
                </BadgeWrapper>
            );
            expect(container.querySelector('.w3f-badge-lg')).toBeInTheDocument();
        });

        test('forwards multiple props to Badge', () => {
            const { container } = render(
                <BadgeWrapper
                    badgeContent={5}
                    badgeProps={{
                        color: 'success',
                        size: 'sm',
                        pulse: true,
                        variant: 'outline'
                    }}
                >
                    <button>Test</button>
                </BadgeWrapper>
            );
            const badge = container.querySelector('.w3f-badge');
            expect(badge).toHaveClass('w3f-bg-success');
            expect(badge).toHaveClass('w3f-badge-sm');
            expect(badge).toHaveClass('w3f-badge-pulse');
            expect(badge).toHaveClass('w3f-badge-outline');
        });
    });
});

// ============================================
// TESTS DE INTEGRACIÓN
// ============================================

describe('Integration Tests', () => {
    test('Badge and BadgeWrapper work together', () => {
        render(
            <BadgeWrapper
                badgeContent={99}
                badgeProps={{
                    color: 'danger',
                    size: 'sm',
                    max: 50
                }}
            >
                <button aria-label="Notifications">🔔</button>
            </BadgeWrapper>
        );

        expect(screen.getByLabelText('Notifications')).toBeInTheDocument();
        expect(screen.getByText('50+')).toBeInTheDocument();
    });

    test('Multiple badges with different states', () => {
        const { container } = render(
            <div>
                <Badge color="primary">Badge 1</Badge>
                <Badge color="danger" pulse>{5}</Badge>
                <Badge variant="dot" color="success" />
            </div>
        );

        expect(screen.getByText('Badge 1')).toBeInTheDocument();
        expect(screen.getByText('5')).toBeInTheDocument();
        expect(container.querySelector('.w3f-badge-dot')).toBeInTheDocument();
    });
});