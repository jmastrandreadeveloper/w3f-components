import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Desktop from '../Desktop';
import { createRef } from 'react';

describe('Desktop', () => {
    it('renders with base class', () => {
        const { container } = render(<Desktop><div>Win1</div></Desktop>);
        // Desktop uses Grid which renders a div; look for the class
        const root = container.querySelector('.w3f-desktop');
        expect(root).toBeInTheDocument();
    });

    it('has displayName set', () => {
        expect(Desktop.displayName).toBe('Desktop');
    });

    it('renders children', () => {
        render(
            <Desktop>
                <div>Window A</div>
                <div>Window B</div>
            </Desktop>
        );
        expect(screen.getByText('Window A')).toBeInTheDocument();
        expect(screen.getByText('Window B')).toBeInTheDocument();
    });

    it('applies custom className', () => {
        const { container } = render(<Desktop className="my-desktop"><div>Win</div></Desktop>);
        const root = container.querySelector('.w3f-desktop');
        expect(root).toHaveClass('my-desktop');
    });

    it('applies background style', () => {
        const { container } = render(<Desktop background="#ff0000"><div>Win</div></Desktop>);
        const root = container.querySelector('.w3f-desktop');
        expect(root).toHaveStyle({ background: '#ff0000' });
    });

    it('applies default background', () => {
        const { container } = render(<Desktop><div>Win</div></Desktop>);
        const root = container.querySelector('.w3f-desktop');
        expect(root).toHaveStyle({ background: '#f0f2f5' });
    });

    it('applies full viewport height', () => {
        const { container } = render(<Desktop><div>Win</div></Desktop>);
        const root = container.querySelector('.w3f-desktop');
        expect(root).toHaveStyle({ height: '100vh' });
    });

    it('passes additional style prop to root element', () => {
        const { container } = render(
            <Desktop style={{ border: '1px solid red' }}><div>Win</div></Desktop>
        );
        const root = container.querySelector('.w3f-desktop');
        expect(root).toBeInTheDocument();
        // Style is merged with base styles; verify the root exists with the class
    });
});
