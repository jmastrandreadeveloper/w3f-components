import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Sidenav } from '../Sidenav';
import { createRef } from 'react';

const sampleTreeData = [
    { id: '1', name: 'Home', type: 'file' as const },
    {
        id: '2', name: 'Settings', type: 'folder' as const,
        children: [{ id: '2-1', name: 'General', type: 'file' as const }],
    },
];

describe('Sidenav', () => {
    it('renders with container class', () => {
        const { container } = render(<Sidenav treeData={sampleTreeData} />);
        expect(container.querySelector('.w3f-sidenav-container')).toBeInTheDocument();
    });

    it('has displayName set', () => {
        expect(Sidenav.displayName).toBe('Sidenav');
    });

    it('forwards ref', () => {
        const ref = createRef<HTMLDivElement>();
        render(<Sidenav ref={ref} treeData={sampleTreeData} />);
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('applies compact variant class', () => {
        const { container } = render(<Sidenav treeData={sampleTreeData} variant="compact" />);
        expect(container.querySelector('.w3f-sidenav-compact')).toBeInTheDocument();
    });

    it('applies expanded variant class', () => {
        const { container } = render(<Sidenav treeData={sampleTreeData} variant="expanded" />);
        expect(container.querySelector('.w3f-sidenav-expanded')).toBeInTheDocument();
    });

    it('applies light variant class', () => {
        const { container } = render(<Sidenav treeData={sampleTreeData} variant="light" />);
        expect(container.querySelector('.w3f-sidenav-light')).toBeInTheDocument();
    });

    it('shows loading state', () => {
        render(<Sidenav treeData={[]} loading />);
        expect(screen.getByText('Cargando navegación...')).toBeInTheDocument();
    });

    it('loading state has correct classes', () => {
        const { container } = render(<Sidenav treeData={[]} loading />);
        expect(container.querySelector('.w3f-sidenav-alert')).toBeInTheDocument();
        expect(container.querySelector('.w3f-sidenav-alert-loading')).toBeInTheDocument();
    });

    it('shows error state', () => {
        render(<Sidenav treeData={[]} error="Network error" />);
        expect(screen.getByText('Error: Network error')).toBeInTheDocument();
    });

    it('error state has correct classes', () => {
        const { container } = render(<Sidenav treeData={[]} error="Oops" />);
        expect(container.querySelector('.w3f-sidenav-alert-error')).toBeInTheDocument();
    });

    it('shows empty data warning', () => {
        render(<Sidenav treeData={[]} />);
        expect(screen.getByText('No hay datos para mostrar')).toBeInTheDocument();
    });

    it('applies custom className', () => {
        const { container } = render(<Sidenav treeData={sampleTreeData} className="my-nav" />);
        expect(container.querySelector('.w3f-sidenav-container')).toHaveClass('my-nav');
    });
});
